'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChallengeType } from '@/types/challenge';

interface ChallengeTargetFormProps {
  watchedType: ChallengeType;
}

export default function ChallengeTargetForm({ watchedType }: ChallengeTargetFormProps) {
  const { register, setValue, formState: { errors } } = useFormContext();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as ChallengeType;
    setValue('type', type);
    
    // Tự động chọn đơn vị dựa trên loại thử thách
    let defaultUnit = 'km';
    switch (type) {
      case ChallengeType.DISTANCE:
        defaultUnit = 'km';
        break;
      case ChallengeType.TIME:
        defaultUnit = 'hours';
        break;
      case ChallengeType.FREQUENCY:
        defaultUnit = 'times';
        break;
      case ChallengeType.STREAK:
        defaultUnit = 'days';
        break;
      case ChallengeType.COMBINED:
        defaultUnit = 'km';
        break;
    }
    setValue('targetUnit', defaultUnit);
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">🎯</span>
          Mục tiêu thử thách
        </h4>
        <div className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Loại thử thách <span className="text-error">*</span>
              </span>
            </label>
            <select 
              className="select select-bordered w-full" 
              {...register('type')}
              onChange={handleTypeChange}
            >
              <option value={ChallengeType.DISTANCE}>Khoảng cách</option>
              <option value={ChallengeType.TIME}>Thời gian</option>
              <option value={ChallengeType.FREQUENCY}>Tần suất</option>
              <option value={ChallengeType.STREAK}>Chuỗi ngày</option>
              <option value={ChallengeType.COMBINED}>Kết hợp</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Giá trị mục tiêu <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="100"
                className={`input input-bordered w-full max-w-xs ${errors.targetValue ? 'input-error' : ''}`}
                {...register('targetValue', { valueAsNumber: true })}
              />
              {errors.targetValue && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.targetValue.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Đơn vị <span className="text-error">*</span>
                </span>
              </label>
              <select 
                className={`select select-bordered w-full max-w-xs ${errors.targetUnit ? 'select-error' : ''} ${watchedType ? 'select-disabled' : ''}`} 
                {...register('targetUnit')}
                disabled={!!watchedType}
              >
                <option value="km">Kilomet (km)</option>
                <option value="m">Mét (m)</option>
                <option value="hours">Giờ</option>
                <option value="minutes">Phút</option>
                <option value="days">Ngày</option>
                <option value="times">Lần</option>
              </select>
              {errors.targetUnit && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.targetUnit.message}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
