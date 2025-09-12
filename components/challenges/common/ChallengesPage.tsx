'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChallengeList from './ChallengeList';
import ChallengeStats from './ChallengeStats';
import UnifiedChallengeModal from './UnifiedChallengeModal';
import { LoadingWrapper, CardSkeleton } from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import { Plus, Settings } from 'lucide-react';

export default function ChallengesPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [{ data: challengesData, loading, error }, refetch] = useAxios<{
    data: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>('/api/challenges');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const challenges = challengesData?.data || [];

  const handleCreateSuccess = (challenge: Challenge) => {
    setShowCreateModal(false);
    refetch(); // Refresh the challenges list
    // Optionally navigate to the new challenge
    router.push(`/challenges/${challenge.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full shadow-lg">
                <span className="text-2xl sm:text-3xl">🏆</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
              Thử thách & Thành tích
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed">
              Tham gia các thử thách và xem thành tích của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary btn-sm sm:btn-md"
              >
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Tạo thử thách mới</span>
                <span className="sm:hidden">Tạo thử thách</span>
              </button>
              <button className="btn btn-outline btn-sm sm:btn-md">
                <Settings className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Quản lý thử thách</span>
                <span className="sm:hidden">Quản lý</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 sm:py-6 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <ChallengeStats challenges={challenges} />
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-4 sm:py-6 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {error ? (
              <ErrorState
                title="Có lỗi xảy ra"
                message="Không thể tải danh sách thử thách"
                onRetry={() => refetch()}
              />
            ) : (
              <LoadingWrapper
                loading={loading}
                skeleton={
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                }
              >
                <ChallengeList />
              </LoadingWrapper>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 px-3 sm:px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
                🎯 Tham gia cộng đồng X-Club
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
                Kết nối với những người chạy bộ khác, tham gia các sự kiện và 
                cùng nhau đạt được những mục tiêu thể thao!
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button 
                  onClick={() => router.push('/clubs')}
                  className="btn btn-primary btn-sm sm:btn-md"
                >
                  🏃‍♂️ <span className="hidden sm:inline">Khám phá CLB</span><span className="sm:hidden">CLB</span>
                </button>
                <button 
                  onClick={() => router.push('/events')}
                  className="btn btn-outline btn-sm sm:btn-md"
                >
                  📅 <span className="hidden sm:inline">Xem sự kiện</span><span className="sm:hidden">Sự kiện</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Challenge Modal */}
      <UnifiedChallengeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
