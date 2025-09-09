'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { ChallengeResults, ChallengeCompletionStats, ParticipantStatus } from '@/types/challenge';
import { Trophy, Users, Target, Clock, TrendingUp, Award, BarChart3 } from 'lucide-react';

interface ChallengeResultsProps {
  challengeId: string;
}

export default function ChallengeResults({ challengeId }: ChallengeResultsProps) {
  const [results, setResults] = useState<ChallengeResults | null>(null);
  const [completionStats, setCompletionStats] = useState<ChallengeCompletionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const [{ data: resultsData, loading: resultsLoading, error: resultsError }, refetchResults] = useAxios<ChallengeResults>(
    `/api/challenges/${challengeId}/results`
  );

  const [{ data: statsData, loading: statsLoading, error: statsError }, refetchStats] = useAxios<ChallengeCompletionStats>(
    `/api/challenges/${challengeId}/completion-stats`
  );

  useEffect(() => {
    if (resultsData) {
      setResults(resultsData);
    }
  }, [resultsData]);

  useEffect(() => {
    if (statsData) {
      setCompletionStats(statsData);
    }
  }, [statsData]);

  useEffect(() => {
    if (resultsLoading || statsLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [resultsLoading, statsLoading]);

  useEffect(() => {
    if (resultsError || statsError) {
      setError('Không thể tải kết quả thử thách');
    }
  }, [resultsError, statsError]);

  const getStatusColor = (status: ParticipantStatus) => {
    switch (status) {
      case ParticipantStatus.COMPLETED:
        return 'badge-success';
      case ParticipantStatus.ACTIVE:
        return 'badge-primary';
      case ParticipantStatus.PENDING:
        return 'badge-warning';
      case ParticipantStatus.DROPPED:
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: ParticipantStatus) => {
    switch (status) {
      case ParticipantStatus.COMPLETED:
        return 'Hoàn thành';
      case ParticipantStatus.ACTIVE:
        return 'Đang tham gia';
      case ParticipantStatus.PENDING:
        return 'Chờ duyệt';
      case ParticipantStatus.DROPPED:
        return 'Đã rút lui';
      default:
        return 'Không xác định';
    }
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days} ngày ${hours} giờ`;
    if (hours > 0) return `${hours} giờ ${minutes} phút`;
    return `${minutes} phút`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Kết quả thử thách</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-base-200 p-4 rounded-lg animate-pulse">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-base-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !results || !completionStats) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Kết quả thử thách</h3>
          </div>
          <div className="alert alert-error">
            <span>{error || 'Không thể tải kết quả thử thách'}</span>
            <button className="btn btn-sm btn-outline" onClick={() => { refetchResults(); refetchStats(); }}>
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Completion Stats */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Thống kê hoàn thành</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-figure text-primary">
                <Users className="w-8 h-8" />
              </div>
              <div className="stat-title">Tổng tham gia</div>
              <div className="stat-value text-primary">{completionStats.totalParticipants}</div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-figure text-success">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="stat-title">Đã hoàn thành</div>
              <div className="stat-value text-success">{completionStats.completedParticipants}</div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-figure text-info">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="stat-title">Tỷ lệ hoàn thành</div>
              <div className="stat-value text-info">{completionStats.completionRate.toFixed(1)}%</div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-figure text-warning">
                <Clock className="w-8 h-8" />
              </div>
              <div className="stat-title">Thời gian TB</div>
              <div className="stat-value text-warning">{formatTime(completionStats.averageCompletionTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Stats */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Thống kê điểm số</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Điểm trung bình</div>
              <div className="stat-value text-primary">{results.stats.averageScore.toFixed(1)}</div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Điểm cao nhất</div>
              <div className="stat-value text-success">{results.stats.highestScore}</div>
            </div>

            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Tỷ lệ hoàn thành</div>
              <div className="stat-value text-info">{results.stats.completionRate.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Participants */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Bảng xếp hạng</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Hạng</th>
                  <th>Người tham gia</th>
                  <th>Trạng thái</th>
                  <th>Tiến độ</th>
                  <th>Điểm số</th>
                  <th>Thời gian hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {results.leaderboard.slice(0, 10).map((entry, index) => {
                  const participant = results.participants.find(p => p.userId === entry.userId);
                  return (
                    <tr key={entry.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          {entry.rank <= 3 && (
                            <span className="text-2xl">
                              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                            </span>
                          )}
                          <span className="font-bold">#{entry.rank}</span>
                        </div>
                      </td>
                      <td>
                        <div className="font-medium">User {entry.userId.slice(0, 8)}...</div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(participant?.status || ParticipantStatus.ACTIVE)}`}>
                          {getStatusText(participant?.status || ParticipantStatus.ACTIVE)}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress 
                            className="progress progress-primary w-20" 
                            value={entry.progress} 
                            max={results.challenge.targetValue}
                          ></progress>
                          <span className="text-sm">{entry.progress.toFixed(1)}</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-bold text-primary">{entry.score}</span>
                      </td>
                      <td>
                        {participant?.completedAt ? (
                          <span className="text-sm">
                            {new Date(participant.completedAt).toLocaleDateString('vi-VN')}
                          </span>
                        ) : (
                          <span className="text-base-content/50">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
