'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { RaceParticipant, ParticipantStatus } from '@/types/race';
import dlv from 'dlv';

interface RaceDetailParticipantsProps {
  raceId: string;
}

export default function RaceDetailParticipants({ raceId }: RaceDetailParticipantsProps) {
  const [participants, setParticipants] = useState<RaceParticipant[]>([]);
  const [loading, setLoading] = useState(true);

  const [{ data, loading: apiLoading, error }, refetch] = useAxios<{
    data: RaceParticipant[];
    total: number;
  }>(`/api/races/${raceId}/participants`);

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

  const getStatusColor = (status: ParticipantStatus) => {
    switch (status) {
      case 'confirmed':
        return 'badge-success';
      case 'registered':
        return 'badge-primary';
      case 'completed':
        return 'badge-accent';
      case 'withdrawn':
        return 'badge-error';
      case 'disqualified':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: ParticipantStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'registered':
        return 'Đã đăng ký';
      case 'completed':
        return 'Đã hoàn thành';
      case 'withdrawn':
        return 'Đã rút lui';
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
            {dlv({ participants }, 'participants.length', 0)}
          </div>
        </div>

        {dlv({ participants }, 'participants.length', 0) === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👥</div>
            <p className="text-base-content/70">Chưa có ai đăng ký tham gia giải chạy này</p>
          </div>
        ) : (
          <div className="list-container">
            {dlv({ participants }, 'participants', []).map((participant) => (
              <div key={participant.id} className="list-item">
                <div className="list-item-avatar">
                  <span>
                    {participant.bibNumber || '#'}
                  </span>
                </div>

                <div className="list-item-content">
                  <div className="list-item-title">
                    {participant.bibNumber ? `Bib #${participant.bibNumber}` : 'Chưa có bib'}
                  </div>
                  <div className="list-item-subtitle">
                    {participant.category || 'Chưa phân loại'}
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className="list-item-meta">
                    {new Date(participant.registrationDate).toLocaleDateString('vi-VN')}
                  </div>
                  <div className={`badge badge-sm ${getStatusColor(participant.status)}`}>
                    {getStatusText(participant.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {dlv({ participants }, 'participants.length', 0) > 0 && (
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
