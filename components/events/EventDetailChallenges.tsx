'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';

interface EventDetailChallengesProps {
  eventId: string;
}

export default function EventDetailChallenges({ eventId }: EventDetailChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const [{ data, loading: apiLoading, error }, refetch] = useAxios<{
    data: Challenge[];
    total: number;
  }>(`/api/events/${eventId}/challenges`);

  useEffect(() => {
    if (data) {
      setChallenges(data.data || []);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Thử thách</h2>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-4 border border-base-300 rounded-lg animate-pulse">
                <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Thử thách</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-base-content/70 mb-4">Không thể tải danh sách thử thách</p>
            <button onClick={() => refetch()} className="btn btn-sm btn-primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">🏆 Thử thách</h2>
          <div className="badge badge-primary badge-lg">
            {challenges.length}
          </div>
        </div>

        {challenges.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-base-content/70">Sự kiện này chưa có thử thách nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border border-base-300 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {challenge.type === 'distance' ? '🏃‍♂️' :
                       challenge.type === 'duration' ? '⏱️' :
                       challenge.type === 'activities' ? '📊' :
                       challenge.type === 'streak' ? '🔥' : '🎯'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <div className="text-sm text-base-content/70">
                        Mã: {challenge.challengeCode}
                      </div>
                    </div>
                  </div>
                  <div className={`badge ${
                    challenge.status === 'active' ? 'badge-success' :
                    challenge.status === 'published' ? 'badge-primary' : 'badge-neutral'
                  }`}>
                    {challenge.status === 'active' ? 'Đang diễn ra' :
                     challenge.status === 'published' ? 'Đã công bố' : 'Nháp'}
                  </div>
                </div>

                {challenge.description && (
                  <p className="text-base-content/80 mb-3 line-clamp-2">
                    {challenge.description}
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-sm text-base-content/70">Bắt đầu</div>
                    <div className="font-medium text-sm">
                      {new Date(challenge.startDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-base-content/70">Kết thúc</div>
                    <div className="font-medium text-sm">
                      {new Date(challenge.endDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-base-content/70">Tham gia</div>
                    <div className="font-medium text-sm">
                      {challenge.currentParticipants}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-base-content/70">Mục tiêu</div>
                    <div className="font-medium text-sm">
                      {challenge.type === 'distance' ? `${challenge.targetDistance}km` :
                       challenge.type === 'duration' ? `${challenge.targetDuration} phút` :
                       challenge.type === 'activities' ? `${challenge.targetActivities} lần` : 'Tùy chỉnh'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-sm btn-primary flex-1">
                    Tham gia thử thách
                  </button>
                  <button className="btn btn-sm btn-outline">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {challenges.length > 0 && (
          <div className="divider"></div>
        )}

        <div className="text-center">
          <button
            onClick={() => refetch()}
            className="btn btn-sm btn-outline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
}
