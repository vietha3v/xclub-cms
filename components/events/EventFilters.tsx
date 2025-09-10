'use client';

import React, { useState } from 'react';
import { Eraser, ChevronDown, ChevronUp } from 'lucide-react';
import { EventType, EventStatus, EventVisibility } from '@/types/event';

interface EventFiltersProps {
  filters: {
    page: number;
    limit: number;
    search: string;
    type: string;
    status: string;
    visibility: string;
    clubId: string;
  };
  onFilterChange: (filters: Partial<typeof filters>) => void;
}

export default function EventFilters({ filters, onFilterChange }: EventFiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const types = [
    { value: '', label: 'Tất cả loại' },
    { value: EventType.TRAINING, label: '🏃‍♂️ Tập luyện' },
    { value: EventType.COMPETITION, label: '🏆 Thi đấu' },
    { value: EventType.SOCIAL, label: '👥 Giao lưu' },
    { value: EventType.CHARITY, label: '❤️ Từ thiện' },
    { value: EventType.WORKSHOP, label: '📚 Workshop' },
    { value: EventType.MEETUP, label: '🤝 Gặp mặt' },
    { value: EventType.KNOWLEDGE_SHARING, label: '💡 Chia sẻ kiến thức' },
    { value: EventType.BIRTHDAY, label: '🎂 Sinh nhật' },
    { value: EventType.CELEBRATION, label: '🎉 Kỷ niệm' },
    { value: EventType.TEAM_BUILDING, label: '🤝 Team building' },
    { value: EventType.HEALTH_CHECK, label: '🏥 Khám sức khỏe' },
    { value: EventType.NUTRITION_TALK, label: '🥗 Dinh dưỡng' },
    { value: EventType.EQUIPMENT_REVIEW, label: '⚙️ Đánh giá thiết bị' },
    { value: EventType.ROUTE_EXPLORATION, label: '🗺️ Khám phá tuyến đường' },
    { value: EventType.OTHER, label: '📋 Khác' },
  ];

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: EventStatus.UPCOMING, label: '⏳ Sắp tới' },
    { value: EventStatus.ACTIVE, label: '🟢 Đang diễn ra' },
    { value: EventStatus.COMPLETED, label: '✅ Đã kết thúc' },
    { value: EventStatus.CANCELLED, label: '❌ Đã hủy' },
  ];

  const visibilityOptions = [
    { value: '', label: 'Tất cả quyền riêng tư' },
    { value: EventVisibility.PUBLIC, label: '🌐 Công khai' },
    { value: EventVisibility.CLUB_ONLY, label: '🔒 Chỉ thành viên CLB' },
  ];

  const handleInputChange = (field: keyof typeof filters, value: string | number) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      status: '',
      visibility: '',
      clubId: '',
    });
  };

  const hasActiveFilters = filters.type || filters.status || filters.visibility || filters.clubId;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Loại sự kiện */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Loại sự kiện</span>
            </label>
            <select
              className="select select-bordered select-md"
              value={filters.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              {types.map((option, index) => (
                <option key={`event-type-${option.value || index}`} value={option.value}>
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

          {/* Quyền riêng tư */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quyền riêng tư</span>
            </label>
            <select
              className="select select-bordered select-md"
              value={filters.visibility}
              onChange={(e) => handleInputChange('visibility', e.target.value)}
            >
              {visibilityOptions.map((option, index) => (
                <option key={`visibility-${option.value || index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* CLB */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Câu lạc bộ</span>
            </label>
            <input
              type="text"
              placeholder="Nhập ID CLB..."
              className="input input-bordered input-md"
              value={filters.clubId}
              onChange={(e) => handleInputChange('clubId', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}