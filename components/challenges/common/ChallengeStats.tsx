'use client';

import { Challenge, ChallengeStatus } from '@/types/challenge';
import useAxios from '@/hooks/useAxios';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeStatsProps {
  challenges: Challenge[];
}

export default function ChallengeStats({ challenges }: ChallengeStatsProps) {
  // Lấy stats từ API
  const [{ data: statsData, loading, error }, refetch] = useAxios<{
    totalChallenges: number;
    activeChallenges: number;
    completedChallenges: number;
    distanceChallenges: number;
  }>('/api/challenges/stats');

  // Fallback về tính toán local nếu API chưa sẵn sàng
  const activeChallenges = statsData?.activeChallenges ?? challenges.filter(c => c.status === ChallengeStatus.ACTIVE).length;
  const upcomingChallenges = challenges.filter(c => c.status === ChallengeStatus.UPCOMING).length;
  const completedChallenges = statsData?.completedChallenges ?? challenges.filter(c => c.status === ChallengeStatus.COMPLETED).length;
  const totalParticipants = challenges.reduce((sum, c) => sum + (c.participantCount || 0), 0);

  // Loading state
  if (loading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} showImage={false} />
            ))}
          </div>
        }
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  // Error state - vẫn hiển thị stats local nếu API lỗi
  if (error) {
    console.warn('Failed to load challenge stats from API, using local calculation');
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {/* Active Challenges */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in-up h-20 sm:h-24 lg:h-28" style={{ animationDelay: '0.1s' }}>
        <div className="p-2 sm:p-3 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">🔥</span>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 leading-none">{activeChallenges}</div>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs font-medium text-gray-600 leading-tight">Đang diễn ra</div>
          <div className="text-[9px] sm:text-xs text-gray-400 leading-tight mt-auto">Hiện tại</div>
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in-up h-20 sm:h-24 lg:h-28" style={{ animationDelay: '0.2s' }}>
        <div className="p-2 sm:p-3 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">⏰</span>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 leading-none">{upcomingChallenges}</div>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs font-medium text-gray-600 leading-tight">Sắp diễn ra</div>
          <div className="text-[9px] sm:text-xs text-gray-400 leading-tight mt-auto">Thử thách</div>
        </div>
      </div>

      {/* Completed Challenges */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in-up h-20 sm:h-24 lg:h-28" style={{ animationDelay: '0.3s' }}>
        <div className="p-2 sm:p-3 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">🏆</span>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 leading-none">{completedChallenges}</div>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs font-medium text-gray-600 leading-tight">Đã hoàn thành</div>
          <div className="text-[9px] sm:text-xs text-gray-400 leading-tight mt-auto">Thử thách</div>
        </div>
      </div>

      {/* Total Participants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in-up h-20 sm:h-24 lg:h-28" style={{ animationDelay: '0.4s' }}>
        <div className="p-2 sm:p-3 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">👥</span>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 leading-none">{totalParticipants.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs font-medium text-gray-600 leading-tight">Tổng người tham gia</div>
          <div className="text-[9px] sm:text-xs text-gray-400 leading-tight mt-auto">Trong tất cả thử thách</div>
        </div>
      </div>
    </div>
  );
}
