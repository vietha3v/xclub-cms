'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChallengeType, ChallengeDifficulty, ChallengeVisibility } from '@/types/challenge';

export default function BasicInfoSection() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Thông tin cơ bản</h2>
        
        {/* Tên thử thách */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Tên thử thách *</span>
          </label>
          <input
            type="text"
            placeholder="Nhập tên thử thách"
            className="input input-bordered w-full"
            {...register('name')}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.name.message as string}</span>
            </label>
          )}
        </div>

        {/* Mô tả */}
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text">Mô tả *</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Mô tả chi tiết về thử thách"
            {...register('description')}
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.description.message as string}</span>
            </label>
          )}
        </div>

        {/* Quy tắc và điều khoản */}
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text">Quy tắc và điều khoản</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-32"
            placeholder="Nhập quy tắc và điều khoản của thử thách..."
            {...register('rules')}
          />
          {errors.rules && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.rules.message as string}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
