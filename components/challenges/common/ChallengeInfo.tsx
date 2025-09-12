'use client';

import { Challenge } from '@/types/challenge';

interface ChallengeInfoProps {
  challenge: Challenge;
}

export default function ChallengeInfo({ challenge }: ChallengeInfoProps) {
  return (
    <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="card-body p-4 sm:p-6">
        <h3 className="card-title text-lg mb-4">Thông tin thử thách</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-base-content/60">Tên thử thách</span>
            <span className="font-medium">{challenge.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Mô tả</span>
            <span className="font-medium text-right max-w-xs">{challenge.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Loại</span>
            <span className="font-medium">{challenge.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Độ khó</span>
            <span className="font-medium">{challenge.difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Mục tiêu</span>
            <span className="font-medium">{challenge.targetValue} {challenge.targetUnit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Ngày bắt đầu</span>
            <span className="font-medium">{new Date(challenge.startDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Ngày kết thúc</span>
            <span className="font-medium">{new Date(challenge.endDate).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
