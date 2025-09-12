'use client';

import React, { useState, useEffect } from 'react';
import { Challenge, ChallengeParticipant, ParticipantStatus } from '@/types/challenge';
import { Users, CheckCircle, XCircle, Clock, UserCheck, UserX, Search, Filter } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeParticipantsModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onParticipantUpdate?: () => void;
}

export default function ChallengeParticipantsModal({
  challenge,
  isOpen,
  onClose,
  onParticipantUpdate
}: ChallengeParticipantsModalProps) {
  const [participants, setParticipants] = useState<ChallengeParticipant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ParticipantStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // API calls
  const [{ data: participantsData, loading, error }, refetch] = useAxios<ChallengeParticipant[]>(
    `/api/challenges/${challenge.id}/participants/pending`
  );

  const [, approveParticipant] = useAxios(
    `/api/challenges/${challenge.id}/participants/{userId}/approve`,
    { method: 'POST', manual: true }
  );

  const [, rejectParticipant] = useAxios(
    `/api/challenges/${challenge.id}/participants/{userId}/reject`,
    { method: 'POST', manual: true }
  );

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, challenge.id]);

  useEffect(() => {
    if (participantsData) {
      setParticipants(participantsData);
    }
  }, [participantsData]);

  const handleApprove = async (userId: string) => {
    setIsLoading(true);
    try {
      await approveParticipant({
        url: `/api/challenges/${challenge.id}/participants/${userId}/approve`,
        method: 'POST'
      });
      showToast('Đã duyệt người tham gia thành công!', 'success');
      refetch();
      onParticipantUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi duyệt người tham gia', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (userId: string) => {
    setIsLoading(true);
    try {
      await rejectParticipant({
        url: `/api/challenges/${challenge.id}/participants/${userId}/reject`,
        method: 'POST'
      });
      showToast('Đã từ chối người tham gia thành công!', 'success');
      refetch();
      onParticipantUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi từ chối người tham gia', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: ParticipantStatus) => {
    switch (status) {
      case ParticipantStatus.PENDING:
        return 'Chờ duyệt';
      case ParticipantStatus.ACTIVE:
        return 'Đang tham gia';
      case ParticipantStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ParticipantStatus.DROPPED:
        return 'Đã rời';
      case ParticipantStatus.DISQUALIFIED:
        return 'Bị loại';
      default:
        return status;
    }
  };

  const getStatusColor = (status: ParticipantStatus) => {
    switch (status) {
      case ParticipantStatus.PENDING:
        return 'badge-warning';
      case ParticipantStatus.ACTIVE:
        return 'badge-success';
      case ParticipantStatus.COMPLETED:
        return 'badge-primary';
      case ParticipantStatus.DROPPED:
        return 'badge-neutral';
      case ParticipantStatus.DISQUALIFIED:
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusIcon = (status: ParticipantStatus) => {
    switch (status) {
      case ParticipantStatus.PENDING:
        return <Clock className="w-4 h-4" />;
      case ParticipantStatus.ACTIVE:
        return <UserCheck className="w-4 h-4" />;
      case ParticipantStatus.COMPLETED:
        return <CheckCircle className="w-4 h-4" />;
      case ParticipantStatus.DROPPED:
        return <UserX className="w-4 h-4" />;
      case ParticipantStatus.DISQUALIFIED:
        return <XCircle className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-4xl">
          <LoadingWrapper
            loading={true}
            skeleton={
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <CardSkeleton key={i} showImage={false} />
                ))}
              </div>
            }
          >
            <div></div>
          </LoadingWrapper>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-4xl">
          <ErrorState
            title="Không thể tải danh sách người tham gia"
            message="Có lỗi xảy ra khi tải danh sách người tham gia"
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-content">
            Quản lý người tham gia
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <div className="input-group">
              <span className="bg-base-200">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo ID người dùng..."
                className="input input-bordered flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control">
            <div className="input-group">
              <span className="bg-base-200">
                <Filter className="w-4 h-4" />
              </span>
              <select
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ParticipantStatus | 'all')}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value={ParticipantStatus.PENDING}>Chờ duyệt</option>
                <option value={ParticipantStatus.ACTIVE}>Đang tham gia</option>
                <option value={ParticipantStatus.COMPLETED}>Đã hoàn thành</option>
                <option value={ParticipantStatus.DROPPED}>Đã rời</option>
                <option value={ParticipantStatus.DISQUALIFIED}>Bị loại</option>
              </select>
            </div>
          </div>
        </div>

        {/* Participants List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredParticipants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-base-content/30 mb-4" />
              <p className="text-base-content/60">Không có người tham gia nào</p>
            </div>
          ) : (
            filteredParticipants.map((participant) => (
              <div key={participant.id} className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm font-medium">
                              {participant.userId.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base-content">
                            User ID: {participant.userId}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`badge ${getStatusColor(participant.status)} flex items-center gap-1`}>
                              {getStatusIcon(participant.status)}
                              {getStatusText(participant.status)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-base-content/60">
                        <div>
                          <span className="font-medium">Tham gia:</span>
                          <br />
                          {formatDate(participant.joinedAt)}
                        </div>
                        <div>
                          <span className="font-medium">Tiến độ:</span>
                          <br />
                          {participant.currentProgress || 0}%
                        </div>
                        <div>
                          <span className="font-medium">Chuỗi ngày:</span>
                          <br />
                          {participant.currentStreak || 0} ngày
                        </div>
                        <div>
                          <span className="font-medium">Hoạt động cuối:</span>
                          <br />
                          {participant.lastActivityAt ? formatDate(participant.lastActivityAt) : 'Chưa có'}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {participant.status === ParticipantStatus.PENDING && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleApprove(participant.userId)}
                            disabled={isLoading}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Duyệt
                          </button>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => handleReject(participant.userId)}
                            disabled={isLoading}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-base-300">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="badge badge-primary">
              Tổng: {participants.length}
            </div>
            <div className="badge badge-warning">
              Chờ duyệt: {participants.filter(p => p.status === ParticipantStatus.PENDING).length}
            </div>
            <div className="badge badge-success">
              Đang tham gia: {participants.filter(p => p.status === ParticipantStatus.ACTIVE).length}
            </div>
            <div className="badge badge-primary">
              Hoàn thành: {participants.filter(p => p.status === ParticipantStatus.COMPLETED).length}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
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
