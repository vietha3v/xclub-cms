'use client';

import React, { useEffect } from 'react';
import { ActivityStats as Stats } from '@/types/activity';
import { activityUtils } from '@/utils/activityUtils';
import useAxios from '@/hooks/useAxios';
import dlv from 'dlv';
import { ActivityStatsSkeleton } from '@/components/common/LoadingSkeleton';

interface ActivityStatsProps {
  period?: 'week' | 'month' | 'year' | 'all';
  className?: string;
}

export default function ActivityStats({ period = 'all', className = '' }: ActivityStatsProps) {
  // Build query parameters
  let startDate: string | undefined;
  let endDate: string | undefined;
  
  if (period !== 'all') {
    const now = new Date();
    endDate = now.toISOString();
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1).toISOString();
        break;
    }
  }
  
  const params = new URLSearchParams();
  params.append('source', 'strava'); // Mặc định lấy từ Strava
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const queryString = params.toString();
  const url = `/api/activities/stats?${queryString}`;

  const [{ data: stats, loading, error: apiError }, refetch] = useAxios<Stats>(url, { manual: true });

  useEffect(() => {
    refetch();
  }, [period]);

  if (loading) {
    return <ActivityStatsSkeleton className={className} />;
  }

  if (apiError || !stats) {
    return (
      <div className={`alert alert-error ${className}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{apiError?.message || 'Không có dữ liệu thống kê'}</span>
      </div>
    );
  }

  const getPeriodLabel = () => {
    switch (period) {
      case 'week': return 'Tuần này';
      case 'month': return 'Tháng này';
      case 'year': return 'Năm nay';
      default: return 'Tổng cộng';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-primary/10 rounded-lg">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-title">Tổng hoạt động</div>
          <div className="stat-value text-primary">{dlv(stats, 'totalActivities', 0)}</div>
          <div className="stat-desc">lần chạy</div>
        </div>

        <div className="stat bg-secondary/10 rounded-lg">
          <div className="stat-figure text-secondary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="stat-title">Tổng quãng đường</div>
          <div className="stat-value text-secondary">
            {activityUtils.formatDistance(dlv(stats, 'totalDistance', 0))}
          </div>
          <div className="stat-desc">đã chạy</div>
        </div>

        <div className="stat bg-accent/10 rounded-lg">
          <div className="stat-figure text-accent">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title">Tổng thời gian</div>
          <div className="stat-value text-accent">
            {activityUtils.formatDuration(dlv(stats, 'totalDuration', 0))}
          </div>
          <div className="stat-desc">tập luyện</div>
        </div>

        <div className="stat bg-success/10 rounded-lg">
          <div className="stat-figure text-success">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="stat-title">Tổng calories</div>
          <div className="stat-value text-success">
            {activityUtils.formatCalories(dlv(stats, 'totalCalories', 0))}
          </div>
          <div className="stat-desc">đã đốt</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Stats */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-lg">🏃‍♂️ Hiệu suất</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-base-content/70">Pace trung bình:</span>
                <span className="font-medium">{activityUtils.formatPace(dlv(stats, 'averagePace'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Tốc độ trung bình:</span>
                <span className="font-medium">{activityUtils.formatSpeed(dlv(stats, 'averageSpeed'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Nhịp tim TB:</span>
                <span className="font-medium">{activityUtils.formatHeartRate(dlv(stats, 'averageHeartRate'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Độ cao tích lũy:</span>
                <span className="font-medium">{activityUtils.formatElevation(dlv(stats, 'totalElevationGain'))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-lg">🏆 Kỷ lục</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-base-content/70">Quãng đường dài nhất:</span>
                <span className="font-medium">{activityUtils.formatDistance(dlv(stats, 'longestDistance'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Thời gian dài nhất:</span>
                <span className="font-medium">{activityUtils.formatDuration(dlv(stats, 'longestDuration'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Pace nhanh nhất:</span>
                <span className="font-medium">{activityUtils.formatPace(dlv(stats, 'fastestPace'))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Calories nhiều nhất:</span>
                <span className="font-medium">{activityUtils.formatCalories(dlv(stats, 'mostCalories'))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities by Type - Enhanced with Strava data */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-lg">📈 Hoạt động theo loại</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(dlv(stats, 'activitiesByType', {})).map(([type, data]: [string, any]) => (
              <div key={type} className="card bg-base-200 shadow-sm">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{activityUtils.getActivityIcon(type as any)}</div>
                    <div className="text-right">
                      <div className="text-sm text-base-content/70">{activityUtils.getActivityName(type as any)}</div>
                      <div className="text-2xl font-bold">{dlv(data, 'count', 0)}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Quãng đường:</span>
                      <span className="font-medium">{activityUtils.formatDistance(dlv(data, 'distance', 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thời gian:</span>
                      <span className="font-medium">{activityUtils.formatDuration(dlv(data, 'duration', 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{activityUtils.formatCalories(dlv(data, 'calories', 0))}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent vs YTD Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Stats */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-lg">📅 Thống kê gần đây</h4>
            <div className="space-y-3">
              {Object.entries(dlv(stats, 'recentStats', {})).map(([type, data]: [string, any]) => (
                <div key={type} className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{activityUtils.getActivityIcon(type as any)}</span>
                    <span className="text-sm">{activityUtils.getActivityName(type as any)}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{dlv(data, 'count', 0)}</div>
                    <div className="text-xs text-base-content/70">
                      {activityUtils.formatDistance(dlv(data, 'distance', 0))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YTD Stats */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-lg">📊 Năm nay (YTD)</h4>
            <div className="space-y-3">
              {Object.entries(dlv(stats, 'ytdStats', {})).map(([type, data]: [string, any]) => (
                <div key={type} className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{activityUtils.getActivityIcon(type as any)}</span>
                    <span className="text-sm">{activityUtils.getActivityName(type as any)}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{dlv(data, 'count', 0)}</div>
                    <div className="text-xs text-base-content/70">
                      {activityUtils.formatDistance(dlv(data, 'distance', 0))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Club & Challenge Stats */}
      {dlv(stats, 'clubStats') && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-lg">🏆 Thống kê CLB & Thử thách</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat bg-primary/10 rounded-lg">
                <div className="stat-title">Hoạt động CLB</div>
                <div className="stat-value text-primary">{dlv(stats, 'clubStats.clubActivities', 0)}</div>
              </div>
              <div className="stat bg-secondary/10 rounded-lg">
                <div className="stat-title">Tham gia sự kiện</div>
                <div className="stat-value text-secondary">{dlv(stats, 'clubStats.eventParticipations', 0)}</div>
              </div>
              <div className="stat bg-accent/10 rounded-lg">
                <div className="stat-title">Hoàn thành thử thách</div>
                <div className="stat-value text-accent">{dlv(stats, 'clubStats.challengeCompletions', 0)}</div>
              </div>
              <div className="stat bg-success/10 rounded-lg">
                <div className="stat-title">Tham gia giải đấu</div>
                <div className="stat-value text-success">{dlv(stats, 'clubStats.raceParticipations', 0)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Source Info */}
      <div className="text-center text-sm text-base-content/50">
        <p>📡 Dữ liệu từ {dlv(stats, 'source') === 'strava' ? 'Strava API' : 'Database nội bộ'}</p>
        {dlv(stats, 'source') === 'strava' && (
          <p className="mt-1">✨ Tận dụng tối đa thống kê từ Strava</p>
        )}
      </div>
    </div>
  );
}
