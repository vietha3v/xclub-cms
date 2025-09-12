'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChallengeType, ChallengeCategory, ChallengeDifficulty, ChallengeVisibility } from '@/types/challenge';
import { individualChallengeSchema, IndividualChallengeFormData } from './ChallengeFormProvider';
import BasicInfoForm from './BasicInfoForm';
import TimeForm from './TimeForm';
import ChallengeTargetForm from './ChallengeTargetForm';
import ChallengeConditionsForm from './ChallengeConditionsForm';
import ParticipationSettingsForm from './ParticipationSettingsForm';
import RewardsForm from './RewardsForm';
import MedalSelectionForm from './MedalSelectionForm';
import CertificateSelectionForm from './CertificateSelectionForm';
import RulesForm from './RulesForm';

export default function IndividualChallengeForm() {
  const { watch } = useFormContext<IndividualChallengeFormData>();
  const watchedType = watch('type');
  const watchedHasMedals = watch('hasMedals');
  const watchedHasCertificates = watch('hasCertificates');

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-section {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }
        
        .form-section:nth-child(1) { animation-delay: 0ms; }
        .form-section:nth-child(2) { animation-delay: 100ms; }
        .form-section:nth-child(3) { animation-delay: 200ms; }
        .form-section:nth-child(4) { animation-delay: 300ms; }
        .form-section:nth-child(5) { animation-delay: 400ms; }
        .form-section:nth-child(6) { animation-delay: 500ms; }
        .form-section:nth-child(7) { animation-delay: 600ms; }
        .form-section:nth-child(8) { animation-delay: 700ms; }
        .form-section:nth-child(9) { animation-delay: 800ms; }
      `}</style>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="form-section">
          <BasicInfoForm />
        </div>
        
        <div className="form-section">
          <TimeForm />
        </div>
        
        <div className="form-section">
          <ChallengeTargetForm watchedType={watchedType} />
        </div>
        
        <div className="form-section">
          <ChallengeConditionsForm />
        </div>
        
        <div className="form-section">
          <ParticipationSettingsForm />
        </div>
        
        <div className="form-section">
          <RewardsForm />
        </div>
        
        <div className="form-section">
          <MedalSelectionForm watchedHasMedals={watchedHasMedals} />
        </div>
        
        <div className="form-section">
          <CertificateSelectionForm watchedHasCertificates={watchedHasCertificates} />
        </div>
        
        <div className="form-section">
          <RulesForm />
        </div>
      </div>
    </>
  );
}

export { individualChallengeSchema };
