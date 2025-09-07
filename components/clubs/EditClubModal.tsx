'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, MapPin, Mail, Phone, Globe, Users } from 'lucide-react';
import Modal from '@/components/common/Modal';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import { API_ENDPOINTS } from '@/lib/api';

// Schema validation - giống CreateClubModal
const editClubSchema = z.object({
  name: z.string().min(1, 'Tên CLB là bắt buộc').max(100, 'Tên CLB không được quá 100 ký tự'),
  shortName: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['running', 'multisport', 'fitness', 'social', 'competitive', 'charity']).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
  maxMembers: z.number().min(1).optional(),
  isPublic: z.boolean().optional(),
  allowNewMembers: z.boolean().optional(),
  requireApproval: z.boolean().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  foundedAt: z.string().optional(),
  monthlyFee: z.number().min(0).optional(),
  yearlyFee: z.number().min(0).optional(),
  rules: z.string().optional(),
  schedule: z.string().optional(),
});

type EditClubFormData = z.infer<typeof editClubSchema>;

interface EditClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: Club;
  onSuccess?: () => void;
}

export default function EditClubModal({ isOpen, onClose, club, onSuccess }: EditClubModalProps) {
  const [{ data, loading: axiosLoading, error: axiosError }, execute] = useAxios<Club>(
    `/api/clubs/${club.id}`,
    { manual: true }
  );

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditClubFormData>({
    resolver: zodResolver(editClubSchema),
    defaultValues: {
      name: club.name || '',
      shortName: club.shortName || '',
      description: club.description || '',
      type: (club.type as 'running' | 'multisport' | 'fitness' | 'social' | 'competitive' | 'charity') || 'running',
      city: club.city || '',
      state: club.state || '',
      country: club.country || '',
      email: club.email || '',
      phone: club.phone || '',
      website: club.website || '',
      address: club.address || '',
      logoUrl: club.logoUrl || '',
      coverImageUrl: club.coverImageUrl || '',
      maxMembers: club.maxMembers || 100,
      isPublic: club.isPublic ?? true,
      allowNewMembers: club.allowNewMembers ?? true,
      requireApproval: club.requireApproval ?? false,
      postalCode: club.postalCode || '',
      latitude: club.latitude ? parseFloat(club.latitude) : undefined,
      longitude: club.longitude ? parseFloat(club.longitude) : undefined,
      foundedAt: club.foundedAt || '',
      monthlyFee: club.monthlyFee ? parseFloat(club.monthlyFee) : 0,
      yearlyFee: club.yearlyFee ? parseFloat(club.yearlyFee) : 0,
      rules: club.rules || '',
      schedule: club.schedule || '',
    },
  });

  const onSubmit = async (data: EditClubFormData) => {
    try {
      await execute({
        url: `${API_ENDPOINTS.CLUBS.BASE}/${club.id}`,
        method: 'PUT',
        data,
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating club:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const footer = (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={handleClose}
        className="btn btn-ghost btn-sm"
        disabled={!!axiosLoading}
      >
        <X className="w-4 h-4" />
        Hủy
      </button>
      <button
        type="submit"
        form="edit-club-form"
        className="btn btn-primary btn-sm"
        disabled={!!axiosLoading}
      >
        {axiosLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <Save className="w-4 h-4" />
        )}
        Cập nhật CLB
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Chỉnh sửa Câu Lạc Bộ"
      size="4xl"
      footer={footer}
    >
      <div className="p-6">
        <form id="edit-club-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {/* Tên CLB - Bắt buộc */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Tên CLB <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên CLB"
                      className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                      {...register('name')}
                    />
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.name.message}</span>
                      </label>
                    )}
                  </div>

                  {/* Tên viết tắt */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Tên viết tắt</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: CLB Chạy Bộ"
                      className="input input-bordered w-full"
                      {...register('shortName')}
                    />
                  </div>

                  {/* Mô tả */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Mô tả</span>
                    </label>
                    <textarea
                      placeholder="Mô tả về CLB của bạn..."
                      className="textarea textarea-bordered w-full h-24 resize-none"
                      {...register('description')}
                    />
                  </div>

                  {/* Loại CLB */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Loại CLB</span>
                    </label>
                    <select className="select select-bordered w-full" {...register('type')}>
                      <option value="running">Chạy bộ</option>
                      <option value="multisport">Đa môn thể thao</option>
                      <option value="fitness">Thể hình</option>
                      <option value="social">Giao lưu</option>
                      <option value="competitive">Thi đấu</option>
                      <option value="charity">Từ thiện</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Địa chỉ</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Thành phố</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                          type="text"
                          placeholder="Hà Nội"
                          className="input input-bordered w-full pl-10"
                          {...register('city')}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Tỉnh/Thành phố</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Hà Nội"
                        className="input input-bordered w-full"
                        {...register('state')}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Quốc gia</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Việt Nam"
                        className="input input-bordered w-full"
                        {...register('country')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Địa chỉ chi tiết</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Số nhà, tên đường, phường/xã..."
                        className="input input-bordered w-full"
                        {...register('address')}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Mã bưu điện</span>
                      </label>
                      <input
                        type="text"
                        placeholder="100000"
                        className="input input-bordered w-full"
                        {...register('postalCode')}
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
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                          type="email"
                          placeholder="club@example.com"
                          className="input input-bordered w-full pl-10"
                          {...register('email')}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Số điện thoại</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                        <input
                          type="tel"
                          placeholder="0123456789"
                          className="input input-bordered w-full pl-10"
                          {...register('phone')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Website</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                      <input
                        type="url"
                        placeholder="https://example.com"
                        className="input input-bordered w-full pl-10"
                        {...register('website')}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Số thành viên tối đa</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                      <input
                        type="number"
                        placeholder="100"
                        min="1"
                        className="input input-bordered w-full pl-10"
                        {...register('maxMembers', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phí thành viên & Quy tắc */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                  <span>💰</span>
                  <h3 className="text-lg font-semibold">Phí thành viên & Quy tắc</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Phí hàng tháng (VND)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="50000"
                        min="0"
                        className="input input-bordered w-full"
                        {...register('monthlyFee', { valueAsNumber: true })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Phí hàng năm (VND)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="500000"
                        min="0"
                        className="input input-bordered w-full"
                        {...register('yearlyFee', { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Quy tắc CLB</span>
                    </label>
                    <textarea
                      placeholder="Tuân thủ luật giao thông, hỗ trợ lẫn nhau..."
                      className="textarea textarea-bordered w-full h-20 resize-none"
                      {...register('rules')}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Lịch hoạt động</span>
                    </label>
                    <textarea
                      placeholder="Thứ 3, 5, 7: 6h sáng tại công viên..."
                      className="textarea textarea-bordered w-full h-20 resize-none"
                      {...register('schedule')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cài đặt */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>⚙️</span>
                    Cài đặt CLB
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">CLB công khai</span>
                      <p className="text-sm text-base-content/70">Mọi người có thể tìm thấy và tham gia CLB</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      {...register('isPublic')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Cho phép thành viên mới</span>
                      <p className="text-sm text-base-content/70">Thành viên mới có thể tham gia CLB</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      {...register('allowNewMembers')}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Error Display */}
          {axiosError && (
            <div className="alert alert-error">
              <span>Lỗi khi cập nhật CLB: {axiosError.message || 'Có lỗi xảy ra'}</span>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
