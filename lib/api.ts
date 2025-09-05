import axiosInstance from './axios';
import axios from 'axios';

// API Endpoints - Sử dụng Next.js API routes
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    PROFILE: '/api/auth/profile',
    LOGOUT: '/api/auth/logout',
    OAUTH_CALLBACK: '/api/auth/oauth/callback',
    SESSION: '/api/auth/session',
  },
  RACES: '/api/races',
} as const;

// Types
export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  referralCode?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string;
    roles: string[];
    provider: string;
  };
}

// Auth API functions
export const authAPI = {
  // Đăng nhập
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  // Đăng ký
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  // Refresh token
  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH, { refresh_token: refreshToken });
    return response.data;
  },

  // Quên mật khẩu
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Đặt lại mật khẩu
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
    return response.data;
  },

  // Lấy thông tin profile
  getProfile: async (): Promise<{ user: any }> => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Đăng xuất
  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  // OAuth callback
  oauthCallback: async (provider: string, profile: any): Promise<AuthResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.OAUTH_CALLBACK, { provider, profile });
    return response.data;
  },

  // Kiểm tra session
  checkSession: async (accessToken: string): Promise<{ user: any; expires: string }> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SESSION, { access_token: accessToken });
    return response.data;
  },
};

// Token management
export const tokenManager = {
  // Lưu token vào cookies
  saveTokens: (accessToken: string, refreshToken: string, rememberMe: boolean = false) => {
    // Lưu access token (15 phút)
    const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    document.cookie = `access_token=${accessToken}; expires=${accessTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
    
    // Lưu refresh token (7 ngày)
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = `refresh_token=${refreshToken}; expires=${refreshTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
    
    // Vẫn lưu vào localStorage/sessionStorage để axiosInstance có thể đọc
    if (rememberMe) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', refreshToken);
    }
  },

  // Lấy access token từ cookies hoặc storage
  getAccessToken: (): string | null => {
    // Thử lấy từ cookies trước
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
    if (accessTokenCookie) {
      return accessTokenCookie.split('=')[1];
    }
    
    // Fallback về localStorage/sessionStorage
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  },

  // Lấy refresh token từ cookies hoặc storage
  getRefreshToken: (): string | null => {
    // Thử lấy từ cookies trước
    const cookies = document.cookie.split(';');
    const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('refresh_token='));
    if (refreshTokenCookie) {
      return refreshTokenCookie.split('=')[1];
    }
    
    // Fallback về localStorage/sessionStorage
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  },

  // Xóa token
  clearTokens: () => {
    // Xóa cookies
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Xóa localStorage/sessionStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  },

  // Kiểm tra có token không
  hasToken: (): boolean => {
    return !!(this.getAccessToken());
  },

  // Kiểm tra token hết hạn
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};
