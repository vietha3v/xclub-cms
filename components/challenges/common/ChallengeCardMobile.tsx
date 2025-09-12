'use client';

import React, { useState } from 'react';
import { Challenge, ChallengeType, ChallengeCategory, ChallengeStatus, ChallengeDifficulty } from '@/types/challenge';
import { Calendar, Users, Trophy, User, Clock, CheckCircle, UserPlus, User as UserIcon, Users as UsersIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChallengeRegistrationModal } from '../participant';
import CountdownTimer from './CountdownTimer';

interface ChallengeCardMobileProps {
  challenge: Challenge;
  onViewDetails?: (challengeId: string) => void;
  onJoinChallenge?: (challengeId: string) => void;
}

const ChallengeCardMobile: React.FC<ChallengeCardMobileProps> = ({
  challenge,
  onViewDetails,
  onJoinChallenge
}) => {
  const [showRegistrationModal, setShowCreateModal] = useState(false);

  const handleJoinClick = () => {
    setShowCreateModal(true);
  };

  const handleRegistrationSuccess = () => {
    setShowCreateModal(false);
    onJoinChallenge?.(challenge.id);
  };

  const getChallengeColors = (type: ChallengeType, category: ChallengeCategory) => {
    const colors = {
      [ChallengeType.FITNESS]: {
        primary: 'text-orange-500',
        border: 'border-orange-500',
        badge: 'badge-orange'
      },
      [ChallengeType.NUTRITION]: {
        primary: 'text-green-500',
        border: 'border-green-500',
        badge: 'badge-green'
      },
      [ChallengeType.MENTAL]: {
        primary: 'text-blue-500',
        border: 'border-blue-500',
        badge: 'badge-blue'
      },
      [ChallengeType.SOCIAL]: {
        primary: 'text-purple-500',
        border: 'border-purple-500',
        badge: 'badge-purple'
      }
    };
    return colors[type] || colors[ChallengeType.FITNESS];
  };

  const getChallengeIcon = (type: ChallengeType, category: ChallengeCategory) => {
    const icons = {
      [ChallengeType.FITNESS]: <Trophy className="w-full h-full" />,
      [ChallengeType.NUTRITION]: <Trophy className="w-full h-full" />,
      [ChallengeType.MENTAL]: <Trophy className="w-full h-full" />,
      [ChallengeType.SOCIAL]: <Trophy className="w-full h-full" />
    };
    return icons[type] || icons[ChallengeType.FITNESS];
  };

  const getStatusColor = (status: ChallengeStatus) => {
    const colors = {
      [ChallengeStatus.ACTIVE]: 'badge-success',
      [ChallengeStatus.UPCOMING]: 'badge-warning',
      [ChallengeStatus.PUBLISHED]: 'badge-warning',
      [ChallengeStatus.PAUSED]: 'badge-neutral',
      [ChallengeStatus.COMPLETED]: 'badge-info',
      [ChallengeStatus.CANCELLED]: 'badge-error'
    };
    return colors[status] || 'badge-neutral';
  };

  const getDifficultyIcons = (difficulty: ChallengeDifficulty) => {
    switch (difficulty) {
      case ChallengeDifficulty.EASY:
        return 1;
      case ChallengeDifficulty.MEDIUM:
        return 2;
      case ChallengeDifficulty.HARD:
        return 3;
      case ChallengeDifficulty.EXPERT:
        return 4;
      default:
        return 1;
    }
  };

  const getDifficultyBackground = (difficulty: ChallengeDifficulty) => {
    switch (difficulty) {
      case ChallengeDifficulty.EASY:
        return 'bg-green-50 border-green-200';
      case ChallengeDifficulty.MEDIUM:
        return 'bg-yellow-50 border-yellow-200';
      case ChallengeDifficulty.HARD:
        return 'bg-orange-50 border-orange-200';
      case ChallengeDifficulty.EXPERT:
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const colors = getChallengeColors(challenge.type, challenge.category);
  const challengeIcon = getChallengeIcon(challenge.type, challenge.category);
  const difficultyBg = getDifficultyBackground(challenge.difficulty);

  return (
    <>
      <div
        className={`${difficultyBg} shadow-sm hover:shadow-md transition-all duration-300 ${colors.border} border-l-4 h-20 rounded-lg cursor-pointer`}
        onClick={() => onViewDetails?.(challenge.id)}
      >
        <div className="p-2 h-full">
          <div className="flex items-start w-full gap-2 h-full">
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className="font-semibold text-xs truncate leading-tight mb-1">
                {challenge.name}
              </h3>
              
              
              <div className="flex gap-1 flex-wrap mb-1">
                <div className={`badge ${colors.badge} badge-xs text-[10px] flex items-center justify-center`}>
                  {challenge.category === ChallengeCategory.TEAM ? (
                    <UsersIcon className="w-2 h-2" />
                  ) : (
                    <UserIcon className="w-2 h-2" />
                  )}
                </div>
                <div className={`badge ${getStatusColor(challenge.status)} badge-xs text-[10px] flex items-center gap-1`}>
                  <CountdownTimer 
                    startDate={challenge.startDate} 
                    endDate={challenge.endDate} 
                    className="w-2 h-2"
                  />
                </div>
              </div>
              
              {/* Mobile extra info */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[9px] text-gray-500">
                  <Calendar className="w-2 h-2" />
                  <span>
                    {format(new Date(challenge.startDate), 'dd/MM', { locale: vi })}
                    {challenge.endDate && (
                      <>
                        {'-'}
                        {format(new Date(challenge.endDate), 'dd/MM', { locale: vi })}
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-500">
                  <Users className="w-2 h-2" />
                  <span>{challenge.participantCount || 0}{challenge.maxParticipants ? `/${challenge.maxParticipants}` : ''}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Difficulty Icons + Actions */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {/* Difficulty Icons */}
              <div className="flex items-center gap-1">
                {[...Array(getDifficultyIcons(challenge.difficulty))].map((_, index) => (
                  <span key={index} className="text-xs">💪</span>
                ))}
              </div>
              
              {/* Creator info - Mobile only */}
              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <User className="w-2 h-2" />
                <span>Bởi {challenge.createdBy?.name || 'Người dùng'}</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-1">
                {challenge.userRegistrationStatus ? (
                  <div 
                    className={`btn btn-xs cursor-default ${
                      challenge.userRegistrationStatus === 'pending' 
                        ? 'btn-warning' 
                        : 'btn-success'
                    } text-[9px] w-[95px] flex items-center justify-center px-1 py-0.5`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {challenge.userRegistrationStatus === 'pending' ? (
                      <>
                        <Clock className="w-5 h-5" />
                        <span className="truncate">Chờ duyệt</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span className="truncate">Đã đăng ký</span>
                      </>
                    )}
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary btn-xs text-[9px] w-[95px] flex items-center justify-center px-1 py-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinClick();
                    }}
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="truncate">Đăng ký</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChallengeRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowCreateModal(false)}
        challenge={challenge}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
};

export default ChallengeCardMobile;
