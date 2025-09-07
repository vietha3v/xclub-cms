'use client';

import { useState } from 'react';
import { ClubMember } from '@/types/club';
import { RotateCcw, Trophy, Medal, Award } from 'lucide-react';
import Tabs, { TabItem } from '@/components/common/Tabs';

interface ClubDetailMembersProps {
  members: ClubMember[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function ClubDetailMembers({ 
  members = [], 
  loading = false, 
  error = null, 
  onRetry
}: ClubDetailMembersProps) {
  const [activeTab, setActiveTab] = useState<string>('week');

  // Định nghĩa tabs
  const tabs: TabItem[] = [
    { id: 'week', label: 'Tuần' },
    { id: 'month', label: 'Tháng' }
  ];
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

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">👥 Thành viên</h2>
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-base-content/70">Đang tải danh sách thành viên...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mock data cho bảng xếp hạng (sẽ thay thế bằng API thực tế)
  const getRankingData = (period: string) => {
    return members.map((member) => ({
      ...member,
      // Tổng km chạy trong tuần/tháng (mock data)
      totalDistance: period === 'week' ? Math.random() * 50 + 10 : Math.random() * 200 + 50,
      // Số hoạt động chạy
      runningActivities: period === 'week' ? Math.floor(Math.random() * 7) + 1 : Math.floor(Math.random() * 20) + 5,
    }))
    // Sắp xếp theo tổng km chạy (giảm dần)
    .sort((a, b) => b.totalDistance - a.totalDistance)
    // Thêm rank sau khi sắp xếp
    .map((member, index) => ({
      ...member,
      rank: index + 1,
    }));
  };

  const rankingData = getRankingData(activeTab);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-xl">
            <Trophy className="w-5 h-5" />
            Bảng xếp hạng
          </h2>
          <div className="badge badge-primary">{members.length}</div>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base-content/70">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="btn btn-outline btn-sm mt-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Thử lại
              </button>
            )}
          </div>
        ) : members.length === 0 ? (
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
              size="md"
              className="mb-4"
            />

            {/* Bảng xếp hạng */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-center">Hạng</th>
                    <th>Tên thành viên</th>
                    <th className="text-right">Tổng km chạy</th>
                    <th className="text-right">Số lần chạy</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.slice(0, 10).map((member, index) => (
                    <tr key={member.id} className="hover">
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
                          <div className={`badge badge-xs ${getRoleColor(member.role)}`}>
                            {getRoleText(member.role)}
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <span className="font-medium">{member.totalDistance.toFixed(1)} km</span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm">{member.runningActivities} lần chạy</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {members.length > 10 && (
              <div className="text-center pt-3">
                <button className="btn btn-outline btn-sm">
                  Xem tất cả ({members.length} thành viên)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}