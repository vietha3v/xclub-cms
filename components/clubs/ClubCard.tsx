'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Club } from '@/types/club';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  const [isJoining, setIsJoining] = useState(false);

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

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return 'badge-primary';
      case 'private':
        return 'badge-secondary';
      case 'club_only':
        return 'badge-accent';
      default:
        return 'badge-neutral';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency === 'VND' ? 'VND' : 'USD',
    }).format(amount);
  };

  const handleJoinClub = async () => {
    setIsJoining(true);
    try {
      // TODO: Implement join club logic
      console.log('Joining club:', club.id);
    } catch (error) {
      console.error('Join club error:', error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Banner Image */}
      <figure className="relative h-48">
        {club.coverImageUrl ? (
          <img 
            src={club.coverImageUrl} 
            alt={`${club.name} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          <div className={`badge ${getStatusColor(club.status)}`}>
            {club.status === 'active' ? 'Hoạt động' : 
             club.status === 'pending' ? 'Chờ duyệt' :
             club.status === 'inactive' ? 'Không hoạt động' : 'Tạm ngưng'}
          </div>
          <div className={`badge ${club.isPublic ? 'badge-primary' : 'badge-secondary'}`}>
            {club.isPublic ? 'Công khai' : 'Riêng tư'}
          </div>
        </div>

        {/* Logo */}
        {club.logoUrl && (
          <div className="absolute -bottom-8 left-4">
            <div className="w-16 h-16 bg-base-100 rounded-full p-1 shadow-lg">
              <img 
                src={club.logoUrl} 
                alt={`${club.name} logo`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body pt-10">
        {/* Club Name and Category */}
        <div className="mb-3">
          <h2 className="card-title text-lg mb-2">
            <Link href={`/clubs/${club.id}`} className="hover:text-primary transition-colors">
              {club.name}
            </Link>
          </h2>
          <div className="badge badge-outline">{club.type}</div>
        </div>

        {/* Description */}
        <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
          {club.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-sm text-base-content/70 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{club.city || 'N/A'}, {club.state || 'N/A'}</span>
        </div>

        {/* Members Info */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>0/{club.maxMembers || 0} thành viên</span>
          </div>
          <div className="text-right">
            <div className="font-medium">{club.monthlyFee ? `${parseInt(club.monthlyFee).toLocaleString('vi-VN')} VND` : 'Miễn phí'}</div>
            <div className="text-xs text-base-content/50">Phí tháng</div>
          </div>
        </div>

        {/* Schedule */}
        {club.schedule && (
          <div className="text-sm text-base-content/70 mb-4">
            <div className="flex items-center mb-1">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{club.schedule}</span>
            </div>
          </div>
        )}

        {/* Club Info */}
        <div className="flex items-center justify-between text-sm mb-4 p-3 bg-base-200 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-primary">{club.clubCode}</div>
            <div className="text-xs">Mã CLB</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-secondary">{club.type}</div>
            <div className="text-xs">Loại</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-accent">{club.isPublic ? 'Công khai' : 'Riêng tư'}</div>
            <div className="text-xs">Quyền riêng tư</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4">
          <Link href={`/clubs/${club.id}`} className="btn btn-outline btn-sm">
            Xem chi tiết
          </Link>
          <button
            className={`btn btn-primary btn-sm ${isJoining ? 'loading' : ''}`}
            onClick={handleJoinClub}
            disabled={isJoining || club.status !== 'active'}
          >
            {isJoining ? 'Đang tham gia...' : 'Tham gia'}
          </button>
        </div>
      </div>
    </div>
  );
}
