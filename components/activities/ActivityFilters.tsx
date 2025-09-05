'use client';

import React from 'react';
import { ActivityFilters as Filters, ActivityType, ActivityStatus } from '@/types/activity';

interface ActivityFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
}

export default function ActivityFilters({ filters, onFilterChange }: ActivityFiltersProps) {
  const activityTypes = [
    { value: '', label: 'Tất cả loại' },
    { value: ActivityType.RUNNING, label: '🏃‍♂️ Chạy bộ' },
    { value: ActivityType.CYCLING, label: '🚴‍♂️ Đạp xe' },
    { value: ActivityType.SWIMMING, label: '🏊‍♂️ Bơi lội' },
    { value: ActivityType.WALKING, label: '🚶‍♂️ Đi bộ' },
    { value: ActivityType.HIKING, label: '🥾 Leo núi' },
    { value: ActivityType.YOGA, label: '🧘‍♀️ Yoga' },
    { value: ActivityType.GYM, label: '💪 Tập gym' },
    { value: ActivityType.OTHER, label: '🏃‍♀️ Khác' },
  ];

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: ActivityStatus.SYNCED, label: 'Đã đồng bộ' },
    { value: ActivityStatus.PENDING, label: 'Chờ đồng bộ' },
    { value: ActivityStatus.FAILED, label: 'Lỗi đồng bộ' },
    { value: ActivityStatus.MANUAL, label: 'Thủ công' },
  ];

  const sourceOptions = [
    { value: '', label: 'Tất cả nguồn' },
    { value: 'strava', label: 'Strava' },
    { value: 'garmin', label: 'Garmin' },
    { value: 'apple_health', label: 'Apple Health' },
    { value: 'google_fit', label: 'Google Fit' },
    { value: 'manual', label: 'Thủ công' },
  ];

  const sortOptions = [
    { value: 'startTime', label: 'Thời gian' },
    { value: 'distance', label: 'Khoảng cách' },
    { value: 'duration', label: 'Thời lượng' },
    { value: 'calories', label: 'Calories' },
    { value: 'createdAt', label: 'Ngày tạo' },
  ];

  const handleInputChange = (field: keyof Filters, value: any) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
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
    });
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Bộ lọc</h3>
        <button
          onClick={clearFilters}
          className="btn btn-ghost btn-sm"
        >
          Xóa bộ lọc
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Loại hoạt động */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Loại hoạt động</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value as ActivityType | '')}
          >
            {activityTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Trạng thái */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Trạng thái</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value as ActivityStatus | '')}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nguồn dữ liệu */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nguồn dữ liệu</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={filters.source}
            onChange={(e) => handleInputChange('source', e.target.value)}
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Khoảng thời gian */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Từ ngày</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-sm"
            value={filters.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Đến ngày</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-sm"
            value={filters.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>

        {/* Khoảng cách */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Khoảng cách tối thiểu (km)</span>
          </label>
          <input
            type="number"
            className="input input-bordered input-sm"
            placeholder="0"
            value={filters.minDistance || ''}
            onChange={(e) => handleInputChange('minDistance', e.target.value ? parseFloat(e.target.value) : '')}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Khoảng cách tối đa (km)</span>
          </label>
          <input
            type="number"
            className="input input-bordered input-sm"
            placeholder="100"
            value={filters.maxDistance || ''}
            onChange={(e) => handleInputChange('maxDistance', e.target.value ? parseFloat(e.target.value) : '')}
          />
        </div>

        {/* Thời lượng */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Thời lượng tối thiểu (phút)</span>
          </label>
          <input
            type="number"
            className="input input-bordered input-sm"
            placeholder="0"
            value={filters.minDuration || ''}
            onChange={(e) => handleInputChange('minDuration', e.target.value ? parseInt(e.target.value) * 60 : '')}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thời lượng tối đa (phút)</span>
          </label>
          <input
            type="number"
            className="input input-bordered input-sm"
            placeholder="180"
            value={filters.maxDuration || ''}
            onChange={(e) => handleInputChange('maxDuration', e.target.value ? parseInt(e.target.value) * 60 : '')}
          />
        </div>

        {/* Sắp xếp */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sắp xếp theo</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value as any)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thứ tự</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={filters.sortOrder}
            onChange={(e) => handleInputChange('sortOrder', e.target.value as 'ASC' | 'DESC')}
          >
            <option value="DESC">Giảm dần</option>
            <option value="ASC">Tăng dần</option>
          </select>
        </div>
      </div>
    </div>
  );
}
