'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  status: string;
  role: string;
  createdAt: string;
  lastLoginAt?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const [{ data: usersData, loading: apiLoading, error }, refetch] = useAxios<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }>('/api/users?limit=50');

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.data || []);
      setLoading(false);
    }
  }, [usersData]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-warning';
      case 'banned':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'banned':
        return 'Bị cấm';
      default:
        return 'Chưa xác định';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge-error';
      case 'moderator':
        return 'badge-warning';
      case 'user':
        return 'badge-primary';
      default:
        return 'badge-neutral';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'moderator':
        return 'Điều hành viên';
      case 'user':
        return 'Người dùng';
      default:
        return 'Chưa xác định';
    }
  };

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-base-300 rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-base-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-base-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title text-2xl">👥 Quản lý người dùng</h2>
          <button className="btn btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tạo người dùng mới
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-control w-full md:w-48">
            <select
              className="select select-bordered w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị cấm</option>
            </select>
          </div>
          <div className="form-control w-full md:w-48">
            <select
              className="select select-bordered w-full"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="moderator">Điều hành viên</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
        </div>

        {/* Users List */}
        <div className="list-container">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">Không có người dùng nào</h3>
              <p className="text-base-content/70">Hãy tạo người dùng đầu tiên</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="list-item">
                <div className="list-item-avatar">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                <div className="list-item-content">
                  <div className="list-item-title">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                  </div>
                  <div className="list-item-subtitle">{user.email}</div>
                  <div className="list-item-meta">
                    <span>📅 Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
                    {user.lastLoginAt && <span>🕒 Đăng nhập cuối: {new Date(user.lastLoginAt).toLocaleDateString('vi-VN')}</span>}
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className={`badge ${getStatusColor(user.status)}`}>
                    {getStatusText(user.status)}
                  </div>
                  <div className={`badge ${getRoleColor(user.role)}`}>
                    {getRoleText(user.role)}
                  </div>
                  
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>👁️ Xem hồ sơ</a></li>
                      <li><a>✏️ Chỉnh sửa</a></li>
                      <li><a>🔑 Đặt lại mật khẩu</a></li>
                      <li><a>📊 Xem hoạt động</a></li>
                      <li><hr className="my-2" /></li>
                      <li><a className="text-warning">⚠️ Khóa tài khoản</a></li>
                      <li><a className="text-error">🗑️ Xóa</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
