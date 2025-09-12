'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MedalsPage = dynamic(
  () => import('@/components/design/MedalsPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang thiết kế huy chương..." />
  }
);

export default function MedalsPageRoute() {
  return <MedalsPage />;
}
