import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authAPI, tokenManager } from './api';


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
    async jwt({ token, user, account, profile }) {
      // Xử lý khi user đăng nhập lần đầu
      if (user && account) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.roles = user.roles;
        token.provider = user.provider;
      }
      
      // Xử lý OAuth providers
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          // Gọi API BE để xử lý OAuth
          const oauthResponse = await authAPI.oauthCallback(
            account.provider,
            {
              id: profile?.sub || profile?.id,
              email: profile?.email,
              name: profile?.name,
              picture: profile?.picture,
              provider: account.provider,
            }
          );
          
          token.accessToken = oauthResponse.access_token;
          token.refreshToken = oauthResponse.refresh_token;
          token.roles = oauthResponse.user.roles;
          token.provider = oauthResponse.user.provider;
          
          // Lưu token vào tokenManager
          if (typeof window !== 'undefined') {
            tokenManager.saveTokens(
              oauthResponse.access_token,
              oauthResponse.refresh_token,
              true
            );
          }
        } catch (error) {
          console.error('OAuth callback error:', error);
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Truyền thông tin từ token vào session
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.roles) {
        session.user.roles = token.roles as string[];
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }
      
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Xử lý khi user đăng nhập thành công
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        // OAuth đăng nhập - đã xử lý trong jwt callback
        return true;
      }
      
      // Credentials đăng nhập
      if (user?.accessToken) {
        return true;
      }
      
      return false;
    },
    
    async redirect({ url, baseUrl }) {
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Secret cho NextAuth - sử dụng mặc định cho development
  secret: process.env.NEXTAUTH_SECRET || 'x-club-development-secret-key-2024',
  
  // URL cho NextAuth - sử dụng mặc định cho development
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // Debug environment variables
  debug: process.env.NODE_ENV === 'development',
  
  // Logging configuration
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', { code, metadata });
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.log('NextAuth Debug:', { code, metadata });
    }
  },
});

// Helper functions
export const getServerSession = auth;
export const getSession = auth;
