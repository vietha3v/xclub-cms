'use client';

import React from 'react';
import { ChallengeTeamLeaderboard } from '@/types/challenge';
import { Trophy, Medal, Award, Users, MapPin } from 'lucide-react';

interface TeamLeaderboardProps {
  leaderboard: ChallengeTeamLeaderboard[];
  isLoading?: boolean;
}

export default function TeamLeaderboard({ leaderboard, isLoading }: TeamLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-base-content/60">
          {rank}
        </span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-base-100 border-base-300';
    }
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(2)} km`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-base-300 rounded-full"></div>
                <div className="w-32 h-4 bg-base-300 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-base-content/60 mb-2">
          Chưa có bảng xếp hạng
        </h3>
        <p className="text-base-content/50">
          Chưa có team nào tham gia thử thách này
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Bảng xếp hạng Team
        </h3>
        <span className="text-sm text-base-content/60">
          {leaderboard.length} teams
        </span>
      </div>

      {leaderboard.map((entry) => (
        <div
          key={entry.id}
          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankColor(entry.rank)}`}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-base">
                {entry.team?.teamName || `Team #${entry.rank}`}
              </h4>
              <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{entry.memberCount} thành viên</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>TB: {formatDistance(entry.averageDistance)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatDistance(entry.totalDistance)}
            </div>
            <div className="text-sm text-base-content/60">
              Tổng khoảng cách
            </div>
          </div>
        </div>
      ))}

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-base-200 rounded-lg">
        <h4 className="font-semibold mb-3">Thống kê tổng quan</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {leaderboard.length}
            </div>
            <div className="text-sm text-base-content/60">Teams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatDistance(leaderboard.reduce((sum, entry) => sum + entry.totalDistance, 0))}
            </div>
            <div className="text-sm text-base-content/60">Tổng km</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {leaderboard.reduce((sum, entry) => sum + entry.memberCount, 0)}
            </div>
            <div className="text-sm text-base-content/60">Thành viên</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatDistance(leaderboard.reduce((sum, entry) => sum + entry.averageDistance, 0) / leaderboard.length)}
            </div>
            <div className="text-sm text-base-content/60">TB km/team</div>
          </div>
        </div>
      </div>
    </div>
  );
}
