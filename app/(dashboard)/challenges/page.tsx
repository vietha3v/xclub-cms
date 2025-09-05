'use client';

import { useState, useEffect } from 'react';
import ChallengeList from '@/components/challenges/ChallengeList';
import ChallengeFilters from '@/components/challenges/ChallengeFilters';
import ChallengeStats from '@/components/challenges/ChallengeStats';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';

export default function ChallengesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

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
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-base-100/50">
        <div className="container mx-auto">
          <ChallengeStats challenges={challenges} />
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <ChallengeFilters
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card bg-base-100 shadow-lg animate-pulse">
                  <div className="card-body">
                    <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
                    <div className="h-3 bg-base-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">❌</div>
              <h3 className="text-2xl font-semibold text-base-content mb-4">Có lỗi xảy ra</h3>
              <p className="text-base-content/70 mb-6">Không thể tải danh sách thử thách</p>
              <button onClick={() => refetch()} className="btn btn-primary">
                Thử lại
              </button>
            </div>
          ) : (
            <ChallengeList
              selectedType={selectedType}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-content mb-6">
            🚀 Tạo thử thách mới?
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
            Bạn có muốn tạo một thử thách mới để khuyến khích cộng đồng? 
            Hãy liên hệ với chúng tôi để được hỗ trợ!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              📧 Liên hệ tạo thử thách
            </button>
            <button className="btn btn-outline btn-lg">
              🏠 Về trang chủ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}