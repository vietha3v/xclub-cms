'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Tabs from '@/components/common/Tabs';

const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải dashboard..." />
});

const AdminEvents = dynamic(() => import('@/components/admin/AdminEvents'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải sự kiện..." />
});

const AdminChallenges = dynamic(() => import('@/components/admin/AdminChallenges'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải thử thách..." />
});

const AdminRaces = dynamic(() => import('@/components/admin/AdminRaces'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải giải chạy..." />
});

const AdminUsers = dynamic(() => import('@/components/admin/AdminUsers'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải người dùng..." />
});

const AdminClubs = dynamic(() => import('@/components/admin/AdminClubs'), {
  ssr: false,
  loading: () => <LoadingSpinner text="Đang tải CLB..." />
});

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Tổng quan', icon: '📊' },
    { id: 'events', label: 'Sự kiện', icon: '🎯' },
    { id: 'challenges', label: 'Thử thách', icon: '🏆' },
    { id: 'races', label: 'Giải chạy', icon: '🏁' },
    { id: 'clubs', label: 'Câu lạc bộ', icon: '🏃‍♂️' },
    { id: 'users', label: 'Người dùng', icon: '👥' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'events':
        return <AdminEvents />;
      case 'challenges':
        return <AdminChallenges />;
      case 'races':
        return <AdminRaces />;
      case 'clubs':
        return <AdminClubs />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              🛠️ Quản trị hệ thống
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Quản lý toàn bộ hệ thống X-Club
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Admin Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="pills"
            size="sm"
            fullWidth
            className="mb-8"
          />

          {/* Main Content */}
          <div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
