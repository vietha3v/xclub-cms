'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

interface ClubEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  type: 'training' | 'competition' | 'social' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxParticipants?: number;
  currentParticipants: number;
  imageUrl?: string;
}

interface ClubDetailEventsProps {
  clubId: string;
}

export default function ClubDetailEvents({ clubId }: ClubDetailEventsProps) {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [{ data: eventsData, loading: eventsLoading, error: eventsError }, refetchEvents] = useAxios<ClubEvent[]>(
    `/api/clubs/${clubId}/events`,
    { manual: true }
  );

  useEffect(() => {
    loadEvents();
  }, [clubId]);

  useEffect(() => {
    if (eventsData) {
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setError(null);
    }
  }, [eventsData]);

  useEffect(() => {
    if (eventsError) {
      setError('Không thể tải danh sách sự kiện');
      console.error('Load events error:', eventsError);
    }
  }, [eventsError]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      await refetchEvents();
    } catch (err) {
      setError('Không thể tải danh sách sự kiện');
      console.error('Load events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training':
        return 'badge-primary';
      case 'competition':
        return 'badge-secondary';
      case 'social':
        return 'badge-accent';
      case 'other':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'training':
        return 'Tập luyện';
      case 'competition':
        return 'Thi đấu';
      case 'social':
        return 'Giao lưu';
      case 'other':
        return 'Khác';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'badge-info';
      case 'ongoing':
        return 'badge-success';
      case 'completed':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'ongoing':
        return 'Đang diễn ra';
      case 'completed':
        return 'Đã kết thúc';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Sự kiện sắp tới</h2>
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-base-content/70">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">Sự kiện sắp tới</h2>
          <button className="btn btn-outline btn-sm">
            Xem tất cả
          </button>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">{error}</p>
            <button
              onClick={loadEvents}
              className="btn btn-outline btn-sm mt-2"
            >
              Thử lại
            </button>
          </div>
        ) : (events || []).length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-base-content/70">Chưa có sự kiện nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(events || []).slice(0, 3).map((event) => (
              <div key={event.id} className="border border-base-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-base-content">{event.title}</h3>
                      <div className={`badge badge-sm ${getTypeColor(event.type)}`}>
                        {getTypeText(event.type)}
                      </div>
                      <div className={`badge badge-sm ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-base-content/70 mb-2 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-base-content/70">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      
                      {event.maxParticipants && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          <span>{event.currentParticipants}/{event.maxParticipants}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(events || []).length > 3 && (
              <div className="text-center pt-3">
                <button className="btn btn-outline btn-sm">
                  Xem tất cả ({(events || []).length} sự kiện)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
