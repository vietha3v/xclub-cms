'use client';

import React, { useState } from 'react';
import { Challenge, ChallengeType, ChallengeCategory, ChallengeStatus, ChallengeDifficulty } from '@/types/challenge';
import { Calendar, Users, Trophy, Clock, Target, Eye, UserPlus, CheckCircle } from 'lucide-react';
import ChallengeRegistrationModal from './ChallengeRegistrationModal';

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

  const formatStatus = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.UPCOMING:
        return 'Sắp diễn ra';
      case ChallengeStatus.PUBLISHED:
        return 'Đã công bố';
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

  const colors = getChallengeColors(challenge.type, challenge.category);
  const challengeIcon = getChallengeIcon(challenge.type, challenge.category);

  return (
    <>
      <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 ${colors.border} border-l-4`}>
        <div className="card-body p-4">
          <div className="flex items-center gap-4">
            {/* Icon & Basic Info */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className={`text-2xl ${colors.primary}`}>
                {challengeIcon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm line-clamp-1 mb-1">
                  {challenge.name}
                </h3>
                <div className="flex gap-1 flex-wrap">
                  <div className={`badge ${colors.badge} badge-xs`}>
                    {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
                  </div>
                  <div className={`badge ${getStatusColor(challenge.status)} badge-xs`}>
                    {formatStatus(challenge.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Details - Compact */}
            <div className="flex items-center gap-3 text-xs text-base-content/60 flex-1 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(challenge.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>
                  {challenge.participantCount || 0}
                  {challenge.maxParticipants && `/${challenge.maxParticipants}`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>{formatDifficulty(challenge.difficulty)}</span>
              </div>
              {challenge.targetDistance && (
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  <span>{challenge.targetDistance}km</span>
                </div>
              )}
              {challenge.targetTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{challenge.targetTime}h</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              {challenge.userRegistrationStatus ? (
                <div className={`btn btn-sm cursor-default ${
                  challenge.userRegistrationStatus === 'pending' 
                    ? 'btn-warning' 
                    : 'btn-success'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  {challenge.userRegistrationStatus === 'pending' ? 'Chờ duyệt' : 'Đã đăng ký'}
                </div>
              ) : (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleJoinClick}
                >
                  <UserPlus className="w-3 h-3" />
                  Đăng ký
                </button>
              )}
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => onViewDetails?.(challenge.id)}
              >
                <Eye className="w-3 h-3" />
                Xem chi tiết
              </button>
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