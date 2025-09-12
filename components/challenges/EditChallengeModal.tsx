'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAxios from '@/hooks/useAxios';
import { Challenge, ChallengeType, ChallengeCategory, ChallengeDifficulty, ChallengeVisibility, UpdateChallengeDto } from '@/types/challenge';
import Modal from '@/components/common/Modal';
import { useToast } from '@/components/Toast';
import { X, Save, Loader2 } from 'lucide-react';
import dlv from 'dlv';

interface EditChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: Challenge) => void;
}

// Validation schema cho chỉnh sửa thử thách
const editChallengeSchema = z.object({
  // Thông tin cơ bản
  name: z.string()
    .min(1, 'Tên thử thách là bắt buộc')
    .min(2, 'Tên thử thách phải có ít nhất 2 ký tự')
    .max(255, 'Tên thử thách không được vượt quá 255 ký tự'),
  
  description: z.string()
    .min(1, 'Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  visibility: z.nativeEnum(ChallengeVisibility),
  
  // Thời gian
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  
  // Mục tiêu
  targetValue: z.number()
    .min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string()
    .min(1, 'Đơn vị là bắt buộc'),
  
  // Tham gia
  allowFreeRegistration: z.boolean(),
  autoApprovalPassword: z.string().optional(),
  maxParticipants: z.number().min(1).optional(),
  maxTeamMembers: z.number().min(1).optional(),
  
  // Phần thưởng
  points: z.number().min(0).optional(),
  hasDigitalCertificate: z.boolean(),
  medalTemplateIds: z.array(z.string()).optional(),
  certificateTemplateIds: z.array(z.string()).optional(),
  
  // Cài đặt khác
  isPublic: z.boolean(),
  allowComments: z.boolean(),
  requireApproval: z.boolean(),
});

type EditChallengeFormData = z.infer<typeof editChallengeSchema>;

export default function EditChallengeModal({ 
  challenge, 
  isOpen, 
  onClose, 
  onSuccess 
}: EditChallengeModalProps) {
  const { showToast } = useToast();
  const [selectedMedalTemplates, setSelectedMedalTemplates] = useState<string[]>(challenge.medalTemplateIds || []);
  const [selectedCertificateTemplates, setSelectedCertificateTemplates] = useState<string[]>(challenge.certificateTemplateIds || []);

  // API call để cập nhật thử thách
  const [{ loading }, execute] = useAxios<Challenge>(
    `/api/challenges/${challenge.id}`,
    { method: 'PATCH', manual: true }
  );

  // Form setup
  const form = useForm<EditChallengeFormData>({
    resolver: zodResolver(editChallengeSchema),
    defaultValues: {
      name: challenge.name,
      description: challenge.description,
      type: challenge.type,
      difficulty: challenge.difficulty,
      visibility: challenge.visibility,
      startDate: challenge.startDate ? new Date(challenge.startDate).toISOString().split('T')[0] : '',
      endDate: challenge.endDate ? new Date(challenge.endDate).toISOString().split('T')[0] : '',
      targetValue: challenge.targetValue,
      targetUnit: challenge.targetUnit,
      allowFreeRegistration: challenge.allowFreeRegistration,
      autoApprovalPassword: challenge.autoApprovalPassword || '',
      maxParticipants: challenge.maxParticipants,
      maxTeamMembers: challenge.maxTeamMembers,
      points: challenge.points || 0,
      hasDigitalCertificate: challenge.hasDigitalCertificate || false,
      medalTemplateIds: challenge.medalTemplateIds || [],
      certificateTemplateIds: challenge.certificateTemplateIds || [],
      isPublic: challenge.isPublic || false,
      allowComments: challenge.allowComments || false,
      requireApproval: challenge.requireApproval || false,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  const watchedType = watch('type');

  // Submit handler
  const onSubmit = async (data: EditChallengeFormData) => {
    try {
      const challengeData: UpdateChallengeDto = {
        ...data,
        points: Number(data?.points || 0),
        autoApprovalPassword: data.autoApprovalPassword || undefined,
      };

      const response = await execute({
        data: challengeData,
      });

      if (response.data) {
        showToast({
          type: 'success',
          message: 'Cập nhật thử thách thành công!'
        });
        onSuccess?.(response.data);
        onClose();
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi cập nhật thử thách'
      });
    }
  };

  const getTargetUnitOptions = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.DISTANCE:
        return ['km', 'miles', 'm'];
      case ChallengeType.TIME:
        return ['phút', 'giờ', 'ngày'];
      case ChallengeType.FREQUENCY:
        return ['lần', 'ngày', 'tuần'];
      case ChallengeType.SPEED:
        return ['km/h', 'mph', 'm/s'];
      case ChallengeType.STREAK:
        return ['ngày', 'tuần', 'tháng'];
      default:
        return ['đơn vị'];
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-content">
            Chỉnh sửa thử thách
          </h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Thông tin cơ bản</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tên thử thách *</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Nhập tên thử thách"
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Loại thử thách *</span>
                </label>
                <select
                  {...register('type')}
                  className="select select-bordered w-full"
                >
                  <option value={ChallengeType.DISTANCE}>Khoảng cách</option>
                  <option value={ChallengeType.TIME}>Thời gian</option>
                  <option value={ChallengeType.FREQUENCY}>Tần suất</option>
                  <option value={ChallengeType.SPEED}>Tốc độ</option>
                  <option value={ChallengeType.STREAK}>Chuỗi ngày</option>
                  <option value={ChallengeType.COMBINED}>Kết hợp</option>
                  <option value={ChallengeType.CUSTOM}>Tùy chỉnh</option>
                </select>
                {errors.type && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.type.message}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mô tả *</span>
              </label>
              <textarea
                {...register('description')}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Mô tả chi tiết về thử thách"
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description.message}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Độ khó *</span>
                </label>
                <select
                  {...register('difficulty')}
                  className="select select-bordered w-full"
                >
                  <option value={ChallengeDifficulty.EASY}>Dễ</option>
                  <option value={ChallengeDifficulty.MEDIUM}>Trung bình</option>
                  <option value={ChallengeDifficulty.HARD}>Khó</option>
                  <option value={ChallengeDifficulty.EXTREME}>Cực khó</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.difficulty.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hiển thị *</span>
                </label>
                <select
                  {...register('visibility')}
                  className="select select-bordered w-full"
                >
                  <option value={ChallengeVisibility.PUBLIC}>Công khai</option>
                  <option value={ChallengeVisibility.PRIVATE}>Riêng tư</option>
                  <option value={ChallengeVisibility.CLUB_ONLY}>Chỉ câu lạc bộ</option>
                  <option value={ChallengeVisibility.INVITE_ONLY}>Chỉ mời</option>
                </select>
                {errors.visibility && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.visibility.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Danh mục</span>
                </label>
                <div className="text-sm text-base-content/60">
                  {challenge.category === ChallengeCategory.TEAM ? 'Tập thể' : 'Cá nhân'}
                </div>
              </div>
            </div>
          </div>

          {/* Thời gian */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Thời gian</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ngày bắt đầu *</span>
                </label>
                <input
                  {...register('startDate')}
                  type="date"
                  className="input input-bordered w-full"
                />
                {errors.startDate && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.startDate.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ngày kết thúc *</span>
                </label>
                <input
                  {...register('endDate')}
                  type="date"
                  className="input input-bordered w-full"
                />
                {errors.endDate && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.endDate.message}</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Mục tiêu */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Mục tiêu</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Giá trị mục tiêu *</span>
                </label>
                <input
                  {...register('targetValue', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  placeholder="Nhập giá trị mục tiêu"
                />
                {errors.targetValue && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.targetValue.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Đơn vị *</span>
                </label>
                <select
                  {...register('targetUnit')}
                  className="select select-bordered w-full"
                >
                  {getTargetUnitOptions(watchedType).map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.targetUnit && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.targetUnit.message}</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Cài đặt tham gia */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Cài đặt tham gia</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Số người tham gia tối đa</span>
                </label>
                <input
                  {...register('maxParticipants', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  placeholder="Không giới hạn"
                />
                {errors.maxParticipants && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.maxParticipants.message}</span>
                  </label>
                )}
              </div>

              {challenge.category === ChallengeCategory.TEAM && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Số thành viên tối đa/team</span>
                  </label>
                  <input
                    {...register('maxTeamMembers', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className="input input-bordered w-full"
                    placeholder="Không giới hạn"
                  />
                  {errors.maxTeamMembers && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.maxTeamMembers.message}</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mật khẩu duyệt tự động</span>
              </label>
              <input
                {...register('autoApprovalPassword')}
                type="text"
                className="input input-bordered w-full"
                placeholder="Để trống nếu không cần"
              />
              {errors.autoApprovalPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.autoApprovalPassword.message}</span>
                </label>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  {...register('allowFreeRegistration')}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Cho phép đăng ký tự do</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register('requireApproval')}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Yêu cầu duyệt tham gia</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register('isPublic')}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Hiển thị công khai</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register('allowComments')}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Cho phép bình luận</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register('hasDigitalCertificate')}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Có giấy chứng nhận số</span>
              </label>
            </div>
          </div>

          {/* Phần thưởng */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Phần thưởng</h3>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Điểm thưởng</span>
              </label>
              <input
                {...register('points', { valueAsNumber: true })}
                type="number"
                min="0"
                className="input input-bordered w-full"
                placeholder="0"
              />
              {errors.points && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.points.message}</span>
                </label>
              )}
            </div>
          </div>

          {/* Thông tin huy chương và giấy chứng nhận (chỉ hiển thị) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Phần thưởng</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-100 border border-base-300">
                <div className="card-body p-4">
                  <h4 className="font-semibold text-base flex items-center gap-2">
                    <span className="text-lg">🏅</span>
                    Huy chương
                  </h4>
                  <div className="text-sm text-base-content/70">
                    {selectedMedalTemplates.length > 0 ? (
                      <span className="text-success">Có {selectedMedalTemplates.length} huy chương</span>
                    ) : (
                      <span className="text-base-content/50">Không có huy chương</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 border border-base-300">
                <div className="card-body p-4">
                  <h4 className="font-semibold text-base flex items-center gap-2">
                    <span className="text-lg">📜</span>
                    Giấy chứng nhận
                  </h4>
                  <div className="text-sm text-base-content/70">
                    {selectedCertificateTemplates.length > 0 ? (
                      <span className="text-success">Có {selectedCertificateTemplates.length} giấy chứng nhận</span>
                    ) : (
                      <span className="text-base-content/50">Không có giấy chứng nhận</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-base-300">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Cập nhật thử thách
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
