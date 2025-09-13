'use client';

import React from 'react';
import { ChallengeCategory } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import { X } from 'lucide-react';
import { individualChallengeSchema, IndividualChallengeFormData } from './forms/schemas';
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



  // Footer
  const footer = (
    <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
      <button
        type="button"
        onClick={onClose}
        className="btn btn-ghost btn-sm"
      >
        <X className="w-4 h-4 mr-1" />
        Hủy
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
      <IndividualChallengeForm />
    </Modal>
  );
}
