'use client';

import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Event, EventStatus, QueryEventDto } from '@/types/event';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import EventSearch from '@/components/events/EventSearch';
import CreateEventModal from '@/components/events/CreateEventModal';
import Paging, { usePagination } from '@/components/common/Paging';
import { Plus } from 'lucide-react';

interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface EventListSharedProps {
  clubId?: string;
  mode?: 'admin' | 'public';
  showCreateButton?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  limit?: number;
  title?: string;
  description?: string;
}

export default function EventListShared({
  clubId,
  mode = 'public',
  showCreateButton = true,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  limit = 12,
  title = 'Danh sách sự kiện',
  description = 'Khám phá và tham gia các sự kiện chạy bộ phù hợp với bạn'
}: EventListSharedProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange } = usePagination(1, limit);
  
  const [filters, setFilters] = useState<QueryEventDto>({
    search: '',
    type: undefined,
    status: undefined,
    visibility: undefined,
    clubId: clubId,
  });

  const [{ data: eventsData, loading: eventsLoading, error: eventsError }, refetchEvents] = useAxios<EventsResponse>(
    '/api/events',
    { manual: true }
  );

  useEffect(() => {
    loadEvents();
  }, [filters, currentPage, itemsPerPage]);

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData.data || []);
      setTotalItems(eventsData.total || 0);
      setTotalPages(eventsData.totalPages || 0);
      setError(null);
    }
  }, [eventsData]);

  useEffect(() => {
    if (eventsError) {
      setError('Không thể tải danh sách sự kiện');
      console.error('Load events error:', eventsError);
    }
  }, [eventsError]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add pagination params
      if (showPagination) {
        params.append('page', currentPage.toString());
        params.append('limit', itemsPerPage.toString());
      }
      
      // Add filter params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
      
      const queryString = params.toString();
      const url = `/api/events?${queryString}`;
      
      await refetchEvents({ url });
    } catch (err) {
      setError('Không thể tải danh sách sự kiện');
      console.error('Load events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    if (showPagination) {
      handlePageChange(1);
    }
  };

  const handleFilterChange = (newFilters: Partial<QueryEventDto>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    if (showPagination) {
      handlePageChange(1);
    }
  };

  const handleCreateSuccess = (newEvent: Event) => {
    // Refresh the list
    loadEvents();
    setShowCreateModal(false);
  };

  if (loading && events.length === 0) {
    return (
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-base-content/70">Đang tải danh sách sự kiện...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-base-content/70 mt-1">
            {description}
          </p>
        </div>
        {showCreateButton && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Tạo sự kiện
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex-1 min-w-0">
                <EventSearch onSearch={handleSearch} />
              </div>
            </div>
          )}
          {showFilters && (
            <EventFilters 
              filters={{
                page: currentPage,
                limit: itemsPerPage,
                search: filters.search || '',
                type: filters.type || '',
                status: filters.status || '',
                visibility: filters.visibility || '',
                clubId: filters.clubId || '',
              }}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
          <button 
            onClick={loadEvents}
            className="btn btn-sm btn-outline"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Events Grid */}
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                mode={mode}
                showActions={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {showPagination && totalPages > 1 && (
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
          {showPagination && (
            <div className="text-center text-sm text-base-content/70">
              Hiển thị {events.length} / {totalItems} sự kiện
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-base-content/30">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            Không tìm thấy sự kiện nào
          </h3>
          <p className="text-base-content/70 mb-6">
            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm. 
            {showCreateButton && ' Hoặc tạo sự kiện mới để bắt đầu tổ chức hoạt động!'}
          </p>
          {showCreateButton && (
            <div className="bg-base-100 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Tạo sự kiện mới</h4>
                <p className="text-sm text-base-content/70 mb-4">
                  Bắt đầu tổ chức sự kiện chạy bộ của riêng bạn
                </p>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowCreateModal(true)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tạo sự kiện ngay
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateButton && (
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
          clubId={clubId}
        />
      )}
    </div>
  );
}
