'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';

export default function AdminClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [{ data: clubsData, loading: apiLoading, error }, refetch] = useAxios<{
    data: Club[];
    total: number;
    page: number;
    limit: number;
  }>('/api/clubs?limit=50');

  useEffect(() => {
    if (clubsData) {
      setClubs(clubsData.data || []);
      setLoading(false);
    }
  }, [clubsData]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (club.description && club.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (club.city && club.city.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || club.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-warning';
      case 'suspended':
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
      case 'suspended':
        return 'Bị đình chỉ';
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
          <h2 className="card-title text-2xl">🏃‍♂️ Quản lý câu lạc bộ</h2>
          <button className="btn btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tạo câu lạc bộ mới
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm câu lạc bộ..."
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
              <option value="suspended">Bị đình chỉ</option>
            </select>
          </div>
        </div>

        {/* Clubs List */}
        <div className="list-container">
          {filteredClubs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">Không có câu lạc bộ nào</h3>
              <p className="text-base-content/70">Hãy tạo câu lạc bộ đầu tiên</p>
            </div>
          ) : (
            filteredClubs.map((club) => (
              <div key={club.id} className="list-item">
                <div className="list-item-avatar">
                  {club.logoUrl ? (
                    <img
                      src={club.logoUrl}
                      alt={club.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {club.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                <div className="list-item-content">
                  <div className="list-item-title">{club.name}</div>
                  <div className="list-item-subtitle">{club.description}</div>
                  <div className="list-item-meta">
                    <span>👥 {club.memberCount} thành viên</span>
                    {club.city && <span>📍 {club.city}</span>}
                    <span>🏷️ {club.type}</span>
                    <span>🌐 {club.isPublic ? 'Công khai' : 'Riêng tư'}</span>
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className={`badge ${getStatusColor(club.status)}`}>
                    {getStatusText(club.status)}
                  </div>
                  
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>👁️ Xem chi tiết</a></li>
                      <li><a>✏️ Chỉnh sửa</a></li>
                      <li><a>👥 Quản lý thành viên</a></li>
                      <li><a>📊 Xem thống kê</a></li>
                      <li><a>📋 Sao chép</a></li>
                      <li><hr className="my-2" /></li>
                      <li><a className="text-warning">⚠️ Đình chỉ</a></li>
                      <li><a className="text-error">🗑️ Xóa</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredClubs.length > 0 && (
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
