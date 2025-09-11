'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import useAxios from '@/hooks/useAxios';
import { tokenManager } from '@/lib/api';
import { useToast } from '@/components/Toast';

// Schema validation
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Vui lòng nhập email hoặc username'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [{ data: loginData, loading: loginLoading, error: loginError }, executeLogin] = useAxios(
    '/api/auth/login',
    { manual: true }
  );

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      const { data: response } = await executeLogin({
        method: 'POST',
        data: {
          emailOrUsername: data.emailOrUsername,
          password: data.password,
        },
      });

      if (response.access_token && response.refresh_token) {
        // Lưu token bằng tokenManager
        tokenManager.saveTokens(response.access_token, response.refresh_token, data.rememberMe);

        // Tạo Next Auth session bằng cách gọi signIn với credentials
        const nextAuthResult = await signIn('credentials', {
          emailOrUsername: data.emailOrUsername,
          password: data.password,
          redirect: false,
        });

        if (nextAuthResult?.error) {
          console.error('Next Auth session creation failed:', nextAuthResult.error);
          // Vẫn redirect vì đã đăng nhập thành công qua API
        }

        showToast({
          type: 'success',
          message: 'Đăng nhập thành công!',
          title: 'Chào mừng'
        });

        // Đăng nhập thành công
        router.push('/dashboard');
      } else {
        setError('Đăng nhập thất bại');
      }
    } catch (error: unknown) {
      let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status: number } };
        if (axiosError.response?.status === 401) {
          errorMessage = 'Email hoặc mật khẩu không đúng';
        } else if (axiosError.response?.status === 429) {
          errorMessage = 'Quá nhiều lần thử, vui lòng chờ';
        } else if (axiosError.response?.status === 500) {
          errorMessage = 'Lỗi server, vui lòng thử lại sau';
        } else {
          errorMessage = 'Có lỗi xảy ra, vui lòng thử lại';
        }
      }
      
      setError(errorMessage);
      showToast({
        type: 'error',
        message: errorMessage,
        title: 'Lỗi đăng nhập'
      });
    }
  };

  // OAuth handlers
  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google OAuth sign in failed:', error);
      setError('Đăng nhập Google thất bại');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signIn('facebook', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Facebook OAuth sign in failed:', error);
      setError('Đăng nhập Facebook thất bại');
    }
  };



  return (
    <div className="w-full">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 border border-base-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Đăng nhập
          </h2>
          <p className="text-base-content/70">
            Chào mừng bạn trở lại với X-Club
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loginLoading}
            className="btn btn-outline w-full gap-3 hover:bg-base-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng nhập với Google
          </button>

          <button
            onClick={handleFacebookSignIn}
            disabled={loginLoading}
            className="btn btn-outline w-full gap-3 hover:bg-base-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Đăng nhập với Facebook
          </button>
        </div>

        <div className="divider">hoặc</div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="alert alert-error">
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

          <div>
            <label className="label">
              <span className="label-text">Email hoặc Username</span>
            </label>
            <input
              {...register('emailOrUsername')}
              type="text"
              placeholder="Nhập email hoặc username"
              className={`input input-bordered w-full ${
                errors.emailOrUsername ? 'input-error' : ''
              }`}
            />
            {errors.emailOrUsername && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.emailOrUsername.message}
                </span>
              </label>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Mật khẩu</span>
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
          </div>

          <div className="flex items-center justify-between">
            <label className="label cursor-pointer gap-3">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">Ghi nhớ đăng nhập</span>
            </label>
            <a href="/auth/forgot-password" className="link link-primary text-sm">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="btn btn-primary w-full"
          >
            {loginLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-base-content/70">
            Chưa có tài khoản?{' '}
            <a href="/auth/register" className="link link-primary font-medium">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
