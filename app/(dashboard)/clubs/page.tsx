import React from 'react';
import ClubList from '@/components/clubs/ClubList';

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                Câu lạc bộ chạy bộ
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Khám phá và tham gia các câu lạc bộ chạy bộ hàng đầu Việt Nam. 
              Kết nối với cộng đồng, chia sẻ đam mê và cùng nhau phát triển.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-base-content/70">CLB hoạt động</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-secondary">50K+</div>
                <div className="text-sm text-base-content/70">Thành viên</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-accent">100+</div>
                <div className="text-sm text-base-content/70">Sự kiện/tháng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ClubList />
      </div>
    </div>
  );
}
