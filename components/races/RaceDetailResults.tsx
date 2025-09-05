'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { RaceResult, ResultStatus } from '@/types/race';

interface RaceDetailResultsProps {
  raceId: string;
}

export default function RaceDetailResults({ raceId }: RaceDetailResultsProps) {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [{ data, loading: apiLoading, error }, refetch] = useAxios<RaceResult[]>(
    `/api/races/${raceId}/results/leaderboard`
  );

  useEffect(() => {
    if (data) {
      setResults(data || []);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}/km`;
  };

  const getStatusColor = (status: ResultStatus) => {
    switch (status) {
      case 'verified':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'disputed':
        return 'badge-error';
      case 'disqualified':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: ResultStatus) => {
    switch (status) {
      case 'verified':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'disputed':
        return 'Có tranh chấp';
      case 'disqualified':
        return 'Bị loại';
      default:
        return 'Chưa xác định';
    }
  };

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">🏆 Kết quả</h2>
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
          <h2 className="card-title text-xl mb-4">🏆 Kết quả</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-base-content/70 mb-4">Không thể tải kết quả</p>
            <button onClick={() => refetch()} className="btn btn-sm btn-primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">🏆 Kết quả</h2>
          <div className="badge badge-primary badge-lg">
            {results.length} người
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-base-content/70">Chưa có kết quả nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-primary/10 to-secondary/10' : 'bg-base-200/50'
                }`}
              >
                {/* Rank */}
                <div className={`text-2xl font-bold ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-amber-600' : 'text-base-content/70'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-base-content truncate">
                    {result.userId}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {result.category || 'Chưa phân loại'}
                  </div>
                </div>

                {/* Time */}
                {result.finishTime && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {formatTime(result.finishTime)}
                    </div>
                    {result.averagePace && (
                      <div className="text-sm text-base-content/70">
                        {formatPace(result.averagePace)}
                      </div>
                    )}
                  </div>
                )}

                {/* Status */}
                <div className="text-right">
                  <div className={`badge badge-sm ${getStatusColor(result.status)}`}>
                    {getStatusText(result.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
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
