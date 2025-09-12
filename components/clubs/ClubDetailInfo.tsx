'use client';

import { Club } from '@/types/club';
import dlv from 'dlv';

interface ClubDetailInfoProps {
  club: Club | null;
}

export default function ClubDetailInfo({ club }: ClubDetailInfoProps) {
  // Early return if club is null
  if (!club) {
    return (
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-4 sm:p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-base-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div>
              <div className="h-4 bg-base-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-base-200 rounded w-full"></div>
              <div className="h-4 bg-base-200 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-4 bg-base-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-base-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return 'Miễn phí';
    return `${parseInt(amount).toLocaleString('vi-VN')} VND`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">Thông tin CLB</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 sm:mb-3">Thông tin cơ bản</h3>
            
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Mô tả</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">
                  {club?.description || 'Chưa có mô tả'}
                </p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Loại CLB</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{club?.type}</p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Ngày thành lập</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{formatDate(club?.foundedAt)}</p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Số thành viên tối đa</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{club?.maxMembers || 'Không giới hạn'}</p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 sm:mb-3">Địa điểm</h3>
            
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Địa chỉ</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">
                  {club?.address || 'Chưa cập nhật'}
                </p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Thành phố</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{club?.city || 'N/A'}</p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Tỉnh/Thành phố</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{club?.state || 'N/A'}</p>
              </div>
              
              <div>
                <label className="text-xs sm:text-sm font-medium text-base-content/70">Quốc gia</label>
                <p className="text-xs sm:text-sm text-base-content mt-1">{club?.country || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        {club?.schedule && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-base-300">
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 sm:mb-3">Lịch hoạt động</h3>
            <p className="text-xs sm:text-sm text-base-content">{club.schedule}</p>
          </div>
        )}

        {/* Fees */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-base-300">
          <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 sm:mb-3">Phí tham gia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex justify-between items-center p-2 sm:p-3 bg-base-200 rounded-lg">
              <span className="text-xs sm:text-sm text-base-content/70">Phí tháng</span>
              <span className="text-xs sm:text-sm font-semibold">{formatCurrency(club?.monthlyFee)}</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-base-200 rounded-lg">
              <span className="text-xs sm:text-sm text-base-content/70">Phí năm</span>
              <span className="text-xs sm:text-sm font-semibold">{formatCurrency(club?.yearlyFee)}</span>
            </div>
          </div>
        </div>

        {/* Rules */}
        {club?.rules && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-base-300">
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 sm:mb-3">Nội quy CLB</h3>
            <div className="prose max-w-none">
              <p className="text-xs sm:text-sm text-base-content whitespace-pre-line">{club.rules}</p>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t border-base-300">
          <h3 className="text-lg font-semibold text-base-content mb-3">Thông tin liên hệ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {club.email && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${club.email}`} className="text-primary hover:underline">
                  {club.email}
                </a>
              </div>
            )}
            
            {club.phone && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${club.phone}`} className="text-primary hover:underline">
                  {club.phone}
                </a>
              </div>
            )}
            
            {club.website && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
