'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { useToast } from '@/components/Toast';
import { AlertCircle, Chrome, Facebook, LogIn } from 'lucide-react';

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

  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setIsLoading(true);

    try {
      // Sử dụng NextAuth signIn trực tiếp
      const result = await signIn('credentials', {
        emailOrUsername: data.emailOrUsername,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email/username hoặc mật khẩu không đúng');
        return;
      }

      if (result?.ok) {
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
      console.error('Login error:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth handlers
  const handleGoogleSignIn = async () => {
    setLoadingProvider('google');
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google OAuth sign in failed:', error);
      setError('Đăng nhập Google thất bại');
      setLoadingProvider(null);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoadingProvider('facebook');
    try {
      await signIn('facebook', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Facebook OAuth sign in failed:', error);
      setError('Đăng nhập Facebook thất bại');
      setLoadingProvider(null);
    }
  };



  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-base-100 shadow-xl rounded-lg p-6 border border-base-300 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-700 delay-150">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">
            Đăng nhập
          </h2>
          <p className="text-sm sm:text-base text-base-content/70">
            Chào mừng bạn trở lại với X-Club
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6 animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-300">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || loadingProvider !== null}
            className="btn btn-outline w-full gap-3 hover:bg-base-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'google' ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Chrome className="w-5 h-5" />
            )}
            Đăng nhập với Google
          </button>

          <button
            onClick={handleFacebookSignIn}
            disabled={isLoading || loadingProvider !== null}
            className="btn btn-outline w-full gap-3 hover:bg-base-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'facebook' ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Facebook className="w-5 h-5" />
            )}
            Đăng nhập với Facebook
          </button>
        </div>

        <div className="divider animate-in fade-in-50 duration-700 delay-500">hoặc</div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-700">
          {error && (
            <div className="alert alert-error animate-in fade-in-50 slide-in-from-top-2 duration-300">
              <AlertCircle className="h-6 w-6" />
              <span>{error}</span>
            </div>
          )}

          <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-900">
            <label className="label">
              <span className="label-text text-sm sm:text-base">Email hoặc Username</span>
            </label>
            <input
              {...register('emailOrUsername')}
              type="text"
              placeholder="Nhập email hoặc username"
              className={`input input-bordered w-full transition-all duration-200 focus:scale-[1.02] focus:shadow-md ${
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

          <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-1100">
            <label className="label">
              <span className="label-text text-sm sm:text-base">Mật khẩu</span>
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="Nhập mật khẩu"
              className={`input input-bordered w-full transition-all duration-200 focus:scale-[1.02] focus:shadow-md ${
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-1300">
            <label className="label cursor-pointer gap-3">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm transition-all duration-200 hover:scale-110"
              />
              <span className="label-text text-sm sm:text-base">Ghi nhớ đăng nhập</span>
            </label>
            <a href="/auth/forgot-password" className="link link-primary text-sm transition-all duration-200 hover:scale-105">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading || loadingProvider !== null}
            className="btn btn-primary w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-1500"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-1700">
          <p className="text-sm sm:text-base text-base-content/70">
            Chưa có tài khoản?{' '}
            <a href="/register" className="link link-primary font-medium transition-all duration-200 hover:scale-105">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
