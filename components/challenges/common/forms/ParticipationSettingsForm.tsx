'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ParticipationSettingsForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const allowFreeRegistration = watch('allowFreeRegistration');

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">👥</span>
          Cài đặt tham gia
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Số người tham gia tối đa</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="Không giới hạn"
                className="input input-bordered w-full max-w-xs"
                {...register('maxParticipants', { valueAsNumber: true })}
              />
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Chế độ đăng ký</span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register('allowFreeRegistration')}
                  />
                  <span className="label-text ml-3">
                    {allowFreeRegistration ? 'Đăng ký tự do' : 'Phê duyệt đăng ký'}
                  </span>
                </label>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mật khẩu phê duyệt</span>
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="input input-bordered w-full max-w-xs"
                disabled={allowFreeRegistration}
                {...register('autoApprovalPassword')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
