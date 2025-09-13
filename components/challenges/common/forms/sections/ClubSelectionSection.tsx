'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TeamChallengeFormData } from './schemas';
import useAxios from '@/hooks/useAxios';

interface Club {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  isMember: boolean;
  isAdmin: boolean; // Admin CLB
  isGuest: boolean; // Khách CLB
}

export default function ClubSelectionSection() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<TeamChallengeFormData>();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  
  // API để lấy danh sách clubs (admin + member)
  const [{ loading: apiLoading }, execute] = useAxios<Club[]>(
    { url: '/api/clubs/my-clubs', method: 'GET' },
    { manual: true }
  );

  const createdByClubId = watch('createdByClubId') || '';
  const invitedClubs = watch('invitedClubs') || [];

  // Load clubs khi component mount
  useEffect(() => {
    const loadClubs = async () => {
      try {
        setLoading(true);
        // Fake data cho testing
        const fakeClubs: Club[] = [
          {
            id: 'club-1',
            name: 'CLB Chạy Bộ Hà Nội',
            description: 'Câu lạc bộ chạy bộ hàng đầu tại Hà Nội',
            memberCount: 150,
            isMember: true,
            isAdmin: true, // User là admin của CLB này
            isGuest: false
          },
          {
            id: 'club-2', 
            name: 'Runners Sài Gòn',
            description: 'Cộng đồng runner năng động tại TP.HCM',
            memberCount: 200,
            isMember: true,
            isAdmin: false, // User chỉ là thành viên
            isGuest: false
          },
          {
            id: 'club-3',
            name: 'Marathon Đà Nẵng',
            description: 'CLB marathon chuyên nghiệp tại Đà Nẵng',
            memberCount: 80,
            isMember: true,
            isAdmin: true, // User là admin của CLB này
            isGuest: false
          },
          {
            id: 'club-4',
            name: 'CLB Chạy Bộ Cần Thơ',
            description: 'Cộng đồng runner tại Cần Thơ',
            memberCount: 60,
            isMember: false,
            isAdmin: false,
            isGuest: true // User là khách của CLB này
          },
          {
            id: 'club-5',
            name: 'Hải Phòng Runners',
            description: 'CLB chạy bộ tại Hải Phòng',
            memberCount: 45,
            isMember: false,
            isAdmin: false,
            isGuest: true // User là khách của CLB này
          }
        ];
        
        setClubs(fakeClubs);
        
        // Uncomment để dùng API thật
        // API sẽ trả về danh sách CLB với isAdmin, isMember, isGuest
        // const response = await execute();
        // if (response.data) {
        //   setClubs(response.data);
        // }
      } catch (error) {
        console.error('Error loading clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, [execute]);

  const handleCreatedByClubChange = (clubId: string) => {
    setValue('createdByClubId', clubId);
    // Tự động thêm CLB tạo vào danh sách mời nếu chưa có
    const currentInvited = invitedClubs || [];
    const isAlreadyInvited = currentInvited.some(item => item.clubId === clubId);
    
    if (!isAlreadyInvited) {
      setValue('invitedClubs', [...currentInvited, { clubId, maxParticipants: 10 }]);
    }
  };

  const handleInvitedClubToggle = (clubId: string) => {
    const currentInvited = invitedClubs || [];
    const isInvited = currentInvited.some(item => item.clubId === clubId);
    
    if (isInvited) {
      // Bỏ mời CLB
      const newInvited = currentInvited.filter(item => item.clubId !== clubId);
      setValue('invitedClubs', newInvited);
    } else {
      // Thêm mời CLB với số lượng mặc định
      setValue('invitedClubs', [...currentInvited, { clubId, maxParticipants: 10 }]);
    }
  };

  const handleMaxParticipantsChange = (clubId: string, maxParticipants: number) => {
    const currentInvited = invitedClubs || [];
    const newInvited = currentInvited.map(item => 
      item.clubId === clubId 
        ? { ...item, maxParticipants }
        : item
    );
    setValue('invitedClubs', newInvited);
  };

  const isClubInvited = (clubId: string) => {
    return invitedClubs.some(item => item.clubId === clubId);
  };

  const getClubMaxParticipants = (clubId: string) => {
    const invitedClub = invitedClubs.find(item => item.clubId === clubId);
    return invitedClub?.maxParticipants || 10;
  };

  if (loading || apiLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">Cài đặt CLB</h3>
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-md"></span>
            <span className="ml-2">Đang tải danh sách CLB...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phần 1: Chọn CLB tạo thử thách */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">CLB tạo thử thách</h3>
          
          <div className="text-sm text-base-content/70 mb-4">
            Chọn CLB sẽ tạo ra thử thách này. CLB này sẽ có quyền quản lý thử thách.
          </div>

          {clubs.filter(club => club.isAdmin).length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              <p>Bạn chưa là admin của CLB nào.</p>
              <p className="text-sm mt-2">Chỉ admin CLB mới có thể tạo thử thách tập thể.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clubs.filter(club => club.isAdmin).map((club) => (
                <div
                  key={club.id}
                  className={`card bg-base-200 shadow-sm cursor-pointer transition-all duration-200 ${
                    createdByClubId === club.id
                      ? 'ring-2 ring-primary bg-primary/10'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleCreatedByClubChange(club.id)}
                >
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">{club.name}</h4>
                        {club.description && (
                          <p className="text-sm text-base-content/70 mt-1">{club.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-base-content/60">
                          <span>👥 {club.memberCount} thành viên</span>
                          {club.isAdmin ? (
                            <span className="text-warning">👑 Admin</span>
                          ) : club.isMember ? (
                            <span className="text-success">✓ Thành viên</span>
                          ) : club.isGuest ? (
                            <span className="text-info">👋 Khách</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          name="createdByClubId"
                          className="radio radio-primary"
                          checked={createdByClubId === club.id}
                          onChange={() => handleCreatedByClubChange(club.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.createdByClubId && (
            <div className="text-error text-sm mt-2">
              {errors.createdByClubId.message}
            </div>
          )}
        </div>
      </div>

      {/* Phần 2: Chọn CLB được mời tham gia */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">CLB được mời tham gia</h3>
          
          <div className="text-sm text-base-content/70 mb-4">
            Chọn các CLB mà bạn muốn mời tham gia thử thách này. CLB tạo thử thách sẽ tự động được thêm vào danh sách mời.
          </div>

          {clubs.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              <p>Bạn chưa tham gia CLB nào.</p>
              <p className="text-sm mt-2">Hãy tham gia CLB trước khi tạo thử thách tập thể.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clubs.map((club) => {
                const isInvited = isClubInvited(club.id);
                const maxParticipants = getClubMaxParticipants(club.id);
                
                return (
                  <div
                    key={club.id}
                    className={`card bg-base-200 shadow-sm transition-all duration-200 ${
                      isInvited
                        ? 'ring-2 ring-primary bg-primary/10'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{club.name}</h4>
                          {club.description && (
                            <p className="text-sm text-base-content/70 mt-1">{club.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-base-content/60">
                            <span>👥 {club.memberCount} thành viên</span>
                            {club.isAdmin ? (
                              <span className="text-warning">👑 Admin</span>
                            ) : club.isMember ? (
                              <span className="text-success">✓ Thành viên</span>
                            ) : club.isGuest ? (
                              <span className="text-info">👋 Khách</span>
                            ) : null}
                            {createdByClubId === club.id && (
                              <span className="text-primary">🏆 CLB tạo thử thách</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={isInvited}
                            onChange={() => handleInvitedClubToggle(club.id)}
                          />
                        </div>
                      </div>
                      
                      {/* Input số lượng người mời - chỉ hiện khi CLB được chọn */}
                      {isInvited && (
                        <div className="mt-4 pt-4 border-t border-base-300">
                          <div className="flex items-center gap-3">
                            <label className="text-sm font-medium">
                              Số lượng người mời tối đa:
                            </label>
                            <input
                              type="number"
                              min="1"
                              max={club.memberCount}
                              value={maxParticipants}
                              onChange={(e) => handleMaxParticipantsChange(club.id, parseInt(e.target.value) || 1)}
                              className="input input-bordered input-sm w-20"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="text-xs text-base-content/60">
                              / {club.memberCount} thành viên
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {errors.invitedClubs && (
            <div className="text-error text-sm mt-2">
              {errors.invitedClubs.message}
            </div>
          )}

          <div className="mt-4 p-3 bg-info/10 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-info">ℹ️</span>
              <div className="text-sm text-info">
                <p className="font-medium">Lưu ý:</p>
                <ul className="mt-1 space-y-1">
                  <li>• CLB tạo thử thách sẽ tự động được thêm vào danh sách mời</li>
                  <li>• Có thể mời tất cả CLB mà bạn có mặt (admin, thành viên, khách)</li>
                  <li>• Có thể tùy chỉnh số lượng người mời tối đa cho mỗi CLB</li>
                  <li>• Số lượng mời không được vượt quá tổng số thành viên của CLB</li>
                  <li>• Thử thách sẽ được gửi đến tất cả CLB đã chọn</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
