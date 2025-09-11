'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Club } from '@/types/club';
import { validationUtils } from '@/utils/validation';
import dlv from 'dlv';

interface ClubCardProps {
  club: Club;
  compact?: boolean;
}

export default function ClubCard({ club, compact = false }: ClubCardProps) {
  const [imageError, setImageError] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          color: 'bg-green-500', 
          text: 'Đang hoạt động', 
          icon: '✓' 
        };
      case 'pending':
        return { 
          color: 'bg-yellow-500', 
          text: 'Chờ duyệt', 
          icon: '⏳' 
        };
      case 'inactive':
        return { 
          color: 'bg-red-500', 
          text: 'Tạm dừng', 
          icon: '⏸️' 
        };
      case 'suspended':
        return { 
          color: 'bg-red-600', 
          text: 'Bị đình chỉ', 
          icon: '🚫' 
        };
      default:
        return { 
          color: 'bg-gray-500', 
          text: 'Không xác định', 
          icon: '❓' 
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type.toLowerCase()) {
      case 'running':
        return { 
          icon: '🏃‍♂️', 
          name: 'Chạy bộ', 
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'multisport':
        return { 
          icon: '🏃‍♀️', 
          name: 'Đa môn', 
          color: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        };
      case 'fitness':
        return { 
          icon: '💪', 
          name: 'Thể hình', 
          color: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700'
        };
      case 'social':
        return { 
          icon: '👥', 
          name: 'Giao lưu', 
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'competitive':
        return { 
          icon: '🏆', 
          name: 'Thi đấu', 
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700'
        };
      case 'charity':
        return { 
          icon: '❤️', 
          name: 'Từ thiện', 
          color: 'from-pink-500 to-rose-500',
          bgColor: 'bg-pink-50',
          textColor: 'text-pink-700'
        };
      default:
        return { 
          icon: '🏃‍♂️', 
          name: 'Thể thao', 
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700'
        };
    }
  };

  const formatMemberCount = (current: number, max: number) => {
    if (!max) return `${current} thành viên`;
    return `${current}/${max} thành viên`;
  };

  const formatFee = (fee: string | number) => {
    if (!fee) return 'Miễn phí';
    const amount = typeof fee === 'string' ? parseFloat(fee) : fee;
    return `${validationUtils.safeToLocaleString(amount)} VND`;
  };


  const statusConfig = getStatusConfig(club.status);
  const typeConfig = getTypeConfig(club.type);

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group overflow-hidden h-full">
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-start gap-3 flex-1">
            {/* Logo */}
            <div className="flex-shrink-0">
              {club.logoUrl && !imageError ? (
                <img 
                  src={club.logoUrl} 
                  alt={`${club.name} logo`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${typeConfig.color} flex items-center justify-center border-2 border-gray-200`}>
                  <span className="text-lg">{typeConfig.icon}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between mb-2 flex-shrink-0">
                <h3 className="font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-blue-600 transition-colors">
                  <Link href={`/clubs/${club.id}`}>
                    {club.name}
                  </Link>
                </h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusConfig.color} ml-2 whitespace-nowrap`}>
                  {statusConfig.icon} {statusConfig.text}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                {club.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="whitespace-nowrap">📍 {club.city || 'N/A'}</span>
                  <span className="whitespace-nowrap">👥 {formatMemberCount(dlv(club, 'memberCount', 0), dlv(club, 'maxMembers', 0))}</span>
                </div>
                <span className="font-medium text-green-600 whitespace-nowrap">{formatFee(dlv(club, 'monthlyFee'))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col hover:scale-[1.02] hover:-translate-y-1">
      {/* Hero Section */}
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden flex-shrink-0">
        {club.coverImageUrl && !imageError ? (
          <img 
            src={club.coverImageUrl} 
            alt={`${club.name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${typeConfig.color} flex items-center justify-center relative`}>
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <span className="text-4xl">{typeConfig.icon}</span>
              </div>
              <h2 className="text-xl font-bold">{club.name}</h2>
              <p className="text-white/80 text-sm">{typeConfig.name}</p>
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
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig.color} backdrop-blur-sm border border-white/20`}>
            {statusConfig.icon} <span className="hidden sm:inline">{statusConfig.text}</span>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${club.isPublic ? 'bg-blue-500' : 'bg-gray-600'} backdrop-blur-sm border border-white/20`}>
            {club.isPublic ? '🌐' : '🔒'} <span className="hidden sm:inline">{club.isPublic ? 'Công khai' : 'Riêng tư'}</span>
          </div>
        </div>

        {/* Club Code */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
          <div className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono font-semibold text-gray-700">
            {club.clubCode}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
              <Link href={`/clubs/${club.id}`} className="hover:text-blue-600 transition-colors">
                {club.name}
              </Link>
            </h2>
            
            {/* User Role Badge - Right aligned */}
            {club.userRole && club.userRole.length > 0 && (
              <div className="ml-2 sm:ml-3 flex-shrink-0">
                {club.userRole.includes('admin') && (
                  <span className="badge badge-warning badge-sm">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="hidden sm:inline">Admin</span>
                  </span>
                )}
                {club.userRole.includes('moderator') && !club.userRole.includes('admin') && (
                  <span className="badge badge-info badge-sm">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="hidden sm:inline">Moderator</span>
                  </span>
                )}
                {club.userRole.includes('member') && !club.userRole.includes('admin') && !club.userRole.includes('moderator') && (
                  <span className="badge badge-success badge-sm">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">Thành viên</span>
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${typeConfig.bgColor} ${typeConfig.textColor}`}>
              {typeConfig.icon} <span className="hidden sm:inline">{typeConfig.name}</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed flex-shrink-0">
          {club.description || 'Chưa có mô tả cho câu lạc bộ này. Hãy tham gia để khám phá thêm!'}
        </p>

        {/* Key Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 flex-shrink-0">
          {/* Location */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 whitespace-nowrap text-xs sm:text-sm">Địa điểm</div>
              <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{club.city || 'N/A'}, {club.state || 'N/A'}</div>
            </div>
          </div>

          {/* Members */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-medium text-gray-900 whitespace-nowrap text-xs sm:text-sm">Thành viên</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">{formatMemberCount(dlv(club, 'memberCount', 0), dlv(club, 'maxMembers', 0))}</div>
            </div>
          </div>
        </div>

        {/* Schedule - Always show with fixed height */}
        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-shrink-0 h-10 sm:h-12">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 whitespace-nowrap text-xs sm:text-sm">Lịch hoạt động</div>
            <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {club.schedule || 'Chưa có lịch hoạt động'}
            </div>
          </div>
        </div>

        {/* Fee Section - Fixed height */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-green-100 flex-shrink-0 h-16 sm:h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Phí thành viên</div>
              <div className="text-sm sm:text-lg font-bold text-green-600 whitespace-nowrap">{formatFee(dlv(club, 'monthlyFee'))}</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">mỗi tháng</div>
            </div>
            {dlv(club, 'yearlyFee') && (
              <div className="text-right flex-1">
                <div className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Phí năm</div>
                <div className="text-sm sm:text-base font-bold text-blue-600 whitespace-nowrap">{formatFee(dlv(club, 'yearlyFee'))}</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">tiết kiệm 20%</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed height */}
        <div className="flex gap-2 sm:gap-3 mt-auto flex-shrink-0">
          <Link 
            href={`/clubs/${club.id}`} 
            className="flex-1 btn btn-outline btn-xs sm:btn-sm"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="hidden sm:inline">Xem chi tiết</span>
            <span className="sm:hidden">Chi tiết</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
