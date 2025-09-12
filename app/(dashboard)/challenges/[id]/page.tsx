'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ChallengeDetail = dynamic(
  () => import('@/components/challenges/common/ChallengeDetail'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải chi tiết thử thách..." />
  }
);

export default function ChallengeDetailPage() {
  return <ChallengeDetail />;
}