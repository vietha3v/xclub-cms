'use client';

import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types/challenge';
import { Play, Clock, Users, Trophy, Pause, CheckCircle, XCircle, Loader2, Edit, BarChart3, Mail, Settings } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { useState } from 'react';
import EditChallengeModal from './EditChallengeModal';
import ChallengeParticipantsModal from './ChallengeParticipantsModal';
import ChallengeInvitationsModal from './ChallengeInvitationsModal';
import ChallengeAnalyticsModal from './ChallengeAnalyticsModal';

interface ChallengeDetailActionsProps {
  challenge: Challenge;
  onChallengeUpdate?: () => void;
}

export default function ChallengeDetailActions({ challenge, onChallengeUpdate }: ChallengeDetailActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const { showToast } = useToast();

  // API calls
  const [, publishChallenge] = useAxios(`/api/challenges/${challenge.id}/publish`, { manual: true });
  const [, changeStatus] = useAxios(`/api/challenges/${challenge.id}/status`, { manual: true });

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await publishChallenge({ method: 'POST' });
      showToast('Thử thách đã được publish thành công!', 'success');
      onChallengeUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi publish thử thách', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async (newStatus: ChallengeStatus) => {
    setIsLoading(true);
    try {
      await changeStatus({ 
        method: 'PATCH', 
        data: { status: newStatus } 
      });
      showToast(`Trạng thái đã được thay đổi thành ${getStatusText(newStatus)}`, 'success');
      onChallengeUpdate?.();
    } catch (error) {
      showToast('Có lỗi xảy ra khi thay đổi trạng thái', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  const getStatusText = (status: ChallengeStatus) => {
    switch (status) {
      case ChallengeStatus.ACTIVE:
        return 'Đang diễn ra';
      case ChallengeStatus.PUBLISHED:
        return 'Đã xuất bản';
      case ChallengeStatus.COMPLETED:
        return 'Đã hoàn thành';
      case ChallengeStatus.CANCELLED:
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Hành động</h3>
          <div className="space-y-3">
            {challenge.status === ChallengeStatus.ACTIVE && (
              <button className="btn btn-primary w-full">
                <Play className="w-4 h-4" />
                Tham gia thử thách
              </button>
            )}
            
            {challenge.status === ChallengeStatus.PUBLISHED && (
              <button 
                className="btn btn-outline w-full" 
                disabled
              >
                <Clock className="w-4 h-4" />
                Chưa bắt đầu
              </button>
            )}

            {/* Admin actions */}
            {challenge.status === ChallengeStatus.PUBLISHED && (
              <button 
                className="btn btn-primary w-full"
                onClick={handlePublish}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Bắt đầu thử thách
              </button>
            )}

            {challenge.status === ChallengeStatus.ACTIVE && (
              <div className="flex gap-2">
                <button 
                  className="btn btn-warning flex-1"
                  onClick={() => handleChangeStatus(ChallengeStatus.PAUSED)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                  Tạm dừng
                </button>
                <button 
                  className="btn btn-success flex-1"
                  onClick={() => handleChangeStatus(ChallengeStatus.COMPLETED)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Hoàn thành
                </button>
              </div>
            )}

            {/* Admin Management Buttons */}
            <div className="divider my-4">Quản lý thử thách</div>
            
            <button 
              className="btn btn-outline w-full"
              onClick={() => setShowEditModal(true)}
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa thử thách
            </button>

            <button 
              className="btn btn-outline w-full"
              onClick={() => setShowParticipantsModal(true)}
            >
              <Users className="w-4 h-4" />
              Quản lý người tham gia
            </button>

            <button 
              className="btn btn-outline w-full"
              onClick={() => setShowInvitationsModal(true)}
            >
              <Mail className="w-4 h-4" />
              Quản lý lời mời
            </button>

            <button 
              className="btn btn-outline w-full"
              onClick={() => setShowAnalyticsModal(true)}
            >
              <BarChart3 className="w-4 h-4" />
              Phân tích chi tiết
            </button>

            <button className="btn btn-outline w-full">
              <Trophy className="w-4 h-4" />
              Xem bảng xếp hạng
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Thống kê</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-base-content/60">Người tham gia</span>
              <span className="font-medium">{challenge.participantCount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Trạng thái</span>
              <span className="font-medium">{getStatusText(challenge.status)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Loại</span>
              <span className="font-medium">
                {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Độ khó</span>
              <span className="font-medium">{challenge.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditChallengeModal
          challenge={challenge}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onChallengeUpdate?.();
            showToast('Thử thách đã được cập nhật thành công!', 'success');
          }}
        />
      )}

      {showParticipantsModal && (
        <ChallengeParticipantsModal
          challenge={challenge}
          onClose={() => setShowParticipantsModal(false)}
          onUpdate={() => {
            onChallengeUpdate?.();
            showToast('Danh sách người tham gia đã được cập nhật!', 'success');
          }}
        />
      )}

      {showInvitationsModal && (
        <ChallengeInvitationsModal
          challenge={challenge}
          onClose={() => setShowInvitationsModal(false)}
          onUpdate={() => {
            onChallengeUpdate?.();
            showToast('Danh sách lời mời đã được cập nhật!', 'success');
          }}
        />
      )}

      {showAnalyticsModal && (
        <ChallengeAnalyticsModal
          challenge={challenge}
          onClose={() => setShowAnalyticsModal(false)}
        />
      )}
    </div>
  );
}
