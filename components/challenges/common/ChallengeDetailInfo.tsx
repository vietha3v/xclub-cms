'use client';

import { Challenge, ChallengeCategory, ChallengeType } from '@/types/challenge';
import { Calendar, Users, Trophy, Clock, Target, User, Award, MapPin, Hash, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ChallengeDetailInfoProps {
  challenge: Challenge;
}

export default function ChallengeDetailInfo({ challenge }: ChallengeDetailInfoProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
  };

  const formatDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Dễ';
      case 'medium':
        return 'Trung bình';
      case 'hard':
        return 'Khó';
      case 'expert':
        return 'Chuyên gia';
      default:
        return difficulty;
    }
  };

  const formatType = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.DISTANCE:
        return 'Quãng đường';
      case ChallengeType.TIME:
        return 'Thời gian';
      case ChallengeType.FREQUENCY:
        return 'Tần suất';
      case ChallengeType.STREAK:
        return 'Chuỗi liên tiếp';
      case ChallengeType.SPEED:
        return 'Tốc độ';
      case ChallengeType.COMBINED:
        return 'Kết hợp';
      case ChallengeType.CUSTOM:
        return 'Tùy chỉnh';
      default:
        return type;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-orange-600 bg-orange-100';
      case 'expert':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Challenge Description */}
      {challenge.description && (
        <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h2 className="card-title text-lg sm:text-xl">Mô tả thử thách</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base text-base-content/80 leading-relaxed whitespace-pre-wrap">
                {challenge.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Details */}
      <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="card-body p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
            </div>
            <h2 className="card-title text-lg sm:text-xl">Chi tiết thử thách</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Mục tiêu</div>
                <div className="font-semibold text-sm sm:text-lg truncate">
                  {challenge.targetValue} {challenge.targetUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Độ khó</div>
                <div className={`font-semibold px-2 py-1 rounded-full text-xs sm:text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {formatDifficulty(challenge.difficulty)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-accent/10 rounded-lg flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Ngày bắt đầu</div>
                <div className="font-semibold text-sm sm:text-base">{formatDate(challenge.startDate)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-info/10 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-info" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Ngày kết thúc</div>
                <div className="font-semibold text-sm sm:text-base">{formatDate(challenge.endDate)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-warning/10 rounded-lg flex-shrink-0">
                {challenge.category === ChallengeCategory.TEAM ? (
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Loại thử thách</div>
                <div className="font-semibold text-sm sm:text-base">
                  {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-success/10 rounded-lg flex-shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Loại thử thách</div>
                <div className="font-semibold text-sm sm:text-base">{formatType(challenge.type)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Người tham gia</div>
                <div className="font-semibold text-sm sm:text-base">
                  {challenge.participantCount || 0}
                  {challenge.maxParticipants ? `/${challenge.maxParticipants}` : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-base-content/60">Mã thử thách</div>
                <div className="font-semibold font-mono text-sm sm:text-base truncate">{challenge.challengeCode}</div>
              </div>
            </div>
          </div>

          {challenge.timeLimit && (
            <div className="mt-4 p-3 sm:p-4 bg-info/10 rounded-lg border border-info/20">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-info" />
                <span className="text-xs sm:text-sm font-medium text-info">
                  Thời gian giới hạn: {challenge.timeLimit} ngày
                </span>
              </div>
            </div>
          )}

          {challenge.tags && challenge.tags.length > 0 && (
            <div className="mt-4">
              <div className="text-xs sm:text-sm text-base-content/60 mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag, index) => (
                  <div key={index} className="badge badge-outline badge-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Challenge Rules */}
      {challenge.rules && (
        <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
              </div>
              <h2 className="card-title text-lg sm:text-xl">Quy tắc thử thách</h2>
            </div>
            <div className="prose max-w-none">
              <div className="bg-warning/10 p-3 sm:p-4 rounded-lg border border-warning/20">
                <p className="whitespace-pre-wrap text-sm sm:text-base text-base-content/80 leading-relaxed">
                  {challenge.rules}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Rewards */}
      {challenge.rewards && (
        <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              </div>
              <h2 className="card-title text-lg sm:text-xl">Phần thưởng</h2>
            </div>
            <div className="prose max-w-none">
              <div className="bg-success/10 p-3 sm:p-4 rounded-lg border border-success/20">
                <p className="whitespace-pre-wrap text-sm sm:text-base text-base-content/80 leading-relaxed">
                  {typeof challenge.rewards === 'string' ? challenge.rewards : JSON.stringify(challenge.rewards, null, 2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
