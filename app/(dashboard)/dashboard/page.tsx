'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Chào mừng bạn đến với X-Club Dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-title">Tổng km</div>
              <div className="stat-value text-primary">156</div>
              <div className="stat-desc">Trong tháng này</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-title">Sự kiện</div>
              <div className="stat-value text-secondary">8</div>
              <div className="stat-desc">Đã tham gia</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="stat-title">Thử thách</div>
              <div className="stat-value text-accent">12</div>
              <div className="stat-desc">Đang thực hiện</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-figure text-success">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-title">CLB</div>
              <div className="stat-value text-success">3</div>
              <div className="stat-desc">Đang tham gia</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/activities" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🏃‍♂️</div>
              <h3 className="card-title justify-center">Ghi nhận hoạt động</h3>
              <p className="text-sm text-base-content/70">Ghi lại quá trình tập luyện</p>
            </div>
          </Link>

          <Link href="/events" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="card-title justify-center">Đăng ký sự kiện</h3>
              <p className="text-sm text-base-content/70">Tham gia giải chạy mới</p>
            </div>
          </Link>

          <Link href="/challenges" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="card-title justify-center">Thử thách</h3>
              <p className="text-sm text-base-content/70">Tham gia thử thách mới</p>
            </div>
          </Link>

          <Link href="/clubs" className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="card-title justify-center">Tìm CLB</h3>
              <p className="text-sm text-base-content/70">Khám phá câu lạc bộ mới</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Chạy 5km tại công viên</p>
                  <p className="text-sm text-base-content/70">Hôm nay - 25:30 min</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Đăng ký giải chạy 10km</p>
                  <p className="text-sm text-base-content/70">Hôm qua - Giải chạy mùa xuân</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Hoàn thành thử thách 30 ngày</p>
                  <p className="text-sm text-base-content/70">2 ngày trước - 150km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
