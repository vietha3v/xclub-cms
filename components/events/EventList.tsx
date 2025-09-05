'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Event, EventType } from '@/types/event';

interface EventListProps {
  selectedCategory?: string;
  searchTerm?: string;
}

export default function EventList({ selectedCategory = 'all', searchTerm = '' }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [{ data: eventsData, loading: apiLoading, error: apiError }, refetch] = useAxios<{
    data: Event[];
    total: number;
    page: number;
    limit: number;
  }>('/api/events');

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData.data || []);
      setLoading(false);
    }
  }, [eventsData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách sự kiện');
      setLoading(false);
    }
  }, [apiError]);

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.type === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading || apiLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-lg animate-pulse">
            <div className="card-body">
              <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">❌</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Có lỗi xảy ra</h3>
        <p className="text-base-content/70 mb-6">{error}</p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Thử lại
        </button>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy sự kiện</h3>
        <p className="text-base-content/70 mb-6">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredEvents.map((event, index) => (
        <div
          key={event.id}
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
        >
          <div className="card-body">
            {/* Event Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{event.imageUrl ? '🎯' : '🎯'}</div>
              <div className={`badge ${
                event.status === 'published' || event.status === 'registration_open' ? 'badge-primary' :
                event.status === 'active' ? 'badge-success' : 'badge-neutral'
              } badge-lg`}>
                {event.status === 'published' ? 'Đã công bố' :
                 event.status === 'registration_open' ? 'Mở đăng ký' :
                 event.status === 'active' ? 'Đang diễn ra' : 
                 event.status === 'completed' ? 'Đã kết thúc' : 'Nháp'}
              </div>
            </div>

            {/* Event Title */}
            <h3 className="card-title text-lg mb-3 line-clamp-2">
              {event.title}
            </h3>

            {/* Event Description */}
            <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{new Date(event.startDate).toLocaleDateString('vi-VN')}</span>
              </div>

              {event.location && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{event.type}</span>
              </div>

              {event.maxParticipants && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Tối đa {event.maxParticipants} người tham gia</span>
                </div>
              )}
            </div>

            {/* Price & Registration */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">
                {event.registrationFee === 0 || !event.registrationFee ? (
                  <span className="text-success">Miễn phí</span>
                ) : (
                  <span className="text-primary">{event.registrationFee.toLocaleString()}đ</span>
                )}
              </div>
              <div className="text-sm text-base-content/50">
                Mã: {event.eventCode}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-between">
              <button className="btn btn-primary btn-sm flex-1">
                {event.status === 'registration_open' ? 'Đăng ký ngay' : 'Xem chi tiết'}
              </button>
              <button className="btn btn-outline btn-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Registration Deadline */}
            {event.registrationEndDate && (
              <div className="text-center mt-3 p-2 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning">
                  ⏰ Hạn đăng ký: {new Date(event.registrationEndDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
