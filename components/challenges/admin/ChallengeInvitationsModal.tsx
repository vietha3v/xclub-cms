'use client';

import React, { useState, useEffect } from 'react';
import { Challenge, ChallengeInvitation, InvitationStatus } from '@/types/challenge';
import { Mail, Plus, Search, Filter, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';

interface ChallengeInvitationsModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onInvitationUpdate?: () => void;
}

export default function ChallengeInvitationsModal({
  challenge,
  isOpen,
  onClose,
  onInvitationUpdate
}: ChallengeInvitationsModalProps) {
  const [invitations, setInvitations] = useState<ChallengeInvitation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | 'all'>('all');
  const [showSendForm, setShowSendForm] = useState(false);
  const [newInvitationClubId, setNewInvitationClubId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // API calls
  const [{ data: invitationsData, loading, error }, refetch] = useAxios<{ data: ChallengeInvitation[] }>(
    `/api/challenges/${challenge.id}/invitations`
  );

  const [, sendInvitation] = useAxios(
    `/api/challenges/${challenge.id}/invite`,
    { method: 'POST', manual: true }
  );

  const [, deleteInvitation] = useAxios(
    `/api/challenges/invitations/{invitationId}`,
    { method: 'DELETE', manual: true }
  );

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, challenge.id]);

  useEffect(() => {
    if (invitationsData) {
      setInvitations(invitationsData.data || []);
    }
  }, [invitationsData]);

  const handleSendInvitation = async () => {
    if (!newInvitationClubId.trim()) {
      showToast('Vui lòng nhập ID câu lạc bộ', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await sendInvitation({
        data: { clubId: newInvitationClubId.trim() }
      });
      showToast('Đã gửi lời mời thành công!', 'success');
      setNewInvitationClubId('');
      setShowSendForm(false);
      refetch();
      onInvitationUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi gửi lời mời', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    setIsLoading(true);
    try {
      await deleteInvitation({
        url: `/api/challenges/invitations/${invitationId}`,
        method: 'DELETE'
      });
      showToast('Đã xóa lời mời thành công!', 'success');
      refetch();
      onInvitationUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi xóa lời mời', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: InvitationStatus) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return 'Chờ phản hồi';
      case InvitationStatus.ACCEPTED:
        return 'Đã chấp nhận';
      case InvitationStatus.DECLINED:
        return 'Đã từ chối';
      case InvitationStatus.EXPIRED:
        return 'Hết hạn';
      default:
        return status;
    }
  };

  const getStatusColor = (status: InvitationStatus) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return 'badge-warning';
      case InvitationStatus.ACCEPTED:
        return 'badge-success';
      case InvitationStatus.DECLINED:
        return 'badge-error';
      case InvitationStatus.EXPIRED:
        return 'badge-neutral';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusIcon = (status: InvitationStatus) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return <Clock className="w-4 h-4" />;
      case InvitationStatus.ACCEPTED:
        return <CheckCircle className="w-4 h-4" />;
      case InvitationStatus.DECLINED:
        return <XCircle className="w-4 h-4" />;
      case InvitationStatus.EXPIRED:
        return <Clock className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.invitedClubId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invitation.status === statusFilter;
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

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
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
            title="Không thể tải danh sách lời mời"
            message="Có lỗi xảy ra khi tải danh sách lời mời"
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
            Quản lý lời mời tham gia
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            ✕
          </button>
        </div>

        {/* Send Invitation Form */}
        {showSendForm && (
          <div className="card bg-base-200 shadow-sm mb-6">
            <div className="card-body p-4">
              <h3 className="card-title text-lg mb-4">Gửi lời mời mới</h3>
              <div className="flex gap-4">
                <div className="form-control flex-1">
                  <input
                    type="text"
                    placeholder="Nhập ID câu lạc bộ..."
                    className="input input-bordered w-full"
                    value={newInvitationClubId}
                    onChange={(e) => setNewInvitationClubId(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleSendInvitation}
                  disabled={isLoading || !newInvitationClubId.trim()}
                >
                  {isLoading ? (
                    <div className="loading loading-spinner loading-sm"></div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Gửi lời mời
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowSendForm(false);
                    setNewInvitationClubId('');
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            className="btn btn-primary"
            onClick={() => setShowSendForm(!showSendForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Gửi lời mời mới
          </button>

          <div className="form-control flex-1">
            <div className="input-group">
              <span className="bg-base-200">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo ID câu lạc bộ..."
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
                onChange={(e) => setStatusFilter(e.target.value as InvitationStatus | 'all')}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value={InvitationStatus.PENDING}>Chờ phản hồi</option>
                <option value={InvitationStatus.ACCEPTED}>Đã chấp nhận</option>
                <option value={InvitationStatus.DECLINED}>Đã từ chối</option>
                <option value={InvitationStatus.EXPIRED}>Hết hạn</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invitations List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredInvitations.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 mx-auto text-base-content/30 mb-4" />
              <p className="text-base-content/60">Không có lời mời nào</p>
            </div>
          ) : (
            filteredInvitations.map((invitation) => (
              <div key={invitation.id} className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm font-medium">
                              {invitation.invitedClubId.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base-content">
                            Club ID: {invitation.invitedClubId}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`badge ${getStatusColor(invitation.status)} flex items-center gap-1`}>
                              {getStatusIcon(invitation.status)}
                              {getStatusText(invitation.status)}
                            </div>
                            {isExpired(invitation.expiresAt) && invitation.status === InvitationStatus.PENDING && (
                              <div className="badge badge-error">
                                Hết hạn
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-base-content/60">
                        <div>
                          <span className="font-medium">Gửi lúc:</span>
                          <br />
                          {formatDate(invitation.createdAt)}
                        </div>
                        <div>
                          <span className="font-medium">Người gửi:</span>
                          <br />
                          {invitation.invitedBy}
                        </div>
                        {invitation.expiresAt && (
                          <div>
                            <span className="font-medium">Hết hạn:</span>
                            <br />
                            {formatDate(invitation.expiresAt)}
                          </div>
                        )}
                        {invitation.respondedAt && (
                          <div>
                            <span className="font-medium">Phản hồi lúc:</span>
                            <br />
                            {formatDate(invitation.respondedAt)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDeleteInvitation(invitation.id)}
                        disabled={isLoading}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Xóa
                      </button>
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
              Tổng: {invitations.length}
            </div>
            <div className="badge badge-warning">
              Chờ phản hồi: {invitations.filter(i => i.status === InvitationStatus.PENDING).length}
            </div>
            <div className="badge badge-success">
              Đã chấp nhận: {invitations.filter(i => i.status === InvitationStatus.ACCEPTED).length}
            </div>
            <div className="badge badge-error">
              Đã từ chối: {invitations.filter(i => i.status === InvitationStatus.DECLINED).length}
            </div>
            <div className="badge badge-neutral">
              Hết hạn: {invitations.filter(i => i.status === InvitationStatus.EXPIRED).length}
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
