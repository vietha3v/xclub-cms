'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import ClubDetailHeader from './ClubDetailHeader';
import ClubDetailInfo from './ClubDetailInfo';
import ClubDetailMembers from './ClubDetailMembers';
import ClubDetailEvents from './ClubDetailEvents';
import ClubDetailStats from './ClubDetailStats';
import ClubDetailActions from './ClubDetailActions';
import { ClubDetailSkeleton } from '@/components/common/LoadingSkeleton';

interface ClubDetailProps {
  clubId: string;
}

export default function ClubDetail({ clubId }: ClubDetailProps) {
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
      setError(null);
      // TODO: Check if current user is admin of this club
      // For now, we'll assume user is admin if they created the club
      // In real implementation, you'd check against the club members API
      setIsAdmin(false); // This should be determined by checking club membership
    }
  }, [clubData]);

  useEffect(() => {
    if (clubError) {
      setError('Không thể tải thông tin CLB');
      console.error('Load club error:', clubError);
    }
  }, [clubError]);

  const loadClub = async () => {
    try {
      setLoading(true);
      await refetchClub();
    } catch (err) {
      setError('Không thể tải thông tin CLB');
      console.error('Load club error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async () => {
    try {
      // TODO: Implement join club logic
      console.log('Joining club:', clubId);
    } catch (error) {
      console.error('Join club error:', error);
    }
  };

  const handleLeaveClub = async () => {
    try {
      // TODO: Implement leave club logic
      console.log('Leaving club:', clubId);
    } catch (error) {
      console.error('Leave club error:', error);
    }
  };

  if (loading) {
    return <ClubDetailSkeleton />;
  }

  if (error || !club) {
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
        <p className="text-base-content/70 mb-4">
          {error || 'CLB không tồn tại hoặc đã bị xóa'}
        </p>
        <button
          onClick={() => router.back()}
          className="btn btn-primary"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ClubDetailHeader club={club} />

      {/* Actions */}
      <ClubDetailActions 
        club={club}
        onJoin={handleJoinClub}
        onLeave={handleLeaveClub}
        isAdmin={isAdmin}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <ClubDetailInfo club={club} />
          <ClubDetailEvents clubId={clubId} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          <ClubDetailStats club={club} />
          <ClubDetailMembers clubId={clubId} />
        </div>
      </div>
    </div>
  );
}
