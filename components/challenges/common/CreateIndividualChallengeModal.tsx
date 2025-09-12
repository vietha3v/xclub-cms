'use client';

import React from 'react';
import useAxios from '@/hooks/useAxios';
import { ChallengeCategory, CreateChallengeDto } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import { useToast } from '@/components/Toast';
import { X, Plus } from 'lucide-react';
import dlv from 'dlv';
import ChallengeFormProvider, { individualChallengeSchema, IndividualChallengeFormData } from './forms/ChallengeFormProvider';
import IndividualChallengeForm from './forms/IndividualChallengeForm';

interface CreateIndividualChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: unknown) => void;
}


export default function CreateIndividualChallengeModal({ 
  isOpen, 
  onClose, 
  onSuccess
}: CreateIndividualChallengeModalProps) {
  const { showToast } = useToast();

  // API hooks
  const [{ loading }, execute] = useAxios<CreateChallengeDto>(
    '/api/challenges',
    { manual: true }
  );

  // Default values
  const defaultValues: IndividualChallengeFormData = {
    category: ChallengeCategory.INDIVIDUAL,
    name: '',
    description: '',
    type: 'distance' as any,
    difficulty: 'medium' as any,
    visibility: 'public' as any,
    allowFreeRegistration: true,
    autoApprovalPassword: '',
    points: 0,
    hasDigitalCertificate: false,
    hasMedals: false,
    hasCertificates: false,
    medalTemplateIds: [],
    certificateTemplateIds: [],
    targetValue: 0,
    targetUnit: 'km',
    startDate: '',
    endDate: '',
  };


  // Submit handler
  const onSubmit = async (data: IndividualChallengeFormData) => {
    try {
      // Tính timeLimit tự động từ startDate và endDate
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const timeLimitDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const challengeData: CreateChallengeDto = {
        ...data,
        category: ChallengeCategory.INDIVIDUAL,
        points: Number(data?.points || 0),
        timeLimit: timeLimitDays, // Tự động tính từ startDate và endDate
        autoApprovalPassword: data.autoApprovalPassword || undefined,
        // Thử thách cá nhân không cần clubId
      };

      const response = await execute({
        method: 'POST',
        data: challengeData,
      });

      if (response.data) {
        showToast({
          type: 'success',
          message: 'Tạo thử thách thành công!'
        });
        

        onSuccess?.(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Create challenge error:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi tạo thử thách'
      });
    }
  };

  // Footer
  const footer = (
    <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
      <button
        type="button"
        onClick={onClose}
        className="btn btn-ghost btn-sm"
        disabled={loading}
      >
        <X className="w-4 h-4 mr-1" />
        Hủy
      </button>
      <button
        type="submit"
        form="create-individual-challenge-form"
        className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {loading ? (
          'Đang tạo...'
        ) : (
          <>
            <Plus className="w-4 h-4 mr-1" />
            Tạo thử thách
          </>
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo thử thách cá nhân"
      size="xl"
      footer={footer}
    >
      <ChallengeFormProvider
        schema={individualChallengeSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <IndividualChallengeForm />
      </ChallengeFormProvider>
    </Modal>
  );
}
