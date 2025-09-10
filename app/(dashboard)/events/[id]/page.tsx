'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const EventDetailPage = dynamic(
  () => import('@/components/events/EventDetailPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải chi tiết sự kiện..." />
  }
);

export default function Page() {
  return <EventDetailPage />;
}
