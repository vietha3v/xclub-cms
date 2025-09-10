'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ChallengesPage = dynamic(
  () => import('@/components/challenges/ChallengesPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang thử thách..." />
  }
);

export default function ChallengesPageRoute() {
  return <ChallengesPage />;
}