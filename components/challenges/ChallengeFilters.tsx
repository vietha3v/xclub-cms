'use client';

import { ChallengeType } from '@/types/challenge';
import dlv from 'dlv';

interface ChallengeFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const types = [
  { key: 'all', label: 'Tất cả', icon: '🏆' },
  { key: ChallengeType.DISTANCE, label: 'Khoảng cách', icon: '🏃‍♂️' },
  { key: ChallengeType.DURATION, label: 'Thời gian', icon: '⏱️' },
  { key: ChallengeType.ACTIVITIES, label: 'Hoạt động', icon: '📊' },
  { key: ChallengeType.STREAK, label: 'Chuỗi ngày', icon: '🔥' },
  { key: ChallengeType.CUSTOM, label: 'Tùy chỉnh', icon: '🎯' }
];

export default function ChallengeFilters({ 
  selectedType, 
  onTypeChange, 
  searchTerm, 
  onSearchChange 
}: ChallengeFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        {dlv({ types }, 'types', []).map((type) => (
          <button
            key={type.key}
            onClick={() => onTypeChange(type.key)}
            className={`btn btn-sm ${
              selectedType === type.key 
                ? 'btn-primary' 
                : 'btn-outline'
            }`}
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="form-control w-full max-w-xs">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm thử thách..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="btn btn-square btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
