'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import ClubDetailHeader from './ClubDetailHeader';
import ClubDetailInfo from './ClubDetailInfo';
import ClubDetailMembers from './ClubDetailMembers';
import ClubDetailEvents from './ClubDetailEvents';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import ClubDetailStats from './ClubDetailStats';
import ClubDetailSkeleton from '@/components/common/ClubDetailSkeleton';
import Tabs from '@/components/common/Tabs';

interface ClubDetailProps {
  clubId: string;
}

export default function ClubDetail({ clubId }: ClubDetailProps) {
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  const [{ data: clubData, loading: clubLoading, error: clubError }, refetchClub] = useAxios<Club>(
    `/api/clubs/${clubId}`,
    { manual: true }
  );

  useEffect(() => {
    loadClub();
  }, [clubId]);

  useEffect(() => {
    if (clubData) {
      setClub(clubData);
      setHasInitiallyLoaded(true);
    }
  }, [clubData]);

  useEffect(() => {
    // Mark as initially loaded even if there's an error
    if (clubError && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
    }
  }, [clubError, hasInitiallyLoaded]);

  const loadClub = async () => {
    try {
      await refetchClub();
    } catch (err) {
      console.error('Load club error:', err);
      setHasInitiallyLoaded(true);
    }
  };


 
  console.log('club', club);
  
  // Show skeleton while loading
  if (clubLoading) {
    return <ClubDetailSkeleton />;
  }

  // Only show error state if we have a confirmed error or no data after initial load
  if (hasInitiallyLoaded && (clubError || !club)) {
    // Check if it's a network timeout or actual error
    const isTimeoutError = clubError?.message?.includes('timeout') || 
                          clubError?.message?.includes('Network Error') ||
                          clubError?.code === 'ECONNABORTED';
    
    return (
      <div className="text-center py-8 sm:py-12 animate-fade-in-up">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 text-base-content/30">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
          {isTimeoutError ? 'Tải dữ liệu chậm' : 'Không tìm thấy CLB'}
        </h3>
        <p className="text-sm sm:text-base text-base-content/70 mb-4 sm:mb-6">
          {isTimeoutError 
            ? 'Kết nối chậm, vui lòng thử lại' 
            : clubError 
              ? 'Không thể tải dữ liệu' 
              : 'CLB không tồn tại hoặc đã bị xóa'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <button
            onClick={loadClub}
            className="btn btn-primary btn-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            {isTimeoutError ? 'Thử lại' : 'Tải lại'}
          </button>
          <button
            onClick={() => router.back()}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // Define tabs
  const tabs = [
    { id: 'info', label: 'Thông tin', icon: '📋' },
    { id: 'members', label: 'Thành viên', icon: '👥' },
    { id: 'events', label: 'Sự kiện', icon: '📅' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <ClubDetailHeader club={club} />
      </div>

      {/* Tabs */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
          size="md"
        />
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <ClubDetailInfo club={club} />
            </div>

            {/* Right Column - Stats */}
            <div>
              <ClubDetailStats club={club} />
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <ClubDetailMembers 
            members={club?.members || []}
            loading={clubLoading}
            error={clubError ? 'Không thể tải dữ liệu' : null}
            onRetry={loadClub}
            clubId={clubId}
          />
        )}

        {activeTab === 'events' && (
          <ClubDetailEvents clubId={clubId} />
        )}
      </div>

    </div>
  );
}
