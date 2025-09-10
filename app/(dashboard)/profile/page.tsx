'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ProfilePage = dynamic(
  () => import('@/components/profile/ProfilePage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang cá nhân..." />
  }
);

export default function Page() {
  return <ProfilePage />;
}
