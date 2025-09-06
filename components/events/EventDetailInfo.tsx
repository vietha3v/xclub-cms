'use client';

import { Event } from '@/types/event';
import dlv from 'dlv';

interface EventDetailInfoProps {
  event: Event;
}

export default function EventDetailInfo({ event }: EventDetailInfoProps) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">📋 Thông tin chi tiết</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thời gian */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">⏰ Thời gian</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <div className="font-medium">Bắt đầu</div>
                  <div className="text-sm text-base-content/70">
                    {dlv(event, 'startDate') ? new Date(dlv(event, 'startDate')).toLocaleString('vi-VN') : 'N/A'}
                  </div>
                </div>
              </div>

              {dlv(event, 'endDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div>
                    <div className="font-medium">Kết thúc</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(event, 'endDate') ? new Date(dlv(event, 'endDate')).toLocaleString('vi-VN') : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {dlv(event, 'registrationStartDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <div className="font-medium">Mở đăng ký</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(event, 'registrationStartDate') ? new Date(dlv(event, 'registrationStartDate')).toLocaleString('vi-VN') : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {dlv(event, 'registrationEndDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <div className="font-medium">Đóng đăng ký</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(event, 'registrationEndDate') ? new Date(dlv(event, 'registrationEndDate')).toLocaleString('vi-VN') : 'N/A'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Địa điểm */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">📍 Địa điểm</h3>
            <div className="space-y-3">
              {event.location && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🏢</div>
                  <div>
                    <div className="font-medium">Địa điểm</div>
                    <div className="text-sm text-base-content/70">{event.location}</div>
                  </div>
                </div>
              )}

              {event.address && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🏠</div>
                  <div>
                    <div className="font-medium">Địa chỉ</div>
                    <div className="text-sm text-base-content/70">{event.address}</div>
                  </div>
                </div>
              )}

              {(event.city || event.state || event.country) && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🌍</div>
                  <div>
                    <div className="font-medium">Khu vực</div>
                    <div className="text-sm text-base-content/70">
                      {[event.city, event.state, event.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                </div>
              )}

              {event.latitude && event.longitude && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🗺️</div>
                  <div>
                    <div className="font-medium">Tọa độ</div>
                    <div className="text-sm text-base-content/70">
                      {event.latitude.toFixed(6)}, {event.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        {(event.rules || event.requirements || event.maxParticipants) && (
          <div className="divider"></div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.maxParticipants && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">👥 Số lượng tham gia</h3>
              <div className="text-2xl font-bold text-accent">
                Tối đa {event.maxParticipants} người
              </div>
            </div>
          )}

          {dlv(event, 'registrationFee') !== undefined && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">💰 Phí tham gia</h3>
              <div className="text-2xl font-bold text-success">
                {dlv(event, 'registrationFee', 0) === 0 ? 'Miễn phí' : `${dlv(event, 'registrationFee', 0).toLocaleString()}đ`}
              </div>
            </div>
          )}
        </div>

        {event.rules && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">📜 Quy định</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{event.rules}</p>
            </div>
          </div>
        )}

        {event.requirements && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">✅ Yêu cầu tham gia</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{event.requirements}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
