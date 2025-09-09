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
    challenges: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>('/api/challenges');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const challenges = challengesData?.challenges || [];

  const handleCreateSuccess = (challenge: Challenge) => {
    setShowCreateModal(false);
    refetch(); // Refresh the challenges list
    // Optionally navigate to the new challenge
    router.push(`/challenges/${challenge.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
              🏆 Thử thách & Thành tích
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
              Tham gia các thử thách và xem thành tích của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary btn-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tạo thử thách mới
              </button>
              <button className="btn btn-outline btn-lg">
                <Settings className="w-5 h-5 mr-2" />
                Quản lý thử thách
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-base-100/50">
        <div className="container mx-auto">
          <ChallengeStats challenges={challenges} />
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <CardSkeleton key={i} showImage={false} />
                  ))}
                </div>
              }
            >
              <ChallengeList />
            </LoadingWrapper>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-content mb-6">
            🎯 Tham gia cộng đồng X-Club
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
            Kết nối với những người chạy bộ khác, tham gia các sự kiện và 
            cùng nhau đạt được những mục tiêu thể thao!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/clubs')}
              className="btn btn-primary btn-lg"
            >
              🏃‍♂️ Khám phá CLB
            </button>
            <button 
              onClick={() => router.push('/events')}
              className="btn btn-outline btn-lg"
            >
              📅 Xem sự kiện
            </button>
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
