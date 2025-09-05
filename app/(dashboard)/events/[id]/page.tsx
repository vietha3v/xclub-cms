'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Event } from '@/types/event';
import EventDetailHeader from '@/components/events/EventDetailHeader';
import EventDetailInfo from '@/components/events/EventDetailInfo';
import EventDetailActions from '@/components/events/EventDetailActions';
import EventDetailParticipants from '@/components/events/EventDetailParticipants';
import EventDetailChallenges from '@/components/events/EventDetailChallenges';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const eventId = params.id as string;

  const [{ data: event, loading, error }, refetch] = useAxios<Event>(`/api/events/${eventId}`);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <h3 className="text-2xl font-semibold text-base-content mb-4">Không tìm thấy sự kiện</h3>
          <p className="text-base-content/70 mb-6">Sự kiện này có thể đã bị xóa hoặc không tồn tại</p>
          <button onClick={() => router.back()} className="btn btn-primary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header Section */}
        <EventDetailHeader event={event} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <EventDetailInfo event={event} />
              <EventDetailChallenges eventId={eventId} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <EventDetailActions event={event} onUpdate={refetch} />
              <EventDetailParticipants eventId={eventId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
