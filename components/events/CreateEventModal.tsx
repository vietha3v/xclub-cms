'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, MapPin, Users, Clock, FileText, DollarSign, Mail, Phone, X, Plus } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { EventType, EventVisibility, CreateEventDto } from '@/types/event';
import Modal from '@/components/common/Modal';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (event: any) => void;
  clubId?: string;
}

// Validation schema - phù hợp với BE
const createEventSchema = z.object({
  name: z.string()
    .min(1, 'Tên sự kiện là bắt buộc')
    .min(2, 'Tên sự kiện phải có ít nhất 2 ký tự')
    .max(255, 'Tên sự kiện không được vượt quá 255 ký tự'),
  
  description: z.string()
    .min(1, 'Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  
  type: z.nativeEnum(EventType).default(EventType.TRAINING),
  visibility: z.nativeEnum(EventVisibility).default(EventVisibility.PUBLIC),
  
  startDate: z.string().min(1, 'Thời gian bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Thời gian kết thúc là bắt buộc'),
  
  registrationStartDate: z.string().min(1, 'Ngày bắt đầu đăng ký là bắt buộc'),
  registrationEndDate: z.string().min(1, 'Ngày kết thúc đăng ký là bắt buộc'),
  
  location: z.string().min(1, 'Địa điểm là bắt buộc'),
  address: z.string().optional(),
  
  maxParticipants: z.number()
    .min(1, 'Số lượng người tham gia tối đa phải lớn hơn 0')
    .default(50),
  
  registrationFee: z.number().min(0).default(0),
  
  format: z.enum(['online', 'offline', 'hybrid']).default('offline'),
  
  contactEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
}).refine((data) => {
  // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
  const startDateTime = new Date(data.startDate);
  const endDateTime = new Date(data.endDate);
  return endDateTime > startDateTime;
}, {
  message: 'Thời gian kết thúc phải sau thời gian bắt đầu',
  path: ['endDate'],
}).refine((data) => {
  // Kiểm tra hạn đăng ký phải trước khi sự kiện kết thúc
  const registrationEndDate = new Date(data.registrationEndDate);
  const endDate = new Date(data.endDate);
  return registrationEndDate < endDate;
}, {
  message: 'Hạn đăng ký phải trước khi sự kiện kết thúc',
  path: ['registrationEndDate'],
});

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEventModal({ isOpen, onClose, onSuccess, clubId }: CreateEventModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      type: EventType.TRAINING,
      visibility: EventVisibility.PUBLIC,
      maxParticipants: 50,
      registrationFee: 0,
      format: 'offline',
    }
  });

  const [{ data, loading: axiosLoading, error }, execute] = useAxios<CreateEventDto>(
    '/api/events',
    { manual: true }
  );

  const onSubmit = async (formData: CreateEventFormData) => {
    try {
      const eventData: CreateEventDto = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        type: formData.type,
        visibility: formData.visibility,
        clubId: clubId,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        registrationStartDate: new Date(formData.registrationStartDate).toISOString(),
        registrationEndDate: new Date(formData.registrationEndDate).toISOString(),
        location: formData.location.trim(),
        address: formData.address?.trim() || '',
        maxParticipants: formData.maxParticipants,
        registrationFee: formData.registrationFee,
        format: formData.format,
        contactInfo: {
          email: formData.contactEmail || '',
          phone: formData.contactPhone || ''
        }
      };

      const response = await execute({
        method: 'POST',
        data: eventData
      });

      if (response.data) {
        onSuccess?.(response.data);
        reset();
        onClose();
      }
    } catch (err) {
      console.error('Create event error:', err);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const footer = (
    <div className="flex justify-end items-center gap-3 p-6 bg-base-200">
      <button
        type="button"
        onClick={handleClose}
        className="btn btn-ghost btn-sm"
      >
        <X className="w-4 h-4 mr-1" />
        Hủy
      </button>
      
      <button
        type="submit"
        form="create-event-form"
        className={`btn btn-primary btn-sm ${axiosLoading ? 'loading' : ''}`}
        disabled={axiosLoading || isSubmitting}
      >
        {axiosLoading ? (
          'Đang tạo...'
        ) : (
          <>
            <Plus className="w-4 h-4 mr-1" />
            Tạo sự kiện
          </>
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tạo Sự Kiện Mới"
      size="4xl"
      footer={footer}
    >
      <div className="p-6">
        <form id="create-event-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <span>📝</span>
                  <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Tên sự kiện - Bắt buộc */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Tên sự kiện <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên sự kiện"
                      className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                      {...register('name')}
                    />
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.name.message}</span>
                      </label>
                    )}
                  </div>

                  {/* Mô tả */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Mô tả <span className="text-error">*</span>
                      </span>
                    </label>
                    <textarea
                      placeholder="Mô tả chi tiết về sự kiện..."
                      className={`textarea textarea-bordered w-full h-24 resize-none ${errors.description ? 'textarea-error' : ''}`}
                      {...register('description')}
                    />
                    {errors.description && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.description.message}</span>
                      </label>
                    )}
                  </div>

                  {/* Loại sự kiện, Quyền riêng tư và Hình thức tổ chức */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Loại sự kiện</span>
                      </label>
                      <select className="select select-bordered w-full" {...register('type')}>
                        <option value={EventType.TRAINING}>Tập luyện</option>
                        <option value={EventType.COMPETITION}>Thi đấu</option>
                        <option value={EventType.SOCIAL}>Giao lưu</option>
                        <option value={EventType.CHARITY}>Từ thiện</option>
                        <option value={EventType.WORKSHOP}>Workshop</option>
                        <option value={EventType.MEETUP}>Gặp mặt</option>
                        <option value={EventType.KNOWLEDGE_SHARING}>Chia sẻ kiến thức</option>
                        <option value={EventType.BIRTHDAY}>Sinh nhật thành viên</option>
                        <option value={EventType.CELEBRATION}>Lễ kỷ niệm</option>
                        <option value={EventType.TEAM_BUILDING}>Team building</option>
                        <option value={EventType.HEALTH_CHECK}>Kiểm tra sức khỏe</option>
                        <option value={EventType.NUTRITION_TALK}>Chia sẻ dinh dưỡng</option>
                        <option value={EventType.EQUIPMENT_REVIEW}>Đánh giá trang thiết bị</option>
                        <option value={EventType.ROUTE_EXPLORATION}>Khám phá tuyến đường</option>
                        <option value={EventType.OTHER}>Khác</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Quyền riêng tư</span>
                      </label>
                      <select className="select select-bordered w-full" {...register('visibility')}>
                        <option value={EventVisibility.PUBLIC}>Công khai</option>
                        <option value={EventVisibility.CLUB_ONLY}>Chỉ thành viên CLB</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Hình thức tổ chức</span>
                      </label>
                      <select className="select select-bordered w-full" {...register('format')}>
                        <option value="offline">Trực tiếp</option>
                        <option value="online">Trực tuyến</option>
                        <option value="hybrid">Kết hợp</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thời gian sự kiện */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Thời gian sự kiện</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Thời gian bắt đầu và kết thúc */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Thời gian bắt đầu <span className="text-error">*</span>
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
                          Thời gian kết thúc <span className="text-error">*</span>
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

                  {/* Thời gian đăng ký */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Ngày bắt đầu đăng ký <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="date"
                        className={`input input-bordered w-full ${errors.registrationStartDate ? 'input-error' : ''}`}
                        {...register('registrationStartDate')}
                      />
                      {errors.registrationStartDate && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.registrationStartDate.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Ngày kết thúc đăng ký <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="date"
                        className={`input input-bordered w-full ${errors.registrationEndDate ? 'input-error' : ''}`}
                        {...register('registrationEndDate')}
                      />
                      {errors.registrationEndDate && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.registrationEndDate.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Địa điểm */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Địa điểm</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Địa điểm <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa điểm tổ chức..."
                      className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                      {...register('location')}
                    />
                    {errors.location && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.location.message}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Địa chỉ chi tiết</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ chi tiết..."
                      className="input input-bordered w-full"
                      {...register('address')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin tham gia */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Thông tin tham gia</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Số lượng người tham gia tối đa <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="50"
                        className={`input input-bordered w-full ${errors.maxParticipants ? 'input-error' : ''}`}
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
                        <span className="label-text font-medium">Phí đăng ký (VND)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="input input-bordered w-full"
                        {...register('registrationFee', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email liên hệ</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                          type="email"
                          placeholder="contact@example.com"
                          className={`input input-bordered w-full pl-10 ${errors.contactEmail ? 'input-error' : ''}`}
                          {...register('contactEmail')}
                        />
                      </div>
                      {errors.contactEmail && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.contactEmail.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Số điện thoại liên hệ</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                          type="tel"
                          placeholder="0123456789"
                          className="input input-bordered w-full pl-10"
                          {...register('contactPhone')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error">
              <span>Có lỗi xảy ra khi tạo sự kiện. Vui lòng thử lại.</span>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
