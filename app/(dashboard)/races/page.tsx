'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const RacesPage = dynamic(
  () => import('@/components/races/RacesPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang giải chạy..." />
  }
);

export default function Page() {
  return <RacesPage />;
}
