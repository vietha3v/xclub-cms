'use client';

import React, { useState } from 'react';
import { Plus, Trophy, Target, Award, Users } from 'lucide-react';

interface ClubChallengeManagementProps {
  clubId: string;
}

export default function ClubChallengeManagement({ clubId }: ClubChallengeManagementProps) {
  const [challenges] = useState([
    // Mock data - sẽ thay thế bằng API thực
    {
      id: '1',
      title: 'Thử thách 100km tháng 1',
      description: 'Chạy tổng cộng 100km trong tháng 1',
      type: 'distance',
      target: 100,
      unit: 'km',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      participants: 15,
      status: 'active',
      reward: 'Huy hiệu vàng'
    },
    {
      id: '2',
      title: 'Chạy 30 ngày liên tiếp',
      description: 'Chạy ít nhất 5km mỗi ngày trong 30 ngày',
      type: 'streak',
      target: 30,
      unit: 'ngày',
      startDate: '2024-01-15',
      endDate: '2024-02-14',
      participants: 8,
      status: 'upcoming',
      reward: 'Huy hiệu bạc'
    }
  ]);

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
            <button className="btn btn-primary btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              Tạo thử thách
            </button>
          </div>
        </div>
      </div>

      {/* Challenges List */}
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
              <button className="btn btn-primary">
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
                      <h3 className="text-lg font-semibold">{challenge.title}</h3>
                      <span className={`badge badge-sm ${
                        challenge.status === 'active' ? 'badge-success' : 
                        challenge.status === 'upcoming' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {challenge.status === 'active' ? 'Đang diễn ra' : 
                         challenge.status === 'upcoming' ? 'Sắp bắt đầu' : 'Đã kết thúc'}
                      </span>
                    </div>
                    
                    <p className="text-base-content/70 mb-3">{challenge.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-base-content/50" />
                        <span>Mục tiêu: {challenge.target} {challenge.unit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-base-content/50" />
                        <span>{challenge.participants} người tham gia</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-base-content/50" />
                        <span>{challenge.reward}</span>
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
                    <button className="btn btn-outline btn-sm">
                      ✏️ Chỉnh sửa
                    </button>
                    <button className="btn btn-error btn-sm">
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
