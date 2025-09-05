'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  user: {
    id: string;
    username: string;
    profileImage?: string;
  };
  progress: number;
  totalValue: number;
  lastActivity: string;
}

interface ChallengeDetailLeaderboardProps {
  challengeId: string;
}

export default function ChallengeDetailLeaderboard({ challengeId }: ChallengeDetailLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [{ data, loading: apiLoading, error }, refetch] = useAxios<LeaderboardEntry[]>(
    `/api/challenges/${challengeId}/leaderboard`
  );

  useEffect(() => {
    if (data) {
      setLeaderboard(data || []);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Bảng xếp hạng</h2>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-base-300 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-base-300 rounded-full"></div>
                <div className="w-10 h-10 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-base-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Bảng xếp hạng</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-base-content/70 mb-4">Không thể tải bảng xếp hạng</p>
            <button onClick={() => refetch()} className="btn btn-sm btn-primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-base-content/70';
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">🏆 Bảng xếp hạng</h2>
          <div className="badge badge-primary badge-lg">
            {leaderboard.length} người
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-base-content/70">Chưa có dữ liệu xếp hạng</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  entry.rank <= 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10' : 'bg-base-200/50'
                }`}
              >
                {/* Rank */}
                <div className={`text-2xl font-bold ${getRankColor(entry.rank)}`}>
                  {getRankIcon(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {entry.user.profileImage ? (
                      <img
                        src={entry.user.profileImage}
                        alt={entry.user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold">
                        {entry.user.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-base-content truncate">
                    {entry.user.username}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Hoạt động cuối: {new Date(entry.lastActivity).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                {/* Progress */}
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {entry.totalValue}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {entry.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="divider"></div>
        )}

        <div className="text-center">
          <button
            onClick={() => refetch()}
            className="btn btn-sm btn-outline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
}
