'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface SystemStats {
  totalUsers: number;
  totalClubs: number;
  totalEvents: number;
  totalChallenges: number;
  totalRaces: number;
  activeEvents: number;
  activeChallenges: number;
  activeRaces: number;
  totalParticipants: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalClubs: 0,
    totalEvents: 0,
    totalChallenges: 0,
    totalRaces: 0,
    activeEvents: 0,
    activeChallenges: 0,
    activeRaces: 0,
    totalParticipants: 0,
  });
  const [loading, setLoading] = useState(true);

  const [{ data: usersData }, refetchUsers] = useAxios<{ total: number }>('/api/users?limit=1');
  const [{ data: clubsData }, refetchClubs] = useAxios<{ total: number }>('/api/clubs?limit=1');
  const [{ data: eventsData }, refetchEvents] = useAxios<{ total: number }>('/api/events?limit=1');
  const [{ data: challengesData }, refetchChallenges] = useAxios<{ total: number }>('/api/challenges?limit=1');
  const [{ data: racesData }, refetchRaces] = useAxios<{ total: number }>('/api/races?limit=1');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await Promise.all([
          refetchUsers(),
          refetchClubs(),
          refetchEvents(),
          refetchChallenges(),
          refetchRaces(),
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (usersData || clubsData || eventsData || challengesData || racesData) {
      setStats({
        totalUsers: usersData?.total || 0,
        totalClubs: clubsData?.total || 0,
        totalEvents: eventsData?.total || 0,
        totalChallenges: challengesData?.total || 0,
        totalRaces: racesData?.total || 0,
        activeEvents: 0, // TODO: Fetch from API
        activeChallenges: 0, // TODO: Fetch from API
        activeRaces: 0, // TODO: Fetch from API
        totalParticipants: 0, // TODO: Calculate from all participants
      });
    }
  }, [usersData, clubsData, eventsData, challengesData, racesData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-lg animate-pulse">
              <div className="card-body">
                <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">📊 Tổng quan hệ thống</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stats shadow bg-primary text-primary-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">👥</div>
                </div>
                <div className="stat-title">Tổng người dùng</div>
                <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
                <div className="stat-desc">Đã đăng ký</div>
              </div>
            </div>

            <div className="stats shadow bg-secondary text-secondary-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">🏃‍♂️</div>
                </div>
                <div className="stat-title">Câu lạc bộ</div>
                <div className="stat-value">{stats.totalClubs.toLocaleString()}</div>
                <div className="stat-desc">Đang hoạt động</div>
              </div>
            </div>

            <div className="stats shadow bg-accent text-accent-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">🎯</div>
                </div>
                <div className="stat-title">Sự kiện</div>
                <div className="stat-value">{stats.totalEvents.toLocaleString()}</div>
                <div className="stat-desc">Tổng số sự kiện</div>
              </div>
            </div>

            <div className="stats shadow bg-info text-info-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">🏆</div>
                </div>
                <div className="stat-title">Thử thách</div>
                <div className="stat-value">{stats.totalChallenges.toLocaleString()}</div>
                <div className="stat-desc">Tổng số thử thách</div>
              </div>
            </div>

            <div className="stats shadow bg-success text-success-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">🏁</div>
                </div>
                <div className="stat-title">Giải chạy</div>
                <div className="stat-value">{stats.totalRaces.toLocaleString()}</div>
                <div className="stat-desc">Tổng số giải chạy</div>
              </div>
            </div>

            <div className="stats shadow bg-warning text-warning-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">🔥</div>
                </div>
                <div className="stat-title">Đang diễn ra</div>
                <div className="stat-value">{stats.activeEvents + stats.activeChallenges + stats.activeRaces}</div>
                <div className="stat-desc">Sự kiện/Thử thách/Giải chạy</div>
              </div>
            </div>

            <div className="stats shadow bg-error text-error-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">📈</div>
                </div>
                <div className="stat-title">Tham gia</div>
                <div className="stat-value">{stats.totalParticipants.toLocaleString()}</div>
                <div className="stat-desc">Tổng lượt tham gia</div>
              </div>
            </div>

            <div className="stats shadow bg-neutral text-neutral-content">
              <div className="stat">
                <div className="stat-figure">
                  <div className="text-3xl">⚡</div>
                </div>
                <div className="stat-title">Hoạt động</div>
                <div className="stat-value">99.9%</div>
                <div className="stat-desc">Uptime hệ thống</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">📈 Hoạt động gần đây</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="text-2xl">👤</div>
                <div className="flex-1">
                  <div className="font-medium">Người dùng mới đăng ký</div>
                  <div className="text-sm text-base-content/70">5 phút trước</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="text-2xl">🏃‍♂️</div>
                <div className="flex-1">
                  <div className="font-medium">Câu lạc bộ mới được tạo</div>
                  <div className="text-sm text-base-content/70">15 phút trước</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <div className="font-medium">Sự kiện mới được tạo</div>
                  <div className="text-sm text-base-content/70">30 phút trước</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">🔧 Hành động nhanh</h3>
            <div className="space-y-3">
              <button className="btn btn-primary btn-block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tạo sự kiện mới
              </button>
              <button className="btn btn-secondary btn-block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tạo thử thách mới
              </button>
              <button className="btn btn-accent btn-block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tạo giải chạy mới
              </button>
              <button className="btn btn-info btn-block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Xem báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
