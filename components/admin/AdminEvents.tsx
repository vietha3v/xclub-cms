'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Event } from '@/types/event';

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [{ data: eventsData, loading: apiLoading, error }, refetch] = useAxios<{
    data: Event[];
    total: number;
    page: number;
    limit: number;
  }>('/api/events?limit=50');

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData.data || []);
      setLoading(false);
    }
  }, [eventsData]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'registration_open':
        return 'badge-primary';
      case 'active':
        return 'badge-success';
      case 'completed':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã công bố';
      case 'registration_open':
        return 'Mở đăng ký';
      case 'active':
        return 'Đang diễn ra';
      case 'completed':
        return 'Đã kết thúc';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Nháp';
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
          <h2 className="card-title text-2xl">🎯 Quản lý sự kiện</h2>
          <button className="btn btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tạo sự kiện mới
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
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
              <option value="draft">Nháp</option>
              <option value="published">Đã công bố</option>
              <option value="registration_open">Mở đăng ký</option>
              <option value="active">Đang diễn ra</option>
              <option value="completed">Đã kết thúc</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="list-container">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">Không có sự kiện nào</h3>
              <p className="text-base-content/70">Hãy tạo sự kiện đầu tiên của bạn</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="list-item">
                <div className="text-3xl">🎯</div>
                
                <div className="list-item-content">
                  <div className="list-item-title">{event.title}</div>
                  <div className="list-item-subtitle">{event.description}</div>
                  <div className="list-item-meta">
                    <span>📅 {new Date(event.startDate).toLocaleDateString('vi-VN')}</span>
                    {event.location && <span>📍 {event.location}</span>}
                    <span>🏷️ {event.type}</span>
                  </div>
                </div>

                <div className="list-item-actions">
                  <div className={`badge ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </div>
                  
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>✏️ Chỉnh sửa</a></li>
                      <li><a>👥 Xem người tham gia</a></li>
                      <li><a>📊 Xem thống kê</a></li>
                      <li><a>📋 Sao chép</a></li>
                      <li><hr className="my-2" /></li>
                      <li><a className="text-error">🗑️ Xóa</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredEvents.length > 0 && (
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
