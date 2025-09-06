'use client';

import React, { useState } from 'react';
import Tabs, { TabItem, TabPresets } from './Tabs';

export default function TabsDemo() {
  const [activeTab1, setActiveTab1] = useState('list');
  const [activeTab2, setActiveTab2] = useState('stats');
  const [activeTab3, setActiveTab3] = useState('settings');
  const [activeTab4, setActiveTab4] = useState('profile');

  const tabs1: TabItem[] = [
    { id: 'list', label: 'Danh sách', icon: '📋' },
    { id: 'stats', label: 'Thống kê', icon: '📊' }
  ];

  const tabs2: TabItem[] = [
    { id: 'overview', label: 'Tổng quan', icon: '🏠' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
    { id: 'profile', label: 'Hồ sơ', icon: '👤', badge: '3' }
  ];

  const tabs3: TabItem[] = [
    { id: 'basic', label: 'Cơ bản' },
    { id: 'advanced', label: 'Nâng cao' },
    { id: 'premium', label: 'Premium', disabled: true }
  ];

  const tabs4: TabItem[] = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'about', label: 'Giới thiệu', icon: 'ℹ️' },
    { id: 'contact', label: 'Liên hệ', icon: '📞' }
  ];

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-8">Tabs Component Demo</h1>
      
      {/* Default Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Default Variant</h2>
        <Tabs
          tabs={tabs1}
          activeTab={activeTab1}
          onTabChange={setActiveTab1}
          variant="default"
          size="md"
        />
        <div className="text-center text-sm text-base-content/60">
          Active: {activeTab1}
        </div>
      </div>

      {/* Pills Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Pills Variant</h2>
        <Tabs
          tabs={tabs2}
          activeTab={activeTab2}
          onTabChange={setActiveTab2}
          variant="pills"
          size="sm"
        />
        <div className="text-center text-sm text-base-content/60">
          Active: {activeTab2}
        </div>
      </div>

      {/* Underline Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Underline Variant</h2>
        <Tabs
          tabs={tabs3}
          activeTab={activeTab3}
          onTabChange={setActiveTab3}
          variant="underline"
          size="md"
        />
        <div className="text-center text-sm text-base-content/60">
          Active: {activeTab3}
        </div>
      </div>

      {/* Compact Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Compact Variant</h2>
        <Tabs
          tabs={tabs4}
          activeTab={activeTab4}
          onTabChange={setActiveTab4}
          variant="compact"
          size="sm"
        />
        <div className="text-center text-sm text-base-content/60">
          Active: {activeTab4}
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Full Width</h2>
        <Tabs
          tabs={tabs2}
          activeTab={activeTab2}
          onTabChange={setActiveTab2}
          variant="default"
          size="md"
          fullWidth
        />
      </div>

      {/* Different Sizes */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Small</h3>
          <Tabs
            tabs={tabs1}
            activeTab={activeTab1}
            onTabChange={setActiveTab1}
            size="sm"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Medium</h3>
          <Tabs
            tabs={tabs1}
            activeTab={activeTab1}
            onTabChange={setActiveTab1}
            size="md"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Large</h3>
          <Tabs
            tabs={tabs1}
            activeTab={activeTab1}
            onTabChange={setActiveTab1}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
