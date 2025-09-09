'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { ChallengeParticipant, ParticipantStatus } from '@/types/challenge';
import { Check, X, Users, Clock, User } from 'lucide-react';

interface ChallengePendingParticipantsProps {
  challengeId: string;
  onUpdate?: () => void;
}

export default function ChallengePendingParticipants({ 
  challengeId, 
  onUpdate 
}: ChallengePendingParticipantsProps) {
  const [participants, setParticipants] = useState<ChallengeParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const [{ data: participantsData, loading: apiLoading, error: apiError }, refetch] = useAxios<ChallengeParticipant[]>(
    `/api/challenges/${challengeId}/participants/pending`
  );

  const [, approveParticipant, { loading: isApproving }] = useAxios(
    {
      url: `/api/challenges/${challengeId}/participants/`,
      method: 'POST'
    },
    { manual: true }
  );

  const [, rejectParticipant, { loading: isRejecting }] = useAxios(
    {
      url: `/api/challenges/${challengeId}/participants/`,
      method: 'POST'
    },
    { manual: true }
  );

  useEffect(() => {
    if (participantsData) {
      setParticipants(participantsData);
      setLoading(false);
    }
  }, [participantsData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách người tham gia chờ duyệt');
      setLoading(false);
    }
  }, [apiError]);

  const handleApprove = async (userId: string) => {
    try {
      await approveParticipant({
        url: `/api/challenges/${challengeId}/participants/${userId}/approve`
      });
      refetch();
      onUpdate?.();
    } catch (error) {
      console.error('Error approving participant:', error);
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Bạn có chắc chắn muốn từ chối người tham gia này?')) return;

    try {
      await rejectParticipant({
        url: `/api/challenges/${challengeId}/participants/${userId}/reject`
      });
      refetch();
      onUpdate?.();
    } catch (error) {
      console.error('Error rejecting participant:', error);
    }
  };

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Người tham gia chờ duyệt</h3>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg animate-pulse">
                <div className="w-10 h-10 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-base-300 rounded"></div>
                  <div className="w-8 h-8 bg-base-300 rounded"></div>
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
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Người tham gia chờ duyệt</h3>
          </div>
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="btn btn-sm btn-outline" onClick={() => refetch()}>
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold">Người tham gia chờ duyệt</h3>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <Users className="w-full h-full" />
            </div>
            <p className="text-base-content/70">Không có người tham gia nào chờ duyệt</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-warning" />
          <h3 className="text-lg font-semibold">Người tham gia chờ duyệt</h3>
          <span className="badge badge-warning badge-sm">{participants.length}</span>
        </div>

        <div className="space-y-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="font-medium">User ID: {participant.userId}</div>
                <div className="text-sm text-base-content/70">
                  Đăng ký: {new Date(participant.joinedAt).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleApprove(participant.userId)}
                  disabled={isApproving}
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleReject(participant.userId)}
                  disabled={isRejecting}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
