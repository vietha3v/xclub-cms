'use client';

import React, { useState } from 'react';
import IntegrationSettings from '@/components/settings/IntegrationSettings';
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
        {activeTab === 'profile' && (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">👤 Thông tin cá nhân</h3>
              <p className="text-base-content/70">Chức năng đang phát triển...</p>
            </div>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">🔔 Thông báo</h3>
              <p className="text-base-content/70">Chức năng đang phát triển...</p>
            </div>
          </div>
        )}
        {activeTab === 'security' && (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">🔒 Bảo mật</h3>
              <p className="text-base-content/70">Chức năng đang phát triển...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
