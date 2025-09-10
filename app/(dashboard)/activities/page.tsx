'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ActivitiesPage = dynamic(
  () => import('@/components/activities/ActivitiesPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang hoạt động..." />
  }
);

export default function Page() {
  return <ActivitiesPage />;
}
