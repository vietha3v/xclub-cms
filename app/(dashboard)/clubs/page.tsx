'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ClubsPage = dynamic(
  () => import('@/components/clubs/ClubsPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang CLB..." />
  }
);

export default function Page() {
  return <ClubsPage />;
}
