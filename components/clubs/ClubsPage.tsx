'use client';

import { useState } from 'react';
import ClubList from '@/components/clubs/ClubList';
import MyClubs from '@/components/clubs/MyClubs';
import TabContainer from '@/components/common/TabContainer';

export default function ClubsPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'my-clubs'>('list');

  const tabs = [
    { id: 'list', label: 'Danh sách CLB', icon: '🏢' },
    { id: 'my-clubs', label: 'CLB của tôi', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🏢 Câu lạc bộ chạy bộ
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Khám phá và tham gia các câu lạc bộ chạy bộ hàng đầu Việt Nam. 
            Kết nối với cộng đồng, chia sẻ đam mê và cùng nhau phát triển.
          </p>
          <div className="mt-4 p-4 bg-info/10 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-info">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">
                Tham gia CLB để kết nối với cộng đồng và tham gia các hoạt động thú vị!
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'list' | 'my-clubs')}
        />

        {/* Content */}
        {activeTab === 'list' ? (
          <ClubList />
        ) : (
          <MyClubs />
        )}
      </div>
    </div>
  );
}
