'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChallengeType, ChallengeDifficulty, ChallengeVisibility } from '@/types/challenge';

export default function BasicInfoForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <span className="text-lg">📝</span>
          Thông tin cơ bản
        </h4>
        <div className="space-y-3">
          {/* Input text - nguyên hàng */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Tên thử thách <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Thử thách chạy 100km trong tháng"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Mô tả <span className="text-error">*</span>
              </span>
            </label>
            <textarea
              placeholder="Mô tả chi tiết về thử thách, mục tiêu và cách tham gia..."
              className={`textarea textarea-bordered w-full h-24 resize-none ${errors.description ? 'textarea-error' : ''}`}
              {...register('description')}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.description.message}</span>
              </label>
            )}
          </div>

          {/* Select - 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Độ khó</span>
              </label>
              <select className="select select-bordered w-full" {...register('difficulty')}>
                <option value={ChallengeDifficulty.EASY}>Dễ</option>
                <option value={ChallengeDifficulty.MEDIUM}>Trung bình</option>
                <option value={ChallengeDifficulty.HARD}>Khó</option>
                <option value={ChallengeDifficulty.EXPERT}>Chuyên gia</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Quyền riêng tư</span>
              </label>
              <select className="select select-bordered w-full" {...register('visibility')}>
                <option value={ChallengeVisibility.PUBLIC}>Công khai</option>
                <option value={ChallengeVisibility.PRIVATE}>Riêng tư</option>
                <option value={ChallengeVisibility.CLUB_ONLY}>Chỉ CLB</option>
                <option value={ChallengeVisibility.INVITE_ONLY}>Chỉ mời</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
