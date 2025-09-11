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
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-3 sm:mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            🏢 Câu lạc bộ chạy bộ
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Khám phá và tham gia các câu lạc bộ chạy bộ hàng đầu Việt Nam. 
            Kết nối với cộng đồng, chia sẻ đam mê và cùng nhau phát triển.
          </p>
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-info/10 rounded-lg max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-2 text-info">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-center">
                Tham gia CLB để kết nối với cộng đồng và tham gia các hoạt động thú vị!
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <TabContainer
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as 'list' | 'my-clubs')}
          />
        </div>

        {/* Content */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {activeTab === 'list' ? (
            <ClubList />
          ) : (
            <MyClubs />
          )}
        </div>
      </div>
    </div>
  );
}
