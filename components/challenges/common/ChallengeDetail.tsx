'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import ChallengeDetailHeader from './ChallengeDetailHeader';
import ChallengeDetailInfo from './ChallengeDetailInfo';
import { ChallengeDetailActions } from '../admin';
import { ChallengeProgress } from '../participant';
import ChallengeTabs from './ChallengeTabs';
import { ChallengeRegistration } from '../participant';
import ChallengeShareActions from './ChallengeShareActions';
import CountdownTimer from './CountdownTimer';

export default function ChallengeDetail() {
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const challengeId = params.id as string;

  const [{ data: challenge, loading, error }, refetch] = useAxios<Challenge>(`/api/challenges/${challengeId}`);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRegistrationChange = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const handleChallengeUpdate = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

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

        {/* Countdown Section */}
        <div className="py-3 sm:py-4 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <CountdownTimer 
                  startDate={challenge.startDate} 
                  endDate={challenge.endDate} 
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-sm sm:text-lg font-semibold text-primary text-center">
                  Thử thách {challenge.status === 'active' ? 'đang diễn ra' : 'sắp diễn ra'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <ChallengeDetailInfo challenge={challenge} />
                <ChallengeTabs 
                  challenge={challenge}
                  key={refreshKey}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                <ChallengeDetailActions 
                  challenge={challenge}
                  onChallengeUpdate={handleChallengeUpdate}
                />
                <ChallengeProgress 
                  challenge={challenge}
                  key={refreshKey}
                />
                <ChallengeRegistration 
                  challenge={challenge}
                  onRegistrationChange={handleRegistrationChange}
                />
                <ChallengeShareActions challenge={challenge} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}