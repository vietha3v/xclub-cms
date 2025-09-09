'use client';

import { useState } from 'react';
import EventList from '@/components/events/EventList';
import MyEvents from '@/components/events/MyEvents';
import TabContainer from '@/components/common/TabContainer';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'my-events'>('list');

  const tabs = [
    { id: 'list', label: 'Danh sách sự kiện', icon: '📅' },
    { id: 'my-events', label: 'Sự kiện của tôi', icon: '🎯' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            📅 Sự kiện chạy bộ
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Khám phá và tham gia các sự kiện chạy bộ thú vị. 
            Từ tập luyện hàng tuần đến giải đấu lớn, tất cả đều có ở đây.
          </p>
          <div className="mt-4 p-4 bg-info/10 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-info">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">
                Tham gia sự kiện để kết nối với cộng đồng và nâng cao kỹ năng chạy bộ!
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <TabContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'list' | 'my-events')}
        />

        {/* Content */}
        {activeTab === 'list' ? (
          <EventList />
        ) : (
          <MyEvents />
        )}
      </div>
    </div>
  );
}
