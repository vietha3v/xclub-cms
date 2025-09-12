'use client';

import React from 'react';
import { Trophy, Star, Lock, Check, Clock, Target } from 'lucide-react';
import { AchievementDisplay as AchievementDisplayType, AchievementType, AchievementStatus } from '@/types/achievement';

interface AchievementDisplayProps {
  achievement: AchievementDisplayType;
  showProgress?: boolean;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function AchievementDisplay({
  achievement,
  showProgress = true,
  showDescription = true,
  size = 'md',
  onClick
}: AchievementDisplayProps) {
  const getStatusIcon = () => {
    switch (achievement.status) {
      case AchievementStatus.EARNED:
        return <Check className="w-4 h-4 text-success" />;
      case AchievementStatus.PENDING:
        return <Clock className="w-4 h-4 text-warning" />;
      case AchievementStatus.LOCKED:
        return <Lock className="w-4 h-4 text-base-content/40" />;
      default:
        return null;
    }
  };

  const getTypeIcon = () => {
    switch (achievement.type) {
      case AchievementType.CHALLENGE:
        return <Trophy className="w-4 h-4" />;
      case AchievementType.ACTIVITY:
        return <Target className="w-4 h-4" />;
      case AchievementType.STREAK:
        return <Star className="w-4 h-4" />;
      case AchievementType.MILESTONE:
        return <Trophy className="w-4 h-4" />;
      case AchievementType.SPECIAL:
        return <Star className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-3',
          icon: 'w-8 h-8',
          title: 'text-sm font-semibold',
          description: 'text-xs',
          points: 'text-xs',
          progress: 'h-1'
        };
      case 'lg':
        return {
          container: 'p-6',
          icon: 'w-16 h-16',
          title: 'text-xl font-bold',
          description: 'text-base',
          points: 'text-lg',
          progress: 'h-3'
        };
      default: // md
        return {
          container: 'p-4',
          icon: 'w-12 h-12',
          title: 'text-lg font-semibold',
          description: 'text-sm',
          points: 'text-base',
          progress: 'h-2'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const progressPercentage = achievement.progress && achievement.maxProgress 
    ? (achievement.progress / achievement.maxProgress) * 100 
    : 0;

  return (
    <div
      className={`card bg-base-100 border shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      } ${
        achievement.status === AchievementStatus.EARNED ? 'ring-2 ring-success/20' : ''
      } ${
        achievement.status === AchievementStatus.LOCKED ? 'opacity-60' : ''
      }`}
      onClick={onClick}
    >
      <div className={`card-body ${sizeClasses.container}`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 ${sizeClasses.icon} rounded-full ${
            achievement.status === AchievementStatus.EARNED 
              ? 'bg-success/20 text-success' 
              : achievement.status === AchievementStatus.PENDING
              ? 'bg-warning/20 text-warning'
              : 'bg-base-200 text-base-content/40'
          } flex items-center justify-center`}>
            {achievement.icon ? (
              <img
                src={achievement.icon}
                alt={achievement.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getTypeIcon()
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`${sizeClasses.title} text-base-content truncate`}>
                {achievement.name}
              </h3>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className={`${sizeClasses.points} font-bold text-primary`}>
                  {achievement.points} pts
                </span>
              </div>
            </div>

            {showDescription && achievement.description && (
              <p className={`${sizeClasses.description} text-base-content/70 mb-3 line-clamp-2`}>
                {achievement.description}
              </p>
            )}

            {/* Progress Bar */}
            {showProgress && achievement.progress !== undefined && achievement.maxProgress && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-base-content/60">
                  <span>Tiến độ</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <div className={`w-full bg-base-200 rounded-full ${sizeClasses.progress}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      achievement.status === AchievementStatus.EARNED
                        ? 'bg-success'
                        : achievement.status === AchievementStatus.PENDING
                        ? 'bg-warning'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Metadata */}
            {achievement.earnedAt && (
              <div className="text-xs text-base-content/60 mt-2">
                Đạt được: {new Date(achievement.earnedAt).toLocaleDateString('vi-VN')}
              </div>
            )}

            {/* Custom Metadata */}
            {achievement.metadata && Object.keys(achievement.metadata).length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.entries(achievement.metadata).map(([key, value]) => (
                  <span key={key} className="badge badge-outline badge-sm">
                    {key}: {String(value)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
