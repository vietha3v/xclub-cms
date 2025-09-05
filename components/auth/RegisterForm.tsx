'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

// Schema validation
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username phải có ít nhất 3 ký tự')
    .max(20, 'Username không được quá 20 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username chỉ được chứa chữ cái, số và dấu gạch dưới'),
  email: z.string().email('Email không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Mật khẩu phải chứa chữ hoa, chữ thường và số'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'Vui lòng nhập tên'),
  lastName: z.string().min(1, 'Vui lòng nhập họ'),
  phoneNumber: z.string().optional(),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [{ loading }, executeRegister] = useAxios({
    url: '/api/auth/register',
    method: 'POST'
  }, { manual: true });

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    setSuccess('');

    try {
      await executeRegister({ data });
      
      showToast({
        type: 'success',
        message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.',
        title: 'Thành công'
      });
      
      // Reset form
      reset();
      
      // Redirect sau 2 giây
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      
    } catch (error: any) {
      let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại';
      
      if (error.response?.status === 409) {
        errorMessage = 'Email hoặc username đã được sử dụng';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      showToast({
        type: 'error',
        message: errorMessage,
        title: 'Lỗi đăng ký'
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Đăng ký tài khoản
          </h2>
          <p className="text-base-content/70">
            Tham gia X-Club để kết nối với cộng đồng chạy bộ
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text">Tên *</span>
              </label>
              <input
                {...register('firstName')}
                type="text"
                placeholder="Nhập tên"
                className={`input input-bordered w-full ${
                  errors.firstName ? 'input-error' : ''
                }`}
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Họ *</span>
              </label>
              <input
                {...register('lastName')}
                type="text"
                placeholder="Nhập họ"
                className={`input input-bordered w-full ${
                  errors.lastName ? 'input-error' : ''
                }`}
              />
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastName.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Username và Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text">Username *</span>
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="Nhập username"
                className={`input input-bordered w-full ${
                  errors.username ? 'input-error' : ''
                }`}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.username.message}
                  </span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email *</span>
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="Nhập email"
                className={`input input-bordered w-full ${
                  errors.email ? 'input-error' : ''
                }`}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text">Mật khẩu *</span>
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Nhập mật khẩu"
                className={`input input-bordered w-full ${
                  errors.password ? 'input-error' : ''
                }`}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Mật khẩu phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường và số
                </span>
              </label>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Xác nhận mật khẩu *</span>
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={`input input-bordered w-full ${
                  errors.confirmPassword ? 'input-error' : ''
                }`}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text">Số điện thoại</span>
              </label>
              <input
                {...register('phoneNumber')}
                type="tel"
                placeholder="Nhập số điện thoại"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Mã giới thiệu</span>
              </label>
              <input
                {...register('referralCode')}
                type="text"
                placeholder="Nhập mã giới thiệu (nếu có)"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-base-content/70">
            Đã có tài khoản?{' '}
            <a href="/auth/login" className="link link-primary font-medium">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
