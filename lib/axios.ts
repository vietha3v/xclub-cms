import axios from 'axios';
import { tokenManager } from './api';
import { updateTokenCookies, redirectToLogin } from './backend-api';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: '', // Gọi qua Next.js API routes, không gọi trực tiếp BE
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ tokenManager
    if (typeof window !== 'undefined') {
      const token = tokenManager.getAccessToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi và refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401, middleware đã xử lý refresh token
    // Chỉ cần redirect về login nếu vẫn lỗi
    if (error.response?.status === 401) {
      console.log('Authentication failed, redirecting to login...');
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
