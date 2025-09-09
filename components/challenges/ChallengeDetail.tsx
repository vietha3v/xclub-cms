'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import ChallengeDetailHeader from './ChallengeDetailHeader';
import ChallengeDetailInfo from './ChallengeDetailInfo';
import ChallengeDetailActions from './ChallengeDetailActions';

export default function ChallengeDetail() {
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const challengeId = params.id as string;

  const [{ data: challenge, loading, error }, refetch] = useAxios<Challenge>(`/api/challenges/${challengeId}`);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <CardSkeleton showImage={false} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <CardSkeleton showImage={false} />
                  <CardSkeleton showImage={false} />
                </div>
                <div className="space-y-6">
                  <CardSkeleton showImage={false} />
                  <CardSkeleton showImage={false} />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  if (error || !challenge) {
    return (
      <ErrorState
        title="Không tìm thấy thử thách"
        message="Thử thách này có thể đã bị xóa hoặc không tồn tại"
        onRetry={() => refetch()}
        retryText="Thử lại"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <ChallengeDetailHeader challenge={challenge} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ChallengeDetailInfo challenge={challenge} />
            </div>

            {/* Sidebar */}
            <div>
              <ChallengeDetailActions challenge={challenge} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}