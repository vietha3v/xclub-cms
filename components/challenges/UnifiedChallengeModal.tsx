'use client';

import React, { useState } from 'react';
import { ChallengeCategory } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import CreateIndividualChallengeModal from './CreateIndividualChallengeModal';
import CreateTeamChallengeModal from './CreateTeamChallengeModal';
import { X, Plus } from 'lucide-react';

interface UnifiedChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: unknown) => void;
  clubId?: string; // Optional - có khi tạo từ club manager, không có khi tạo từ trang challenges
}

export default function UnifiedChallengeModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  clubId 
}: UnifiedChallengeModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);

  const handleCategorySelect = (category: ChallengeCategory) => {
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    onClose();
  };

  const handleSuccess = (challenge: unknown) => {
    setSelectedCategory(null);
    onSuccess?.(challenge);
  };

  // Nếu đã chọn loại thử thách, hiển thị modal tương ứng
  if (selectedCategory === ChallengeCategory.INDIVIDUAL) {
    return (
      <CreateIndividualChallengeModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    );
  }

  if (selectedCategory === ChallengeCategory.TEAM) {
    return (
      <CreateTeamChallengeModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
        clubId={clubId}
      />
    );
  }

  // Footer với 2 nút action
  const footer = (
    <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
      <button
        type="button"
        onClick={handleClose}
        className="btn btn-ghost btn-sm"
      >
        <X className="w-4 h-4 mr-1" />
        Hủy
      </button>
      
      <button
        type="button"
        onClick={handleClose}
        className="btn btn-primary btn-sm"
        disabled
      >
        <Plus className="w-4 h-4 mr-1" />
        Tiếp tục
      </button>
    </div>
  );

  // Bước 1: Chọn loại thử thách (kế thừa từ club manager)
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tạo thử thách mới"
      size="lg"
      footer={footer}
    >
      <div className="space-y-6 m-auto justify-center items-center">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
          {/* Thử thách cá nhân */}
          <div 
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={() => handleCategorySelect(ChallengeCategory.INDIVIDUAL)}
          >
            <div className="card-body text-center p-8">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h3 className="text-2xl font-bold mb-3">Thử thách cá nhân</h3>
              <p className="text-base-content/70 mb-4">
                Thử thách dành cho từng thành viên riêng lẻ, phù hợp cho các mục tiêu cá nhân như chạy bộ, tập luyện hàng ngày.
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <span className="text-2xl">👤</span>
                <span className="font-medium">Cá nhân</span>
              </div>
            </div>
          </div>

          {/* Thử thách đồng đội */}
          <div 
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={() => handleCategorySelect(ChallengeCategory.TEAM)}
          >
            <div className="card-body text-center p-8">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-3">Thử thách tập thể</h3>
              <p className="text-base-content/70 mb-4">
                Thử thách dành cho các CLB, tính tổng thành tích của tất cả thành viên tham gia.
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <span className="text-2xl">👥</span>
                <span className="font-medium">Tập thể</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
