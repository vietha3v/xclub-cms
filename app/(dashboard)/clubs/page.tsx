import React from 'react';
import ClubList from '@/components/clubs/ClubList';

export default function ClubsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-base-content mb-4">
          Câu lạc bộ chạy bộ
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Khám phá và tham gia các câu lạc bộ chạy bộ hàng đầu Việt Nam. 
          Kết nối với cộng đồng, chia sẻ đam mê và cùng nhau phát triển.
        </p>
      </div>

      {/* Club List Component */}
      <ClubList />
    </div>
  );
}
