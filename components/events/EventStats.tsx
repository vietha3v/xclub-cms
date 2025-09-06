'use client';

import { Event } from '@/types/event';
import dlv from 'dlv';

interface EventStatsProps {
  events: Event[];
}

export default function EventStats({ events }: EventStatsProps) {
  // Chỉ hiển thị dữ liệu từ BE, không tính toán
  const upcomingEvents = dlv({ events }, 'events.upcomingCount', 0);
  const activeEvents = dlv({ events }, 'events.activeCount', 0);
  const totalParticipants = dlv({ events }, 'events.totalParticipants', 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <div className="text-3xl">🎯</div>
          </div>
          <div className="stat-title">Sự kiện sắp tới</div>
          <div className="stat-value text-primary">{upcomingEvents}</div>
          <div className="stat-desc">Trong tháng này</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="text-3xl">🏃‍♂️</div>
          </div>
          <div className="stat-title">Đang diễn ra</div>
          <div className="stat-value text-secondary">{activeEvents}</div>
          <div className="stat-desc">Sự kiện hiện tại</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-accent">
            <div className="text-3xl">👥</div>
          </div>
          <div className="stat-title">Tổng người tham gia</div>
          <div className="stat-value text-accent">{totalParticipants.toLocaleString()}</div>
          <div className="stat-desc">Trong tất cả sự kiện</div>
        </div>
      </div>
    </div>
  );
}
