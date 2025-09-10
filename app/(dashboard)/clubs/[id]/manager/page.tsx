'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ClubManagerPage = dynamic(
  () => import('@/components/clubs/ClubManagerPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang quản lý CLB..." />
  }
);

export default function Page() {
  return <ClubManagerPage />;
}
