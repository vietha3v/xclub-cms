'use client';

import { useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Event } from '@/types/event';
import dlv from 'dlv';
import { RotateCcw, Eye } from 'lucide-react';
import EventCard from './EventCard';

interface MyEvent {
  id: string;
  event: Event;
  registrationStatus: 'registered' | 'pending' | 'cancelled';
  registeredAt: string;
  notes?: string;
}

export default function MyEvents() {
  const [{ data: eventsData, loading: eventsLoading, error: eventsError }, refetchEvents] = useAxios<MyEvent[]>(
    '/api/events/my-events',
    { manual: true }
  );

  useEffect(() => {
    refetchEvents();
  }, []);

  if (eventsLoading) {
    return (
      <div className="text-center py-20">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-base-content/70">Đang tải sự kiện của bạn...</p>
      </div>
    );
  }

  if (eventsError) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">❌</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">Có lỗi xảy ra</h3>
        <p className="text-base-content/70 mb-6">Không thể tải danh sách sự kiện</p>
        <button onClick={() => refetchEvents()} className="btn btn-primary btn-sm">
          <RotateCcw className="w-4 h-4 mr-1" />
          Thử lại
        </button>
      </div>
    );
  }

  if (dlv({ eventsData }, 'eventsData.length', 0) === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">📅</div>
        <h3 className="text-2xl font-semibold text-base-content mb-4">
          Bạn chưa tham gia sự kiện nào
        </h3>
        <p className="text-base-content/70 mb-6 max-w-md mx-auto">
          Hãy khám phá và tham gia các sự kiện để kết nối với cộng đồng và nâng cao kỹ năng chạy bộ!
        </p>
        <button 
          onClick={() => window.location.href = '/events'}
          className="btn btn-primary btn-sm"
        >
          <Eye className="w-4 h-4 mr-1" />
          Khám phá sự kiện
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">Sự kiện của tôi</h2>
        <p className="text-base-content/70">
          Bạn đang tham gia {eventsData?.length || 0} sự kiện
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData?.map((myEvent) => (
          <EventCard 
            key={myEvent.id} 
            event={myEvent.event} 
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
}
