import { makeUseAxios } from 'axios-hooks';
import axiosInstance from '@/lib/axios';

// Tạo instance useAxios với axiosInstance đã có token interceptor
const useAxios = makeUseAxios({
  axios: axiosInstance,
  cache: false // Bật cache để tối ưu performance
});

export default useAxios;