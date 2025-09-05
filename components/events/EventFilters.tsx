'use client';

import { EventType, EventStatus, EventVisibility } from '@/types/event';

interface EventFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const categories = [
  { key: 'all', label: 'Tất cả', icon: '🏃‍♂️' },
  { key: EventType.RACE, label: 'Giải chạy', icon: '🏆' },
  { key: EventType.CHARITY, label: 'Từ thiện', icon: '❤️' },
  { key: EventType.TRAINING, label: 'Tập luyện', icon: '💪' },
  { key: EventType.MEETUP, label: 'Gặp gỡ', icon: '👥' },
  { key: EventType.WORKSHOP, label: 'Workshop', icon: '🎓' },
  { key: EventType.COMPETITION, label: 'Thi đấu', icon: '🥇' },
  { key: EventType.OTHER, label: 'Khác', icon: '🎯' }
];

export default function EventFilters({ 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange 
}: EventFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`btn btn-sm ${
              selectedCategory === category.key 
                ? 'btn-primary' 
                : 'btn-outline'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="form-control w-full max-w-xs">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
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
