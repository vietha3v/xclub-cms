'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function RewardsForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">🎁</span>
          Phần thưởng
        </h4>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Điểm thưởng</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className={`input input-bordered w-full max-w-xs ${errors.points ? 'input-error' : ''}`}
              {...register('points', { valueAsNumber: true })}
            />
            {errors.points && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.points.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register('hasDigitalCertificate')}
              />
              <span className="label-text ml-3">Có giấy chứng nhận số</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
