'use client';

import useAxios from '@/hooks/useAxios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CreateRaceDto, RaceType, RaceStatus } from '@/types/race';
import { useToast } from '@/components/Toast';

// Race constants
const RACE_TYPES: Record<RaceType, string> = {
  [RaceType.ROAD_RACE]: 'Chạy đường bộ',
  [RaceType.TRAIL_RACE]: 'Chạy trail',
  [RaceType.ULTRA_MARATHON]: 'Ultra marathon',
  [RaceType.RELAY_RACE]: 'Chạy tiếp sức',
  [RaceType.VIRTUAL_RACE]: 'Chạy ảo',
  [RaceType.CHARITY_RACE]: 'Chạy từ thiện'
};

const RACE_STATUSES: Record<RaceStatus, string> = {
  [RaceStatus.DRAFT]: 'Bản nháp',
  [RaceStatus.PUBLISHED]: 'Đã xuất bản',
  [RaceStatus.REGISTRATION_OPEN]: 'Mở đăng ký',
  [RaceStatus.REGISTRATION_CLOSED]: 'Đóng đăng ký',
  [RaceStatus.ONGOING]: 'Đang diễn ra',
  [RaceStatus.COMPLETED]: 'Hoàn thành',
  [RaceStatus.CANCELLED]: 'Đã hủy'
};

const createRaceSchema = z.object({
  name: z.string().min(1, 'Tên giải chạy là bắt buộc'),
  description: z.string().min(1, 'Mô tả là bắt buộc'),
  type: z.nativeEnum(RaceType),
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  registrationStartDate: z.string().min(1, 'Ngày mở đăng ký là bắt buộc'),
  registrationEndDate: z.string().min(1, 'Ngày đóng đăng ký là bắt buộc'),
  locationName: z.string().min(1, 'Tên địa điểm là bắt buộc'),
  locationAddress: z.string().min(1, 'Địa chỉ là bắt buộc'),
  locationCity: z.string().min(1, 'Thành phố là bắt buộc'),
  locationDistrict: z.string().min(1, 'Quận/huyện là bắt buộc'),
  regularFee: z.number().min(0, 'Phí tham gia không được âm'),
  currency: z.enum(['VND', 'USD']),
  totalCapacity: z.number().min(1, 'Tổng số lượng tham gia phải lớn hơn 0'),
  contactEmail: z.string().email('Email không hợp lệ'),
  contactPhone: z.string().min(1, 'Số điện thoại là bắt buộc')
});

interface RaceCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RaceCreateModal({ isOpen, onClose, onSuccess }: RaceCreateModalProps) {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(createRaceSchema),
    defaultValues: {
      type: RaceType.ROAD_RACE,
      regularFee: 0,
      currency: 'VND',
      totalCapacity: 100
    }
  });

  const [{ loading }, executeCreate] = useAxios({
    url: '/api/races',
    method: 'POST'
  }, { manual: true });

  const onSubmit = async (data: any) => {
    try {
      // Transform form data to match CreateRaceDto structure
      const raceData: CreateRaceDto = {
        name: data.name,
        description: data.description,
        type: data.type,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        registrationStartDate: new Date(data.registrationStartDate),
        registrationEndDate: new Date(data.registrationEndDate),
        location: {
          name: data.locationName,
          address: data.locationAddress,
          city: data.locationCity,
          district: data.locationDistrict
        },
        distances: [{
          name: 'Chính',
          distance: 10,
          unit: 'km',
          ageGroups: []
        }],
        fees: {
          earlyBirdFee: data.regularFee * 0.8,
          regularFee: data.regularFee,
          lateFee: data.regularFee * 1.2,
          currency: data.currency
        },
        capacity: {
          total: data.totalCapacity
        },
        requirements: {},
        prizes: {
          totalPrize: 0,
          categories: []
        },
        sponsors: [],
        organizers: [],
        rules: [],
        contact: {
          email: data.contactEmail,
          phone: data.contactPhone
        },
        media: {
          images: [],
          videos: [],
          documents: []
        }
      };

      await executeCreate({ data: raceData });
      showToast({
        type: 'success',
        message: 'Tạo giải chạy thành công!',
        title: 'Thành công'
      });
      reset();
      onSuccess();
    } catch (error: any) {
      console.error('Error creating race:', error);
      showToast({
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi tạo giải chạy',
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
        <h3 className="font-bold text-lg mb-4">Tạo giải chạy mới</h3>
        
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
                <span className="label-text">Loại giải chạy</span>
              </label>
              <select className="select select-bordered" {...register('type')}>
                {Object.entries(RACE_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
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
                <span className="label-text">Tên địa điểm</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.locationName ? 'input-error' : ''}`}
                {...register('locationName')}
              />
              {errors.locationName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.locationName.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Thành phố</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.locationCity ? 'input-error' : ''}`}
                {...register('locationCity')}
              />
              {errors.locationCity && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.locationCity.message}</span>
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
                className={`input input-bordered ${errors.totalCapacity ? 'input-error' : ''}`}
                {...register('totalCapacity', { valueAsNumber: true })}
              />
              {errors.totalCapacity && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.totalCapacity.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phí tham gia</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.regularFee ? 'input-error' : ''}`}
                {...register('regularFee', { valueAsNumber: true })}
              />
              {errors.regularFee && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.regularFee.message}</span>
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
                  Đang tạo...
                </>
              ) : (
                'Tạo giải chạy'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
