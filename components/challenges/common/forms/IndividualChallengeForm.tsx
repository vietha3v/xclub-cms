'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IndividualChallengeFormData } from './schemas';
import {
  BasicInfoSection,
  TimeSection,
  DistanceCategoriesSection,
  ParticipationSettingsSection,
  MedalCertificateSection
} from './sections';

export default function IndividualChallengeForm() {
  const { watch } = useFormContext<IndividualChallengeFormData>();
  const watchedHasMedals = watch('hasMedals');
  const watchedHasCertificates = watch('hasCertificates');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="transition-all duration-300 ease-in-out">
        <BasicInfoSection />
      </div>
      
      <div className="transition-all duration-300 ease-in-out">
        <TimeSection />
      </div>
      
      <div className="transition-all duration-300 ease-in-out">
        <DistanceCategoriesSection />
      </div>
      
      <div className="transition-all duration-300 ease-in-out">
        <ParticipationSettingsSection />
      </div>
      
      <div className="transition-all duration-300 ease-in-out">
        <MedalCertificateSection 
          watchedHasMedals={watchedHasMedals} 
          watchedHasCertificates={watchedHasCertificates} 
        />
      </div>
    </div>
  );
}

