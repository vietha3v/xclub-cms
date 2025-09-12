'use client';

import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types/challenge';
import { Play, Clock, Users, Trophy, Pause, CheckCircle, XCircle, Loader2, Edit, BarChart3, Mail, Settings } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { useState } from 'react';
import { useChallengePermissions } from '@/hooks/useChallengePermissions';
import AdvancedAdminModal from './AdvancedAdminModal';

interface ChallengeDetailActionsProps {
  challenge: Challenge;
  onChallengeUpdate?: () => void;
}

export default function ChallengeDetailActions({ challenge, onChallengeUpdate }: ChallengeDetailActionsProps) {
  const [showAdvancedAdminModal, setShowAdvancedAdminModal] = useState(false);
  const { showToast } = useToast();
  
  // Check permissions
  const permissions = useChallengePermissions(challenge);

  // API calls
  const [{ loading: publishLoading }, publishChallenge] = useAxios({
    url: `/api/challenges/${challenge.id}/publish`,
    method: 'POST'
  }, { manual: true });
  const [{ loading: statusLoading }, changeStatus] = useAxios({
    url: `/api/challenges/${challenge.id}/status`,
    method: 'PATCH'
  }, { manual: true });
  
  const isLoading = publishLoading || statusLoading;

  const handlePublish = async () => {
    try {
      await publishChallenge();
      showToast({
        type: 'success',
        message: 'Thử thách đã được publish thành công!'
      });
      onChallengeUpdate?.();
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi publish thử thách'
      });
    }
  };

  const handleChangeStatus = async (newStatus: ChallengeStatus) => {
    try {
      await changeStatus({ 
        data: { status: newStatus } 
      });
      showToast({
        type: 'success',
        message: `Trạng thái đã được thay đổi thành ${getStatusText(newStatus)}`
      });
      onChallengeUpdate?.();
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi thay đổi trạng thái'
      });
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

            {/* Admin actions - Chỉ hiển thị cho Creator */}
            {permissions.canPublishChallenge && challenge.status === ChallengeStatus.PUBLISHED && (
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

            {permissions.canChangeStatus && challenge.status === ChallengeStatus.ACTIVE && (
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

            {/* Admin Management Button - Chỉ hiển thị cho Creator và Club Manager */}
            {(permissions.canEdit || permissions.canManageClub) && (
              <>
                <div className="divider my-4">Quản trị nâng cao</div>
                
                <button 
                  className="btn btn-outline w-full"
                  onClick={() => setShowAdvancedAdminModal(true)}
                >
                  <Settings className="w-4 h-4" />
                  Quản trị nâng cao
                </button>
              </>
            )}

            {/* Common actions - Hiển thị cho tất cả */}
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

      {/* Advanced Admin Modal */}
      {showAdvancedAdminModal && (
        <AdvancedAdminModal
          challenge={challenge}
          isOpen={showAdvancedAdminModal}
          onClose={() => setShowAdvancedAdminModal(false)}
          onUpdate={() => {
            onChallengeUpdate?.();
            showToast({
              type: 'success',
              message: 'Cập nhật thành công!'
            });
          }}
        />
      )}
    </div>
  );
}
