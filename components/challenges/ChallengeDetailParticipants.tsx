'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface ChallengeParticipant {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
    email: string;
    profileImage?: string;
  };
  joinedAt: string;
  progress?: number;
  status: string;
}

interface ChallengeDetailParticipantsProps {
  challengeId: string;
}

export default function ChallengeDetailParticipants({ challengeId }: ChallengeDetailParticipantsProps) {
  const [participants, setParticipants] = useState<ChallengeParticipant[]>([]);
  const [loading, setLoading] = useState(true);

  const [{ data, loading: apiLoading, error }, refetch] = useAxios<{
    data: ChallengeParticipant[];
    total: number;
  }>(`/api/challenges/${challengeId}/participants`);

  useEffect(() => {
    if (data) {
      setParticipants(data.data || []);
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
          <h2 className="card-title text-xl mb-4">👥 Người tham gia</h2>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
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
          <h2 className="card-title text-xl mb-4">👥 Người tham gia</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-base-content/70 mb-4">Không thể tải danh sách người tham gia</p>
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
          <h2 className="card-title text-xl">👥 Người tham gia</h2>
          <div className="badge badge-primary badge-lg">
            {participants.length}
          </div>
        </div>

        {participants.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👥</div>
            <p className="text-base-content/70">Chưa có ai tham gia thử thách này</p>
          </div>
        ) : (
          <div className="list-container">
            {participants.map((participant) => (
              <div key={participant.id} className="list-item">
                <div className="list-item-avatar">
                  {participant.user.profileImage ? (
                    <img
                      src={participant.user.profileImage}
                      alt={participant.user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {participant.user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="list-item-content">
                  <div className="list-item-title">
                    {participant.user.username}
                  </div>
                  <div className="list-item-subtitle">
                    {participant.user.email}
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className="list-item-meta">
                    {new Date(participant.joinedAt).toLocaleDateString('vi-VN')}
                  </div>
                  {participant.progress !== undefined && (
                    <div className="text-sm font-medium text-primary">
                      {participant.progress}%
                    </div>
                  )}
                  <div className={`badge badge-sm ${
                    participant.status === 'active' ? 'badge-success' :
                    participant.status === 'completed' ? 'badge-primary' : 'badge-neutral'
                  }`}>
                    {participant.status === 'active' ? 'Đang tham gia' :
                     participant.status === 'completed' ? 'Đã hoàn thành' : 'Đã tham gia'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {participants.length > 0 && (
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
