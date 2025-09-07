'use client';

import { ClubChallenge } from '@/types/club';
import { RotateCcw, Eye } from 'lucide-react';

interface ClubDetailChallengesProps {
  challenges: ClubChallenge[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function ClubDetailChallenges({ 
  challenges = [], 
  loading = false, 
  error = null, 
  onRetry 
}: ClubDetailChallengesProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'badge-success';
      case 'medium':
        return 'badge-warning';
      case 'hard':
        return 'badge-error';
      case 'extreme':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Dễ';
      case 'medium':
        return 'Trung bình';
      case 'hard':
        return 'Khó';
      case 'extreme':
        return 'Cực khó';
      default:
        return 'Không xác định';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'distance':
        return 'Khoảng cách';
      case 'frequency':
        return 'Tần suất';
      case 'speed':
        return 'Tốc độ';
      case 'time':
        return 'Thời gian';
      case 'streak':
        return 'Chuỗi';
      case 'combined':
        return 'Kết hợp';
      case 'custom':
        return 'Tùy chỉnh';
      default:
        return 'Khác';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Thử thách</h2>
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-base-content/70">Đang tải danh sách thử thách...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">Thử thách</h2>
          <div className="badge badge-primary">{challenges.length}</div>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="btn btn-outline btn-sm mt-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Thử lại
              </button>
            )}
          </div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-base-content/70">Chưa có thử thách nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.slice(0, 3).map((challenge) => (
              <div key={challenge.id} className="border border-base-300 rounded-lg p-4 hover:bg-base-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{challenge.name}</h3>
                    <p className="text-base-content/70 text-sm mb-2 line-clamp-2">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-base-content/60">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(challenge.startDate)}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(challenge.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className={`badge badge-sm ${getDifficultyColor(challenge.difficulty)}`}>
                      {getDifficultyText(challenge.difficulty)}
                    </div>
                    
                    <div className="badge badge-outline badge-sm">
                      {getTypeText(challenge.type)}
                    </div>
                    
                    {challenge.maxParticipants && (
                      <div className="text-xs text-base-content/60">
                        {challenge.currentParticipants}/{challenge.maxParticipants} người
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {challenges.length > 3 && (
              <div className="text-center pt-3">
                <button className="btn btn-outline btn-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Xem tất cả ({challenges.length} thử thách)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
