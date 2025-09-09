'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trophy, Target, Award, Users, Edit, Trash2, Eye } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import ChallengeForm from '@/components/challenges/ChallengeForm';

interface ClubChallengeManagementProps {
  clubId: string;
}

export default function ClubChallengeManagement({ clubId }: ClubChallengeManagementProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const [{ data: challengesData, loading: apiLoading, error: apiError }, refetch] = useAxios<{
    challenges: Challenge[];
    total: number;
    page: number;
    limit: number;
  }>(`/api/challenges?clubId=${clubId}`);

  const [, deleteChallenge] = useAxios(
    {
      url: '/api/challenges/',
      method: 'DELETE'
    },
    { manual: true }
  );

  useEffect(() => {
    if (challengesData) {
      setChallenges(challengesData.challenges || []);
      setLoading(false);
    }
  }, [challengesData]);

  useEffect(() => {
    if (apiError) {
      setError('Không thể tải danh sách thử thách');
      setLoading(false);
    }
  }, [apiError]);

  const handleCreateChallenge = () => {
    setEditingChallenge(null);
    setIsFormOpen(true);
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setIsFormOpen(true);
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thử thách này?')) return;

    try {
      await deleteChallenge({
        url: `/api/challenges/${challengeId}`
      });
      refetch(); // Refresh the list
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  const handleFormSuccess = (challenge: Challenge) => {
    setIsFormOpen(false);
    setEditingChallenge(null);
    refetch(); // Refresh the list
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingChallenge(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                Quản lý thử thách
              </h2>
              <p className="text-base-content/70 mt-1">
                Tạo và quản lý các thử thách của CLB
              </p>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleCreateChallenge}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tạo thử thách
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {(loading || apiLoading) && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-sm animate-pulse">
              <div className="card-body">
                <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm btn-outline" onClick={() => refetch()}>
            Thử lại
          </button>
        </div>
      )}

      {/* Challenges List */}
      {!loading && !apiLoading && !error && (
        <div className="space-y-4">
          {challenges.length === 0 ? (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-base-content/30">
                <Trophy className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chưa có thử thách nào</h3>
              <p className="text-base-content/70 mb-4">
                Tạo thử thách đầu tiên để khuyến khích thành viên hoạt động
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleCreateChallenge}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo thử thách đầu tiên
              </button>
            </div>
          </div>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{challenge.name}</h3>
                      <span className={`badge badge-sm ${
                        challenge.status === 'active' ? 'badge-success' : 
                        challenge.status === 'published' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {challenge.status === 'active' ? 'Đang diễn ra' : 
                         challenge.status === 'published' ? 'Đã công bố' : 
                         challenge.status === 'completed' ? 'Đã hoàn thành' : 'Nháp'}
                      </span>
                    </div>
                    
                    <p className="text-base-content/70 mb-3">{challenge.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-base-content/50" />
                        <span>Mục tiêu: {challenge.targetValue} {challenge.targetUnit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-base-content/50" />
                        <span>{challenge.participantCount} người tham gia</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-base-content/50" />
                        <span>{challenge.points} điểm</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-base-content/50">📅</span>
                        <span>
                          {new Date(challenge.startDate).toLocaleDateString('vi-VN')} - 
                          {new Date(challenge.endDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEditChallenge(challenge)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Chỉnh sửa
                    </button>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteChallenge(challenge.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      )}

      {/* Challenge Form Modal */}
      <ChallengeForm
        clubId={clubId}
        challenge={editingChallenge || undefined}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        mode={editingChallenge ? 'edit' : 'create'}
      />
    </div>
  );
}
