'use client';

import { Race } from '@/types/race';
import dlv from 'dlv';

interface RaceDetailInfoProps {
  race: Race;
}

export default function RaceDetailInfo({ race }: RaceDetailInfoProps) {
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
                    {dlv(race, 'startDate') ? new Date(dlv(race, 'startDate')).toLocaleString('vi-VN') : 'N/A'}
                  </div>
                </div>
              </div>

              {dlv(race, 'endDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div>
                    <div className="font-medium">Kết thúc</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(race, 'endDate') ? new Date(dlv(race, 'endDate')).toLocaleString('vi-VN') : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {dlv(race, 'registrationStartDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <div className="font-medium">Mở đăng ký</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(race, 'registrationStartDate') ? new Date(dlv(race, 'registrationStartDate')).toLocaleString('vi-VN') : 'N/A'}
                    </div>
                  </div>
                </div>
              )}

              {dlv(race, 'registrationEndDate') && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <div className="font-medium">Đóng đăng ký</div>
                    <div className="text-sm text-base-content/70">
                      {dlv(race, 'registrationEndDate') ? new Date(dlv(race, 'registrationEndDate')).toLocaleString('vi-VN') : 'N/A'}
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
              {race.location && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🏢</div>
                  <div>
                    <div className="font-medium">Địa điểm</div>
                    <div className="text-sm text-base-content/70">{race.location}</div>
                  </div>
                </div>
              )}

              {race.address && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🏠</div>
                  <div>
                    <div className="font-medium">Địa chỉ</div>
                    <div className="text-sm text-base-content/70">{race.address}</div>
                  </div>
                </div>
              )}

              {(race.city || race.state || race.country) && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🌍</div>
                  <div>
                    <div className="font-medium">Khu vực</div>
                    <div className="text-sm text-base-content/70">
                      {[race.city, race.state, race.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                </div>
              )}

              {race.latitude && race.longitude && (
                <div className="flex items-start gap-3">
                  <div className="text-lg">🗺️</div>
                  <div>
                    <div className="font-medium">Tọa độ</div>
                    <div className="text-sm text-base-content/70">
                      {race.latitude.toFixed(6)}, {race.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">📏 Khoảng cách</h3>
            <div className="text-2xl font-bold text-accent">
              {race.distance} km
            </div>
          </div>

          {race.elevation && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">⛰️ Độ cao</h3>
              <div className="text-2xl font-bold text-secondary">
                {race.elevation} m
              </div>
            </div>
          )}

          {race.maxParticipants && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">👥 Số lượng tham gia</h3>
              <div className="text-2xl font-bold text-info">
                Tối đa {race.maxParticipants} người
              </div>
            </div>
          )}
        </div>

        {dlv(race, 'registrationFee') !== undefined && (
          <div className="divider"></div>
        )}

        {dlv(race, 'registrationFee') !== undefined && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">💰 Phí tham gia</h3>
            <div className="text-3xl font-bold text-success">
              {dlv(race, 'registrationFee', 0) === 0 ? 'Miễn phí' : `${dlv(race, 'registrationFee', 0).toLocaleString()}đ`}
            </div>
          </div>
        )}

        {race.rules && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">📜 Quy định</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{race.rules}</p>
            </div>
          </div>
        )}

        {race.requirements && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">✅ Yêu cầu tham gia</h3>
            <div className="prose max-w-none">
              <p className="text-base-content/80 whitespace-pre-line">{race.requirements}</p>
            </div>
          </div>
        )}

        {race.routeUrl && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">🗺️ Tuyến đường</h3>
            <div className="text-center">
              <a
                href={race.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Xem tuyến đường
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
