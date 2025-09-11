'use client';

import { Club } from '@/types/club';

interface ClubDetailHeaderProps {
  club: Club | null;
}

export default function ClubDetailHeader({ club }: ClubDetailHeaderProps) {
  // Early return if club is null
  if (!club) {
    return (
      <div className="relative">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-base-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="relative -mt-12 sm:-mt-16 px-3 sm:px-6">
          <div className="bg-base-100 rounded-lg shadow-xl p-4 sm:p-6 animate-pulse">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-base-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 sm:h-8 bg-base-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-base-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-base-200 rounded w-20"></div>
                  <div className="h-6 bg-base-200 rounded w-16"></div>
                  <div className="h-6 bg-base-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        {club.coverImageUrl ? (
          <img 
            src={club.coverImageUrl} 
            alt={`${club.name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Club Info */}
      <div className="relative -mt-12 sm:-mt-16 px-3 sm:px-6">
        <div className="bg-base-100 rounded-lg shadow-xl p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
            {/* Logo */}
            <div className="relative">
              {club.logoUrl ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-base-100 rounded-full p-1 shadow-lg">
                  <img 
                    src={club.logoUrl} 
                    alt={`${club.name} logo`}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Club Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-2">
                    {club.name}
                  </h1>
                  {club.shortName && (
                    <p className="text-sm sm:text-base md:text-lg text-base-content/70 mb-2">
                      {club.shortName}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className={`badge badge-sm ${getStatusColor(club.status)}`}>
                      {getStatusText(club.status)}
                    </div>
                    <div className="badge badge-outline badge-sm">
                      {club.type}
                    </div>
                    <div className={`badge badge-sm ${club.isPublic ? 'badge-primary' : 'badge-secondary'}`}>
                      {club.isPublic ? 'Công khai' : 'Riêng tư'}
                    </div>
                    <div className="badge badge-info badge-sm">
                      <span className="hidden sm:inline">{club.clubCode}</span>
                      <span className="sm:hidden">{club.clubCode?.slice(0, 8)}...</span>
                    </div>
                  </div>
                </div>

                {/* Admin Dashboard Button */}
                {club.userRole && club.userRole.length > 0 && (
                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end gap-2">
                    <button
                      onClick={() => window.location.href = `/clubs/${club.id}/manager`}
                      className="btn btn-primary btn-sm sm:btn-md shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="hidden sm:inline">Vào quản lý</span>
                      <span className="sm:hidden">Quản lý</span>
                    </button>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {club.userRole.includes('admin') && (
                        <span className="badge badge-warning badge-xs sm:badge-sm">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="hidden sm:inline">Admin</span>
                        </span>
                      )}
                      {club.userRole.includes('moderator') && !club.userRole.includes('admin') && (
                        <span className="badge badge-info badge-xs sm:badge-sm">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="hidden sm:inline">Moderator</span>
                        </span>
                      )}
                      {club.userRole.includes('member') && !club.userRole.includes('admin') && !club.userRole.includes('moderator') && (
                        <span className="badge badge-success badge-xs sm:badge-sm">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="hidden sm:inline">Member</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
