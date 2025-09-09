'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Challenge, ChallengeType, ChallengeCategory, ChallengeDifficulty, ChallengeVisibility, CreateChallengeDto } from '@/types/challenge';
import { Calendar, Users, Target, Trophy, Settings, X, User, Users2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';

// Validation schemas
const individualChallengeSchema = z.object({
  name: z.string().min(1, 'Tên thử thách là bắt buộc'),
  description: z.string().optional(),
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  visibility: z.nativeEnum(ChallengeVisibility),
  category: z.literal(ChallengeCategory.INDIVIDUAL),
  clubId: z.string().optional(),
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  targetValue: z.number().min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string().min(1, 'Đơn vị là bắt buộc'),
  timeLimit: z.number().min(1, 'Giới hạn thời gian phải lớn hơn 0'),
  allowRegistration: z.boolean().default(true),
  requireApproval: z.boolean().default(false),
  allowWithdrawal: z.boolean().default(true),
  points: z.number().min(0).default(0),
  maxParticipants: z.number().min(1).optional(),
  minParticipants: z.number().min(1).optional(),
  rules: z.string().optional(),
  rewards: z.string().optional(),
  coverImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const teamChallengeSchema = z.object({
  name: z.string().min(1, 'Tên thử thách là bắt buộc'),
  description: z.string().optional(),
  type: z.nativeEnum(ChallengeType),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  visibility: z.nativeEnum(ChallengeVisibility),
  category: z.literal(ChallengeCategory.TEAM),
  clubId: z.string().optional(),
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  targetValue: z.number().min(1, 'Giá trị mục tiêu phải lớn hơn 0'),
  targetUnit: z.string().min(1, 'Đơn vị là bắt buộc'),
  timeLimit: z.number().min(1, 'Giới hạn thời gian phải lớn hơn 0'),
  allowRegistration: z.boolean().default(true),
  requireApproval: z.boolean().default(false),
  allowWithdrawal: z.boolean().default(true),
  points: z.number().min(0).default(0),
  maxTeamMembers: z.number().min(1).optional(),
  maxTeams: z.number().min(1).optional(),
  minTracklogDistance: z.number().min(0).optional(),
  maxIndividualContribution: z.number().min(0).optional(),
  rules: z.string().optional(),
  rewards: z.string().optional(),
  coverImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type IndividualChallengeFormData = z.infer<typeof individualChallengeSchema>;
type TeamChallengeFormData = z.infer<typeof teamChallengeSchema>;

interface ChallengeFormProps {
  clubId?: string;
  challenge?: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (challenge: Challenge) => void;
  mode?: 'create' | 'edit';
}

export default function ChallengeForm({
  clubId,
  challenge,
  isOpen,
  onClose,
  onSuccess,
  mode = 'create'
}: ChallengeFormProps) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);

  // API hooks
  const [{ loading: isCreating }, executeCreate] = useAxios<Challenge>(
    '/api/challenges',
    { manual: true }
  );

  const [{ loading: isUpdating }, executeUpdate] = useAxios<Challenge>(
    `/api/challenges/${challenge?.id}`,
    { manual: true }
  );

  const isSubmitting = isCreating || isUpdating;

  // Form setup
  const individualForm = useForm<IndividualChallengeFormData>({
    resolver: zodResolver(individualChallengeSchema),
    defaultValues: {
      category: ChallengeCategory.INDIVIDUAL,
      clubId: clubId,
      type: ChallengeType.DISTANCE,
      difficulty: ChallengeDifficulty.MEDIUM,
      visibility: ChallengeVisibility.CLUB_ONLY,
      allowRegistration: true,
      requireApproval: false,
      allowWithdrawal: true,
      points: 0,
    }
  });

  const teamForm = useForm<TeamChallengeFormData>({
    resolver: zodResolver(teamChallengeSchema),
    defaultValues: {
      category: ChallengeCategory.TEAM,
      clubId: clubId,
      type: ChallengeType.DISTANCE,
      difficulty: ChallengeDifficulty.MEDIUM,
      visibility: ChallengeVisibility.CLUB_ONLY,
      allowRegistration: true,
      requireApproval: false,
      allowWithdrawal: true,
      points: 0,
    }
  });

  useEffect(() => {
    if (challenge && mode === 'edit') {
      const formData = {
        name: challenge.name,
        description: challenge.description || '',
        type: challenge.type,
        difficulty: challenge.difficulty,
        visibility: challenge.visibility,
        category: challenge.category,
        clubId: challenge.clubId,
        startDate: challenge.startDate.split('T')[0],
        endDate: challenge.endDate.split('T')[0],
        targetValue: challenge.targetValue,
        targetUnit: challenge.targetUnit,
        timeLimit: challenge.timeLimit,
        allowRegistration: challenge.allowRegistration,
        requireApproval: challenge.requireApproval,
        allowWithdrawal: challenge.allowWithdrawal,
        points: challenge.points || 0,
        rules: challenge.rules,
        rewards: challenge.rewards,
        coverImageUrl: challenge.coverImageUrl,
        tags: challenge.tags,
      };

      if (challenge.category === ChallengeCategory.INDIVIDUAL) {
        individualForm.reset({
          ...formData,
          maxParticipants: challenge.maxParticipants,
          minParticipants: challenge.minParticipants,
        });
        setSelectedCategory(ChallengeCategory.INDIVIDUAL);
      } else {
        teamForm.reset({
          ...formData,
          maxTeamMembers: challenge.maxTeamMembers,
          maxTeams: challenge.maxTeams,
          minTracklogDistance: challenge.minTracklogDistance,
          maxIndividualContribution: challenge.maxIndividualContribution,
        });
        setSelectedCategory(ChallengeCategory.TEAM);
      }
      setStep('form');
    } else if (mode === 'create') {
      setStep('select');
      setSelectedCategory(null);
      individualForm.reset();
      teamForm.reset();
    }
  }, [challenge, mode, clubId, individualForm, teamForm]);

  const handleCategorySelect = (category: ChallengeCategory) => {
    setSelectedCategory(category);
    setStep('form');
  };

  const handleSubmit = async (data: IndividualChallengeFormData | TeamChallengeFormData) => {
    if (isSubmitting) return;

    try {
      // Convert date strings to ISO format for BE
      const submitData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      let response;
      if (mode === 'create') {
        response = await executeCreate({
          method: 'POST',
          data: submitData
        });
      } else {
        response = await executeUpdate({
          method: 'PATCH',
          data: submitData
        });
      }

      if (response.data) {
        onSuccess?.(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Error saving challenge:', error);
    }
  };

  const handleBack = () => {
    if (mode === 'edit') {
      onClose();
    } else {
      setStep('select');
      setSelectedCategory(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">
            {step === 'select' ? 'Chọn loại thử thách' : 
             mode === 'create' ? 'Tạo thử thách mới' : 'Chỉnh sửa thử thách'}
          </h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'select' ? (
          <CategorySelectionStep onSelect={handleCategorySelect} />
        ) : selectedCategory === ChallengeCategory.INDIVIDUAL ? (
          <IndividualChallengeForm
            form={individualForm}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        ) : (
          <TeamChallengeForm
            form={teamForm}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

// Category Selection Component
function CategorySelectionStep({ onSelect }: { onSelect: (category: ChallengeCategory) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-base-content/70 text-lg">
          Chọn loại thử thách bạn muốn tạo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Individual Challenge */}
        <div 
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => onSelect(ChallengeCategory.INDIVIDUAL)}
        >
          <div className="card-body text-center p-8">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <h3 className="text-2xl font-bold mb-3">Thử thách cá nhân</h3>
            <p className="text-base-content/70 mb-4">
              Thử thách dành cho từng thành viên riêng lẻ, phù hợp cho các mục tiêu cá nhân như chạy bộ, tập luyện hàng ngày.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <User className="w-5 h-5" />
              <span className="font-medium">Cá nhân</span>
            </div>
          </div>
        </div>

        {/* Team Challenge */}
        <div 
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => onSelect(ChallengeCategory.TEAM)}
        >
          <div className="card-body text-center p-8">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-3">Thử thách tập thể</h3>
            <p className="text-base-content/70 mb-4">
              Thử thách dành cho các CLB, tính tổng thành tích của tất cả thành viên tham gia.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Users2 className="w-5 h-5" />
              <span className="font-medium">Tập thể</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Challenge Form Component
function IndividualChallengeForm({
  form,
  onSubmit,
  onBack,
  isSubmitting
}: {
  form: any;
  onSubmit: (data: IndividualChallengeFormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Thông tin cơ bản
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên thử thách *</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${form.formState.errors.name ? 'input-error' : ''}`}
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Loại thử thách *</span>
            </label>
            <select
              className={`select select-bordered ${form.formState.errors.type ? 'select-error' : ''}`}
              {...form.register('type')}
            >
              <option value={ChallengeType.DISTANCE}>Khoảng cách</option>
              <option value={ChallengeType.TIME}>Thời gian</option>
              <option value={ChallengeType.FREQUENCY}>Tần suất</option>
              <option value={ChallengeType.SPEED}>Tốc độ</option>
              <option value={ChallengeType.STREAK}>Chuỗi ngày</option>
              <option value={ChallengeType.COMBINED}>Kết hợp</option>
              <option value={ChallengeType.CUSTOM}>Tùy chỉnh</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Độ khó</span>
            </label>
            <select
              className="select select-bordered"
              {...form.register('difficulty')}
            >
              <option value={ChallengeDifficulty.EASY}>Dễ</option>
              <option value={ChallengeDifficulty.MEDIUM}>Trung bình</option>
              <option value={ChallengeDifficulty.HARD}>Khó</option>
              <option value={ChallengeDifficulty.EXPERT}>Chuyên gia</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quyền riêng tư</span>
            </label>
            <select
              className="select select-bordered"
              {...form.register('visibility')}
            >
              <option value={ChallengeVisibility.PUBLIC}>Công khai</option>
              <option value={ChallengeVisibility.CLUB_ONLY}>Chỉ CLB</option>
              <option value={ChallengeVisibility.PRIVATE}>Riêng tư</option>
              <option value={ChallengeVisibility.INVITE_ONLY}>Chỉ mời</option>
            </select>
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            {...form.register('description')}
            placeholder="Mô tả chi tiết về thử thách..."
          />
        </div>
      </div>

      {/* Time Settings */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Thời gian
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ngày bắt đầu *</span>
            </label>
            <input
              type="date"
              className={`input input-bordered ${form.formState.errors.startDate ? 'input-error' : ''}`}
              {...form.register('startDate')}
            />
            {form.formState.errors.startDate && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.startDate.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ngày kết thúc *</span>
            </label>
            <input
              type="date"
              className={`input input-bordered ${form.formState.errors.endDate ? 'input-error' : ''}`}
              {...form.register('endDate')}
            />
            {form.formState.errors.endDate && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.endDate.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Giới hạn thời gian (ngày) *</span>
            </label>
            <input
              type="number"
              className={`input input-bordered ${form.formState.errors.timeLimit ? 'input-error' : ''}`}
              {...form.register('timeLimit', { valueAsNumber: true })}
              min="1"
            />
            {form.formState.errors.timeLimit && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.timeLimit.message}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Target Settings */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Mục tiêu
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Giá trị mục tiêu *</span>
            </label>
            <input
              type="number"
              className={`input input-bordered ${form.formState.errors.targetValue ? 'input-error' : ''}`}
              {...form.register('targetValue', { valueAsNumber: true })}
              min="1"
            />
            {form.formState.errors.targetValue && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.targetValue.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Đơn vị *</span>
            </label>
            <select
              className={`select select-bordered ${form.formState.errors.targetUnit ? 'select-error' : ''}`}
              {...form.register('targetUnit')}
            >
              <option value="km">Kilometer</option>
              <option value="m">Meter</option>
              <option value="days">Ngày</option>
              <option value="hours">Giờ</option>
              <option value="minutes">Phút</option>
              <option value="times">Lần</option>
              <option value="pace">Pace (phút/km)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Individual Challenge Settings */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Cài đặt thử thách cá nhân
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Số người tham gia tối đa</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('maxParticipants', { valueAsNumber: true })}
              min="1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Số người tham gia tối thiểu</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('minParticipants', { valueAsNumber: true })}
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Cài đặt bổ sung
        </h4>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Điểm thưởng</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...form.register('points', { valueAsNumber: true })}
            min="0"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Quy tắc thử thách</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-20"
            {...form.register('rules')}
            placeholder="Các quy tắc và điều kiện tham gia..."
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Quay lại
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Đang lưu...
            </>
          ) : (
            'Tạo thử thách'
          )}
        </button>
      </div>
    </form>
  );
}

// Team Challenge Form Component
function TeamChallengeForm({
  form,
  onSubmit,
  onBack,
  isSubmitting
}: {
  form: any;
  onSubmit: (data: TeamChallengeFormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information - Same as Individual */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Thông tin cơ bản
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên thử thách *</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${form.formState.errors.name ? 'input-error' : ''}`}
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Loại thử thách *</span>
            </label>
            <select
              className={`select select-bordered ${form.formState.errors.type ? 'select-error' : ''}`}
              {...form.register('type')}
            >
              <option value={ChallengeType.DISTANCE}>Khoảng cách</option>
              <option value={ChallengeType.TIME}>Thời gian</option>
              <option value={ChallengeType.FREQUENCY}>Tần suất</option>
              <option value={ChallengeType.SPEED}>Tốc độ</option>
              <option value={ChallengeType.STREAK}>Chuỗi ngày</option>
              <option value={ChallengeType.COMBINED}>Kết hợp</option>
              <option value={ChallengeType.CUSTOM}>Tùy chỉnh</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Độ khó</span>
            </label>
            <select
              className="select select-bordered"
              {...form.register('difficulty')}
            >
              <option value={ChallengeDifficulty.EASY}>Dễ</option>
              <option value={ChallengeDifficulty.MEDIUM}>Trung bình</option>
              <option value={ChallengeDifficulty.HARD}>Khó</option>
              <option value={ChallengeDifficulty.EXPERT}>Chuyên gia</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quyền riêng tư</span>
            </label>
            <select
              className="select select-bordered"
              {...form.register('visibility')}
            >
              <option value={ChallengeVisibility.PUBLIC}>Công khai</option>
              <option value={ChallengeVisibility.CLUB_ONLY}>Chỉ CLB</option>
              <option value={ChallengeVisibility.PRIVATE}>Riêng tư</option>
              <option value={ChallengeVisibility.INVITE_ONLY}>Chỉ mời</option>
            </select>
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            {...form.register('description')}
            placeholder="Mô tả chi tiết về thử thách..."
          />
        </div>
      </div>

      {/* Time Settings - Same as Individual */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Thời gian
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ngày bắt đầu *</span>
            </label>
            <input
              type="date"
              className={`input input-bordered ${form.formState.errors.startDate ? 'input-error' : ''}`}
              {...form.register('startDate')}
            />
            {form.formState.errors.startDate && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.startDate.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ngày kết thúc *</span>
            </label>
            <input
              type="date"
              className={`input input-bordered ${form.formState.errors.endDate ? 'input-error' : ''}`}
              {...form.register('endDate')}
            />
            {form.formState.errors.endDate && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.endDate.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Giới hạn thời gian (ngày) *</span>
            </label>
            <input
              type="number"
              className={`input input-bordered ${form.formState.errors.timeLimit ? 'input-error' : ''}`}
              {...form.register('timeLimit', { valueAsNumber: true })}
              min="1"
            />
            {form.formState.errors.timeLimit && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.timeLimit.message}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Target Settings - Same as Individual */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Mục tiêu
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Giá trị mục tiêu *</span>
            </label>
            <input
              type="number"
              className={`input input-bordered ${form.formState.errors.targetValue ? 'input-error' : ''}`}
              {...form.register('targetValue', { valueAsNumber: true })}
              min="1"
            />
            {form.formState.errors.targetValue && (
              <label className="label">
                <span className="label-text-alt text-error">{form.formState.errors.targetValue.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Đơn vị *</span>
            </label>
            <select
              className={`select select-bordered ${form.formState.errors.targetUnit ? 'select-error' : ''}`}
              {...form.register('targetUnit')}
            >
              <option value="km">Kilometer</option>
              <option value="m">Meter</option>
              <option value="days">Ngày</option>
              <option value="hours">Giờ</option>
              <option value="minutes">Phút</option>
              <option value="times">Lần</option>
              <option value="pace">Pace (phút/km)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Challenge Settings */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Cài đặt thử thách tập thể
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Số thành viên tối đa/team</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('maxTeamMembers', { valueAsNumber: true })}
              min="1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Số team tối đa</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('maxTeams', { valueAsNumber: true })}
              min="1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Khoảng cách tối thiểu/tracklog (km)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('minTracklogDistance', { valueAsNumber: true })}
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Khoảng cách tối đa/cá nhân (km)</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...form.register('maxIndividualContribution', { valueAsNumber: true })}
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Additional Settings - Same as Individual */}
      <div className="card bg-base-200 p-4">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Cài đặt bổ sung
        </h4>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Điểm thưởng</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...form.register('points', { valueAsNumber: true })}
            min="0"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Quy tắc thử thách</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-20"
            {...form.register('rules')}
            placeholder="Các quy tắc và điều kiện tham gia..."
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Quay lại
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Đang lưu...
            </>
          ) : (
            'Tạo thử thách'
          )}
        </button>
      </div>
    </form>
    );
}