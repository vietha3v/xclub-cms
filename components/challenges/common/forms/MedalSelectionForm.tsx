'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import MedalTemplateSelector from '../MedalTemplateSelector';

interface MedalSelectionFormProps {
  watchedHasMedals: boolean;
}

export default function MedalSelectionForm({ watchedHasMedals }: MedalSelectionFormProps) {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">🏅</span>
          Huy chương
        </h4>
        
        <div className="form-control mb-4">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...useFormContext().register('hasMedals')}
            />
            <span className="label-text ml-3">Có huy chương</span>
          </label>
        </div>

        {watchedHasMedals && (
          <div className="space-y-3">
            <MedalTemplateSelector />
          </div>
        )}
      </div>
    </div>
  );
}
