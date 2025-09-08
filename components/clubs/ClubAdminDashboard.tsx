'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Settings, 
  BarChart3, 
  UserPlus, 
  Shield,
  Crown,
  UserCheck,
  Activity,
  TrendingUp,
  Trash2
} from 'lucide-react';
import ClubMemberManagement from './ClubMemberManagement';
import EditClubModal from './EditClubModal';

interface ClubAdminDashboardProps {
  clubId: string;
}

export default function ClubAdminDashboard({ clubId }: ClubAdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events' | 'challenges' | 'settings'>('overview');
  const [showEditModal, setShowEditModal] = useState(false);

  const [{ data: club, loading, error }, refetchClub] = useAxios<Club>(
    `/api/clubs/${clubId}`,
    { manual: true }
  );

  useEffect(() => {
    loadClub();
  }, [clubId]);

  const loadClub = async () => {
    try {
      await refetchClub();
    } catch (err) {
      console.error('Load club error:', err);
    }
  };

  const getRoleInfo = () => {
    if (!club?.userRole) return { role: 'guest', label: 'Khách', color: 'badge-ghost' };
    
    if (club.userRole.includes('admin')) {
      return { role: 'admin', label: 'Admin', color: 'badge-warning' };
    }
    if (club.userRole.includes('moderator')) {
      return { role: 'moderator', label: 'Moderator', color: 'badge-info' };
    }
    if (club.userRole.includes('member')) {
      return { role: 'member', label: 'Thành viên', color: 'badge-success' };
    }
    
    return { role: 'guest', label: 'Khách', color: 'badge-ghost' };
  };

  const roleInfo = getRoleInfo();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Đang tải thông tin CLB...</p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-base-content/30">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Không thể tải thông tin CLB</h2>
          <p className="text-base-content/70 mb-6">
            {error ? 'Có lỗi xảy ra khi tải dữ liệu' : 'CLB không tồn tại hoặc đã bị xóa'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={loadClub}
              className="btn btn-outline"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Thử lại
            </button>
            <button
              onClick={() => router.push('/clubs')}
              className="btn btn-primary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Về danh sách CLB
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = club?.userRole?.includes('admin') || false;
  const isModerator = club?.userRole?.includes('moderator') || false;
  const isMember = club?.userRole?.includes('member') || false;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.push('/clubs')}
            className="btn btn-ghost btn-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {club.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge ${roleInfo.color}`}>
                {roleInfo.label}
              </span>
              <span className="text-sm text-base-content/70">
                Bảng quản trị
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`btn btn-sm whitespace-nowrap ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`btn btn-sm whitespace-nowrap ${activeTab === 'members' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Users className="w-4 h-4 mr-1" />
            Thành viên
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`btn btn-sm whitespace-nowrap ${activeTab === 'events' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Sự kiện
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`btn btn-sm whitespace-nowrap ${activeTab === 'challenges' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Trophy className="w-4 h-4 mr-1" />
            Thử thách
          </button>
          {(isAdmin || isModerator) && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`btn btn-sm whitespace-nowrap ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline'}`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Cài đặt
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/70">Thành viên</p>
                      <p className="text-2xl font-bold">{club.memberCount || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/70">Sự kiện</p>
                      <p className="text-2xl font-bold">{club.eventCount || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-success" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/70">Thử thách</p>
                      <p className="text-2xl font-bold">{club.challengeCount || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/70">Hoạt động</p>
                      <p className="text-2xl font-bold">
                        {(club.memberCount || 0) + (club.eventCount || 0) + (club.challengeCount || 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-info" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  <TrendingUp className="w-5 h-5" />
                  Thao tác nhanh
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('members')}
                    className="btn btn-outline btn-lg justify-start"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Quản lý thành viên
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="btn btn-outline btn-lg justify-start"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Tạo sự kiện
                  </button>
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className="btn btn-outline btn-lg justify-start"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Tạo thử thách
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <ClubMemberManagement
            club={club}
            isAdmin={isAdmin}
            isModerator={isModerator}
            onUpdate={loadClub}
          />
        )}

        {activeTab === 'events' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">
                <Calendar className="w-5 h-5" />
                Quản lý sự kiện
              </h3>
              <p className="text-base-content/70">
                Tính năng quản lý sự kiện sẽ được phát triển trong module Events.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">
                <Trophy className="w-5 h-5" />
                Quản lý thử thách
              </h3>
              <p className="text-base-content/70">
                Tính năng quản lý thử thách sẽ được phát triển trong module Challenges.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                  <Settings className="w-5 h-5" />
                  Cài đặt CLB
                </h3>
                
                <div className="space-y-4">
                  {/* Club Info */}
                  <div className="bg-base-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Thông tin CLB</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-base-content/70">Tên CLB:</span>
                        <span className="ml-2 font-medium">{club?.name}</span>
                      </div>
                      <div>
                        <span className="text-base-content/70">Trạng thái:</span>
                        <span className={`ml-2 badge ${club?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                          {club?.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </span>
                      </div>
                      <div>
                        <span className="text-base-content/70">Loại CLB:</span>
                        <span className="ml-2 font-medium">{club?.type === 'public' ? 'Công khai' : 'Riêng tư'}</span>
                      </div>
                      <div>
                        <span className="text-base-content/70">Ngày tạo:</span>
                        <span className="ml-2 font-medium">
                          {club?.createdAt ? new Date(club.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="btn btn-primary"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Chỉnh sửa CLB
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Bạn có chắc chắn muốn xóa CLB này không? Hành động này không thể hoàn tác!')) {
                          // TODO: Implement delete functionality
                          console.log('Delete club:', club?.id);
                        }
                      }}
                      className="btn btn-error"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa CLB
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Club Modal */}
      {showEditModal && (
        <EditClubModal
          club={club}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            loadClub();
          }}
        />
      )}
    </div>
  );
}
