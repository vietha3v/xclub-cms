'use client';

import React, { useState, useEffect } from 'react';
import { Send, UserPlus, Check, X, Clock, Mail, User, MessageSquare } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { TeamInvitation, SendTeamInvitationDto, RespondTeamInvitationDto } from '@/types/team';
import Modal from '@/components/common/Modal';

interface TeamInvitationManagerProps {
  teamId: string;
  isOpen: boolean;
  onClose: () => void;
  onInvitationSent: () => void;
  onInvitationResponded: () => void;
}

export default function TeamInvitationManager({
  teamId,
  isOpen,
  onClose,
  onInvitationSent,
  onInvitationResponded
}: TeamInvitationManagerProps) {
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [newInvitation, setNewInvitation] = useState<SendTeamInvitationDto>({
    inviteeId: '',
    message: '',
    expiresInDays: 7
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { showToast } = useToast();

  // API hooks
  const [{ data: invitationsData, loading, error }, refetch] = useAxios<TeamInvitation[]>(
    `/api/teams/${teamId}/invitations`,
    { manual: true }
  );

  const [, sendInvitation] = useAxios<TeamInvitation>(
    `/api/teams/${teamId}/invitations`,
    { method: 'POST', manual: true }
  );

  const [, respondInvitation] = useAxios<TeamInvitation>(
    '',
    { method: 'PUT', manual: true }
  );

  const [, deleteInvitation] = useAxios(
    '',
    { method: 'DELETE', manual: true }
  );

  useEffect(() => {
    if (isOpen && teamId) {
      refetch();
    }
  }, [isOpen, teamId]);

  useEffect(() => {
    if (invitationsData) {
      setInvitations(invitationsData);
    }
  }, [invitationsData]);

  const handleSendInvitation = async () => {
    if (!newInvitation.inviteeId) {
      showToast('Vui lòng chọn người được mời', 'error');
      return;
    }

    try {
      const response = await sendInvitation({ data: newInvitation });
      if (response.data) {
        setShowSendModal(false);
        setNewInvitation({
          inviteeId: '',
          message: '',
          expiresInDays: 7
        });
        refetch();
        onInvitationSent();
        showToast('Lời mời đã được gửi thành công!', 'success');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      showToast('Có lỗi xảy ra khi gửi lời mời', 'error');
    }
  };

  const handleRespondInvitation = async (invitationId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await respondInvitation({
        url: `/api/teams/invitations/${invitationId}`,
        data: { status } as RespondTeamInvitationDto
      });
      if (response.data) {
        refetch();
        onInvitationResponded();
        showToast(`Lời mời đã được ${status === 'accepted' ? 'chấp nhận' : 'từ chối'}!`, 'success');
      }
    } catch (error) {
      console.error('Error responding to invitation:', error);
      showToast('Có lỗi xảy ra khi phản hồi lời mời', 'error');
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lời mời này?')) return;

    try {
      await deleteInvitation({ url: `/api/teams/invitations/${invitationId}` });
      refetch();
      showToast('Lời mời đã được xóa!', 'success');
    } catch (error) {
      console.error('Error deleting invitation:', error);
      showToast('Có lỗi xảy ra khi xóa lời mời', 'error');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning">Chờ phản hồi</span>;
      case 'accepted':
        return <span className="badge badge-success">Đã chấp nhận</span>;
      case 'rejected':
        return <span className="badge badge-error">Đã từ chối</span>;
      case 'expired':
        return <span className="badge badge-neutral">Hết hạn</span>;
      default:
        return <span className="badge badge-outline">{status}</span>;
    }
  };

  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.inviteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invitation.inviterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invitation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Quản lý lời mời đội nhóm</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSendModal(true)}
              className="btn btn-primary"
            >
              <Send className="w-4 h-4 mr-1" />
              Gửi lời mời
            </button>
            <button
              onClick={onClose}
              className="btn btn-ghost"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="form-control flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm lời mời..."
                className="input input-bordered"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-control">
              <select
                className="select select-bordered"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ phản hồi</option>
                <option value="accepted">Đã chấp nhận</option>
                <option value="rejected">Đã từ chối</option>
                <option value="expired">Hết hạn</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invitations List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-error">Có lỗi xảy ra khi tải lời mời</p>
              <button
                onClick={() => refetch()}
                className="btn btn-outline mt-4"
              >
                Thử lại
              </button>
            </div>
          ) : filteredInvitations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/60">Không có lời mời nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInvitations.map((invitation) => (
                <div key={invitation.id} className="card bg-base-100 border">
                  <div className="card-body">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{invitation.inviteeName}</h3>
                            {getStatusBadge(invitation.status)}
                          </div>
                          
                          <div className="text-sm text-base-content/70 mb-2">
                            Được mời bởi <span className="font-medium">{invitation.inviterName}</span>
                          </div>
                          
                          {invitation.message && (
                            <div className="flex items-start gap-2 mb-2">
                              <MessageSquare className="w-4 h-4 mt-0.5 text-base-content/60" />
                              <p className="text-sm text-base-content/70">{invitation.message}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-base-content/60">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Gửi: {new Date(invitation.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            
                            {invitation.expiresAt && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Hết hạn: {new Date(invitation.expiresAt).toLocaleDateString('vi-VN')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {invitation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleRespondInvitation(invitation.id, 'accepted')}
                              className="btn btn-success btn-sm"
                              title="Chấp nhận"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRespondInvitation(invitation.id, 'rejected')}
                              className="btn btn-error btn-sm"
                              title="Từ chối"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDeleteInvitation(invitation.id)}
                          className="btn btn-ghost btn-sm text-error"
                          title="Xóa"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Send Invitation Modal */}
      <Modal isOpen={showSendModal} onClose={() => setShowSendModal(false)} size="md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Gửi lời mời tham gia đội</h3>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleSendInvitation();
          }} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Người được mời *</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Nhập tên hoặc email người được mời"
                value={newInvitation.inviteeId}
                onChange={(e) => setNewInvitation(prev => ({ ...prev, inviteeId: e.target.value }))}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Lời nhắn</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={3}
                placeholder="Nhập lời nhắn cho người được mời..."
                value={newInvitation.message}
                onChange={(e) => setNewInvitation(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Hết hạn sau (ngày)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                min="1"
                max="30"
                value={newInvitation.expiresInDays}
                onChange={(e) => setNewInvitation(prev => ({ ...prev, expiresInDays: Number(e.target.value) }))}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowSendModal(false)}
                className="btn btn-ghost"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Send className="w-4 h-4 mr-1" />
                Gửi lời mời
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Modal>
  );
}
