'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const SettingsPage = dynamic(
  () => import('@/components/settings/SettingsPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang cài đặt..." />
  }
);

export default function Page() {
  return <SettingsPage />;
}
