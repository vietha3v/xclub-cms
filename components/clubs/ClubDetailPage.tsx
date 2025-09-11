import React from 'react';
import ClubDetail from '@/components/clubs/ClubDetail';
import Breadcrumb from '@/components/common/Breadcrumb';

interface ClubDetailPageProps {
  clubId: string;
}

export default function ClubDetailPage({ clubId }: ClubDetailPageProps) {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/dashboard' },
    { label: 'Câu lạc bộ', href: '/clubs' },
    { label: 'Chi tiết CLB' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <ClubDetail clubId={clubId} />
      </div>
    </div>
  );
}
