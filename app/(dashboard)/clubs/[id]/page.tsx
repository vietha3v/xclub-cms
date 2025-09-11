'use client';

import { use } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ClubDetailPage = dynamic(
  () => import('@/components/clubs/ClubDetailPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải chi tiết CLB..." />
  }
);

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  return <ClubDetailPage clubId={id} />;
}
