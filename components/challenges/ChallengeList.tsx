'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Challenge, ChallengeType } from '@/types/challenge';
import dlv from 'dlv';
import { RotateCcw, Heart, Eye } from 'lucide-react';

interface ChallengeListProps {
  selectedType?: string;
  searchTerm?: string;
}

export default function ChallengeList({ selectedType = 'all', searchTerm = '' }: ChallengeListProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [{ data: challengesData, loading: apiLoading, error: apiError }, refetch] = useAxios<{
    data: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>('/api/challenges');

  useEffect(() => {
    if (challengesData) {
      setChallenges(challengesData.data || []);
      setLoading(false);
    }
  }, [challengesData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách thử thách');
      setLoading(false);
    }
  }, [apiError]);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (challenge.description && challenge.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  if (loading || apiLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-lg animate-pulse">
            <div className="card-body">
              <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">❌</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Có lỗi xảy ra</h3>
        <p className="text-base-content/70 mb-6">{error}</p>
        <button onClick={() => refetch()} className="btn btn-primary btn-sm">
          <RotateCcw className="w-4 h-4 mr-1" />
          Thử lại
        </button>
      </div>
    );
  }

  if (dlv({ filteredChallenges }, 'filteredChallenges.length', 0) === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy thử thách</h3>
        <p className="text-base-content/70 mb-6">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dlv({ filteredChallenges }, 'filteredChallenges', []).map((challenge, index) => (
        <div
          key={challenge.id}
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
        >
          <div className="card-body">
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">
                {challenge.type === ChallengeType.DISTANCE ? '🏃‍♂️' :
                 challenge.type === ChallengeType.DURATION ? '⏱️' :
                 challenge.type === ChallengeType.ACTIVITIES ? '📊' :
                 challenge.type === ChallengeType.STREAK ? '🔥' : '🎯'}
              </div>
              <div className={`badge ${
                challenge.status === 'active' ? 'badge-success' :
                challenge.status === 'published' ? 'badge-primary' : 'badge-neutral'
              } badge-lg`}>
                {challenge.status === 'active' ? 'Đang diễn ra' :
                 challenge.status === 'published' ? 'Đã công bố' :
                 challenge.status === 'completed' ? 'Đã hoàn thành' : 'Nháp'}
              </div>
            </div>

            {/* Challenge Title */}
            <h3 className="card-title text-lg mb-3 line-clamp-2">
              {challenge.title}
            </h3>

            {/* Challenge Description */}
            <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
              {challenge.description}
            </p>

            {/* Challenge Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">
                  {new Date(challenge.startDate).toLocaleDateString('vi-VN')} - {new Date(challenge.endDate).toLocaleDateString('vi-VN')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>
                  {challenge.type === ChallengeType.DISTANCE ? `Khoảng cách: ${challenge.targetDistance}km` :
                   challenge.type === ChallengeType.DURATION ? `Thời gian: ${challenge.targetDuration} phút` :
                   challenge.type === ChallengeType.ACTIVITIES ? `Hoạt động: ${challenge.targetActivities} lần` :
                   challenge.type === ChallengeType.STREAK ? 'Chuỗi ngày liên tiếp' : 'Thử thách tùy chỉnh'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{challenge.currentParticipants} người tham gia</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-between">
              <button className="btn btn-primary btn-sm flex-1">
                <Eye className="w-4 h-4 mr-1" />
                {challenge.status === 'active' ? 'Tham gia ngay' : 'Xem chi tiết'}
              </button>
              <button className="btn btn-outline btn-sm">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Challenge Code */}
            <div className="text-center mt-3 p-2 bg-info/10 rounded-lg">
              <p className="text-sm text-info">
                🏆 Mã thử thách: {challenge.challengeCode}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
