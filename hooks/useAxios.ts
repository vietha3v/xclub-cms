import { makeUseAxios } from 'axios-hooks';
import axiosInstance from '@/lib/axios';

// Tạo instance useAxios với axiosInstance đã có token interceptor
const useAxios = makeUseAxios({
  axios: axiosInstance,
  cache: false // Tắt cache để luôn gọi API mới
});

export default useAxios;