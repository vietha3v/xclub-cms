import { NextRequest } from 'next/server';

interface BackendApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Helper function để cập nhật cookies với token mới
 * @param accessToken - Access token mới
 * @param refreshToken - Refresh token mới (nếu có)
 */
export function updateTokenCookies(accessToken: string, refreshToken?: string) {
  // Chỉ chạy trên client side
  if (typeof window === 'undefined') return;
  
  // Cập nhật access token cookie
  const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
  document.cookie = `access_token=${accessToken}; expires=${accessTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
  
  // Cập nhật refresh token cookie nếu có
  if (refreshToken) {
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
    document.cookie = `refresh_token=${refreshToken}; expires=${refreshTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
  }
}

/**
 * Helper function để xóa tất cả token và redirect về login
 */
export function redirectToLogin() {
  // Chỉ chạy trên client side
  if (typeof window === 'undefined') return;
  
  console.log('Redirecting to login page...');
  
  // Xóa tất cả token cũ
  document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  
  // Redirect về trang login
  window.location.href = '/login';
}

/**
 * Helper function để gọi API backend với token forwarding và refresh token tự động
 * @param request - NextRequest từ frontend
 * @param endpoint - Endpoint backend (không bao gồm base URL)
 * @param options - Các options cho request
 * @returns Response từ backend
 */
export async function callBackendApi(
  request: NextRequest,
  endpoint: string,
  options: BackendApiOptions = {}
) {
  try {
    const { method = 'GET', body, headers = {} } = options;
    
    // Lấy token từ request headers
    let authHeader = request.headers.get('authorization');
    
    // Nếu không có Authorization header, thử lấy từ cookies
    if (!authHeader) {
      const cookies = request.headers.get('cookie');
      if (cookies) {
        // Tìm access_token trong cookies
        const accessTokenMatch = cookies.match(/access_token=([^;]+)/);
        if (accessTokenMatch) {
          authHeader = `Bearer ${accessTokenMatch[1]}`;
        }
      }
    }
    
    // Chuẩn bị headers cho backend
    const backendHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };
    
    // Forward Authorization header nếu có
    if (authHeader) {
      backendHeaders['Authorization'] = authHeader;
    }
    
    // Chuẩn bị request options
    const requestOptions: RequestInit = {
      method,
      headers: backendHeaders,
    };
    
    // Thêm body nếu có
    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }
    
    // Gọi API backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    let response = await fetch(`${backendUrl}${endpoint}`, requestOptions);
    
    // Nếu gặp 401, middleware đã xử lý refresh token
    // Chỉ cần trả về lỗi để frontend xử lý
    if (response.status === 401) {
      console.log('Authentication failed, middleware should have handled refresh token');
      return {
        success: false,
        status: 401,
        error: 'Authentication failed',
        data: null,
      };
    }

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Backend API error:', {
        endpoint,
        status: response.status,
        data,
      });
      
      return {
        success: false,
        status: response.status,
        error: data.message || `API call failed: ${endpoint}`,
        data: null,
      };
    }
    
    return {
      success: true,
      status: response.status,
      data,
      error: null,
    };
    
  } catch (error) {
    console.error('Backend API call error:', {
      endpoint,
      error: error instanceof Error ? error.message : error,
    });
    
    return {
      success: false,
      status: 500,
      error: 'Internal server error',
      data: null,
    };
  }
}

/**
 * Helper function để tạo NextResponse từ kết quả backend
 * @param result - Kết quả từ callBackendApi
 * @param defaultErrorMessage - Message mặc định khi có lỗi
 * @returns NextResponse
 */
export function createNextResponse(result: any, defaultErrorMessage: string = 'Request failed') {
  if (result.success) {
    return Response.json(result.data);
  }
  
  return Response.json(
    { error: result.error || defaultErrorMessage },
    { status: result.status }
  );
}

/**
 * Helper function để xử lý API route với error handling
 * @param request - NextRequest
 * @param handler - Function xử lý logic
 * @returns NextResponse
 */
export async function handleApiRoute(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<any>
) {
  try {
    return await handler(request);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Alias cho callBackendApi để tương thích với code cũ
 * @deprecated Sử dụng callBackendApi thay thế
 */
export const callBackendWithAuth = callBackendApi;

