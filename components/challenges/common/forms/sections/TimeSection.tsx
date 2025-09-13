'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TimeSection() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const watchedType = watch('type');

  // Tự động set startTime và endTime khi loại thử thách là time
  React.useEffect(() => {
    if (watchedType === 'time') {
      setValue('startTime', '00:00');
      setValue('endTime', '23:59');
    }
  }, [watchedType, setValue]);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Thời gian</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ngày bắt đầu */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ngày bắt đầu *</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('startDate')}
            />
            {errors.startDate && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.startDate.message as string}</span>
              </label>
            )}
          </div>

          {/* Ngày kết thúc */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ngày kết thúc *</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('endDate')}
            />
            {errors.endDate && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.endDate.message as string}</span>
              </label>
            )}
          </div>

                 {/* Thời gian bắt đầu - chỉ hiển thị khi loại thử thách là time */}
                 {watchedType === 'time' && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Thời gian bắt đầu *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200"
                value="00:00"
                disabled
                {...register('startTime')}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">Tự động: 00:00 (startOfDay)</span>
              </label>
            </div>
          )}

                 {/* Thời gian kết thúc - chỉ hiển thị khi loại thử thách là time */}
                 {watchedType === 'time' && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Thời gian kết thúc *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200"
                value="23:59"
                disabled
                {...register('endTime')}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">Tự động: 23:59 (endOfDay)</span>
              </label>
            </div>
          )}

          {/* Ngày bắt đầu đăng ký */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ngày bắt đầu đăng ký</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('registrationStartDate')}
            />
            {errors.registrationStartDate && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.registrationStartDate.message as string}</span>
              </label>
            )}
          </div>

          {/* Ngày kết thúc đăng ký */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Ngày kết thúc đăng ký</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full" 
              {...register('registrationEndDate')}
            />
            {errors.registrationEndDate && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.registrationEndDate.message as string}</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
