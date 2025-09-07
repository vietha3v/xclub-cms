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
import { Plus, Settings } from 'lucide-react';

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
  });

  const [{ data: clubsData, loading: clubsLoading, error: clubsError }, refetchClubs] = useAxios<ClubsResponse>(
    '/api/clubs',
    { manual: true }
  );

  useEffect(() => {
    loadClubs();
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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Danh sách câu lạc bộ</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Khám phá và tham gia các câu lạc bộ chạy bộ phù hợp với bạn
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tạo CLB mới
          </button>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="w-4 h-4 mr-1" />
            Cài đặt
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex-1 min-w-0">
            <ClubSearch onSearch={handleSearch} />
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
          }}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
          <button 
            onClick={loadClubs}
            className="btn btn-sm btn-outline"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Clubs Grid */}
      {clubs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  «
                </button>
                <button className="join-item btn btn-sm">
                  Trang {currentPage} / {totalPages}
                </button>
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="text-center text-sm text-base-content/70">
            Hiển thị {clubs.length} / {totalItems} câu lạc bộ
          </div>
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
          <p className="text-base-content/70 mb-6">
            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm. 
            Hoặc tạo CLB mới để bắt đầu xây dựng cộng đồng của bạn!
          </p>
          <div className="bg-base-100 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Tạo câu lạc bộ mới</h4>
              <p className="text-sm text-base-content/70 mb-4">
                Bắt đầu xây dựng cộng đồng chạy bộ của riêng bạn
              </p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setShowCreateModal(true)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Tạo CLB ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      <CreateClubModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
