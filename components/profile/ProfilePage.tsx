'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Hồ sơ cá nhân
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Xem và quản lý thông tin cá nhân của bạn
          </p>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-info/20 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Sắp ra mắt
          </h2>
          <p className="text-base-content/70 mb-6">
            Trang hồ sơ đang được phát triển. Hãy quay lại sau!
          </p>
          <Link href="/" className="btn btn-info">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
