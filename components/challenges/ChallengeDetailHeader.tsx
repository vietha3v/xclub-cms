'use client';

import { Challenge, ChallengeStatus, ChallengeType, ChallengeCategory } from '@/types/challenge';
import { ArrowLeft, Play, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChallengeDetailHeaderProps {
  challenge: Challenge;
}

export default function ChallengeDetailHeader({ challenge }: ChallengeDetailHeaderProps) {
  const router = useRouter();

  const getStatusIcon = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return <Play className="w-4 h-4 text-success" />;
      case ChallengeStatus.COMPLETED:
        return <CheckCircle className="w-4 h-4 text-success" />;
      case ChallengeStatus.CANCELLED:
        return <XCircle className="w-4 h-4 text-error" />;
      case ChallengeStatus.PUBLISHED:
        return <Clock className="w-4 h-4 text-info" />;
      default:
        return <Clock className="w-4 h-4 text-info" />;
    }
  };

  const getStatusText = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.PUBLISHED:
        return 'Đã xuất bản';
      case ChallengeStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ChallengeStatus.CANCELLED:
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.DISTANCE:
        return '🏃‍♂️';
      case ChallengeType.TIME:
        return '⏱️';
      case ChallengeType.FREQUENCY:
        return '📊';
      case ChallengeType.STREAK:
        return '🔥';
      case ChallengeType.SPEED:
        return '💨';
      case ChallengeType.COMBINED:
        return '🎯';
      default:
        return '🏆';
    }
  };

  const getCategoryIcon = (category: ChallengeCategory) => {
    return category === ChallengeCategory.TEAM ? '👥' : '👤';
  };

  return (
    <div className="bg-base-100 shadow-lg border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
        </div>
        
        <div className="flex items-start gap-6">
          <div className="text-6xl">
            {getTypeIcon(challenge.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{challenge.name}</h1>
              <div className="flex items-center gap-2">
                {getStatusIcon(challenge.status)}
                <span className="text-sm font-medium">{getStatusText(challenge.status)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-primary">
                {getCategoryIcon(challenge.category)} {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
              </div>
              <div className="badge badge-secondary">
                {challenge.type}
              </div>
              <div className="badge badge-accent">
                {challenge.difficulty}
              </div>
            </div>

            {challenge.description && (
              <p className="text-base-content/70 text-lg leading-relaxed">
                {challenge.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
