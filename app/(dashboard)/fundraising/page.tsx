'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const FundraisingPage = dynamic(
  () => import('@/components/fundraising/FundraisingPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang gây quỹ..." />
  }
);

export default function Page() {
  return <FundraisingPage />;
}





