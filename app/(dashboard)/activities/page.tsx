'use client';

import { useState } from 'react';
import ActivityList from '@/components/activities/ActivityList';
import ActivityStats from '@/components/activities/ActivityStats';
import TabContainer from '@/components/common/TabContainer';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

  const tabs = [
    { id: 'list', label: 'Danh sách hoạt động', icon: '📋' },
    { id: 'stats', label: 'Thống kê', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🏃‍♂️ Hoạt động thể thao
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Theo dõi và phân tích các hoạt động thể thao từ Strava, Garmin và các thiết bị khác
          </p>
          <div className="mt-4 p-4 bg-info/10 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-info">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">
                Dữ liệu được đồng bộ tự động. Kết nối thiết bị để bắt đầu theo dõi!
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'list' | 'stats')}
        />

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
