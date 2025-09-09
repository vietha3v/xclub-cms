'use client';

import React from 'react';
import { Challenge, ChallengeCategory } from '@/types/challenge';
import { Calendar, Users, Trophy, MapPin, Clock } from 'lucide-react';

interface TeamChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onViewDetails?: (challengeId: string) => void;
}

export default function TeamChallengeCard({ 
  challenge, 
  onJoin, 
  onViewDetails 
}: TeamChallengeCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'upcoming':
        return 'badge-info';
      case 'completed':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'badge-success';
      case 'medium':
        return 'badge-warning';
      case 'hard':
        return 'badge-error';
      case 'expert':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="card-title text-lg font-bold text-primary">
              {challenge.name}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className={`badge ${getStatusColor(challenge.status)}`}>
                {challenge.status}
              </div>
              <div className={`badge ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </div>
              <div className="badge badge-primary">
                {challenge.category === ChallengeCategory.TEAM ? 'Team' : 'Individual'}
              </div>
            </div>
          </div>
          {challenge.coverImageUrl && (
            <div className="avatar">
              <div className="w-16 h-16 rounded-lg">
                <img src={challenge.coverImageUrl} alt={challenge.name} />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {challenge.description && (
          <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
            {challenge.description}
          </p>
        )}

        {/* Challenge Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span>Thời gian: {challenge.timeLimit} ngày</span>
          </div>

          {challenge.category === ChallengeCategory.TEAM && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>
                  Tối đa {challenge.maxTeamMembers || 'không giới hạn'} thành viên/team
                </span>
              </div>
              
              {challenge.maxTeams && (
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span>Tối đa {challenge.maxTeams} teams</span>
                </div>
              )}
            </>
          )}

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>
              Mục tiêu: {challenge.targetValue} {challenge.targetUnit}
            </span>
          </div>
        </div>

        {/* Rules */}
        {challenge.rules && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-1">Quy tắc:</h4>
            <p className="text-sm text-base-content/70 line-clamp-2">
              {challenge.rules}
            </p>
          </div>
        )}

        {/* Tags */}
        {challenge.tags && challenge.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {challenge.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="badge badge-outline badge-sm">
                {tag}
              </span>
            ))}
            {challenge.tags.length > 3 && (
              <span className="badge badge-outline badge-sm">
                +{challenge.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions justify-end">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => onViewDetails?.(challenge.id)}
          >
            Xem chi tiết
          </button>
          
          {challenge.allowRegistration && (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onJoin?.(challenge.id)}
            >
              Tham gia
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
