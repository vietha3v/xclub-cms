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
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      <ClubDetail clubId={clubId} />
    </div>
  );
}
