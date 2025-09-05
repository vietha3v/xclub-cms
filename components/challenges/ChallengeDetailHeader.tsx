'use client';

import { Challenge } from '@/types/challenge';

interface ChallengeDetailHeaderProps {
  challenge: Challenge;
}

export default function ChallengeDetailHeader({ challenge }: ChallengeDetailHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'published':
        return 'badge-primary';
      case 'completed':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang diễn ra';
      case 'published':
        return 'Đã công bố';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Nháp';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'distance':
        return '🏃‍♂️';
      case 'duration':
        return '⏱️';
      case 'activities':
        return '📊';
      case 'streak':
        return '🔥';
      default:
        return '🎯';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'distance':
        return 'Thử thách khoảng cách';
      case 'duration':
        return 'Thử thách thời gian';
      case 'activities':
        return 'Thử thách số lượng hoạt động';
      case 'streak':
        return 'Thử thách chuỗi ngày';
      default:
        return 'Thử thách tùy chỉnh';
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Challenge Image */}
          {challenge.bannerUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={challenge.bannerUrl}
                alt={challenge.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Challenge Info */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`badge ${getStatusColor(challenge.status)} badge-lg`}>
                {getStatusText(challenge.status)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl">{getTypeIcon(challenge.type)}</div>
              <div className="text-lg text-base-content/70">{getTypeText(challenge.type)}</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
              {challenge.title}
            </h1>

            <p className="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto">
              {challenge.description}
            </p>

            {/* Challenge Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">📅</div>
                <div className="text-left">
                  <div className="font-semibold">Bắt đầu</div>
                  <div className="text-base-content/70">
                    {new Date(challenge.startDate).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">🏁</div>
                <div className="text-left">
                  <div className="font-semibold">Kết thúc</div>
                  <div className="text-base-content/70">
                    {new Date(challenge.endDate).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">👥</div>
                <div className="text-left">
                  <div className="font-semibold">Người tham gia</div>
                  <div className="text-base-content/70">
                    {challenge.currentParticipants} người
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Code */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full shadow-lg">
              <span className="text-sm font-medium text-base-content/70">Mã thử thách:</span>
              <span className="font-mono font-bold text-primary">{challenge.challengeCode}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
