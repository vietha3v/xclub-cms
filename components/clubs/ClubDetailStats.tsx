'use client';

import { Club } from '@/types/club';

interface ClubDetailStatsProps {
  club: Club;
}

export default function ClubDetailStats({ club }: ClubDetailStatsProps) {
  const stats = [
    {
      title: 'Thành viên',
      value: '0', // TODO: Get from API
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'text-primary',
    },
    {
      title: 'Sự kiện',
      value: '0', // TODO: Get from API
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-secondary',
    },
    {
      title: 'Hoạt động',
      value: '0', // TODO: Get from API
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'text-accent',
    },
    {
      title: 'Thành tích',
      value: '0', // TODO: Get from API
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'text-warning',
    },
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">Thống kê CLB</h2>
        
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-base-300 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="font-medium">{stat.title}</span>
              </div>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-base-300">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/70">Ngày tạo</span>
              <span>{new Date(club.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Cập nhật cuối</span>
              <span>{new Date(club.updatedAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Trạng thái</span>
              <span className={`badge badge-sm ${
                club.status === 'active' ? 'badge-success' :
                club.status === 'pending' ? 'badge-warning' :
                'badge-error'
              }`}>
                {club.status === 'active' ? 'Hoạt động' :
                 club.status === 'pending' ? 'Chờ duyệt' : 'Không hoạt động'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
