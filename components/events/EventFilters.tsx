'use client';

import { EventType, EventStatus, EventVisibility } from '@/types/event';
import dlv from 'dlv';
import { Search } from 'lucide-react';

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
        {dlv({ categories }, 'categories', []).map((category) => (
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
          <button className="btn btn-square btn-primary btn-sm">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
