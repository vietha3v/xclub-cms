'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TimeForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">📅</span>
          Thời gian
        </h4>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Ngày bắt đầu <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="datetime-local"
                className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                {...register('startDate')}
              />
              {errors.startDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.startDate?.message as string}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Ngày kết thúc <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="datetime-local"
                className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
                {...register('endDate')}
              />
              {errors.endDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.endDate?.message as string}</span>
                </label>
              )}
            </div>
          </div>

          <div className="text-sm text-base-content/70 mb-4">
            Thiết lập thời gian cho phép đăng ký tham gia thử thách (tùy chọn)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Bắt đầu đăng ký</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                {...register('registrationStartDate')}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Kết thúc đăng ký</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                {...register('registrationEndDate')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
