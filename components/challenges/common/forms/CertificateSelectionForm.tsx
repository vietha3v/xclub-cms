'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import CertificateTemplateSelector from '../CertificateTemplateSelector';

interface CertificateSelectionFormProps {
  watchedHasCertificates: boolean;
}

export default function CertificateSelectionForm({ watchedHasCertificates }: CertificateSelectionFormProps) {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">📜</span>
          Giấy chứng nhận
        </h4>
        
        <div className="form-control mb-4">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...useFormContext().register('hasCertificates')}
            />
            <span className="label-text ml-3">Có giấy chứng nhận</span>
          </label>
        </div>

        {watchedHasCertificates && (
          <div className="space-y-3">
            <CertificateTemplateSelector />
          </div>
        )}
      </div>
    </div>
  );
}
