'use client';

import { Event } from '@/types/event';
import dlv from 'dlv';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock,
  Globe,
  Navigation,
  Info,
  Tag,
  UserCheck,
  Building2,
  Shield,
  Target,
  Settings,
  AlertCircle
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

interface EventDetailInfoProps {
  event: Event;
}

export default function EventDetailInfo({ event }: EventDetailInfoProps) {
  const formatShortDate = (date: string) => {
    return format(parseISO(date), 'dd/MM', { locale: vi });
  };

  const formatShortTime = (date: string) => {
    return format(parseISO(date), 'HH:mm', { locale: vi });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-base-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-base-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-base-content">Thông tin bổ sung</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mô tả chi tiết */}
        {event.description && (
          <div className="bg-base-50 rounded-xl p-5 border border-base-200">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-base-content">Mô tả chi tiết</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-base-content/80 leading-relaxed whitespace-pre-line text-sm">
                {event.description}
              </p>
            </div>
          </div>
        )}

        {/* Thông tin đăng ký */}
        {(dlv(event, 'registrationStartDate') || dlv(event, 'registrationEndDate') || event.maxParticipants) && (
          <div className="bg-base-50 rounded-xl p-5 border border-base-200">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-base-content">Thông tin đăng ký</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dlv(event, 'registrationStartDate') && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="text-xs text-base-content/60">Mở đăng ký</div>
                    <div className="text-sm font-medium text-base-content">
                      {formatShortDate(dlv(event, 'registrationStartDate'))} {formatShortTime(dlv(event, 'registrationStartDate'))}
                    </div>
                  </div>
                </div>
              )}
              {dlv(event, 'registrationEndDate') && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="text-xs text-base-content/60">Đóng đăng ký</div>
                    <div className="text-sm font-medium text-base-content">
                      {formatShortDate(dlv(event, 'registrationEndDate'))} {formatShortTime(dlv(event, 'registrationEndDate'))}
                    </div>
                  </div>
                </div>
              )}
              {event.maxParticipants && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-base-content/60 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-base-content/60">Số lượng</div>
                    <div className="text-sm font-medium text-base-content">Tối đa {event.maxParticipants}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Địa điểm chi tiết */}
        {event.address && (
          <div className="bg-base-50 rounded-xl p-5 border border-base-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-base-content">Địa điểm chi tiết</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-base-content/60 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-base-content/60">Địa chỉ</div>
                  <div className="text-sm font-medium text-base-content">{event.address}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tọa độ GPS */}
        {(event.latitude && event.longitude) && (
          <div className="bg-base-50 rounded-xl p-5 border border-base-200">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-base-content/70" />
              <h3 className="font-semibold text-base-content">Tọa độ GPS</h3>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-base-content/60 flex-shrink-0" />
              <div className="text-xs text-base-content/60">Tọa độ:</div>
              <div className="text-sm font-mono text-base-content/80 bg-base-200 px-2 py-1 rounded">
                {event.latitude.toFixed(6)}, {event.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        )}

        {/* Thông tin kỹ thuật */}
        <div className="bg-base-50 rounded-xl p-5 border border-base-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-base-content/70" />
            <h3 className="font-semibold text-base-content">Thông tin kỹ thuật</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-base-content/60 flex-shrink-0" />
              <div>
                <div className="text-xs text-base-content/60">Mã sự kiện</div>
                <div className="text-sm font-mono text-base-content">{event.eventCode}</div>
              </div>
            </div>
            {event.format && (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-base-content/60 flex-shrink-0" />
                <div>
                  <div className="text-xs text-base-content/60">Hình thức</div>
                  <div className="text-sm font-medium text-base-content">
                    {event.format === 'online' ? 'Trực tuyến' : 
                     event.format === 'offline' ? 'Trực tiếp' : 'Kết hợp'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

