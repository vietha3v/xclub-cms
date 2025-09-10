'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const EventsPage = dynamic(
  () => import('@/components/events/EventsPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang sự kiện..." />
  }
);

export default function Page() {
  return <EventsPage />;
}