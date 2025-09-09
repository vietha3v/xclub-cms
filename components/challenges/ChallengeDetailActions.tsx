'use client';

import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types/challenge';
import { Play, Clock, Users, Trophy } from 'lucide-react';

interface ChallengeDetailActionsProps {
  challenge: Challenge;
}

export default function ChallengeDetailActions({ challenge }: ChallengeDetailActionsProps) {
  const getStatusText = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.PUBLISHED:
        return 'Đã xuất bản';
      case ChallengeStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ChallengeStatus.CANCELLED:
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Hành động</h3>
          <div className="space-y-3">
            {challenge.status === ChallengeStatus.ACTIVE && (
              <button className="btn btn-primary w-full">
                <Play className="w-4 h-4" />
                Tham gia thử thách
              </button>
            )}
            
            {challenge.status === ChallengeStatus.PUBLISHED && (
              <button className="btn btn-outline w-full" disabled>
                <Clock className="w-4 h-4" />
                Chưa bắt đầu
              </button>
            )}

            <button className="btn btn-outline w-full">
              <Users className="w-4 h-4" />
              Xem người tham gia
            </button>

            <button className="btn btn-outline w-full">
              <Trophy className="w-4 h-4" />
              Xem bảng xếp hạng
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Thống kê</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-base-content/60">Người tham gia</span>
              <span className="font-medium">{challenge.participantCount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Trạng thái</span>
              <span className="font-medium">{getStatusText(challenge.status)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Loại</span>
              <span className="font-medium">
                {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Độ khó</span>
              <span className="font-medium">{challenge.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
