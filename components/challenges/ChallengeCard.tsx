'use client';

import React, { useState, useEffect } from 'react';
import { Challenge, ChallengeType, ChallengeCategory, ChallengeStatus, ChallengeDifficulty } from '@/types/challenge';
import { Calendar, Users, Trophy, User, Clock, CheckCircle, UserPlus, User as UserIcon, Users as UsersIcon, Timer, Target } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import ChallengeRegistrationModal from './ChallengeRegistrationModal';
import CountdownTimer from './CountdownTimer';

interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails?: (challengeId: string) => void;
}

export default function ChallengeCard({ 
  challenge, 
  onViewDetails
}: ChallengeCardProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleJoinClick = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationModal(false);
    // Không cần gọi onJoin nữa vì đã có modal
  };

  // Visual indicators cho từng loại challenge
  const getChallengeIcon = (type: ChallengeType, category: ChallengeCategory) => {
    if (category === ChallengeCategory.TEAM) {
      return '👥';
    }
    
    switch (type) {
      case ChallengeType.DISTANCE:
        return '🏃';
      case ChallengeType.FREQUENCY:
        return '🔄';
      case ChallengeType.SPEED:
        return '⚡';
      case ChallengeType.TIME:
        return '⏱️';
      case ChallengeType.STREAK:
        return '🔥';
      case ChallengeType.COMBINED:
        return '🎯';
      case ChallengeType.CUSTOM:
        return '⭐';
      default:
        return '🏆';
    }
  };

  // Color scheme cho từng loại challenge
  const getChallengeColors = (type: ChallengeType, category: ChallengeCategory) => {
    if (category === ChallengeCategory.TEAM) {
      return {
        primary: 'text-blue-500',
        border: 'border-blue-500',
        badge: 'badge-primary',
        difficulty: 'badge-info'
      };
    }

    switch (type) {
      case ChallengeType.DISTANCE:
        return {
          primary: 'text-green-500',
          border: 'border-green-500',
          badge: 'badge-success',
          difficulty: 'badge-success'
        };
      case ChallengeType.FREQUENCY:
        return {
          primary: 'text-purple-500',
          border: 'border-purple-500',
          badge: 'badge-secondary',
          difficulty: 'badge-secondary'
        };
      case ChallengeType.SPEED:
        return {
          primary: 'text-orange-500',
          border: 'border-orange-500',
          badge: 'badge-warning',
          difficulty: 'badge-warning'
        };
      case ChallengeType.TIME:
        return {
          primary: 'text-blue-500',
          border: 'border-blue-500',
          badge: 'badge-info',
          difficulty: 'badge-info'
        };
      case ChallengeType.STREAK:
        return {
          primary: 'text-red-500',
          border: 'border-red-500',
          badge: 'badge-error',
          difficulty: 'badge-error'
        };
      case ChallengeType.COMBINED:
        return {
          primary: 'text-indigo-500',
          border: 'border-indigo-500',
          badge: 'badge-accent',
          difficulty: 'badge-accent'
        };
      case ChallengeType.CUSTOM:
        return {
          primary: 'text-pink-500',
          border: 'border-pink-500',
          badge: 'badge-neutral',
          difficulty: 'badge-neutral'
        };
      default:
        return {
          primary: 'text-gray-500',
          border: 'border-gray-500',
          badge: 'badge-ghost',
          difficulty: 'badge-ghost'
        };
    }
  };

  // Status colors
  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'badge-success';
      case ChallengeStatus.UPCOMING:
        return 'badge-info';
      case ChallengeStatus.PUBLISHED:
        return 'badge-primary';
      case ChallengeStatus.PAUSED:
        return 'badge-warning';
      case ChallengeStatus.COMPLETED:
        return 'badge-neutral';
      case ChallengeStatus.CANCELLED:
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const formatDifficulty = (difficulty: ChallengeDifficulty) => {
    switch (difficulty) {
      case ChallengeDifficulty.EASY:
        return 'Dễ';
      case ChallengeDifficulty.MEDIUM:
        return 'Trung bình';
      case ChallengeDifficulty.HARD:
        return 'Khó';
      case ChallengeDifficulty.EXPERT:
        return 'Chuyên gia';
      default:
        return 'Không xác định';
    }
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

  const formatStatus = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.UPCOMING:
        return 'Sắp diễn ra';
      case ChallengeStatus.PUBLISHED:
        return 'Sắp diễn ra';
      case ChallengeStatus.PAUSED:
        return 'Tạm dừng';
      case ChallengeStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ChallengeStatus.CANCELLED:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getStatusIcon = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.UPCOMING:
      case ChallengeStatus.PUBLISHED:
        return <Timer className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: ChallengeStatus) => {
    // For upcoming/published challenges, we'll use CountdownTimer component
    if (status === ChallengeStatus.UPCOMING || status === ChallengeStatus.PUBLISHED) {
      return null; // Will be handled by CountdownTimer
    }
    return formatStatus(status);
  };

  const colors = getChallengeColors(challenge.type, challenge.category);
  const challengeIcon = getChallengeIcon(challenge.type, challenge.category);
  const difficultyBg = getDifficultyBackground(challenge.difficulty);

  return (
    <>
      <div 
        className={`${difficultyBg} shadow-sm hover:shadow-md transition-all duration-300 ${colors.border} border-l-4 h-20 sm:h-auto rounded-lg cursor-pointer sm:flex sm:flex-col`}
        onClick={() => onViewDetails?.(challenge.id)}
      >
        <div className="p-2 sm:p-4 h-full sm:flex sm:flex-col sm:gap-3">
          {/* Mobile Layout */}
          <div className="flex items-start w-full gap-2 sm:hidden h-full">
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
              
              {/* Creator info */}
              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <User className="w-2 h-2" />
                <span>Bởi {typeof challenge.createdBy === 'string' ? challenge.createdBy : (challenge.createdBy as any)?.name || 'Người dùng'}</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-1">
                {challenge.userRegistrationStatus ? (
                  <div 
                    className={`btn btn-xs cursor-default ${
                      challenge.userRegistrationStatus === 'pending' 
                        ? 'btn-warning' 
                        : 'btn-success'
                    } text-[10px] sm:text-xs w-[70px] sm:w-[90px] flex items-center justify-center`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {challenge.userRegistrationStatus === 'pending' ? (
                      <>
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="ml-1 truncate">Chờ duyệt</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="ml-1 truncate">Đã đăng ký</span>
                      </>
                    )}
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary btn-xs text-[10px] sm:text-xs w-[70px] sm:w-[90px] flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinClick();
                    }}
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="ml-1 truncate">Đăng ký</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Card Style */}
          <div className="hidden sm:flex sm:flex-col sm:gap-3">
            {/* Header: Title + Difficulty */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-base leading-tight flex-1 min-w-0">
                <span className="truncate block">{challenge.name}</span>
              </h3>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {[...Array(getDifficultyIcons(challenge.difficulty))].map((_, index) => (
                  <span key={index} className="text-sm">💪</span>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">
                {challenge.targetValue} {challenge.targetUnit}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {format(new Date(challenge.startDate), 'dd/MM/yy', { locale: vi })}
                  {challenge.endDate && (
                    <> - {format(new Date(challenge.endDate), 'dd/MM/yy', { locale: vi })}</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {challenge.participantCount || 0}{challenge.maxParticipants ? `/${challenge.maxParticipants}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {challenge.timeLimit ? `${challenge.timeLimit} ngày` : 'Không giới hạn'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {typeof challenge.createdBy === 'string' ? challenge.createdBy : (challenge.createdBy as any)?.name || 'Người dùng'}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <div className={`badge ${colors.badge} badge-sm flex items-center gap-1`}>
                {challenge.category === ChallengeCategory.TEAM ? (
                  <UsersIcon className="w-3 h-3" />
                ) : (
                  <UserIcon className="w-3 h-3" />
                )}
                <span className="text-xs">{challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}</span>
              </div>
              
              <div className={`badge ${getStatusColor(challenge.status)} badge-sm flex items-center gap-1`}>
                <CountdownTimer 
                  startDate={challenge.startDate} 
                  endDate={challenge.endDate} 
                  className="w-3 h-3"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              {challenge.userRegistrationStatus ? (
                <div 
                  className={`btn btn-sm cursor-default w-full ${
                    challenge.userRegistrationStatus === 'pending' 
                      ? 'btn-warning' 
                      : 'btn-success'
                  } text-xs flex items-center justify-center`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {challenge.userRegistrationStatus === 'pending' ? (
                    <>
                      <Clock className="w-4 h-4" />
                      <span className="ml-2">Chờ duyệt</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="ml-2">Đã đăng ký</span>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  className="btn btn-primary btn-sm text-xs w-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinClick();
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="ml-2">Đăng ký</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ChallengeRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        challenge={challenge}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
}