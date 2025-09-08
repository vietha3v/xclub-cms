'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Event, EventStatus, EventType } from '@/types/event';
import { validationUtils } from '@/utils/validation';
import EventCountdownCompact from './EventCountdownCompact';
import dlv from 'dlv';

interface EventCardProps {
  event: Event;
  mode?: 'admin' | 'public';
  showActions?: boolean;
  compact?: boolean;
}

export default function EventCard({ event, mode = 'public', showActions = true, compact = false }: EventCardProps) {
  const [imageError, setImageError] = useState(false);

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case EventType.TRAINING:
        return 'badge-info';
      case EventType.COMPETITION:
        return 'badge-error';
      case EventType.SOCIAL:
        return 'badge-success';
      case EventType.CHARITY:
        return 'badge-warning';
      case EventType.WORKSHOP:
        return 'badge-secondary';
      case EventType.MEETUP:
        return 'badge-accent';
      default:
        return 'badge-neutral';
    }
  };

  const getEventTypeText = (type: EventType) => {
    switch (type) {
      case EventType.TRAINING:
        return 'Tập luyện';
      case EventType.COMPETITION:
        return 'Thi đấu';
      case EventType.SOCIAL:
        return 'Giao lưu';
      case EventType.CHARITY:
        return 'Từ thiện';
      case EventType.WORKSHOP:
        return 'Workshop';
      case EventType.MEETUP:
        return 'Gặp mặt';
      case EventType.KNOWLEDGE_SHARING:
        return 'Chia sẻ kiến thức';
      case EventType.BIRTHDAY:
        return 'Sinh nhật';
      case EventType.CELEBRATION:
        return 'Kỷ niệm';
      case EventType.TEAM_BUILDING:
        return 'Team building';
      case EventType.HEALTH_CHECK:
        return 'Khám sức khỏe';
      case EventType.NUTRITION_TALK:
        return 'Dinh dưỡng';
      case EventType.EQUIPMENT_REVIEW:
        return 'Đánh giá thiết bị';
      case EventType.ROUTE_EXPLORATION:
        return 'Khám phá tuyến đường';
      case EventType.OTHER:
        return 'Khác';
      default:
        return 'Khác';
    }
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.UPCOMING:
        return 'badge-info';
      case EventStatus.ACTIVE:
        return 'badge-success';
      case EventStatus.COMPLETED:
        return 'badge-neutral';
      case EventStatus.CANCELLED:
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: EventStatus) => {
    switch (status) {
      case EventStatus.UPCOMING:
        return 'Sắp tới';
      case EventStatus.ACTIVE:
        return 'Đang diễn ra';
      case EventStatus.COMPLETED:
        return 'Đã kết thúc';
      case EventStatus.CANCELLED:
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
      minute: '2-digit'
    });
  };

  const formatFee = (fee: number | undefined) => {
    if (!fee || fee === 0) return 'Miễn phí';
    return `${validationUtils.safeToLocaleString(fee)} VND`;
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group overflow-hidden h-full">
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-start gap-3 flex-1">
            {/* Event Image/Icon */}
            <div className="flex-shrink-0">
              {event.coverImageUrl && !imageError ? (
                <img 
                  src={event.coverImageUrl} 
                  alt={`${event.name} banner`}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-gray-200">
                  <span className="text-lg">📅</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between mb-2 flex-shrink-0">
                <h3 className="font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-blue-600 transition-colors">
                  <Link href={`/events/${event.id}`}>
                    {event.name}
                  </Link>
                </h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)} ml-2 whitespace-nowrap`}>
                  {getStatusText(event.status)}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                {event.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="whitespace-nowrap">📅 {formatDate(event.startDate)}</span>
                  <span className="whitespace-nowrap">📍 {event.location || 'N/A'}</span>
                </div>
                <span className="font-medium text-green-600 whitespace-nowrap">{formatFee(event.registrationFee)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col">
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {event.coverImageUrl && !imageError ? (
          <img 
            src={event.coverImageUrl} 
            alt={`${event.name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <span className="text-4xl">📅</span>
              </div>
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p className="text-white/80 text-sm">{getEventTypeText(event.type)}</p>
            </div>
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)} backdrop-blur-sm border border-white/20`}>
            {getStatusText(event.status)}
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getEventTypeColor(event.type)} backdrop-blur-sm border border-white/20`}>
            {getEventTypeText(event.type)}
          </div>
        </div>

        {/* Event Code */}
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono font-semibold text-gray-700">
            {event.eventCode}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
              <Link href={`/events/${event.id}`} className="hover:text-blue-600 transition-colors">
                {event.name}
              </Link>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getEventTypeColor(event.type)} badge-outline`}>
              {getEventTypeText(event.type)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(event.status)}`}>
              {getStatusText(event.status)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-shrink-0">
          {event.description || 'Chưa có mô tả cho sự kiện này. Hãy tham gia để khám phá thêm!'}
        </p>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 flex-shrink-0">
          {/* Date */}
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 whitespace-nowrap">Ngày diễn ra</div>
              <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{formatDate(event.startDate)}</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 whitespace-nowrap">Địa điểm</div>
              <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{event.location || 'Chưa xác định'}</div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100 flex-shrink-0">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-sm mb-1">Thời gian</div>
              <EventCountdownCompact 
                startDate={event.startDate}
                endDate={event.endDate}
                status={event.status}
              />
            </div>
          </div>
        </div>

        {/* Participants */}
        {event.maxParticipants && (
          <div className="flex items-center text-sm text-gray-600 mb-4 flex-shrink-0 h-12">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 whitespace-nowrap">Số người tham gia</div>
              <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                0/{event.maxParticipants} người
              </div>
            </div>
          </div>
        )}

        {/* Fee Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4 border border-green-100 flex-shrink-0 h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 whitespace-nowrap">Phí tham gia</div>
              <div className="text-lg font-bold text-green-600 whitespace-nowrap">{formatFee(event.registrationFee)}</div>
            </div>
            {event.format && (
              <div className="text-right flex-1">
                <div className="text-sm font-medium text-gray-700 whitespace-nowrap">Hình thức</div>
                <div className="text-base font-bold text-blue-600 whitespace-nowrap">
                  {event.format === 'online' ? 'Trực tuyến' : 
                   event.format === 'offline' ? 'Trực tiếp' : 'Kết hợp'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-3 mt-auto flex-shrink-0">
            <Link 
              href={`/events/${event.id}`} 
              className="flex-1 btn btn-outline btn-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Xem chi tiết
            </Link>
            {mode === 'admin' ? (
              <>
                <button className="btn btn-warning btn-sm">
                  ✏️ Chỉnh sửa
                </button>
                <button className="btn btn-error btn-sm">
                  🗑️ Xóa
                </button>
              </>
            ) : (
              <button className="btn btn-primary btn-sm flex-1">
                Đăng ký
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
