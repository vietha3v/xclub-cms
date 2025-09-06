'use client';

import { Challenge } from '@/types/challenge';
import dlv from 'dlv';

interface ChallengeDetailInfoProps {
  challenge: Challenge;
}

export default function ChallengeDetailInfo({ challenge }: ChallengeDetailInfoProps) {
  const getTargetText = () => {
    switch (challenge.type) {
      case 'distance':
        return `${challenge.targetDistance} km`;
      case 'duration':
        return `${challenge.targetDuration} phút`;
      case 'activities':
        return `${challenge.targetActivities} hoạt động`;
      case 'streak':
        return 'Chuỗi ngày liên tiếp';
      default:
        return 'Mục tiêu tùy chỉnh';
    }
  };

  const getTargetDescription = () => {
    switch (challenge.type) {
      case 'distance':
        return 'Tổng khoảng cách cần đạt được';
      case 'duration':
        return 'Tổng thời gian tập luyện cần đạt được';
      case 'activities':
        return 'Số lượng hoạt động cần hoàn thành';
      case 'streak':
        return 'Số ngày liên tiếp tập luyện';
      default:
        return 'Mục tiêu được thiết lập tùy chỉnh';
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">📋 Thông tin chi tiết</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thời gian */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">⏰ Thời gian</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <div className="font-medium">Bắt đầu</div>
                  <div className="text-sm text-base-content/70">
                    {dlv(challenge, 'startDate') ? new Date(dlv(challenge, 'startDate')).toLocaleString('vi-VN') : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div>
                  <div className="font-medium">Kết thúc</div>
                  <div className="text-sm text-base-content/70">
                    {dlv(challenge, 'endDate') ? new Date(dlv(challenge, 'endDate')).toLocaleString('vi-VN') : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mục tiêu */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">🎯 Mục tiêu</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {challenge.type === 'distance' ? '🏃‍♂️' :
                   challenge.type === 'duration' ? '⏱️' :
                   challenge.type === 'activities' ? '📊' :
                   challenge.type === 'streak' ? '🔥' : '🎯'}
                </div>
                <div>
                  <div className="font-medium">{getTargetText()}</div>
                  <div className="text-sm text-base-content/70">{getTargetDescription()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        {(challenge.rules || challenge.rewards || challenge.maxParticipants) && (
          <div className="divider"></div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenge.maxParticipants && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">👥 Số lượng tham gia</h3>
              <div className="text-2xl font-bold text-accent">
                Tối đa {challenge.maxParticipants} người
              </div>
              <div className="text-sm text-base-content/70">
                Hiện tại: {challenge.currentParticipants} người
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">🌐 Quyền riêng tư</h3>
            <div className="text-2xl font-bold text-info">
              {challenge.isPublic ? 'Công khai' : 'Riêng tư'}
            </div>
            <div className="text-sm text-base-content/70">
              {challenge.isPublic ? 'Mọi người đều có thể tham gia' : 'Chỉ thành viên CLB mới tham gia được'}
            </div>
          </div>
        </div>

        {challenge.rules && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">📜 Quy định</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{challenge.rules}</p>
            </div>
          </div>
        )}

        {challenge.rewards && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">🏆 Phần thưởng</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{challenge.rewards}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
