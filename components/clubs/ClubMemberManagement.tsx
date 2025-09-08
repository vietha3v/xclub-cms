'use client';

import { useState, useEffect } from 'react';
import { Club, ClubMember } from '@/types/club';
import useAxios from '@/hooks/useAxios';
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

  const handleApproveRequest = async (request: PendingRequest) => {
    try {
      // Tạo API call động cho user cụ thể
      const response = await fetch(`/api/clubs/${clubId}/members/${request.userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'active' })
      });

      if (!response.ok) {
        throw new Error('Failed to approve request');
      }
      
      alert('Đã duyệt yêu cầu tham gia');
      fetchPendingRequests();
      fetchMembers();
      onUpdate?.();
    } catch (error: any) {
      console.error('Approve request error:', error);
      alert('Có lỗi xảy ra khi duyệt yêu cầu');
    }
  };

  const handleRejectRequest = async (request: PendingRequest) => {
    if (!confirm('Bạn có chắc chắn muốn từ chối yêu cầu này?')) {
      return;
    }

    try {
      // Tạo API call động để xóa member
      const response = await fetch(`/api/clubs/${clubId}/members/${request.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: 'Yêu cầu bị từ chối' })
      });

      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
      
      alert('Đã từ chối yêu cầu tham gia');
      fetchPendingRequests();
      onUpdate?.();
    } catch (error: any) {
      console.error('Reject request error:', error);
      alert('Có lỗi xảy ra khi từ chối yêu cầu');
    }
  };

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedMember) return;

    try {
      await updateMemberRole({
        method: 'PUT',
        data: { role: newRole }
      });
      
      alert('Đã cập nhật vai trò thành viên');
      setShowRoleModal(false);
      setSelectedMember(null);
      fetchMembers();
      onUpdate?.();
    } catch (error: any) {
      console.error('Update role error:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật vai trò');
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedMember) return;

    try {
      await updateMemberStatus({
        method: 'PUT',
        data: { status: newStatus }
      });
      
      alert('Đã cập nhật trạng thái thành viên');
      setShowStatusModal(false);
      setSelectedMember(null);
      fetchMembers();
      onUpdate?.();
    } catch (error: any) {
      console.error('Update status error:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái');
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
      
      alert('Đã xóa thành viên');
      setShowMemberActions(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error: any) {
      console.error('Remove member error:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa thành viên');
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
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold mb-4">Không có quyền</h2>
          <p className="text-base-content/70">
            Bạn không có quyền quản lý thành viên của CLB này.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">
            <Users className="w-5 h-5" />
            Quản lý thành viên
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('members')}
              className={`btn btn-sm ${activeTab === 'members' ? 'btn-primary' : 'btn-outline'}`}
            >
              Thành viên ({members?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`btn btn-sm ${activeTab === 'pending' ? 'btn-primary' : 'btn-outline'}`}
            >
              Chờ duyệt ({pendingRequests?.length || 0})
            </button>
          </div>
        </div>

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
            ) : !members || !Array.isArray(members) || members.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
                <p className="text-base-content/70">Chưa có thành viên nào</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Tên thành viên</th>
                      <th>Vai trò</th>
                      <th>Ngày tham gia</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(members) && members.map((member) => (
                      <tr key={member.id} className="hover">
                        <td>
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
                            <div>
                              <div className="font-medium">
                                {member.user.firstName} {member.user.lastName}
                              </div>
                              <div className="text-sm text-base-content/70">
                                {member.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(member.role)}
                            <span className={`badge badge-sm ${getRoleColor(member.role)}`}>
                              {getRoleText(member.role)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="text-sm">
                            {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </td>
                        <td>
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
            ) : !pendingRequests || pendingRequests.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
                <p className="text-base-content/70">Không có yêu cầu tham gia nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
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
                                "{request.notes}"
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
  );
}
