'use client';

import { useState } from 'react';
import { Challenge } from '@/types/challenge';
import { useChallengePermissions } from '@/hooks/useChallengePermissions';
import { X, Settings, Users, Mail, BarChart3, Crown } from 'lucide-react';
import EditChallengeModal from './EditChallengeModal';
import ChallengeParticipantsModal from './ChallengeParticipantsModal';
import ChallengeInvitationsModal from './ChallengeInvitationsModal';
import ChallengeAnalyticsModal from './ChallengeAnalyticsModal';

interface AdvancedAdminModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

type AdminTab = 'challenge' | 'participants' | 'invitations' | 'analytics' | 'club';

export default function AdvancedAdminModal({ 
  challenge, 
  isOpen, 
  onClose, 
  onUpdate 
}: AdvancedAdminModalProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('challenge');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const permissions = useChallengePermissions(challenge);

  // Không có quyền thì không hiển thị gì cả
  if (!permissions.canEdit && !permissions.canManageClub) {
    return null;
  }

  const handleTabClick = (tab: AdminTab) => {
    setActiveTab(tab);
    
    // Mở modal tương ứng khi click tab
    switch (tab) {
      case 'challenge':
        setShowEditModal(true);
        break;
      case 'participants':
        setShowParticipantsModal(true);
        break;
      case 'invitations':
        setShowInvitationsModal(true);
        break;
      case 'analytics':
        setShowAnalyticsModal(true);
        break;
      case 'club':
        // TODO: Mở club management modal
        break;
    }
  };

  const getTabIcon = (tab: AdminTab) => {
    switch (tab) {
      case 'challenge':
        return <Settings className="w-4 h-4" />;
      case 'participants':
        return <Users className="w-4 h-4" />;
      case 'invitations':
        return <Mail className="w-4 h-4" />;
      case 'analytics':
        return <BarChart3 className="w-4 h-4" />;
      case 'club':
        return <Crown className="w-4 h-4" />;
    }
  };

  const getTabLabel = (tab: AdminTab) => {
    switch (tab) {
      case 'challenge':
        return 'Chỉnh sửa thử thách';
      case 'participants':
        return 'Quản lý người tham gia';
      case 'invitations':
        return 'Quản lý lời mời';
      case 'analytics':
        return 'Phân tích chi tiết';
      case 'club':
        return 'Quản lý CLB';
    }
  };

  const isTabVisible = (tab: AdminTab) => {
    switch (tab) {
      case 'challenge':
      case 'participants':
      case 'invitations':
      case 'analytics':
        return permissions.canEdit; // Chỉ Creator
      case 'club':
        return permissions.canManageClub; // Creator hoặc Club Manager
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Quản trị nâng cao</h3>
            <button 
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="tabs tabs-boxed bg-base-200 mb-6">
            {(['challenge', 'participants', 'invitations', 'analytics', 'club'] as AdminTab[]).map((tab) => (
              isTabVisible(tab) && (
                <button
                  key={tab}
                  className={`tab tab-sm ${activeTab === tab ? 'tab-active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {getTabIcon(tab)}
                  <span className="ml-2">{getTabLabel(tab)}</span>
                </button>
              )
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'challenge' && (
              <div className="text-center py-8">
                <Settings className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Chỉnh sửa thử thách</h4>
                <p className="text-base-content/70 mb-4">
                  Quản lý thông tin, cài đặt và trạng thái của thử thách
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowEditModal(true)}
                >
                  Mở chỉnh sửa
                </button>
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Quản lý người tham gia</h4>
                <p className="text-base-content/70 mb-4">
                  Duyệt, từ chối và quản lý danh sách người tham gia
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  Mở quản lý
                </button>
              </div>
            )}

            {activeTab === 'invitations' && (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Quản lý lời mời</h4>
                <p className="text-base-content/70 mb-4">
                  Gửi và quản lý lời mời tham gia thử thách
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowInvitationsModal(true)}
                >
                  Mở quản lý
                </button>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Phân tích chi tiết</h4>
                <p className="text-base-content/70 mb-4">
                  Xem thống kê và phân tích hiệu suất thử thách
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAnalyticsModal(true)}
                >
                  Mở phân tích
                </button>
              </div>
            )}

            {activeTab === 'club' && (
              <div className="text-center py-8">
                <Crown className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold mb-2">Quản lý CLB</h4>
                <p className="text-base-content/70 mb-4">
                  Quản lý thành viên và hoạt động của CLB trong thử thách
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {/* TODO: Mở club management */}}
                >
                  Mở quản lý CLB
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
      </div>

      {/* Sub-modals */}
      {showEditModal && (
        <EditChallengeModal
          challenge={challenge}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onUpdate?.();
          }}
        />
      )}

      {showParticipantsModal && (
        <ChallengeParticipantsModal
          challenge={challenge}
          isOpen={showParticipantsModal}
          onClose={() => setShowParticipantsModal(false)}
          onParticipantUpdate={() => {
            onUpdate?.();
          }}
        />
      )}

      {showInvitationsModal && (
        <ChallengeInvitationsModal
          challenge={challenge}
          isOpen={showInvitationsModal}
          onClose={() => setShowInvitationsModal(false)}
          onInvitationUpdate={() => {
            onUpdate?.();
          }}
        />
      )}

      {showAnalyticsModal && (
        <ChallengeAnalyticsModal
          challenge={challenge}
          isOpen={showAnalyticsModal}
          onClose={() => setShowAnalyticsModal(false)}
        />
      )}
    </>
  );
}
