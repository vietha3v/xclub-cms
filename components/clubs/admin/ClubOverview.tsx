'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import { Users, Calendar, Trophy, Activity } from 'lucide-react';

interface ClubOverviewProps {
  clubId: string;
}

export default function ClubOverview({ clubId }: ClubOverviewProps) {
  const [club, setClub] = useState<Club | null>(null);

  const [{ data: clubData, loading: clubLoading, error: clubError }, refetchClub] = useAxios<Club>(
    `/api/clubs/${clubId}`,
    { manual: true }
  );

  useEffect(() => {
    if (clubId) {
      refetchClub();
    }
  }, [clubId, refetchClub]);

  useEffect(() => {
    if (clubData) {
      setClub(clubData);
    }
  }, [clubData]);

  if (clubLoading) {
    return (
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-sm animate-pulse">
          <div className="card-body">
            <div className="h-8 bg-base-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-base-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card bg-base-100 shadow-sm animate-pulse">
              <div className="card-body">
                <div className="h-6 bg-base-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-base-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Lỗi tải dữ liệu</h2>
          <p className="text-base-content/70 mb-6">
            Không thể tải thông tin CLB. Vui lòng thử lại.
          </p>
          <button onClick={() => refetchClub()} className="btn btn-primary">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Club Info Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🏃‍♂️</span>
                {club.name}
              </h2>
              <p className="text-base-content/70 mt-1">
                {club.description || 'Chưa có mô tả'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${club.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                {club.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
              </span>
              <span className={`badge ${club.type === 'public' ? 'badge-info' : 'badge-secondary'}`}>
                {club.type === 'public' ? 'Công khai' : 'Riêng tư'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{club.memberCount || 0}</h3>
                <p className="text-base-content/70">Thành viên</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/20">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{club.eventCount || 0}</h3>
                <p className="text-base-content/70">Sự kiện</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-warning/20">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{club.challengeCount || 0}</h3>
                <p className="text-base-content/70">Thử thách</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-info/20">
                <Activity className="w-6 h-6 text-info" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{club.adminCount || 0}</h3>
                <p className="text-base-content/70">Quản trị viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">CLB được tạo thành công</p>
                <p className="text-xs text-base-content/70">
                  {club.createdAt ? new Date(club.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                </p>
              </div>
            </div>
            {club.memberCount && club.memberCount > 0 && (
              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Có {club.memberCount} thành viên tham gia</p>
                  <p className="text-xs text-base-content/70">Hiện tại</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
