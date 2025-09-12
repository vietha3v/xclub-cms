'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function RulesForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">📋</span>
          Quy tắc
        </h4>
        <div className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Quy tắc thử thách</span>
            </label>
            <textarea
              placeholder="Các quy tắc đặc biệt, điều kiện tham gia..."
              className="textarea textarea-bordered w-full h-24 resize-none"
              {...register('rules')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
