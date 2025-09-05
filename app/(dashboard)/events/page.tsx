'use client';

import { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import EventFilters from '@/components/events/EventFilters';
import EventStats from '@/components/events/EventStats';
import useAxios from '@/hooks/useAxios';
import { Event } from '@/types/event';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [{ data: eventsData, loading, error }, refetch] = useAxios<{
    data: Event[];
    total: number;
    page: number;
    limit: number;
  }>('/api/events');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const events = eventsData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
              🎯 Sự kiện & Giải chạy
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
              Khám phá và tham gia các sự kiện chạy bộ hấp dẫn trên khắp Việt Nam
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-base-100/50">
        <div className="container mx-auto">
          <EventStats events={events} />
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </section>

      {/* Events Grid */}
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
              <p className="text-base-content/70 mb-6">Không thể tải danh sách sự kiện</p>
              <button onClick={() => refetch()} className="btn btn-primary">
                Thử lại
              </button>
            </div>
          ) : (
            <EventList
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-content mb-6">
            🚀 Tổ chức sự kiện chạy bộ của riêng bạn?
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
            Bạn có muốn tổ chức một sự kiện chạy bộ để kết nối cộng đồng? 
            Hãy liên hệ với chúng tôi để được hỗ trợ và tư vấn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              📧 Liên hệ tổ chức
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