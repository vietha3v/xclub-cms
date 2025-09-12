'use client';

import React, { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { BarChart3, Users, Trophy, Clock, TrendingUp, Download, RefreshCw } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeAnalyticsModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

interface AnalyticsData {
  challenge: Challenge;
  participants: any[];
  leaderboard: any[];
  stats: {
    totalParticipants: number;
    completedParticipants: number;
    averageScore: number;
    highestScore: number;
    completionRate: number;
  };
  completionStats: {
    totalParticipants: number;
    completedParticipants: number;
    pendingParticipants: number;
    activeParticipants: number;
    completionRate: number;
    averageCompletionTime: number;
    fastestCompletion: number;
    slowestCompletion: number;
  };
}

export default function ChallengeAnalyticsModal({
  challenge,
  isOpen,
  onClose
}: ChallengeAnalyticsModalProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // API calls
  const [{ data: resultsData, loading: resultsLoading, error: resultsError }, refetchResults] = useAxios<AnalyticsData>(
    `/api/challenges/${challenge.id}/results`
  );

  const [{ data: completionStatsData, loading: completionLoading, error: completionError }, refetchCompletion] = useAxios(
    `/api/challenges/${challenge.id}/completion-stats`
  );

  const [{ data: statsData, loading: statsLoading, error: statsError }, refetchStats] = useAxios(
    `/api/challenges/stats`
  );

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      Promise.all([
        refetchResults(),
        refetchCompletion(),
        refetchStats()
      ]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [isOpen, challenge.id]);

  useEffect(() => {
    if (resultsData && completionStatsData) {
      setAnalyticsData({
        ...resultsData,
        completionStats: completionStatsData
      });
    }
  }, [resultsData, completionStatsData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;
    
    if (days > 0) {
      return `${days} ngày ${hours} giờ`;
    } else if (hours > 0) {
      return `${hours} giờ ${mins} phút`;
    } else {
      return `${mins} phút`;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (isLoading || resultsLoading || completionLoading || statsLoading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-6xl">
          <LoadingWrapper
            loading={true}
            skeleton={
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} showImage={false} />
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <CardSkeleton key={i} showImage={false} />
                  ))}
                </div>
              </div>
            }
          >
            <div></div>
          </LoadingWrapper>
        </div>
      </div>
    );
  }

  if (resultsError || completionError || statsError) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-6xl">
          <ErrorState
            title="Không thể tải dữ liệu phân tích"
            message="Có lỗi xảy ra khi tải dữ liệu phân tích thử thách"
            onRetry={() => {
              refetchResults();
              refetchCompletion();
              refetchStats();
            }}
          />
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-6xl">
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 mx-auto text-base-content/30 mb-4" />
            <p className="text-base-content/60">Không có dữ liệu phân tích</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-content">
            Phân tích thử thách
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                refetchResults();
                refetchCompletion();
                refetchStats();
              }}
              className="btn btn-ghost btn-sm"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-figure text-primary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Tổng người tham gia</div>
            <div className="stat-value text-primary">{analyticsData.stats.totalParticipants}</div>
            <div className="stat-desc">
              {analyticsData.completionStats.activeParticipants} đang hoạt động
            </div>
          </div>

          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-figure text-success">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="stat-title">Hoàn thành</div>
            <div className="stat-value text-success">{analyticsData.stats.completedParticipants}</div>
            <div className="stat-desc">
              {(typeof analyticsData.stats.completionRate === 'number' ? analyticsData.stats.completionRate : 0).toFixed(1)}% tỷ lệ hoàn thành
            </div>
          </div>

          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-figure text-warning">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="stat-title">Điểm trung bình</div>
            <div className="stat-value text-warning">{(typeof analyticsData.stats.averageScore === 'number' ? analyticsData.stats.averageScore : 0).toFixed(1)}</div>
            <div className="stat-desc">
              Điểm cao nhất: {analyticsData.stats.highestScore}
            </div>
          </div>

          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-figure text-info">
              <Clock className="w-8 h-8" />
            </div>
            <div className="stat-title">Thời gian TB</div>
            <div className="stat-value text-info">
              {formatDuration(analyticsData.completionStats.averageCompletionTime)}
            </div>
            <div className="stat-desc">
              Nhanh nhất: {formatDuration(analyticsData.completionStats.fastestCompletion)}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Participants Progress */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">
                <Users className="w-5 h-5" />
                Tiến độ người tham gia
              </h3>
              <div className="space-y-3">
                {analyticsData.participants.slice(0, 5).map((participant, index) => (
                  <div key={participant.id || index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        User {participant.userId?.slice(-4) || 'N/A'}
                      </div>
                      <div className="w-full bg-base-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${calculateProgress(participant.currentProgress || 0, challenge.targetValue)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-base-content/60 ml-4">
                      {participant.currentProgress || 0}%
                    </div>
                  </div>
                ))}
                {analyticsData.participants.length > 5 && (
                  <div className="text-sm text-base-content/60 text-center">
                    ... và {analyticsData.participants.length - 5} người khác
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">
                <Trophy className="w-5 h-5" />
                Bảng xếp hạng
              </h3>
              <div className="space-y-2">
                {analyticsData.leaderboard.slice(0, 5).map((entry, index) => (
                  <div key={entry.id || index} className="flex items-center justify-between p-2 bg-base-200 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center text-xs font-bold">
                        {entry.rank || index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          User {entry.userId?.slice(-4) || 'N/A'}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {entry.progress || 0}% hoàn thành
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-primary">
                      {entry.score || 0} điểm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Info */}
        <div className="card bg-base-100 shadow-sm mt-6">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Thông tin thử thách</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-base-content/60">Tên thử thách:</span>
                <br />
                <span className="font-medium">{challenge.name}</span>
              </div>
              <div>
                <span className="font-medium text-base-content/60">Loại:</span>
                <br />
                <span className="font-medium">{challenge.type}</span>
              </div>
              <div>
                <span className="font-medium text-base-content/60">Độ khó:</span>
                <br />
                <span className="font-medium">{challenge.difficulty}</span>
              </div>
              <div>
                <span className="font-medium text-base-content/60">Ngày bắt đầu:</span>
                <br />
                <span className="font-medium">{formatDate(challenge.startDate)}</span>
              </div>
              <div>
                <span className="font-medium text-base-content/60">Ngày kết thúc:</span>
                <br />
                <span className="font-medium">{formatDate(challenge.endDate)}</span>
              </div>
              <div>
                <span className="font-medium text-base-content/60">Mục tiêu:</span>
                <br />
                <span className="font-medium">{challenge.targetValue} {challenge.targetUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => {
              // TODO: Implement export functionality
              console.log('Export analytics data');
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </button>
          <button
            onClick={onClose}
            className="btn btn-ghost"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
