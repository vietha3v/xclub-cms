'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ChallengeConditionsForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          Điều kiện thử thách
        </h4>
        <div className="text-sm text-base-content/70 mb-4">
          Thiết lập các điều kiện cụ thể cho thử thách (tùy chọn)
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Số lần tối thiểu</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                className="input input-bordered w-full max-w-xs"
                {...register('minOccurrences', { valueAsNumber: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Chuỗi liên tiếp tối thiểu</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                className="input input-bordered w-full max-w-xs"
                {...register('minStreak', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Khoảng cách tối thiểu mỗi lần (km)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="5"
                className="input input-bordered w-full max-w-xs"
                {...register('minDistance', { valueAsNumber: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Khoảng cách tối đa mỗi lần (km)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="42"
                className="input input-bordered w-full max-w-xs"
                {...register('maxDistance', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
