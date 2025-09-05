'use client';

import { useState } from 'react';
import ActivityList from '@/components/activities/ActivityList';
import ActivityStats from '@/components/activities/ActivityStats';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🏃‍♂️ Hoạt động chạy bộ
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Xem và quản lý các hoạt động chạy bộ được đồng bộ từ Strava, Garmin và các thiết bị khác
          </p>
          <div className="mt-4 p-4 bg-info/10 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-info">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">
                Hoạt động được đồng bộ tự động từ thiết bị của bạn. Hãy cài đặt tích hợp để bắt đầu!
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed justify-center mb-8">
          <button
            className={`tab ${activeTab === 'list' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Danh sách hoạt động
          </button>
          <button
            className={`tab ${activeTab === 'stats' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Thống kê
          </button>
        </div>

        {/* Content */}
        {activeTab === 'list' ? (
          <ActivityList />
        ) : (
          <ActivityStats />
        )}
      </div>
    </div>
  );
}
