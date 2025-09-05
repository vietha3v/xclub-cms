'use client';

import { Event } from '@/types/event';

interface EventDetailHeaderProps {
  event: Event;
}

export default function EventDetailHeader({ event }: EventDetailHeaderProps) {
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

  return (
    <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Event Image */}
          {event.bannerUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Event Info */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`badge ${getStatusColor(event.status)} badge-lg`}>
                {getStatusText(event.status)}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
              {event.title}
            </h1>

            <p className="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto">
              {event.description}
            </p>

            {/* Event Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">📅</div>
                <div className="text-left">
                  <div className="font-semibold">Ngày bắt đầu</div>
                  <div className="text-base-content/70">
                    {new Date(event.startDate).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl">📍</div>
                  <div className="text-left">
                    <div className="font-semibold">Địa điểm</div>
                    <div className="text-base-content/70">{event.location}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">🏷️</div>
                <div className="text-left">
                  <div className="font-semibold">Loại sự kiện</div>
                  <div className="text-base-content/70 capitalize">{event.type}</div>
                </div>
              </div>
            </div>

            {/* Event Code */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full shadow-lg">
              <span className="text-sm font-medium text-base-content/70">Mã sự kiện:</span>
              <span className="font-mono font-bold text-primary">{event.eventCode}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
