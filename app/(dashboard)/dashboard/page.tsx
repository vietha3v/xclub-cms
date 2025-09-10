'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const DashboardPage = dynamic(
  () => import('@/components/dashboard/DashboardPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang chủ..." />
  }
);

export default function Page() {
  return <DashboardPage />;
}
