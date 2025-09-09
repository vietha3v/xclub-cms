'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import ChallengeCard from './ChallengeCard';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import dlv from 'dlv';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ChallengeListProps {
  // Add props here if needed in the future
}

export default function ChallengeList({}: ChallengeListProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [{ data: challengesData, loading: apiLoading, error: apiError }, refetch] = useAxios<{
    challenges: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>('/api/challenges');

  useEffect(() => {
    if (challengesData) {
      setChallenges(challengesData.challenges || []);
    }
  }, [challengesData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách thử thách');
    }
  }, [apiError]);

  // Hiển thị tất cả challenges (không filter)
  const filteredChallenges = challenges;

  if (apiLoading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} showImage={false} />
            ))}
          </div>
        }
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Có lỗi xảy ra"
        message={error}
        onRetry={() => refetch()}
      />
    );
  }

  if (dlv(filteredChallenges, 'length', 0) === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy thử thách</h3>
        <p className="text-base-content/70 mb-6">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }



  const handleViewDetails = (challengeId: string) => {
    router.push(`/challenges/${challengeId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-base-content/60">
          Hiển thị {filteredChallenges.length} thử thách
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.map((challenge: Challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
