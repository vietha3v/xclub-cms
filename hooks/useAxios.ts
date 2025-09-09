import { makeUseAxios } from 'axios-hooks';
import axiosInstance from '@/lib/axios';

// Tạo instance useAxios với axiosInstance đã có token interceptor
const useAxios = makeUseAxios({
  axios: axiosInstance
  // Không set cache để sử dụng default cache behavior
});

export default useAxios;