'use client';

import React, { useState } from 'react';
import { ChallengeInvitation, InvitationStatus } from '@/types/challenge';
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

interface TeamInvitationCardProps {
  invitation: ChallengeInvitation;
  onRespond?: (invitationId: string, status: InvitationStatus) => void;
  onViewChallenge?: (challengeId: string) => void;
}

export default function TeamInvitationCard({ 
  invitation, 
  onRespond, 
  onViewChallenge 
}: TeamInvitationCardProps) {
  const [isResponding, setIsResponding] = useState(false);
  const { showToast } = useToast();

  // API call để respond invitation
  const [, respondInvitation] = useAxios(
    `/api/challenges/invitations/${invitation.id}/respond`,
    { method: 'PATCH', manual: true }
  );

  const handleRespond = async (status: InvitationStatus) => {
    setIsResponding(true);
    try {
      await respondInvitation({
        data: { status }
      });
      
      showToast(
        status === InvitationStatus.ACCEPTED 
          ? 'Đã chấp nhận lời mời tham gia thử thách!' 
          : 'Đã từ chối lời mời tham gia thử thách!',
        'success'
      );
      
      onRespond?.(invitation.id, status);
    } catch (error) {
      showToast('Có lỗi xảy ra khi phản hồi lời mời', 'error');
    } finally {
      setIsResponding(false);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
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
        return 'Đã hết hạn';
      default:
        return status;
    }
  };

  const isExpired = invitation.expiresAt && new Date() > new Date(invitation.expiresAt);
  const canRespond = invitation.status === InvitationStatus.PENDING && !isExpired;

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="card-title text-lg">
              {invitation.challenge?.name || 'Thử thách không xác định'}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className={`badge ${getStatusColor(invitation.status)} flex items-center gap-1`}>
                {getStatusIcon(invitation.status)}
                {getStatusText(invitation.status)}
              </div>
              {isExpired && invitation.status === InvitationStatus.PENDING && (
                <div className="badge badge-error">
                  Hết hạn
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Challenge Info */}
        {invitation.challenge && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {formatDate(invitation.challenge.startDate)} - {formatDate(invitation.challenge.endDate)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>
                Tối đa {invitation.challenge.maxTeamMembers || 'không giới hạn'} thành viên/team
              </span>
            </div>

            {invitation.challenge.description && (
              <p className="text-sm text-base-content/70 line-clamp-2">
                {invitation.challenge.description}
              </p>
            )}
          </div>
        )}

        {/* Invitation Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div>
            <span className="font-medium">Người gửi:</span> {invitation.invitedBy}
          </div>
          <div>
            <span className="font-medium">Thời gian gửi:</span> {formatDate(invitation.createdAt)}
          </div>
          {invitation.expiresAt && (
            <div>
              <span className="font-medium">Hết hạn:</span> {formatDate(invitation.expiresAt)}
            </div>
          )}
          {invitation.respondedAt && (
            <div>
              <span className="font-medium">Phản hồi lúc:</span> {formatDate(invitation.respondedAt)}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions justify-end">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => onViewChallenge?.(invitation.challengeId)}
          >
            Xem thử thách
          </button>
          
          {canRespond && (
            <>
              <button 
                className="btn btn-error btn-sm"
                onClick={() => handleRespond(InvitationStatus.DECLINED)}
                disabled={isResponding}
              >
                {isResponding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Từ chối'
                )}
              </button>
              <button 
                className="btn btn-success btn-sm"
                onClick={() => handleRespond(InvitationStatus.ACCEPTED)}
                disabled={isResponding}
              >
                {isResponding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Chấp nhận'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
