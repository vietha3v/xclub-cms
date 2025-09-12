'use client';

import { Challenge, ChallengeType } from '@/types/challenge';
import { Target, TrendingUp, Clock, Award, Zap } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeProgressProps {
  challenge: Challenge;
}

interface UserProgress {
  currentValue: number;
  percentage: number;
  rank?: number;
  activities: number;
  lastActivity?: string;
}

export default function ChallengeProgress({ challenge }: ChallengeProgressProps) {
  // Lấy completion stats từ API
  const [{ data: completionStats, loading, error }, refetch] = useAxios<{
    totalParticipants: number;
    completedParticipants: number;
    pendingParticipants: number;
    activeParticipants: number;
    completionRate: number;
    averageCompletionTime: number;
    fastestCompletion: number;
    slowestCompletion: number;
  }>(`/api/challenges/${challenge.id}/completion-stats`);

  // Mock user progress data (sẽ được thay thế bằng API thực tế)
  const userProgress: UserProgress = {
    currentValue: 75,
    percentage: 75,
    rank: 5,
    activities: 12,
    lastActivity: '2025-01-15T10:30:00Z'
  };

  // Loading state
  if (loading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={<CardSkeleton showImage={false} />}
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title="Không thể tải tiến độ"
        message="Có lỗi xảy ra khi tải thông tin tiến độ thử thách"
        onRetry={() => refetch()}
      />
    );
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    if (percentage >= 25) return 'text-info';
    return 'text-error';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 75) return 'bg-primary';
    if (percentage >= 50) return 'bg-warning';
    if (percentage >= 25) return 'bg-info';
    return 'bg-error';
  };

  const getTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.DISTANCE:
        return <TrendingUp className="w-5 h-5" />;
      case ChallengeType.TIME:
        return <Clock className="w-5 h-5" />;
      case ChallengeType.FREQUENCY:
        return <Target className="w-5 h-5" />;
      case ChallengeType.STREAK:
        return <Zap className="w-5 h-5" />;
      case ChallengeType.SPEED:
        return <TrendingUp className="w-5 h-5" />;
      case ChallengeType.COMBINED:
        return <Award className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const formatProgressValue = (value: number | undefined, unit: string | undefined) => {
    const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    const safeUnit = unit || 'điểm';
    
    if (safeUnit.toLowerCase().includes('km') || safeUnit.toLowerCase().includes('m')) {
      return `${safeValue.toFixed(1)} ${safeUnit}`;
    }
    if (safeUnit.toLowerCase().includes('ngày') || safeUnit.toLowerCase().includes('day')) {
      return `${Math.round(safeValue)} ${safeUnit}`;
    }
    if (safeUnit.toLowerCase().includes('lần') || safeUnit.toLowerCase().includes('time')) {
      return `${Math.round(safeValue)} ${safeUnit}`;
    }
    return `${safeValue.toFixed(1)} ${safeUnit}`;
  };

  if (!userProgress) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h3 className="card-title text-lg">Tiến độ thử thách</h3>
          </div>
          
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-lg font-semibold mb-2">Chưa tham gia thử thách</h4>
            <p className="text-base-content/70">Đăng ký thử thách để theo dõi tiến độ của bạn</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <div className="card-body p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            {getTypeIcon(challenge.type)}
          </div>
          <h3 className="card-title text-base sm:text-lg">Tiến độ thử thách</h3>
        </div>

        {/* Main Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tiến độ hiện tại</span>
            <span className={`text-sm font-bold ${getProgressColor(userProgress.percentage)}`}>
              {(typeof userProgress.percentage === 'number' ? userProgress.percentage : 0).toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-base-200 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(userProgress.percentage)}`}
              style={{ width: `${Math.min(userProgress.percentage, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-base-content/70">
            <span>{formatProgressValue(userProgress.currentValue, challenge.targetUnit)}</span>
            <span>{formatProgressValue(challenge.targetValue, challenge.targetUnit)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="stat bg-base-200 rounded-lg p-3 sm:p-4">
            <div className="stat-figure text-primary">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="stat-title text-xs">Mục tiêu</div>
            <div className="stat-value text-sm sm:text-lg">
              {formatProgressValue(challenge.targetValue, challenge.targetUnit)}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-lg p-3 sm:p-4">
            <div className="stat-figure text-secondary">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="stat-title text-xs">Hoạt động</div>
            <div className="stat-value text-sm sm:text-lg">{userProgress.activities}</div>
          </div>

          {userProgress.rank && (
            <div className="stat bg-base-200 rounded-lg p-3 sm:p-4">
              <div className="stat-figure text-accent">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="stat-title text-xs">Xếp hạng</div>
              <div className="stat-value text-sm sm:text-lg">#{userProgress.rank}</div>
            </div>
          )}

          <div className="stat bg-base-200 rounded-lg p-3 sm:p-4">
            <div className="stat-figure text-info">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="stat-title text-xs">Lần cuối</div>
            <div className="stat-value text-sm sm:text-lg">
              {userProgress.lastActivity ? 
                new Date(userProgress.lastActivity).toLocaleDateString('vi-VN') : 
                'Chưa có'
              }
            </div>
          </div>
        </div>

        {/* Motivation Message */}
        {userProgress.percentage < 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="text-center">
              <h4 className="font-semibold text-primary mb-1">Tiếp tục cố gắng!</h4>
              <p className="text-sm text-base-content/70">
                Bạn đã hoàn thành {(typeof userProgress.percentage === 'number' ? userProgress.percentage : 0).toFixed(1)}% mục tiêu. 
                Còn {((challenge.targetValue - userProgress.currentValue) / challenge.targetValue * 100).toFixed(1)}% nữa để đạt được mục tiêu!
              </p>
            </div>
          </div>
        )}

        {userProgress.percentage >= 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-success/20 rounded-lg border border-success/30">
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <h4 className="font-semibold text-success mb-1">Chúc mừng!</h4>
              <p className="text-sm text-base-content/70">
                Bạn đã hoàn thành thử thách này! Tuyệt vời!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
