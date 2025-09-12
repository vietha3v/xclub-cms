'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import ChallengeCard from './ChallengeCard';
import ChallengeCardMobile from './ChallengeCardMobile';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const [{ data: challengesData, loading: apiLoading, error: apiError }, refetch] = useAxios<{
    challenges: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>('/api/challenges');

  useEffect(() => {
    if (challengesData) {
      if (challengesData.page === 1) {
        // First load or refresh
        setChallenges(challengesData.challenges || []);
      } else {
        // Load more - append to existing challenges
        setChallenges(prev => [...prev, ...(challengesData.challenges || [])]);
      }
      setCurrentPage(challengesData.page);
      setHasMore(challengesData.challenges?.length === challengesData.limit);
      setLoadingMore(false);
    }
  }, [challengesData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách thử thách');
      setLoadingMore(false);
    }
  }, [apiError]);

  // Hiển thị tất cả challenges (không filter)
  const filteredChallenges = challenges;

  if (apiLoading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
      <div className="text-center py-12 sm:py-20 animate-fade-in-up">
        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-base-content mb-2 sm:mb-3 md:mb-4 leading-tight">Không tìm thấy thử thách</h3>
        <p className="text-xs sm:text-sm md:text-base text-base-content/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }



  const handleViewDetails = (challengeId: string) => {
    router.push(`/challenges/${challengeId}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="text-xs sm:text-sm text-base-content/60 leading-tight">
          Hiển thị {filteredChallenges.length} thử thách
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-2 sm:space-y-0">
        {/* Mobile: Vertical list */}
        <div className="block sm:hidden space-y-2">
          {filteredChallenges.map((challenge: Challenge, index: number) => (
            <div
              key={challenge.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <ChallengeCardMobile
                challenge={challenge}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
        
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredChallenges.map((challenge: Challenge, index: number) => (
            <div
              key={challenge.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <ChallengeCard
                challenge={challenge}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
