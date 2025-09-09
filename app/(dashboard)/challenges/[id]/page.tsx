'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import ChallengeDetailHeader from '@/components/challenges/ChallengeDetailHeader';
import ChallengeDetailInfo from '@/components/challenges/ChallengeDetailInfo';
import ChallengeDetailActions from '@/components/challenges/ChallengeDetailActions';
import ChallengeDetailParticipants from '@/components/challenges/ChallengeDetailParticipants';
import ChallengeDetailLeaderboard from '@/components/challenges/ChallengeDetailLeaderboard';
import ChallengePendingParticipants from '@/components/challenges/ChallengePendingParticipants';
import ChallengeResults from '@/components/challenges/ChallengeResults';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { ChallengeStatus } from '@/types/challenge';

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const challengeId = params.id as string;

  const [{ data: challenge, loading, error }, refetch] = useAxios<Challenge>(`/api/challenges/${challengeId}`);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy thử thách</h3>
          <p className="text-base-content/70 mb-6">Thử thách này có thể đã bị xóa hoặc không tồn tại</p>
          <button onClick={() => router.back()} className="btn btn-primary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header Section */}
        <ChallengeDetailHeader challenge={challenge} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ChallengeDetailInfo challenge={challenge} />
              {challenge.status === ChallengeStatus.COMPLETED ? (
                <ChallengeResults challengeId={challengeId} />
              ) : (
                <ChallengeDetailLeaderboard challengeId={challengeId} />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ChallengeDetailActions challenge={challenge} onUpdate={refetch} />
              {challenge.requireApproval && (
                <ChallengePendingParticipants challengeId={challengeId} onUpdate={refetch} />
              )}
              <ChallengeDetailParticipants challengeId={challengeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
