'use client';

import React, { useState } from 'react';
import { Eraser, ChevronDown, ChevronUp } from 'lucide-react';

interface ClubFiltersProps {
  filters: {
    page: number;
    limit: number;
    search: string;
    type: string;
    status: string;
    city: string;
    state: string;
  };
  onFilterChange: (filters: Partial<typeof filters>) => void;
}

export default function ClubFilters({ filters, onFilterChange }: ClubFiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const types = [
    { value: '', label: 'Tất cả loại' },
    { value: 'running', label: '🏃‍♂️ Chạy bộ' },
    { value: 'marathon', label: '🏃‍♂️ Marathon' },
    { value: 'trail', label: '🥾 Trail running' },
    { value: 'ultra', label: '🏃‍♂️ Ultra marathon' },
    { value: 'sprint', label: '⚡ Sprint' },
    { value: 'relay', label: '🏃‍♂️ Relay' },
    { value: 'cross_country', label: '🌲 Cross country' },
    { value: 'track_field', label: '🏃‍♂️ Track & field' },
  ];

  const cities = [
    { value: '', label: 'Tất cả thành phố' },
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'TP.HCM', label: 'TP.HCM' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    { value: 'Hải Phòng', label: 'Hải Phòng' },
    { value: 'Cần Thơ', label: 'Cần Thơ' },
    { value: 'Nha Trang', label: 'Nha Trang' },
    { value: 'Huế', label: 'Huế' },
    { value: 'Vũng Tàu', label: 'Vũng Tàu' },
    { value: 'Đà Lạt', label: 'Đà Lạt' },
    { value: 'Phú Quốc', label: 'Phú Quốc' },
  ];

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'active', label: '✅ Hoạt động' },
    { value: 'pending', label: '⏳ Chờ duyệt' },
    { value: 'inactive', label: '❌ Không hoạt động' },
    { value: 'suspended', label: '⏸️ Tạm ngưng' },
  ];

  const handleInputChange = (field: keyof typeof filters, value: string | number) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      status: '',
      city: '',
      state: '',
    });
  };

  const hasActiveFilters = filters.type || filters.status || filters.city || filters.state;

  return (
    <div className="bg-base-100 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Bộ lọc</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={clearFilters}
            className="btn btn-ghost btn-sm"
          >
            <Eraser className="w-4 h-4 mr-1" />
            Xóa bộ lọc
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost btn-sm"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Mở rộng
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Thu gọn
              </>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Loại CLB */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Loại CLB</span>
            </label>
            <select
              className="select select-bordered select-md"
              value={filters.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              {types.map((option, index) => (
                <option key={`club-type-${option.value || index}`} value={option.value}>
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
              className="select select-bordered select-md"
              value={filters.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              {statusOptions.map((option, index) => (
                <option key={`status-${option.value || index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Thành phố */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thành phố</span>
            </label>
            <select
              className="select select-bordered select-md"
              value={filters.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            >
              {cities.map((option, index) => (
                <option key={`city-${option.value || index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}