'use client';

import React, { useState, useEffect } from 'react';
import { ActivityStats as Stats } from '@/types/activity';
import { activityUtils } from '@/utils/activityUtils';
import axiosInstance from '@/lib/axios';

interface ActivityStatsProps {
  period?: 'week' | 'month' | 'year' | 'all';
  className?: string;
}

export default function ActivityStats({ period = 'all', className = '' }: ActivityStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
      
      const statsData = startDate && endDate 
        ? await axiosInstance.get(`/api/activities/stats?startDate=${startDate}&endDate=${endDate}`)
        : await axiosInstance.get('/api/activities/stats');
        
      setStats(statsData.data);
    } catch (err: any) {
      setError('Không thể tải thống kê');
      console.error('Load stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat bg-base-200 animate-pulse">
            <div className="stat-title h-4 bg-base-300 rounded"></div>
            <div className="stat-value h-8 bg-base-300 rounded mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={`alert alert-error ${className}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error || 'Không có dữ liệu thống kê'}</span>
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
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-base-content mb-2">
          📊 Thống kê hoạt động
        </h3>
        <p className="text-base-content/70">{getPeriodLabel()}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-primary/10 rounded-lg">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="stat-title">Tổng hoạt động</div>
          <div className="stat-value text-primary">{stats.totalActivities}</div>
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
            {activityUtils.formatDistance(stats.totalDistance)}
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
            {activityUtils.formatDuration(stats.totalDuration)}
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
            {activityUtils.formatCalories(stats.totalCalories)}
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
                <span className="font-medium">{activityUtils.formatPace(stats.averagePace)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Tốc độ trung bình:</span>
                <span className="font-medium">{activityUtils.formatSpeed(stats.averageSpeed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Nhịp tim TB:</span>
                <span className="font-medium">{activityUtils.formatHeartRate(stats.averageHeartRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Độ cao tích lũy:</span>
                <span className="font-medium">{activityUtils.formatElevation(stats.totalElevationGain)}</span>
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
                <span className="font-medium">{activityUtils.formatDistance(stats.longestDistance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Thời gian dài nhất:</span>
                <span className="font-medium">{activityUtils.formatDuration(stats.longestDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Pace nhanh nhất:</span>
                <span className="font-medium">{activityUtils.formatPace(stats.fastestPace)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Calories nhiều nhất:</span>
                <span className="font-medium">{activityUtils.formatCalories(stats.mostCalories)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities by Type */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-lg">📈 Hoạt động theo loại</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.activitiesByType).map(([type, count]) => (
              <div key={type} className="text-center">
                <div className="text-2xl mb-1">{activityUtils.getActivityIcon(type)}</div>
                <div className="text-sm text-base-content/70">{activityUtils.getActivityName(type)}</div>
                <div className="font-semibold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
