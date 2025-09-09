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
    }
  }, [clubData]);

  const loadClub = async () => {
    try {
      await refetchClub();
    } catch (err) {
      console.error('Load club error:', err);
    }
  };


 
  console.log('club', club);
  if (clubLoading) {
    return <ClubDetailSkeleton />;
  }

  if (clubError || !club) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 text-base-content/30">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-base-content mb-2">
          Không tìm thấy CLB
        </h3>
        <p className="text-base-content/70 mb-6">
          {clubError ? 'Không thể tải dữ liệu' : 'CLB không tồn tại hoặc đã bị xóa'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={loadClub}
            className="btn btn-primary btn-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Thử lại
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
    <div className="space-y-8">
      {/* Header */}
      <ClubDetailHeader club={club} />

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="default"
        size="md"
      />

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
  );
}
