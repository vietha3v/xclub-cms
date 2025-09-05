import React from 'react';
import ClubDetail from '@/components/clubs/ClubDetail';
import Breadcrumb from '@/components/common/Breadcrumb';

interface ClubDetailPageProps {
  params: {
    id: string;
  };
}

export default function ClubDetailPage({ params }: ClubDetailPageProps) {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/dashboard' },
    { label: 'Câu lạc bộ', href: '/clubs' },
    { label: 'Chi tiết CLB' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      <ClubDetail clubId={params.id} />
    </div>
  );
}
