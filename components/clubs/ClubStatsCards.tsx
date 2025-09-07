'use client';

import { ClubStats } from '@/types/club';
import dlv from 'dlv';

interface ClubStatsCardsProps {
  stats?: ClubStats | null;
}

export default function ClubStatsCards({ stats }: ClubStatsCardsProps) {
  // Safe access to stats properties with default values
  const statItems = [
    {
      title: 'Tổng số CLB',
      value: dlv(stats, 'totalClubs', 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-primary text-primary-content',
    },
    {
      title: 'CLB hoạt động',
      value: dlv(stats, 'activeClubs', 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-success text-success-content',
    },
    {
      title: 'CLB chờ duyệt',
      value: dlv(stats, 'pendingClubs', 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-warning text-warning-content',
    },
    {
      title: 'CLB chạy bộ',
      value: dlv(stats, 'runningClubs', 0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-accent text-accent-content',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="stats shadow">
          <div className="stat">
            <div className={`stat-figure ${item.color} rounded-full p-3`}>
              {item.icon}
            </div>
            <div className="stat-title">{item.title}</div>
            <div className="stat-value text-3xl">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
