'use client';

import React, { useState, useEffect } from 'react';
import { Activity, QueryActivityDto } from '@/types/activity';
import { activityUtils } from '@/utils/activityUtils';
import ActivityCard from './ActivityCard';
import ActivityFiltersComponent from './ActivityFilters';
import { SyncButton } from '@/components/SyncButton';
import useAxios from '@/hooks/useAxios';

interface ActivityFilters {
  search: string;
  type: string;
  status: string;
  source: string;
  startDate: string;
  endDate: string;
  minDistance: string;
  maxDistance: string;
  minDuration: string;
  maxDuration: string;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}

interface ActivityListProps {
  initialFilters?: Partial<ActivityFilters>;
  showFilters?: boolean;
  compact?: boolean;
  limit?: number;
}

export default function ActivityList({ 
  initialFilters = {}, 
  showFilters = true, 
  compact = false,
  limit = 20 
}: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState<ActivityFilters>({
    search: '',
    type: '',
    status: '',
    source: '',
    startDate: '',
    endDate: '',
    minDistance: '',
    maxDistance: '',
    minDuration: '',
    maxDuration: '',
    sortBy: 'startTime',
    sortOrder: 'DESC',
    ...initialFilters,
  });

  // Build query parameters
  const query: QueryActivityDto = {
    page: currentPage,
    limit,
    search: filters.search || undefined,
    // Convert empty strings to undefined and handle type conversion
    type: filters.type ? filters.type as any : undefined,
    status: filters.status ? filters.status as any : undefined,
    source: filters.source || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
    minDistance: filters.minDistance ? parseFloat(filters.minDistance) : undefined,
    maxDistance: filters.maxDistance ? parseFloat(filters.maxDistance) : undefined,
    minDuration: filters.minDuration ? parseFloat(filters.minDuration) : undefined,
    maxDuration: filters.maxDuration ? parseFloat(filters.maxDuration) : undefined,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
  };

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  
  const queryString = params.toString();
  const url = queryString ? `/api/activities?${queryString}` : '/api/activities';

  const [{ data, loading, error: apiError }, refetch] = useAxios<{
    activities: Activity[];
    total: number;
  }>(url, { manual: true });

  useEffect(() => {
    refetch();
  }, [filters, currentPage]);

  useEffect(() => {
    if (data) {
      setActivities(data.activities);
      setTotal(data.total);
      setError(null);
    }
  }, [data]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách hoạt động');
      console.error('Load activities error:', apiError);
    }
  }, [apiError]);

  const handleFilterChange = (newFilters: Partial<ActivityFilters>) => {
    setFilters((prev: ActivityFilters) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset về trang đầu khi filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (loading && activities.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-4 text-base-content/70">Đang tải hoạt động...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sync Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Hoạt động của bạn</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Đồng bộ hoạt động từ các thiết bị và ứng dụng của bạn
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SyncButton platform="strava" daysBack={7} className="btn-sm">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.13 14.828h4.169"/>
            </svg>
            Strava
          </SyncButton>
          <SyncButton platform="garmin" daysBack={7} className="btn-sm">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Garmin
          </SyncButton>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => window.location.href = '/integrations'}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cài đặt
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <ActivityFiltersComponent 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
          <button 
            onClick={handleRefresh}
            className="btn btn-sm btn-outline"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Activities Grid */}
      {activities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                compact={compact}
              />
            ))}
          </div>

          {/* Pagination */}
          {total > limit && (
            <div className="flex justify-center">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  «
                </button>
                <button className="join-item btn">
                  Trang {currentPage} / {Math.ceil(total / limit)}
                </button>
                <button
                  className="join-item btn"
                  disabled={currentPage >= Math.ceil(total / limit)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="text-center text-sm text-base-content/70">
            Hiển thị {activities.length} / {total} hoạt động
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-base-content/30">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            Chưa có hoạt động nào
          </h3>
          <p className="text-base-content/70 mb-6">
            Hoạt động sẽ được đồng bộ tự động từ Strava, Garmin hoặc các thiết bị khác. 
            Hãy cài đặt tích hợp để bắt đầu đồng bộ dữ liệu.
          </p>
          <div className="bg-base-100 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Kết nối thiết bị của bạn</h4>
              <p className="text-sm text-base-content/70 mb-4">
                Đồng bộ hoạt động từ Strava, Garmin và các ứng dụng khác
              </p>
              <div className="flex flex-col gap-2">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => window.location.href = '/integrations'}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.13 14.828h4.169"/>
                  </svg>
                  Kết nối Strava
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => window.location.href = '/integrations'}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Kết nối Garmin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
