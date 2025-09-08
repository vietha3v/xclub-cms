'use client';

import { useState, useEffect } from 'react';
import { ClubMember } from '@/types/club';
import { RotateCcw, Trophy, Medal, Award } from 'lucide-react';
import Tabs, { TabItem } from '@/components/common/Tabs';
import { TableSkeleton } from '@/components/common/LoadingSkeleton';
import useAxios from '@/hooks/useAxios';

interface ClubDetailMembersProps {
  members: ClubMember[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  clubId?: string;
}

interface MembersResponse {
  members: ClubMember[];
  total: number;
}

export default function ClubDetailMembers({ 
  members = [], 
  loading = false, 
  error = null, 
  onRetry,
  clubId
}: ClubDetailMembersProps) {
  const [activeTab, setActiveTab] = useState<string>('week');
  const [membersWithStats, setMembersWithStats] = useState<ClubMember[]>([]);

  // Fetch members data with stats
  const [{ data: membersResponse, loading: membersLoading, error: membersError }, refetchMembers] = useAxios<MembersResponse>(
    clubId ? `/api/clubs/${clubId}/members?sortBy=${activeTab}` : '',
    { manual: true }
  );

  useEffect(() => {
    if (clubId) {
      refetchMembers();
    }
  }, [clubId, refetchMembers]);

  // Refetch data when tab changes
  useEffect(() => {
    if (clubId) {
      refetchMembers();
    }
  }, [activeTab, clubId, refetchMembers]);


  useEffect(() => {
    if (membersResponse) {
      setMembersWithStats(membersResponse.members);
    }
  }, [membersResponse]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge-error';
      case 'moderator':
        return 'badge-warning';
      case 'member':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị';
      case 'moderator':
        return 'Điều hành';
      case 'member':
        return 'Thành viên';
      default:
        return 'Không xác định';
    }
  };

  // Hiển thị loading khi đang fetch data từ API
  if (loading || membersLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">👥 Thành viên</h2>
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-base-content/70">Đang tính toán thành tích...</p>
          </div>
        </div>
      </div>
    );
  }

  // Định nghĩa tabs
  const tabs: TabItem[] = [
    { id: 'week', label: 'Tuần' },
    { id: 'month', label: 'Tháng' }
  ];

  // Sử dụng dữ liệu thực từ API (BE đã sắp xếp theo km chạy)
  const rankingData = membersWithStats
    .map(member => ({
      ...member,
      totalDistance: member.runningStats?.distance || 0
    }))
    .map((member, index) => ({
      ...member,
      rank: index + 1
    }));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">
            <Trophy className="w-5 h-5" />
            Bảng xếp hạng
          </h2>
          <div className="badge badge-primary">{membersWithStats.length}</div>
        </div>

        {error || membersError ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">{error || membersError?.message || 'Có lỗi xảy ra'}</p>
            {(onRetry || refetchMembers) && (
              <button
                onClick={onRetry || refetchMembers}
                className="btn btn-outline btn-sm mt-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Thử lại
              </button>
            )}
          </div>
        ) : membersWithStats.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">Chưa có thành viên nào</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="default"
              size="sm"
              className="mb-4"
            />

            {/* Bảng xếp hạng */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-center">Hạng</th>
                    <th>Tên thành viên</th>
                    <th className="text-right">Lượt hoạt động</th>
                    <th className="text-right">Tổng km</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.slice(0, 10).map((member, index) => (
                    <tr key={member.userId} className="hover">
                      <td className="text-center">
                        <div className="flex items-center justify-center">
                          {index === 0 ? (
                            <Trophy className="w-6 h-6 text-yellow-500" />
                          ) : index === 1 ? (
                            <Medal className="w-6 h-6 text-gray-400" />
                          ) : index === 2 ? (
                            <Award className="w-6 h-6 text-amber-600" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-medium">{`${member.user.firstName} ${member.user.lastName}`}</div>
                          <div className="text-sm text-base-content/60">
                            @{member.user.username}
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <span className="font-medium">
                          {member.runningStats?.activityCount || 0}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="font-medium">{member.totalDistance.toFixed(1)} km</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {membersWithStats.length > 10 && (
              <div className="text-center pt-3">
                <button className="btn btn-outline btn-sm">
                  Xem tất cả ({membersWithStats.length} thành viên)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}