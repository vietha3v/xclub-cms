'use client';

import useAxios from '@/hooks/useAxios';
import { useState } from 'react';
import RaceCard from './RaceCard';
import RaceFilters from './RaceFilters';
import RaceCreateModal from './RaceCreateModal';
import { Race, RaceFilters as RaceFiltersType } from '@/types/race';
import dlv from 'dlv';

interface RaceListProps {
  initialFilters?: RaceFiltersType;
}

export default function RaceList({ initialFilters = {} }: RaceListProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [{ data, loading, error }, refetch] = useAxios<{
    data: Race[];
    total: number;
    page: number;
    limit: number;
  }>({
    url: '/api/races',
    method: 'GET',
    params: filters
  });

  const handleFilterChange = (newFilters: RaceFiltersType) => {
    setFilters(newFilters);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Lỗi khi tải danh sách giải chạy: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Danh sách giải chạy</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Tạo giải chạy mới
        </button>
      </div>

      <RaceFilters 
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {dlv(data, 'data') && dlv({ data }, 'data.length', 0) > 0 ? (
        <div className="grid gap-4">
          {dlv(data, 'data', []).map((race: Race) => (
            <RaceCard 
              key={race.id} 
              race={race}
              onUpdate={refetch}
              onDelete={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏃‍♂️</div>
          <h3 className="text-xl font-semibold mb-2">Chưa có giải chạy nào</h3>
          <p className="text-base-content/70 mb-4">
            Bắt đầu tạo giải chạy đầu tiên của bạn
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Tạo giải chạy mới
          </button>
        </div>
      )}

      <RaceCreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}