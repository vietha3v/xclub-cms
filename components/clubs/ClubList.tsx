'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Club, ClubStats, QueryClubDto } from '@/types/club';
import ClubCard from '@/components/clubs/ClubCard';
import ClubFilters from '@/components/clubs/ClubFilters';
import ClubSearch from '@/components/clubs/ClubSearch';
import ClubStatsCards from '@/components/clubs/ClubStatsCards';
import CreateClubModal from '@/components/clubs/CreateClubModal';
import Paging, { usePagination } from '@/components/common/Paging';

interface ClubsResponse {
  data: Club[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function ClubList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [stats, setStats] = useState<ClubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange } = usePagination(1, 12);
  
  const [filters, setFilters] = useState<QueryClubDto>({
    search: '',
    type: '',
    status: undefined,
    city: '',
    state: '',
    country: '',
  });

  const [{ data: clubsData, loading: clubsLoading, error: clubsError }, refetchClubs] = useAxios<ClubsResponse>(
    '/api/clubs',
    { manual: true }
  );

  const [{ data: statsData, loading: statsLoading, error: statsError }, refetchStats] = useAxios<ClubStats>(
    '/api/clubs/stats',
    { manual: true }
  );

  useEffect(() => {
    loadClubs();
    loadStats();
  }, [filters, currentPage, itemsPerPage]);

  useEffect(() => {
    if (clubsData) {
      setClubs(clubsData.data || []);
      setTotalItems(clubsData.total || 0);
      setTotalPages(clubsData.totalPages || 0);
      setError(null);
    }
  }, [clubsData]);

  useEffect(() => {
    if (clubsError) {
      setError('Không thể tải danh sách CLB');
      console.error('Load clubs error:', clubsError);
    }
  }, [clubsError]);

  const loadClubs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add pagination params
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());
      
      // Add filter params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
      
      const queryString = params.toString();
      const url = `/api/clubs?${queryString}`;
      
      await refetchClubs({ url });
    } catch (err) {
      setError('Không thể tải danh sách CLB');
      console.error('Load clubs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      await refetchStats();
      if (statsData) {
        setStats(statsData);
      }
    } catch (err) {
      console.error('Load stats error:', err);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    handlePageChange(1);
  };

  const handleFilterChange = (newFilters: Partial<QueryClubDto>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    handlePageChange(1);
  };

  const handleCreateSuccess = (newClub: Club) => {
    // Refresh the list
    loadClubs();
    setShowCreateModal(false);
  };

  if (loading && clubs.length === 0) {
    return (
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-base-content/70">Đang tải danh sách CLB...</p>
      </div>
    );
  }

  return (
    <>
      {/* Stats Cards */}
      {stats && <ClubStatsCards stats={stats} />}

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex-1 min-w-0">
            <ClubSearch onSearch={handleSearch} />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary w-full lg:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Tạo CLB mới
            </button>
          </div>
        </div>
        <ClubFilters 
          filters={{
            page: currentPage,
            limit: itemsPerPage,
            search: filters.search || '',
            type: filters.type || '',
            status: filters.status || '',
            city: filters.city || '',
            state: filters.state || '',
            country: filters.country || '',
          }} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Clubs Grid */}
      {clubs.length > 0 ? (
        <>
          <div className="responsive-grid mb-8">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>

          {/* Pagination */}
          <Paging
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            className="mt-8"
          />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-base-content/30">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            Không tìm thấy CLB nào
          </h3>
          <p className="text-base-content/70">
            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      )}

      {/* Create Club Modal */}
      <CreateClubModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
