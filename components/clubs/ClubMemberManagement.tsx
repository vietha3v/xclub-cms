'use client';

import { useState, useEffect } from 'react';
import { Club, ClubMember } from '@/types/club';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import Tabs, { TabItem } from '@/components/common/Tabs';
import dlv from 'dlv';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Shield, 
  ShieldCheck, 
  UserX, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  Crown,
  UserCheck
} from 'lucide-react';

interface ClubMemberManagementProps {
  clubId: string;
}

// PendingRequest is the same as ClubMember
type PendingRequest = ClubMember;

export default function ClubMemberManagement({ 
  clubId
}: ClubMemberManagementProps) {
  const { showToast } = useToast();
  const [club, setClub] = useState<Club | null>(null);
  const [activeTab, setActiveTab] = useState<'members' | 'pending'>('members');
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);
  const [showMemberActions, setShowMemberActions] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Fetch club data
  const [{ data: clubData, loading: clubLoading, error: clubError }, refetchClub] = useAxios<Club>(
    `/api/clubs/${clubId}`,
    { manual: true }
  );

  useEffect(() => {
    if (clubId) {
      refetchClub();
    }
  }, [clubId, refetchClub]);

  useEffect(() => {
    if (clubData) {
      setClub(clubData);
    }
  }, [clubData]);

  // Check user permissions
  const isAdmin = club?.userRole?.includes('admin') || false;
  const isModerator = club?.userRole?.includes('moderator') || false;

  // API hooks
  const [{ data: membersData, loading: membersLoading, error: membersError }, fetchMembers] = useAxios<{ members: ClubMember[]; total: number }>(
    clubId ? `/api/clubs/${clubId}/members?status=active` : '',
    { manual: true }
  );

  const [{ data: pendingData, loading: pendingLoading, error: pendingError }, fetchPendingRequests] = useAxios<{ members: PendingRequest[]; total: number }>(
    clubId ? `/api/clubs/${clubId}/members?status=pending` : '',
    { manual: true }
  );

  // Extract arrays from API response
  const members = membersData?.members || [];
  const pendingRequests = pendingData?.members || [];

  const [{ loading: updateRoleLoading }, updateMemberRole] = useAxios(
    clubId && selectedMember ? `/api/clubs/${clubId}/members/${selectedMember.userId}/role` : '',
    { manual: true }
  );

  const [{ loading: updateStatusLoading }, updateMemberStatus] = useAxios(
    clubId && selectedMember ? `/api/clubs/${clubId}/members/${selectedMember.userId}/status` : '',
    { manual: true }
  );

  const [{ loading: removeMemberLoading }, removeMember] = useAxios(
    clubId && selectedMember ? `/api/clubs/${clubId}/members/${selectedMember.userId}` : '',
    { manual: true }
  );

  // Load data on mount
  useEffect(() => {
    if (clubId) {
      fetchMembers();
      if (isAdmin || isModerator) {
        fetchPendingRequests();
      }
    }
  }, [clubId, fetchMembers, fetchPendingRequests, isAdmin, isModerator]);

  const [, executeApprove] = useAxios(
    {
      url: '',
      method: 'PUT'
    },
    { manual: true }
  );

  const handleApproveRequest = async (request: PendingRequest) => {
    try {
      await executeApprove({
        url: `/api/clubs/${clubId}/members/${request.userId}/status`,
        data: { status: 'active' }
      });
      
      showToast({
        type: 'success',
        message: 'Đã duyệt yêu cầu tham gia',
        title: 'Thành công'
      });
      fetchPendingRequests();
      fetchMembers();
    } catch (error: unknown) {
      console.error('Approve request error:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi duyệt yêu cầu',
        title: 'Lỗi'
      });
    }
  };

  const [, executeReject] = useAxios(
    {
      url: '',
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleRejectRequest = async (request: PendingRequest) => {
    if (!confirm('Bạn có chắc chắn muốn từ chối yêu cầu này?')) {
      return;
    }

    try {
      await executeReject({
        url: `/api/clubs/${clubId}/members/${request.userId}`,
        data: { reason: 'Yêu cầu bị từ chối' }
      });
      
      showToast({
        type: 'success',
        message: 'Đã từ chối yêu cầu tham gia',
        title: 'Thành công'
      });
      fetchPendingRequests();
    } catch (error: unknown) {
      console.error('Reject request error:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi từ chối yêu cầu',
        title: 'Lỗi'
      });
    }
  };

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedMember) return;

    try {
      await updateMemberRole({
        method: 'PUT',
        data: { role: newRole }
      });
      
      showToast({
        type: 'success',
        message: 'Đã cập nhật vai trò thành viên',
        title: 'Thành công'
      });
      setShowRoleModal(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error: unknown) {
      console.error('Update role error:', error);
      showToast({
        type: 'error',
        message: dlv(error as any, 'response.data.message', 'Có lỗi xảy ra khi cập nhật vai trò'),
        title: 'Lỗi'
      });
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedMember) return;

    try {
      await updateMemberStatus({
        method: 'PUT',
        data: { status: newStatus }
      });
      
      showToast({
        type: 'success',
        message: 'Đã cập nhật trạng thái thành viên',
        title: 'Thành công'
      });
      setShowStatusModal(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error: unknown) {
      console.error('Update status error:', error);
      showToast({
        type: 'error',
        message: dlv(error as any, 'response.data.message', 'Có lỗi xảy ra khi cập nhật trạng thái'),
        title: 'Lỗi'
      });
    }
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;

    if (!confirm(`Bạn có chắc chắn muốn xóa thành viên ${selectedMember.user.firstName} ${selectedMember.user.lastName}?`)) {
      return;
    }

    try {
      await removeMember({
        method: 'DELETE',
        data: { reason: 'Bị xóa bởi admin' }
      });
      
      showToast({
        type: 'success',
        message: 'Đã xóa thành viên',
        title: 'Thành công'
      });
      setShowMemberActions(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error: unknown) {
      console.error('Remove member error:', error);
      showToast({
        type: 'error',
        message: dlv(error as any, 'response.data.message', 'Có lỗi xảy ra khi xóa thành viên'),
        title: 'Lỗi'
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-red-500" />;
      case 'moderator':
        return <Shield className="w-4 h-4 text-yellow-500" />;
      case 'member':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge-error';
      case 'moderator':
        return 'badge-warning';
      case 'member':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị';
      case 'moderator':
        return 'Điều hành';
      case 'member':
        return 'Thành viên';
      default:
        return 'Không xác định';
    }
  };

  const canManageMembers = isAdmin || isModerator;

  if (clubLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="animate-pulse">
            <div className="h-6 bg-base-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-base-200 rounded w-2/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-8 bg-base-200 rounded"></div>
              <div className="h-8 bg-base-200 rounded"></div>
              <div className="h-8 bg-base-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Lỗi tải dữ liệu</h2>
          <p className="text-base-content/70 mb-6">
            Không thể tải thông tin CLB. Vui lòng thử lại.
          </p>
          <button onClick={() => refetchClub()} className="btn btn-primary">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!canManageMembers) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">
            <Users className="w-5 h-5" />
            Quản lý thành viên
          </h2>
        </div>

        <Tabs
          tabs={[
            {
              id: 'members',
              label: 'Thành viên',
              icon: '👥',
              badge: dlv(members, 'length', 0)
            },
            {
              id: 'pending',
              label: 'Chờ duyệt',
              icon: '⏳',
              badge: dlv(pendingRequests, 'length', 0)
            }
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'members' | 'pending')}
          variant="default"
          size="md"
          fullWidth={false}
        />

        {activeTab === 'members' && (
          <div className="space-y-4">
            {membersLoading ? (
              <div className="text-center py-8">
                <div className="loading loading-spinner loading-md text-primary"></div>
                <p className="mt-2 text-base-content/70">Đang tải danh sách thành viên...</p>
              </div>
            ) : membersError ? (
              <div className="alert alert-error">
                <span>Lỗi: {membersError.message || 'Không thể tải danh sách thành viên'}</span>
              </div>
            ) : dlv(members, 'length', 0) === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
                <p className="text-base-content/70">Chưa có thành viên nào</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="hidden sm:table-cell">Tên thành viên</th>
                      <th className="hidden md:table-cell">Vai trò</th>
                      <th className="hidden lg:table-cell">Ngày tham gia</th>
                      <th className="hidden sm:table-cell">Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dlv(members, 'map', []).map((member: any, index: number) => (
                      <tr 
                        key={member.id} 
                        className="hover transition-all duration-200"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards'
                        }}
                      >
                        <td className="sm:table-cell">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                {member.user.avatar ? (
                                  <img src={member.user.avatar} alt={member.user.firstName} />
                                ) : (
                                  <span className="text-sm font-medium">
                                    {member.user.firstName[0]}{member.user.lastName[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="hidden sm:block">
                              <div className="font-medium">
                                {member.user.firstName} {member.user.lastName}
                              </div>
                              <div className="text-sm text-base-content/70">
                                {member.user.email}
                              </div>
                            </div>
                            <div className="sm:hidden">
                              <div className="font-medium text-sm">
                                {member.user.firstName} {member.user.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(member.role)}
                            <span className={`badge badge-sm ${getRoleColor(member.role)}`}>
                              {getRoleText(member.role)}
                            </span>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell">
                          <span className="text-sm">
                            {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell">
                          <span className={`badge badge-sm ${member.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {member.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                              <MoreVertical className="w-4 h-4" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li>
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowRoleModal(true);
                                  }}
                                  className="text-sm"
                                >
                                  <Shield className="w-4 h-4" />
                                  Thay đổi vai trò
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowStatusModal(true);
                                  }}
                                  className="text-sm"
                                >
                                  <UserX className="w-4 h-4" />
                                  Thay đổi trạng thái
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowMemberActions(true);
                                  }}
                                  className="text-sm text-error"
                                >
                                  <UserMinus className="w-4 h-4" />
                                  Xóa thành viên
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingLoading ? (
              <div className="text-center py-8">
                <div className="loading loading-spinner loading-md text-primary"></div>
                <p className="mt-2 text-base-content/70">Đang tải yêu cầu chờ duyệt...</p>
              </div>
            ) : pendingError ? (
              <div className="alert alert-error">
                <span>Lỗi: {pendingError.message || 'Không thể tải yêu cầu chờ duyệt'}</span>
              </div>
            ) : dlv(pendingRequests, 'length', 0) === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
                <p className="text-base-content/70">Không có yêu cầu tham gia nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dlv(pendingRequests, 'map', []).map((request: any) => (
                  <div key={request.id} className="card bg-base-200 shadow-sm">
                    <div className="card-body p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                              {request.user.avatar ? (
                                <img src={request.user.avatar} alt={request.user.firstName} />
                              ) : (
                                <span className="text-sm font-medium">
                                  {request.user.firstName[0]}{request.user.lastName[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">
                              {request.user.firstName} {request.user.lastName}
                            </div>
                            <div className="text-sm text-base-content/70">
                              {request.user.email}
                            </div>
                            {request.notes && (
                              <div className="text-sm text-base-content/60 mt-1">
                                &quot;{request.notes}&quot;
                              </div>
                            )}
                            <div className="text-xs text-base-content/50">
                              {new Date(request.joinedAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveRequest(request)}
                            className="btn btn-success btn-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request)}
                            className="btn btn-error btn-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            Từ chối
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Role Update Modal */}
        {showRoleModal && selectedMember && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Thay đổi vai trò</h3>
              <p className="mb-4">
                Thay đổi vai trò của <strong>{selectedMember.user.firstName} {selectedMember.user.lastName}</strong>
              </p>
              <div className="space-y-2">
                {['member', 'moderator', 'admin'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleUpdateRole(role)}
                    disabled={updateRoleLoading}
                    className={`btn btn-sm w-full justify-start ${
                      selectedMember.role === role ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {getRoleIcon(role)}
                    {getRoleText(role)}
                  </button>
                ))}
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedMember(null);
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusModal && selectedMember && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Thay đổi trạng thái</h3>
              <p className="mb-4">
                Thay đổi trạng thái của <strong>{selectedMember.user.firstName} {selectedMember.user.lastName}</strong>
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleUpdateStatus('active')}
                  disabled={updateStatusLoading}
                  className={`btn btn-sm w-full justify-start ${
                    selectedMember.status === 'active' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Hoạt động
                </button>
                <button
                  onClick={() => handleUpdateStatus('inactive')}
                  disabled={updateStatusLoading}
                  className={`btn btn-sm w-full justify-start ${
                    selectedMember.status === 'inactive' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  Tạm khóa
                </button>
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedMember(null);
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Member Confirmation */}
        {showMemberActions && selectedMember && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Xác nhận xóa thành viên</h3>
              <p className="mb-4">
                Bạn có chắc chắn muốn xóa thành viên <strong>{selectedMember.user.firstName} {selectedMember.user.lastName}</strong> khỏi CLB?
              </p>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setShowMemberActions(false);
                    setSelectedMember(null);
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Hủy
                </button>
                <button
                  onClick={handleRemoveMember}
                  disabled={removeMemberLoading}
                  className="btn btn-error btn-sm"
                >
                  {removeMemberLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <UserMinus className="w-4 h-4" />
                  )}
                  Xóa thành viên
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
