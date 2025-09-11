'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') ?? null;

  useEffect(() => {
    console.log('🚨 Error Page - NextAuth Error:', {
      error,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Lỗi cấu hình NextAuth',
          message: 'Có vấn đề với cấu hình NextAuth. Vui lòng kiểm tra environment variables.',
          details: 'Thiếu NEXTAUTH_URL hoặc NEXTAUTH_SECRET'
        };
      case 'AccessDenied':
        return {
          title: 'Truy cập bị từ chối',
          message: 'Bạn không có quyền truy cập vào tài nguyên này.',
          details: 'Vui lòng liên hệ quản trị viên'
        };
      case 'Verification':
        return {
          title: 'Lỗi xác thực',
          message: 'Token xác thực không hợp lệ hoặc đã hết hạn.',
          details: 'Vui lòng đăng nhập lại'
        };
      default:
        return {
          title: 'Lỗi không xác định',
          message: 'Đã xảy ra lỗi không xác định.',
          details: error || 'Không có thông tin lỗi'
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-error">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-base-content">
            {errorInfo.title}
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            {errorInfo.message}
          </p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-lg p-6 border border-base-300">
          <div className="alert alert-error mb-4">
            <div>
              <h3 className="font-bold">Chi tiết lỗi:</h3>
              <div className="text-xs">{errorInfo.details}</div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/login" className="btn btn-primary w-full">
              Thử đăng nhập lại
            </Link>
            
            <Link href="/" className="btn btn-outline w-full">
              Về trang chủ
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-base-content/70 text-sm">
              Nếu lỗi vẫn tiếp tục, vui lòng liên hệ hỗ trợ kỹ thuật.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
