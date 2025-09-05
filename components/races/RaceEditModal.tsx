'use client';

import useAxios from '@/hooks/useAxios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Race, UpdateRaceDto } from '@/types/race';
import { RACE_TYPES, RACE_CATEGORIES, RACE_STATUSES } from '@/types/race';
import { useToast } from '@/components/Toast';

const updateRaceSchema = z.object({
  name: z.string().min(1, 'Tên giải chạy là bắt buộc'),
  description: z.string().optional(),
  type: z.enum(['marathon', 'half_marathon', '10k', '5k', 'trail', 'ultra', 'relay', 'virtual', 'other']),
  status: z.enum(['draft', 'published', 'registration_open', 'registration_closed', 'active', 'completed', 'cancelled']),
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().optional(),
  registrationStartDate: z.string().optional(),
  registrationEndDate: z.string().optional(),
  location: z.string().optional(),
  maxParticipants: z.number().min(1, 'Số lượng tham gia tối đa phải lớn hơn 0').optional(),
  registrationFee: z.number().min(0, 'Phí tham gia không được âm').optional()
});

interface RaceEditModalProps {
  race: Race;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RaceEditModal({ race, isOpen, onClose, onSuccess }: RaceEditModalProps) {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateRaceDto>({
    resolver: zodResolver(updateRaceSchema),
    defaultValues: {
      name: race.name,
      description: race.description || '',
      type: race.type,
      status: race.status,
      startDate: race.startDate.split('T')[0],
      endDate: race.endDate ? race.endDate.split('T')[0] : '',
      registrationStartDate: race.registrationStartDate ? race.registrationStartDate.split('T')[0] : '',
      registrationEndDate: race.registrationEndDate ? race.registrationEndDate.split('T')[0] : '',
      location: race.location || '',
      maxParticipants: race.maxParticipants || 0,
      registrationFee: race.registrationFee || 0
    }
  });

  const [{ loading }, executeUpdate] = useAxios({
    url: `/api/races/${race.id}`,
    method: 'PATCH'
  }, { manual: true });

  const onSubmit = async (data: UpdateRaceDto) => {
    try {
      await executeUpdate({ data });
      showToast({
        type: 'success',
        message: 'Cập nhật giải chạy thành công!',
        title: 'Thành công'
      });
      onSuccess();
    } catch (error: any) {
      console.error('Error updating race:', error);
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật giải chạy',
        title: 'Lỗi'
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Chỉnh sửa giải chạy</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tên giải chạy</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
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
                <span className="label-text">Địa điểm</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                {...register('location')}
              />
              {errors.location && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.location.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mô tả</span>
            </label>
            <textarea
              className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.description.message}</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Loại</span>
              </label>
              <select className="select select-bordered" {...register('type')}>
                {Object.entries(RACE_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Thể loại</span>
              </label>
              <select className="select select-bordered" {...register('category')}>
                {Object.entries(RACE_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Trạng thái</span>
              </label>
              <select className="select select-bordered" {...register('status')}>
                {Object.entries(RACE_STATUSES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ngày bắt đầu</span>
              </label>
              <input
                type="date"
                className={`input input-bordered ${errors.startDate ? 'input-error' : ''}`}
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
                <span className="label-text">Ngày kết thúc</span>
              </label>
              <input
                type="date"
                className={`input input-bordered ${errors.endDate ? 'input-error' : ''}`}
                {...register('endDate')}
              />
              {errors.endDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.endDate.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Số lượng tham gia tối đa</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.maxParticipants ? 'input-error' : ''}`}
                {...register('maxParticipants', { valueAsNumber: true })}
              />
              {errors.maxParticipants && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.maxParticipants.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phí tham gia</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.entryFee ? 'input-error' : ''}`}
                {...register('entryFee', { valueAsNumber: true })}
              />
              {errors.entryFee && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.entryFee.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={handleClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang cập nhật...
                </>
              ) : (
                'Cập nhật'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
