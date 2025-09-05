'use client';

import { Club } from '@/types/club';

interface ClubDetailHeaderProps {
  club: Club;
}

export default function ClubDetailHeader({ club }: ClubDetailHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'inactive':
        return 'badge-error';
      case 'suspended':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'pending':
        return 'Chờ duyệt';
      case 'inactive':
        return 'Không hoạt động';
      case 'suspended':
        return 'Tạm ngưng';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        {club.coverImageUrl ? (
          <img 
            src={club.coverImageUrl} 
            alt={`${club.name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Club Info */}
      <div className="relative -mt-16 px-6">
        <div className="bg-base-100 rounded-lg shadow-xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <div className="relative">
              {club.logoUrl ? (
                <div className="w-24 h-24 bg-base-100 rounded-full p-1 shadow-lg">
                  <img 
                    src={club.logoUrl} 
                    alt={`${club.name} logo`}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Club Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-base-content mb-2">
                    {club.name}
                  </h1>
                  {club.shortName && (
                    <p className="text-lg text-base-content/70 mb-2">
                      {club.shortName}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={`badge ${getStatusColor(club.status)}`}>
                      {getStatusText(club.status)}
                    </div>
                    <div className="badge badge-outline">
                      {club.type}
                    </div>
                    <div className={`badge ${club.isPublic ? 'badge-primary' : 'badge-secondary'}`}>
                      {club.isPublic ? 'Công khai' : 'Riêng tư'}
                    </div>
                    <div className="badge badge-info">
                      {club.clubCode}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-base-content/70">Thành viên</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{club.maxMembers || 0}</div>
                    <div className="text-sm text-base-content/70">Tối đa</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">0</div>
                    <div className="text-sm text-base-content/70">Sự kiện</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
