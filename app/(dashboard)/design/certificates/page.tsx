'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CertificatesPage = dynamic(
  () => import('@/components/design/CertificatesPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner text="Đang tải trang thiết kế giấy chứng nhận..." />
  }
);

export default function CertificatesPageRoute() {
  return <CertificatesPage />;
}
