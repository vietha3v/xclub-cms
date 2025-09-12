'use client';

import { useState } from 'react';
import { Challenge, ChallengeCategory } from '@/types/challenge';
import { Users, Trophy, Crown, Medal, Award, Clock, TrendingUp } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeTabsProps {
  challenge: Challenge;
}

interface ChallengeParticipant {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  status: 'active' | 'completed' | 'pending';
  currentProgress: number;
  joinedAt: string;
  rank?: number;
}

interface ChallengeLeaderboard {
  id: string;
  rank: number;
  userId?: string;
  teamId?: string;
  name: string;
  avatar?: string;
  score: number;
  progress: number;
  lastActivity?: string;
}

export default function ChallengeTabs({ challenge }: ChallengeTabsProps) {
  const [activeTab, setActiveTab] = useState<'participants' | 'leaderboard'>('participants');

  // Lấy results data từ API
  const [{ data: resultsData, loading, error }, refetch] = useAxios<{
    challenge: Challenge;
    participants: ChallengeParticipant[];
    leaderboard: ChallengeLeaderboard[];
    stats: {
      totalParticipants: number;
      completedParticipants: number;
      averageScore: number;
      highestScore: number;
      completionRate: number;
    };
  }>(`/api/challenges/${challenge.id}/results`);

  const participants = resultsData?.participants || [];
  const leaderboard = resultsData?.leaderboard || [];

  // Loading state
  if (loading) {
    return (
      <LoadingWrapper
        loading={true}
        skeleton={
          <div className="space-y-4">
            <div className="flex space-x-1 border-b border-base-300">
              <div className="h-10 w-24 bg-base-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-base-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <CardSkeleton key={i} showImage={false} />
              ))}
            </div>
          </div>
        }
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu"
        message="Có lỗi xảy ra khi tải thông tin thử thách"
        onRetry={() => refetch()}
      />
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="text-sm font-bold text-base-content/60">#{rank}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'completed':
        return 'badge-primary';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang tham gia';
      case 'completed':
        return 'Đã hoàn thành';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  const formatProgress = (progress: number) => {
    return `${progress.toFixed(1)}%`;
  };

  const formatScore = (score: number, unit: string) => {
    if (unit.toLowerCase().includes('km') || unit.toLowerCase().includes('m')) {
      return `${score.toFixed(1)} ${unit}`;
    }
    if (unit.toLowerCase().includes('ngày') || unit.toLowerCase().includes('day')) {
      return `${Math.round(score)} ${unit}`;
    }
    if (unit.toLowerCase().includes('lần') || unit.toLowerCase().includes('time')) {
      return `${Math.round(score)} ${unit}`;
    }
    return `${score.toFixed(1)} ${unit}`;
  };

  return (
    <div className="card bg-base-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
      <div className="card-body p-0">
        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-base-200 p-1 m-3 sm:m-4 mb-0">
          <button
            className={`tab tab-sm sm:tab-lg flex-1 ${activeTab === 'participants' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Người tham gia ({participants.length})</span>
            <span className="sm:hidden">Tham gia ({participants.length})</span>
          </button>
          <button
            className={`tab tab-sm sm:tab-lg flex-1 ${activeTab === 'leaderboard' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Bảng xếp hạng</span>
            <span className="sm:hidden">Xếp hạng</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-4">
          {activeTab === 'participants' && (
            <div className="space-y-3 sm:space-y-4">
              {participants.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-base-content/30 mb-3 sm:mb-4" />
                  <h4 className="text-base sm:text-lg font-semibold mb-2">Chưa có người tham gia</h4>
                  <p className="text-sm sm:text-base text-base-content/70">Hãy là người đầu tiên tham gia thử thách này!</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-base-200 rounded-lg">
                      {/* Avatar */}
                      <div className="avatar">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {participant.avatar ? (
                            <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-primary font-bold text-sm sm:text-lg">
                              {participant.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{participant.name}</h4>
                          {participant.rank && (
                            <div className="flex items-center gap-1">
                              {getRankIcon(participant.rank)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-base-content/70">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{formatProgress(participant.currentProgress)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(participant.joinedAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className={`badge badge-sm ${getStatusColor(participant.status)} flex-shrink-0`}>
                        <span className="hidden sm:inline">{getStatusText(participant.status)}</span>
                        <span className="sm:hidden">
                          {participant.status === 'active' ? 'Đang' : 
                           participant.status === 'completed' ? 'Hoàn' : 'Chờ'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 mx-auto text-base-content/30 mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Chưa có bảng xếp hạng</h4>
                  <p className="text-base-content/70">Bảng xếp hạng sẽ được cập nhật khi có hoạt động</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* Avatar */}
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {entry.avatar ? (
                            <img src={entry.avatar} alt={entry.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-primary font-bold">
                              {entry.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{entry.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-base-content/70">
                          <span>{formatScore(entry.score, challenge.targetUnit)}</span>
                          <span>{formatProgress(entry.progress)}</span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {formatScore(entry.score, challenge.targetUnit)}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {formatProgress(entry.progress)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leaderboard Stats */}
              {leaderboard.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold mb-3">Thống kê bảng xếp hạng</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-base-content/60">Tổng người tham gia:</span>
                      <span className="font-semibold ml-2">{leaderboard.length}</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Điểm cao nhất:</span>
                      <span className="font-semibold ml-2">
                        {leaderboard.length > 0 ? formatScore(leaderboard[0].score, challenge.targetUnit) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
