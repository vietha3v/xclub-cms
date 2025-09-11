'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2 sm:mb-4">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-base-content/70 max-w-2xl mx-auto">
            Chào mừng bạn đến với X-Club Dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="stats shadow bg-base-100 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="stat p-3 sm:p-4">
              <div className="stat-figure text-primary">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-title text-xs sm:text-sm">Tổng km</div>
              <div className="stat-value text-primary text-lg sm:text-2xl lg:text-3xl">156</div>
              <div className="stat-desc text-xs sm:text-sm">Trong tháng này</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="stat p-3 sm:p-4">
              <div className="stat-figure text-secondary">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-title text-xs sm:text-sm">Sự kiện</div>
              <div className="stat-value text-secondary text-lg sm:text-2xl lg:text-3xl">8</div>
              <div className="stat-desc text-xs sm:text-sm">Đã tham gia</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="stat p-3 sm:p-4">
              <div className="stat-figure text-accent">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="stat-title text-xs sm:text-sm">Thử thách</div>
              <div className="stat-value text-accent text-lg sm:text-2xl lg:text-3xl">12</div>
              <div className="stat-desc text-xs sm:text-sm">Đang thực hiện</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="stat p-3 sm:p-4">
              <div className="stat-figure text-success">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-title text-xs sm:text-sm">CLB</div>
              <div className="stat-value text-success text-lg sm:text-2xl lg:text-3xl">3</div>
              <div className="stat-desc text-xs sm:text-sm">Đang tham gia</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Link href="/activities" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="card-body text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">🏃‍♂️</div>
              <h3 className="card-title justify-center text-sm sm:text-base lg:text-lg">Ghi nhận hoạt động</h3>
              <p className="text-xs sm:text-sm text-base-content/70">Ghi lại quá trình tập luyện</p>
            </div>
          </Link>

          <Link href="/events" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="card-body text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">🎯</div>
              <h3 className="card-title justify-center text-sm sm:text-base lg:text-lg">Đăng ký sự kiện</h3>
              <p className="text-xs sm:text-sm text-base-content/70">Tham gia giải chạy mới</p>
            </div>
          </Link>

          <Link href="/challenges" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="card-body text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">🏆</div>
              <h3 className="card-title justify-center text-sm sm:text-base lg:text-lg">Thử thách</h3>
              <p className="text-xs sm:text-sm text-base-content/70">Tham gia thử thách mới</p>
            </div>
          </Link>

          <Link href="/clubs" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="card-body text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">👥</div>
              <h3 className="card-title justify-center text-sm sm:text-base lg:text-lg">Tìm CLB</h3>
              <p className="text-xs sm:text-sm text-base-content/70">Khám phá câu lạc bộ mới</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title mb-4 text-lg sm:text-xl">Hoạt động gần đây</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">Chạy 5km tại công viên</p>
                  <p className="text-xs sm:text-sm text-base-content/70">Hôm nay - 25:30 min</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">Đăng ký giải chạy 10km</p>
                  <p className="text-xs sm:text-sm text-base-content/70">Hôm qua - Giải chạy mùa xuân</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">Hoàn thành thử thách 30 ngày</p>
                  <p className="text-xs sm:text-sm text-base-content/70">2 ngày trước - 150km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
