'use client';

import React, { useState, createContext, useContext } from 'react';
import { ChallengeCategory } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import ChallengeFormProvider from './forms/ChallengeFormProvider';
import IndividualChallengeForm from './forms/IndividualChallengeForm';
import TeamChallengeForm from './forms/TeamChallengeForm';
import { individualChallengeSchema, teamChallengeSchema } from './forms/schemas';
import ChallengeTypeSelector from './ChallengeTypeSelector';
import { X } from 'lucide-react';
import { format, addDays } from 'date-fns';

// Context để truyền callbacks xuống
const UnifiedChallengeContext = createContext<{
  onSuccess?: (challenge: unknown) => void;
  onClose?: () => void;
}>({
  onSuccess: undefined,
  onClose: undefined,
});

export const useUnifiedChallengeContext = () => {
  const context = useContext(UnifiedChallengeContext);
  if (!context) {
    throw new Error('useUnifiedChallengeContext must be used within UnifiedChallengeModal');
  }
  return context;
};

interface UnifiedChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: unknown) => void;
}

export default function UnifiedChallengeModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: UnifiedChallengeModalProps) {
  const [step, setStep] = useState<'select' | 'individual' | 'team'>('select');

  const handleCategorySelect = (category: ChallengeCategory) => {
    setStep(category === ChallengeCategory.INDIVIDUAL ? 'individual' : 'team');
  };

  const handleBack = () => {
    setStep('select');
  };

  const handleClose = () => {
    setStep('select');
    onClose();
  };

  const handleSuccess = (challenge: unknown) => {
    setStep('select');
    onSuccess?.(challenge);
  };


  // Tạo ngày hiện tại và ngày kết thúc
  const today = new Date();
  const endDate = addDays(today, 10); // Kết thúc sau 10 ngày
  
  // Default values cho các form
  const individualDefaultValues = {
    name: 'Thử thách chạy bộ 5K mùa hè 2024',
    description: 'Tham gia thử thách chạy bộ 5K để rèn luyện sức khỏe và tinh thần. Hãy cùng nhau vượt qua giới hạn của bản thân!',
    category: 'individual' as any,
    type: 'distance' as any,
    difficulty: 'medium' as any,
    visibility: 'public' as any,
    allowFreeRegistration: true,
    autoApprovalPassword: '',
    maxParticipants: 100,
    points: 50,
    hasDigitalCertificate: true,
    hasMedals: true,
    hasCertificates: true,
    medalTemplateIds: [],
    certificateTemplateIds: [],
    targetValue: 5,
    targetUnit: 'km',
    distanceCategories: [
      { id: '1', value: 5, unit: 'km', name: 'Nam 5km', difficulty: '2' },
      { id: '2', value: 10, unit: 'km', name: 'Nam 10km', difficulty: '3' },
      { id: '3', value: 5, unit: 'km', name: 'Nữ 5km', difficulty: '2' }
    ],
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    rules: '1. Tham gia đúng thời gian quy định\n2. Ghi lại kết quả bằng ứng dụng theo dõi\n3. Không gian lận trong quá trình thực hiện\n4. Chụp ảnh minh chứng khi hoàn thành',
  };

  const teamDefaultValues = {
    ...individualDefaultValues,
    category: 'team' as any,
    // Team-specific fields
    maxTeamMembers: 5,
    maxTeams: 20,
    minTracklogDistance: 1.0,
    maxIndividualContribution: 50,
    createdByClubId: 'club-1', // Fake club ID
    invitedClubs: [
      { clubId: 'club-1', maxParticipants: 10 },
      { clubId: 'club-2', maxParticipants: 15 },
      { clubId: 'club-3', maxParticipants: 8 }
    ],
  };

  // Render content dựa trên step
  const renderContent = () => {
    if (step === 'individual') {
      return (
        <ChallengeFormProvider
          schema={individualChallengeSchema}
          defaultValues={individualDefaultValues}
        >
          <IndividualChallengeForm />
        </ChallengeFormProvider>
      );
    }

    if (step === 'team') {
      return (
        <ChallengeFormProvider
          schema={teamChallengeSchema}
          defaultValues={teamDefaultValues}
        >
          <TeamChallengeForm />
        </ChallengeFormProvider>
      );
    }

    // Step 'select' - hiển thị 2 card chọn loại
    return <ChallengeTypeSelector onSelect={handleCategorySelect} />;
  };

  // Render footer dựa trên step
  const renderFooter = () => {
    if (step === 'select') {
      return (
        <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Hủy
          </button>
          
        </div>
      );
    }

    // Footer cho form steps - chỉ có nút Hủy, nút Submit nằm trong form
    return (
      <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-ghost btn-sm"
        >
          <X className="w-4 h-4 mr-1" />
          Quay lại
        </button>
      </div>
    );
  };

  // Render title dựa trên step
  const getTitle = () => {
    switch (step) {
      case 'individual':
        return 'Tạo thử thách cá nhân';
      case 'team':
        return 'Tạo thử thách đồng đội';
      default:
        return 'Tạo thử thách mới';
    }
  };

  return (
    <UnifiedChallengeContext.Provider value={{ onSuccess, onClose }}>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={getTitle()}
        size="xl"
        footer={renderFooter()}
      >
        {renderContent()}
      </Modal>
    </UnifiedChallengeContext.Provider>
  );
}
