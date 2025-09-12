import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

// Helper function để refresh access token theo API của dự án
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshed = await response.json();

    if (!response.ok) {
      throw refreshed;
    }

    // Backend trả về: { access_token, refresh_token }
    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 phút
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}


export const authOptions = {
  providers: [
    // Google OAuth - chỉ enable khi có config
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'disabled' ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ] : []),
    
    // Facebook OAuth - chỉ enable khi có config
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_ID !== 'disabled' ? [
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      })
    ] : []),

    // Credentials (Email/Password)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        emailOrUsername: { label: 'Email hoặc Username', type: 'text' },
        password: { label: 'Mật khẩu', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          return null;
        }

        try {
          // Gọi backend API trực tiếp
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
          const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailOrUsername: credentials.emailOrUsername,
              password: credentials.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();

            if (data.access_token && data.refresh_token) {
              // Lưu token vào session
              return {
                id: data.user.id,
                email: data.user.email,
                name: `${data.user.firstName} ${data.user.lastName}`,
                image: data.user.avatar,
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                roles: data.user.roles,
                provider: data.user.provider,
              };
            }
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],
  
        callbacks: {
          async jwt({ token, user, account, profile }: any) {
            // Lần đầu đăng nhập (có user và account)
            if (user && account) {
              // Credentials login
              if (account.provider === 'credentials') {
                return {
                  ...token,
                  accessToken: user.accessToken,
                  refreshToken: user.refreshToken,
                  accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
                  roles: user.roles,
                  provider: user.provider,
                  userId: user.id,
                };
              }

              // OAuth login (Google/Facebook)
              if (account.provider === 'google' || account.provider === 'facebook') {
          try {
            // Gọi BE API để tạo/tìm user và lấy JWT tokens
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth/callback`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                provider: account.provider, 
                profile: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.image,
                  provider: account.provider
                }
              }),
            });

            if (!response.ok) {
              throw new Error('OAuth callback failed');
            }

            const result = await response.json();
            
            return {
              ...token,
              accessToken: result.access_token,
              refreshToken: result.refresh_token,
              accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
              roles: result.user?.roles || ['runner'],
              provider: account.provider,
              userId: result.user?.id,
            };
          } catch (error) {
            console.error('OAuth callback error:', error);
            // Fallback - không có token từ backend
            return {
              ...token,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              accessTokenExpires: Date.now() + (account.expires_at ?? 3600) * 1000,
              roles: ['runner'],
              provider: account.provider,
              userId: user.id,
            };
          }
        }
      }

      // Kiểm tra và refresh token nếu cần
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Token hết hạn, thử refresh
      return await refreshAccessToken(token);
    },
    
          async session({ session, token }: any) {
      // Truyền thông tin từ token vào session
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken as string;
      }
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      if (token.roles) {
        session.user.roles = token.roles as string[];
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }
      
      return session;
    },
    
    async signIn({ user, account, profile }: any) {
      // Xử lý khi user đăng nhập thành công
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        // OAuth đăng nhập - đã xử lý trong jwt callback
        return true;
      }

      // Credentials đăng nhập
      if (account?.provider === 'credentials' && user && 'accessToken' in user) {
        return true;
      }

      return false;
    },
    
    async redirect({ url, baseUrl }: any) {
      // Xử lý redirect sau khi đăng nhập
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      else if (url && new URL(url).origin === baseUrl) {
        return url;
      }
      
      return baseUrl;
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/error',
  },
  
        session: {
          strategy: 'jwt' as const,
          maxAge: 30 * 24 * 60 * 60, // 30 days
        },
  
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Secret cho NextAuth - sử dụng mặc định cho development
  secret: process.env.NEXTAUTH_SECRET || 'x-club-development-secret-key-2024',
  
  // Trust host cho development
  trustHost: true,
  
  // Debug environment variables
  debug: process.env.NODE_ENV === 'development',
  
  // Logging configuration
  logger: {
    error(error: Error) {
      console.error('NextAuth Error:', error);
    },
    warn(code: string) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code: string, metadata?: any) {
      console.log('NextAuth Debug:', { code, metadata });
    }
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

// Helper functions
export const getServerSession = auth;
export const getSession = auth;
