'use client';

import { Race } from '@/types/race';

interface RaceDetailHeaderProps {
  race: Race;
}

export default function RaceDetailHeader({ race }: RaceDetailHeaderProps) {
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
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Nháp';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'marathon':
        return '🏃‍♂️';
      case 'half_marathon':
        return '🏃‍♀️';
      case '10k':
        return '🏃';
      case '5k':
        return '🏃‍♂️';
      case 'trail':
        return '🥾';
      case 'ultra':
        return '🏔️';
      case 'relay':
        return '🤝';
      case 'virtual':
        return '💻';
      default:
        return '🎯';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'marathon':
        return 'Marathon (42.2km)';
      case 'half_marathon':
        return 'Half Marathon (21.1km)';
      case '10k':
        return '10K (10km)';
      case '5k':
        return '5K (5km)';
      case 'trail':
        return 'Trail Running';
      case 'ultra':
        return 'Ultra Marathon';
      case 'relay':
        return 'Relay Race';
      case 'virtual':
        return 'Virtual Race';
      default:
        return 'Giải chạy khác';
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Race Image */}
          {race.bannerUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={race.bannerUrl}
                alt={race.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Race Info */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`badge ${getStatusColor(race.status)} badge-lg`}>
                {getStatusText(race.status)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl">{getTypeIcon(race.type)}</div>
              <div className="text-lg text-base-content/70">{getTypeText(race.type)}</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
              {race.name}
            </h1>

            <p className="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto">
              {race.description}
            </p>

            {/* Race Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">📅</div>
                <div className="text-left">
                  <div className="font-semibold">Ngày bắt đầu</div>
                  <div className="text-base-content/70">
                    {new Date(race.startDate).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              {race.location && (
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl">📍</div>
                  <div className="text-left">
                    <div className="font-semibold">Địa điểm</div>
                    <div className="text-base-content/70">{race.location}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">📏</div>
                <div className="text-left">
                  <div className="font-semibold">Khoảng cách</div>
                  <div className="text-base-content/70">{race.distance} km</div>
                </div>
              </div>
            </div>

            {/* Race Code */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full shadow-lg">
              <span className="text-sm font-medium text-base-content/70">Mã giải chạy:</span>
              <span className="font-mono font-bold text-primary">{race.raceCode}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
