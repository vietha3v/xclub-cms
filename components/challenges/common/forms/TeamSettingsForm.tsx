'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TeamSettingsForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">👥</span>
          Cài đặt đội nhóm
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Số thành viên tối đa mỗi đội</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="5"
                className="input input-bordered w-full max-w-xs"
                {...register('maxTeamMembers', { valueAsNumber: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Số đội tối đa</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="50"
                className="input input-bordered w-full max-w-xs"
                {...register('maxTeams', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Khoảng cách tối thiểu tracklog (km)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="1.0"
                className="input input-bordered w-full max-w-xs"
                {...register('minTracklogDistance', { valueAsNumber: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Đóng góp cá nhân tối đa (%)</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="50"
                className="input input-bordered w-full max-w-xs"
                {...register('maxIndividualContribution', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
