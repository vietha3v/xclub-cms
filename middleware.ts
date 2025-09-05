import { NextRequest, NextResponse } from 'next/server';

// Danh sách các route cần authentication
const protectedRoutes = [
  '/dashboard',
  '/activities',
  '/clubs',
  '/races',
  '/challenges',
  '/events',
  '/profile',
  '/settings',
  '/admin'
];

// Danh sách các route public (không cần authentication)
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/auth/error',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/oauth/callback'
];

/**
 * Kiểm tra xem route có cần authentication không
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Kiểm tra xem route có phải là public route không
 */
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname.startsWith(route));
}

/**
 * Kiểm tra token có hợp lệ không (basic check)
 */
function isValidToken(token: string): boolean {
  if (!token) return false;
  
  try {
    // Kiểm tra format JWT (3 phần được phân cách bởi dấu chấm)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload để kiểm tra thời gian hết hạn
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    // Kiểm tra thời gian hết hạn
    if (payload.exp && payload.exp < now) {
      return false;
    }
    
    // Kiểm tra các field bắt buộc
    if (!payload.userId || !payload.email) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Lấy thông tin user từ token
 */
function getUserFromToken(token: string): { userId: string; email: string; roles: string[] } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    return {
      userId: payload.userId,
      email: payload.email,
      roles: payload.roles || ['runner']
    };
  } catch (error) {
    return null;
  }
}

/**
 * Lấy token từ request
 */
function getTokenFromRequest(request: NextRequest): { accessToken: string | null; refreshToken: string | null } {
  // Thử lấy từ Authorization header
  const authHeader = request.headers.get('authorization');
  let accessToken = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    accessToken = authHeader.substring(7);
  }
  
  // Thử lấy từ cookies
  if (!accessToken) {
    accessToken = request.cookies.get('access_token')?.value || null;
  }
  
  const refreshToken = request.cookies.get('refresh_token')?.value || null;
  
  return { accessToken, refreshToken };
}

/**
 * Refresh token bằng cách gọi API backend
 */
async function refreshAccessToken(refreshToken: string): Promise<{ success: boolean; accessToken?: string; newRefreshToken?: string; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    });
    
    if (!response.ok) {
      return { success: false, error: 'Refresh token failed' };
    }
    
    const data = await response.json();
    
    if (data.access_token) {
      return {
        success: true,
        accessToken: data.access_token,
        newRefreshToken: data.refresh_token
      };
    }
    
    return { success: false, error: 'Invalid refresh response' };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Refresh token error' 
    };
  }
}

/**
 * Tạo response redirect về login
 */
function createLoginRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);
  
  // Lưu URL hiện tại để redirect sau khi login
  if (request.nextUrl.pathname !== '/login') {
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
  }
  
  const response = NextResponse.redirect(loginUrl);
  
  // Xóa các cookie authentication cũ
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  
  return response;
}

/**
 * Tạo response redirect về dashboard (sau khi login thành công)
 */
function createDashboardRedirect(request: NextRequest): NextResponse {
  const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
  const redirectUrl = callbackUrl && callbackUrl !== '/login' ? callbackUrl : '/dashboard';
  
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

/**
 * Middleware chính
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua static files và API routes (trừ auth routes)
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public/')
  ) {
    return NextResponse.next();
  }
  
  // Xử lý public routes
  if (isPublicRoute(pathname)) {
    // Nếu đang ở trang login/register và đã có token hợp lệ, redirect về dashboard
    if ((pathname === '/login' || pathname === '/register') && !pathname.includes('/auth/')) {
      const { accessToken } = getTokenFromRequest(request);
      if (accessToken && isValidToken(accessToken)) {
        return createDashboardRedirect(request);
      }
    }
    
    return NextResponse.next();
  }
  
  // Xử lý protected routes
  if (isProtectedRoute(pathname)) {
    const { accessToken, refreshToken } = getTokenFromRequest(request);
    
    if (!accessToken) {
      console.log(`No access token found for protected route: ${pathname}`);
      return createLoginRedirect(request);
    }
    
    // Kiểm tra access token có hợp lệ không
    if (!isValidToken(accessToken)) {
      console.log(`Access token invalid for ${pathname}`);
      
      // Thử refresh token
      if (refreshToken) {
        console.log('Attempting to refresh token...');
        const refreshResult = await refreshAccessToken(refreshToken);
        
        if (refreshResult.success && refreshResult.accessToken) {
          console.log('Token refreshed successfully');
          
          // Tạo response với token mới
          const response = NextResponse.next();
          
          // Cập nhật cookies với token mới
          const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
          response.cookies.set('access_token', refreshResult.accessToken, {
            expires: accessTokenExpiry,
            path: '/',
            secure: true,
            sameSite: 'strict'
          });
          
          if (refreshResult.newRefreshToken) {
            const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
            response.cookies.set('refresh_token', refreshResult.newRefreshToken, {
              expires: refreshTokenExpiry,
              path: '/',
              secure: true,
              sameSite: 'strict'
            });
          }
          
          // Thêm thông tin user vào headers
          const userInfo = getUserFromToken(refreshResult.accessToken);
          if (userInfo) {
            response.headers.set('x-user-id', userInfo.userId);
            response.headers.set('x-user-email', userInfo.email);
            response.headers.set('x-user-roles', JSON.stringify(userInfo.roles));
          }
          
          return response;
        } else {
          console.log('Token refresh failed:', refreshResult.error);
          return createLoginRedirect(request);
        }
      } else {
        // Không có refresh token, redirect về login
        return createLoginRedirect(request);
      }
    }
    
    // Access token hợp lệ, thêm thông tin user vào headers
    const userInfo = getUserFromToken(accessToken);
    if (userInfo) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', userInfo.userId);
      requestHeaders.set('x-user-email', userInfo.email);
      requestHeaders.set('x-user-roles', JSON.stringify(userInfo.roles));
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    // Không thể lấy thông tin user từ token
    return createLoginRedirect(request);
  }
  
  // Các route khác, cho phép truy cập
  return NextResponse.next();
}

/**
 * Cấu hình matcher cho middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
