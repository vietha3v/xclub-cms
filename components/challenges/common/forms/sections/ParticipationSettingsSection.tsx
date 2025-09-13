'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ParticipationSettingsSection() {
  const { register, formState: { errors }, watch } = useFormContext();
  const watchedAllowFreeRegistration = watch('allowFreeRegistration');

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-4">Cài đặt tham gia</h2>
        
        {/* Row 1: Hiển thị + Số lượng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hiển thị */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Hiển thị *</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('visibility')}
              defaultValue="public"
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
              <option value="club_only">Chỉ câu lạc bộ</option>
              <option value="invite_only">Chỉ mời</option>
            </select>
            {errors.visibility && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.visibility.message as string}</span>
              </label>
            )}
          </div>

          {/* Số người tham gia tối đa */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Số người tham gia tối đa</span>
            </label>
            <input
              type="number"
              min="1"
              placeholder="Nhập số người tối đa"
              className="input input-bordered w-full"
              defaultValue={100}
              {...register('maxParticipants', { valueAsNumber: true })}
            />
            {errors.maxParticipants && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.maxParticipants.message as string}</span>
              </label>
            )}
          </div>
        </div>

        {/* Row 2: Toggle + Mật khẩu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Đăng ký mở/xét duyệt */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Chế độ đăng ký</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={watchedAllowFreeRegistration}
                {...register('allowFreeRegistration')}
              />
              <span className="font-medium">
                {watchedAllowFreeRegistration ? 'Đăng ký mở' : 'Xét duyệt đăng ký'}
              </span>
            </div>
          </div>

          {/* Mật khẩu tự động phê duyệt */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mật khẩu duyệt tự động</span>
            </label>
            <input
              type="password"
              placeholder={watchedAllowFreeRegistration ? "Chỉ dành cho chế độ xét duyệt" : "Nhập mật khẩu (tùy chọn)"}
              className={`input input-bordered w-full ${watchedAllowFreeRegistration ? 'bg-base-200' : ''}`}
              disabled={watchedAllowFreeRegistration}
              {...register('autoApprovalPassword')}
            />
            {errors.autoApprovalPassword && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.autoApprovalPassword.message as string}</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
