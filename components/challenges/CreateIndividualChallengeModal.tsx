'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAxios from '@/hooks/useAxios';
import { ChallengeType, ChallengeCategory, ChallengeDifficulty, ChallengeVisibility, CreateChallengeDto } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import { useToast } from '@/components/Toast';
import { X, Plus } from 'lucide-react';
import dlv from 'dlv';

interface CreateIndividualChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: unknown) => void;
}

// Validation schema cho thử thách cá nhân
const createIndividualChallengeSchema = z.object({
  // Thông tin cơ bản
  name: z.string()
    .min(1, 'Tên thử thách là bắt buộc')
    .min(2, 'Tên thử thách phải có ít nhất 2 ký tự')
    .max(255, 'Tên thử thách không được vượt quá 255 ký tự'),
  
  description: z.string()
    .min(1, 'Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty).default(ChallengeDifficulty.MEDIUM),
  visibility: z.nativeEnum(ChallengeVisibility).default(ChallengeVisibility.PUBLIC),
  
  // Thời gian
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  registrationStartDate: z.string().optional(),
  registrationEndDate: z.string().optional(),
  
  // Mục tiêu
  targetValue: z.number()
    .min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string()
    .min(1, 'Đơn vị là bắt buộc'),
  
  // Tham gia
  allowFreeRegistration: z.boolean().default(true),
  autoApprovalPassword: z.string().optional(),
  maxParticipants: z.number().min(1).optional(),
  
  // Phần thưởng
  points: z.number().min(0).default(0),
  achievementId: z.string().optional(),
  hasDigitalCertificate: z.boolean().default(false),
  rules: z.string().optional(),
  
  
  // Các field bổ sung cho individual challenge
  minOccurrences: z.number().min(1).optional(),
  minStreak: z.number().min(1).optional(),
  minDistance: z.number().min(0).optional(),
  maxDistance: z.number().min(0).optional(),
});

type CreateIndividualChallengeFormData = z.infer<typeof createIndividualChallengeSchema>;

export default function CreateIndividualChallengeModal({ 
  isOpen, 
  onClose, 
  onSuccess
}: CreateIndividualChallengeModalProps) {
  const { showToast } = useToast();

  // API hooks
  const [{ loading }, execute] = useAxios<CreateChallengeDto>(
    '/api/challenges',
    { manual: true }
  );



  // Form setup
  const form = useForm<CreateIndividualChallengeFormData>({
    resolver: zodResolver(createIndividualChallengeSchema),
    defaultValues: {
      type: ChallengeType.DISTANCE,
      difficulty: ChallengeDifficulty.MEDIUM,
      visibility: ChallengeVisibility.PUBLIC,
      allowFreeRegistration: true,
      autoApprovalPassword: '',
      points: 0,
      hasDigitalCertificate: false,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  const watchedType = watch('type');


  // Submit handler
  const onSubmit = async (data: CreateIndividualChallengeFormData) => {
    try {
      // Tính timeLimit tự động từ startDate và endDate
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const timeLimitDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const challengeData: CreateChallengeDto = {
        ...data,
        category: ChallengeCategory.INDIVIDUAL,
        points: Number(dlv(data, 'points', 0)),
        timeLimit: timeLimitDays, // Tự động tính từ startDate và endDate
        autoApprovalPassword: data.autoApprovalPassword || undefined,
        // Thử thách cá nhân không cần clubId
      };

      const response = await execute({
        method: 'POST',
        data: challengeData,
      });

      if (response.data) {
        showToast({
          type: 'success',
          message: 'Tạo thử thách thành công!'
        });
        

        onSuccess?.(response.data);
        onClose();
        form.reset();
      }
    } catch (error) {
      console.error('Create challenge error:', error);
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi tạo thử thách'
      });
    }
  };

  // Footer
  const footer = (
    <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
      <button
        type="button"
        onClick={onClose}
        className="btn btn-ghost btn-sm"
        disabled={loading}
      >
        <X className="w-4 h-4 mr-1" />
        Hủy
      </button>
      <button
        type="submit"
        form="create-individual-challenge-form"
        className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {loading ? (
          'Đang tạo...'
        ) : (
          <>
            <Plus className="w-4 h-4 mr-1" />
            Tạo thử thách
          </>
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo thử thách cá nhân"
      size="xl"
      footer={footer}
    >
      <div className="">
        <form id="create-individual-challenge-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Tạo thử thách cá nhân
                  </h2>
                  <p className="text-sm text-base-content/70 mt-1">
                    Thiết lập thử thách cá nhân với các mục tiêu và quy tắc phù hợp
                  </p>
                </div>
                <div className="badge badge-primary">
                  🏃‍♂️ Cá nhân
                </div>
              </div>
            </div>
          </div>

          {/* Main Form - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* 1. Thông tin cơ bản */}
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

              {/* 2. Thời gian */}
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
                            <span className="label-text-alt text-error">{errors.startDate.message}</span>
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
                            <span className="label-text-alt text-error">{errors.endDate.message}</span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Thời gian đăng ký */}
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    Thời gian đăng ký
                  </h4>
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

              {/* 4. Mục tiêu thử thách */}
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
                        onChange={(e) => {
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
                        }}
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

              {/* 5. Điều kiện thử thách */}
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

              {/* 6. Cài đặt tham gia */}
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
                              {watch('allowFreeRegistration') ? 'Đăng ký tự do' : 'Phê duyệt đăng ký'}
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
                          disabled={watch('allowFreeRegistration')}
                          {...register('autoApprovalPassword')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Quy tắc */}
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

            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
