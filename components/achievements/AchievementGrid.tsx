'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Trophy, Star, Target, Lock, Check, Clock } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { AchievementDisplay as AchievementDisplayType, AchievementType, AchievementStatus } from '@/types/achievement';
import AchievementDisplay from './AchievementDisplay';

interface AchievementGridProps {
  userId?: string;
  teamId?: string;
  showProgress?: boolean;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onAchievementClick?: (achievement: AchievementDisplayType) => void;
}

export default function AchievementGrid({
  userId,
  teamId,
  showProgress = true,
  showDescription = true,
  size = 'md',
  onAchievementClick
}: AchievementGridProps) {
  const [achievements, setAchievements] = useState<AchievementDisplayType[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<AchievementDisplayType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const { showToast } = useToast();

  // API hooks
  const [{ data: achievementsData, loading, error }, refetch] = useAxios<AchievementDisplayType[]>(
    userId ? `/api/users/${userId}/achievements` : teamId ? `/api/teams/${teamId}/achievements` : '/api/achievements',
    { manual: true }
  );

  useEffect(() => {
    if (userId || teamId) {
      refetch();
    }
  }, [userId, teamId]);

  useEffect(() => {
    if (achievementsData) {
      setAchievements(achievementsData);
      setFilteredAchievements(achievementsData);
    }
  }, [achievementsData]);

  useEffect(() => {
    filterAchievements();
  }, [searchTerm, filterType, filterStatus, achievements]);

  const filterAchievements = () => {
    let filtered = achievements;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(achievement =>
        achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(achievement => achievement.type === filterType);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(achievement => achievement.status === filterStatus);
    }

    setFilteredAchievements(filtered);
  };

  const getStatusCounts = () => {
    const counts = {
      earned: 0,
      pending: 0,
      locked: 0,
      total: achievements.length
    };

    achievements.forEach(achievement => {
      switch (achievement.status) {
        case AchievementStatus.EARNED:
          counts.earned++;
          break;
        case AchievementStatus.PENDING:
          counts.pending++;
          break;
        case AchievementStatus.LOCKED:
          counts.locked++;
          break;
      }
    });

    return counts;
  };

  const getTypeIcon = (type: AchievementType) => {
    switch (type) {
      case AchievementType.CHALLENGE:
        return <Trophy className="w-4 h-4" />;
      case AchievementType.ACTIVITY:
        return <Target className="w-4 h-4" />;
      case AchievementType.STREAK:
        return <Star className="w-4 h-4" />;
      case AchievementType.MILESTONE:
        return <Trophy className="w-4 h-4" />;
      case AchievementType.SPECIAL:
        return <Star className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-error">Có lỗi xảy ra khi tải thành tích</p>
        <button
          onClick={() => refetch()}
          className="btn btn-outline mt-4"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat">
          <div className="stat-title">Tổng thành tích</div>
          <div className="stat-value text-primary">{statusCounts.total}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Đã đạt được</div>
          <div className="stat-value text-success">{statusCounts.earned}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Đang tiến hành</div>
          <div className="stat-value text-warning">{statusCounts.pending}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Chưa mở khóa</div>
          <div className="stat-value text-base-content/60">{statusCounts.locked}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="form-control flex-1">
          <div className="input-group">
            <input
              type="text"
              placeholder="Tìm kiếm thành tích..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Loại thành tích</span>
            </label>
            <select
              className="select select-bordered"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value={AchievementType.CHALLENGE}>Thử thách</option>
              <option value={AchievementType.ACTIVITY}>Hoạt động</option>
              <option value={AchievementType.STREAK}>Chuỗi</option>
              <option value={AchievementType.MILESTONE}>Cột mốc</option>
              <option value={AchievementType.SPECIAL}>Đặc biệt</option>
              <option value={AchievementType.CUSTOM}>Tùy chỉnh</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Trạng thái</span>
            </label>
            <select
              className="select select-bordered"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value={AchievementStatus.EARNED}>Đã đạt được</option>
              <option value={AchievementStatus.PENDING}>Đang tiến hành</option>
              <option value={AchievementStatus.LOCKED}>Chưa mở khóa</option>
            </select>
          </div>
        </div>
      )}

      {/* Achievements Grid */}
      {filteredAchievements.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/60">Không tìm thấy thành tích nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementDisplay
              key={achievement.id}
              achievement={achievement}
              showProgress={showProgress}
              showDescription={showDescription}
              size={size}
              onClick={onAchievementClick ? () => onAchievementClick(achievement) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
