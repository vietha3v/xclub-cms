import React from 'react';
import IntegrationSettings from '@/components/settings/IntegrationSettings';

export default function SettingsPage() {
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
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed gap-2">
            <button className="tab px-6 py-3 tab-active">🔗 Tích hợp thiết bị</button>
            <button className="tab px-6 py-3">👤 Thông tin cá nhân</button>
            <button className="tab px-6 py-3">🔔 Thông báo</button>
            <button className="tab px-6 py-3">🔒 Bảo mật</button>
          </div>
        </div>

        {/* Integrations Section */}
        <IntegrationSettings />
      </div>
    </div>
  );
}
