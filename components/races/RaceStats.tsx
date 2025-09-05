'use client';

import { Race } from '@/types/race';

interface RaceStatsProps {
  races: Race[];
}

export default function RaceStats({ races }: RaceStatsProps) {
  const upcomingRaces = races.filter(r => r.status === 'published' || r.status === 'registration_open').length;
  const activeRaces = races.filter(r => r.status === 'active').length;
  const totalParticipants = races.reduce((sum, r) => sum + (r.maxParticipants || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <div className="text-3xl">🏁</div>
          </div>
          <div className="stat-title">Giải chạy sắp tới</div>
          <div className="stat-value text-primary">{upcomingRaces}</div>
          <div className="stat-desc">Trong tháng này</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="text-3xl">🏃‍♂️</div>
          </div>
          <div className="stat-title">Đang diễn ra</div>
          <div className="stat-value text-secondary">{activeRaces}</div>
          <div className="stat-desc">Giải chạy hiện tại</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-accent">
            <div className="text-3xl">👥</div>
          </div>
          <div className="stat-title">Tổng người tham gia</div>
          <div className="stat-value text-accent">{totalParticipants.toLocaleString()}</div>
          <div className="stat-desc">Trong tất cả giải chạy</div>
        </div>
      </div>
    </div>
  );
}
