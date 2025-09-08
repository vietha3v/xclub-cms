'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Tabs from '@/components/common/Tabs';
import ClubOverview from '@/components/clubs/admin/ClubOverview';
import ClubMemberManagement from '@/components/clubs/ClubMemberManagement';
import ClubEventManagement from '@/components/clubs/admin/ClubEventManagement';
import ClubChallengeManagement from '@/components/clubs/admin/ClubChallengeManagement';
import ClubSettings from '@/components/clubs/admin/ClubSettings';

export default function ClubManagerPage() {
  const params = useParams();
  const clubId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');

  if (!clubId) {
    return <div className="text-center py-12">Không tìm thấy ID CLB</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: '📊' },
    { id: 'members', label: 'Thành viên', icon: '👥' },
    { id: 'events', label: 'Sự kiện', icon: '📅' },
    { id: 'challenges', label: 'Thử thách', icon: '🏆' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.location.href = `/clubs/${clubId}`}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang CLB
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🏃‍♂️ Quản lý CLB
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Quản lý thành viên, sự kiện, thử thách và các cài đặt của CLB
          </p>
        </div>

        {/* Manager Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
          size="md"
        />

        {/* Content based on active tab */}
        {activeTab === 'overview' && <ClubOverview clubId={clubId} />}
        {activeTab === 'members' && <ClubMemberManagement clubId={clubId} />}
        {activeTab === 'events' && <ClubEventManagement clubId={clubId} />}
        {activeTab === 'challenges' && <ClubChallengeManagement clubId={clubId} />}
        {activeTab === 'settings' && <ClubSettings clubId={clubId} />}
      </div>
    </div>
  );
}
