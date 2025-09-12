'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Users, Trophy, Calendar, Star, Eye, UserPlus } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { Team, TeamSearchFilters, TeamStats } from '@/types/team';
import Modal from '@/components/common/Modal';

interface TeamDiscoveryProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinTeam: (teamId: string) => void;
  onViewTeam: (teamId: string) => void;
}

export default function TeamDiscovery({
  isOpen,
  onClose,
  onJoinTeam,
  onViewTeam
}: TeamDiscoveryProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [filters, setFilters] = useState<TeamSearchFilters>({
    search: '',
    status: 'active',
    isPublic: true,
    sortBy: 'createdAt',
    sortOrder: 'DESC'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // API hooks
  const [{ data: teamsData, loading: teamsLoading }, refetchTeams] = useAxios<Team[]>(
    '/api/teams',
    { manual: true }
  );

  const [{ data: statsData, loading: statsLoading }, refetchStats] = useAxios<TeamStats>(
    '/api/teams/stats',
    { manual: true }
  );

  useEffect(() => {
    if (isOpen) {
      refetchTeams();
      refetchStats();
    }
  }, [isOpen]);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData);
      setFilteredTeams(teamsData);
    }
  }, [teamsData]);

  useEffect(() => {
    if (statsData) {
      setStats(statsData);
    }
  }, [statsData]);

  useEffect(() => {
    filterTeams();
  }, [filters, teams]);

  const filterTeams = () => {
    let filtered = teams;

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        team.description?.toLowerCase().includes(filters.search!.toLowerCase()) ||
        team.tags.some(tag => tag.toLowerCase().includes(filters.search!.toLowerCase()))
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(team => team.status === filters.status);
    }

    // Filter by public
    if (filters.isPublic !== undefined) {
      filtered = filtered.filter(team => team.isPublic === filters.isPublic);
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(team =>
        filters.tags!.some(tag => team.tags.includes(tag))
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(team =>
        team.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Filter by member count
    if (filters.minMembers) {
      filtered = filtered.filter(team => team.currentMembers >= filters.minMembers!);
    }

    if (filters.maxMembers) {
      filtered = filtered.filter(team => team.currentMembers <= filters.maxMembers!);
    }

    // Sort teams
    filtered.sort((a, b) => {
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'DESC';

      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'members':
          aValue = a.currentMembers;
          bValue = b.currentMembers;
          break;
        case 'challenges':
          aValue = a.stats.totalChallenges;
          bValue = b.stats.totalChallenges;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (sortOrder === 'ASC') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTeams(filtered);
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (key: keyof TeamSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleJoinTeam = (teamId: string) => {
    onJoinTeam(teamId);
    showToast('Yêu cầu tham gia đã được gửi!', 'success');
  };

  const handleViewTeam = (teamId: string) => {
    onViewTeam(teamId);
  };

  const getPopularTags = () => {
    const tagCounts: Record<string, number> = {};
    teams.forEach(team => {
      team.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Khám phá đội nhóm</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            Đóng
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="p-6 border-b bg-base-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat">
                <div className="stat-title">Tổng đội</div>
                <div className="stat-value text-primary">{stats.totalTeams}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Đội hoạt động</div>
                <div className="stat-value text-success">{stats.activeTeams}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Thành viên</div>
                <div className="stat-value text-info">{stats.totalMembers}</div>
              </div>
              <div className="stat">
                <div className="stat-title">TB đội</div>
                <div className="stat-value text-warning">{stats.averageTeamSize.toFixed(1)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="p-6 border-b">
          <div className="flex gap-4 mb-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Tìm kiếm đội nhóm..."
                  className="input input-bordered flex-1"
                  value={filters.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="btn btn-square">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline"
            >
              <Filter className="w-4 h-4 mr-1" />
              Bộ lọc
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Trạng thái</span>
                </label>
                <select
                  className="select select-bordered"
                  value={filters.status || 'all'}
                  onChange={(e) => handleFilterChange('status', e.target.value === 'all' ? undefined : e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sắp xếp theo</span>
                </label>
                <select
                  className="select select-bordered"
                  value={filters.sortBy || 'createdAt'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="createdAt">Ngày tạo</option>
                  <option value="name">Tên</option>
                  <option value="members">Số thành viên</option>
                  <option value="challenges">Số thử thách</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thứ tự</span>
                </label>
                <select
                  className="select select-bordered"
                  value={filters.sortOrder || 'DESC'}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                >
                  <option value="DESC">Giảm dần</option>
                  <option value="ASC">Tăng dần</option>
                </select>
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Thẻ phổ biến:</h4>
            <div className="flex flex-wrap gap-2">
              {getPopularTags().map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const currentTags = filters.tags || [];
                    const newTags = currentTags.includes(tag)
                      ? currentTags.filter(t => t !== tag)
                      : [...currentTags, tag];
                    handleFilterChange('tags', newTags);
                  }}
                  className={`badge ${
                    filters.tags?.includes(tag) ? 'badge-primary' : 'badge-outline'
                  } cursor-pointer`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {teamsLoading ? (
            <div className="flex justify-center items-center h-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/60">Không tìm thấy đội nhóm nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <div key={team.id} className="card bg-base-100 border shadow-sm">
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {team.avatar ? (
                          <img
                            src={team.avatar}
                            alt={team.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <div>
                          <h3 className="card-title text-lg">{team.name}</h3>
                          <p className="text-sm text-base-content/70">
                            bởi {team.leaderName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleViewTeam(team.id)}
                          className="btn btn-ghost btn-sm"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleJoinTeam(team.id)}
                          className="btn btn-primary btn-sm"
                          title="Tham gia"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {team.description && (
                      <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                        {team.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{team.currentMembers}</span>
                          {team.maxMembers && <span>/{team.maxMembers}</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span>{team.stats.totalWins}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{team.stats.averageScore.toFixed(1)}</span>
                        </div>
                      </div>

                      {team.location && (
                        <div className="flex items-center gap-1 text-sm text-base-content/70">
                          <MapPin className="w-4 h-4" />
                          <span>{team.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-base-content/70">
                        <Calendar className="w-4 h-4" />
                        <span>Tạo {new Date(team.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    {team.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {team.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="badge badge-outline badge-sm">
                            {tag}
                          </span>
                        ))}
                        {team.tags.length > 3 && (
                          <span className="badge badge-outline badge-sm">
                            +{team.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="card-actions justify-end mt-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewTeam(team.id)}
                          className="btn btn-outline btn-sm"
                        >
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => handleJoinTeam(team.id)}
                          className="btn btn-primary btn-sm"
                        >
                          Tham gia
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
