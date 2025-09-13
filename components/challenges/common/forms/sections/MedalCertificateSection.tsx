'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import MedalTemplateSelector from '../../MedalTemplateSelector';
import CertificateTemplateSelector from '../../CertificateTemplateSelector';

interface MedalCertificateSectionProps {
  watchedHasMedals: boolean;
  watchedHasCertificates: boolean;
}

export default function MedalCertificateSection({ 
  watchedHasMedals, 
  watchedHasCertificates 
}: MedalCertificateSectionProps) {
  const { register } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Huy chương và chứng nhận</h2>
        
        <div className="space-y-6">
          {/* Huy chương */}
          <div className="form-control">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register('hasMedals')}
              />
              <span className="font-medium">Có huy chương</span>
            </div>
          </div>

          {watchedHasMedals && (
            <div className="space-y-3">
              <MedalTemplateSelector />
            </div>
          )}

          {/* Giấy chứng nhận */}
          <div className="form-control">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register('hasCertificates')}
              />
              <span className="font-medium">Có giấy chứng nhận</span>
            </div>
          </div>

          {watchedHasCertificates && (
            <div className="space-y-3">
              <CertificateTemplateSelector />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
