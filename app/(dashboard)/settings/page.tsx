'use client';

import React, { useState } from 'react';
import IntegrationSettings from '@/components/settings/IntegrationSettings';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import Tabs from '@/components/common/Tabs';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('integrations');

  const tabs = [
    { id: 'integrations', label: 'Tích hợp thiết bị', icon: '🔗' },
    { id: 'profile', label: 'Thông tin cá nhân', icon: '👤' },
    { id: 'notifications', label: 'Thông báo', icon: '🔔' },
    { id: 'security', label: 'Bảo mật', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            ⚙️ Cài đặt
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Quản lý tài khoản, tích hợp thiết bị và các cài đặt khác
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
          size="md"
        />

        {/* Content based on active tab */}
        {activeTab === 'integrations' && <IntegrationSettings />}
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
}
