'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import ClubDetailHeader from './ClubDetailHeader';
import ClubDetailInfo from './ClubDetailInfo';
import ClubDetailMembers from './ClubDetailMembers';
import ClubDetailEvents from './ClubDetailEvents';
import ClubDetailChallenges from './ClubDetailChallenges';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import ClubDetailStats from './ClubDetailStats';
import ClubDetailActions from './ClubDetailActions';
import ClubAdminActions from './ClubAdminActions';
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
      // Sử dụng userRole array từ API để xác định quyền admin
      setIsAdmin(clubData.userRole?.includes('admin') || false);
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

  if (loading || clubLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="skeleton w-16 h-16 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-8 w-64 mb-2"></div>
                <div className="skeleton h-4 w-32"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Skeleton */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex gap-3">
              <div className="skeleton h-10 w-32"></div>
              <div className="skeleton h-10 w-24"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Info Skeleton */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="skeleton h-6 w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Events Skeleton */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="skeleton h-6 w-40 mb-4"></div>
                <div className="space-y-4">
                  <div className="skeleton h-20 w-full"></div>
                  <div className="skeleton h-20 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Stats Skeleton */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="skeleton h-6 w-24 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="skeleton h-16 w-full"></div>
                  <div className="skeleton h-16 w-full"></div>
                </div>
              </div>
            </div>

            {/* Members Skeleton */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="skeleton h-6 w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="skeleton w-8 h-8 rounded-full"></div>
                    <div className="skeleton h-4 w-24"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="skeleton w-8 h-8 rounded-full"></div>
                    <div className="skeleton h-4 w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        <p className="text-base-content/70 mb-6">
          {error || 'CLB không tồn tại hoặc đã bị xóa'}
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

      {/* Admin Actions */}
      <ClubAdminActions 
        club={club}
        isAdmin={isAdmin}
        onUpdate={loadClub}
        onDelete={() => router.push('/clubs')}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <ClubDetailInfo club={club} />
          <ClubDetailEvents 
            events={club?.events || []}
            loading={loading || clubLoading}
            error={error || clubError?.message}
            onRetry={loadClub}
          />
          <ClubDetailChallenges 
            challenges={club?.challenges || []}
            loading={loading || clubLoading}
            error={error || clubError?.message}
            onRetry={loadClub}
          />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          <ClubDetailStats club={club} />
          <ClubDetailMembers 
            members={club?.members || []}
            loading={loading || clubLoading}
            error={error || clubError?.message}
            onRetry={loadClub}
          />
        </div>
      </div>
    </div>
  );
}
