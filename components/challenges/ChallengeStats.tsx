'use client';

import { Challenge } from '@/types/challenge';
import dlv from 'dlv';

interface ChallengeStatsProps {
  challenges: Challenge[];
}

export default function ChallengeStats({ challenges }: ChallengeStatsProps) {
  // Tính toán từ danh sách challenges
  const activeChallenges = challenges.filter(c => c.status === 'active').length;
  const completedChallenges = challenges.filter(c => c.status === 'completed').length;
  const totalParticipants = challenges.reduce((sum, c) => sum + (c.participantCount || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <div className="text-3xl">🔥</div>
          </div>
          <div className="stat-title">Thử thách đang diễn ra</div>
          <div className="stat-value text-primary">{activeChallenges}</div>
          <div className="stat-desc">Hiện tại</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="text-3xl">🏆</div>
          </div>
          <div className="stat-title">Đã hoàn thành</div>
          <div className="stat-value text-secondary">{completedChallenges}</div>
          <div className="stat-desc">Thử thách</div>
        </div>
      </div>

      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-accent">
            <div className="text-3xl">👥</div>
          </div>
          <div className="stat-title">Tổng người tham gia</div>
          <div className="stat-value text-accent">{totalParticipants.toLocaleString()}</div>
          <div className="stat-desc">Trong tất cả thử thách</div>
        </div>
      </div>
    </div>
  );
}
