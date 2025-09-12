import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

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
 * Middleware chính - đơn giản với NextAuth
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua static files và API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public/')
  ) {
    return NextResponse.next();
  }
  
  // Public routes - luôn cho phép
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Protected routes - kiểm tra NextAuth session
  if (isProtectedRoute(pathname)) {
    const session = await auth();
    
    if (!session) {
      // Redirect về login nếu không có session
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
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
