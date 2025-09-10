'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ProfileSettingsPage = dynamic(
  () => import('@/components/profile/ProfileSettingsPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang cài đặt..." />
  }
);

export default function Page() {
  return <ProfileSettingsPage />;
}
