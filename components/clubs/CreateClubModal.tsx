'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Club } from '@/types/club';
import useAxios from '@/hooks/useAxios';

interface CreateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (club: Club) => void;
}

// Validation schema
const createClubSchema = z.object({
  name: z.string().min(1, 'Tên CLB là bắt buộc'),
  shortName: z.string().optional(),
  description: z.string().optional(),
  type: z.string().min(1, 'Loại CLB là bắt buộc'),
  logoUrl: z.string().url().optional().or(z.literal('')),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  youtube: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  foundedAt: z.string().optional(),
  maxMembers: z.number().min(1).optional(),
  monthlyFee: z.string().optional(),
  yearlyFee: z.string().optional(),
  rules: z.string().optional(),
  schedule: z.string().optional(),
  theme: z.string().optional(),
  notifications: z.boolean().optional(),
  autoApprove: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  allowNewMembers: z.boolean().optional(),
  requireApproval: z.boolean().optional(),
});

type CreateClubFormData = z.infer<typeof createClubSchema>;

export default function CreateClubModal({ isOpen, onClose, onSuccess }: CreateClubModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateClubFormData>({
    resolver: zodResolver(createClubSchema),
    defaultValues: {
      type: 'running',
      country: 'Việt Nam',
      maxMembers: 100,
      theme: 'light',
      notifications: true,
      autoApprove: false,
      isPublic: true,
      allowNewMembers: true,
      requireApproval: false,
    },
  });

  const [{ loading, error }, createClub] = useAxios<Club>(
    {
      url: '/api/clubs',
      method: 'POST',
    },
    { manual: true }
  );

  const onSubmit = async (data: CreateClubFormData) => {
    try {
      // Convert form data to BE format
      const submitData = {
        // Basic Info
        name: data.name,
        shortName: data.shortName,
        description: data.description,
        type: data.type,
        
        // Media
        logoUrl: data.logoUrl,
        coverImageUrl: data.coverImageUrl,
        
        // Location
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        latitude: data.latitude ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        
        // Contact
        email: data.email,
        phone: data.phone,
        website: data.website,
        
        // Convert social media to JSON
        socialMedia: {
          facebook: data.facebook || undefined,
          instagram: data.instagram || undefined,
          youtube: data.youtube || undefined,
          tiktok: data.tiktok || undefined,
        },
        
        // Convert contact info to JSON
        contactInfo: {
          person: data.contactPerson || undefined,
          phone: data.contactPhone || undefined,
          email: data.contactEmail || undefined,
        },
        
        // Club Details
        foundedAt: data.foundedAt || undefined,
        maxMembers: data.maxMembers,
        monthlyFee: data.monthlyFee ? parseFloat(data.monthlyFee) : undefined,
        yearlyFee: data.yearlyFee ? parseFloat(data.yearlyFee) : undefined,
        rules: data.rules,
        schedule: data.schedule,
        
        // Convert settings to JSON
        settings: {
          theme: data.theme,
          notifications: data.notifications,
          autoApprove: data.autoApprove,
        },
        
        // Settings
        isPublic: data.isPublic,
        allowNewMembers: data.allowNewMembers,
        requireApproval: data.requireApproval,
      };

      const { data: newClub } = await createClub({ data: submitData });
      onSuccess(newClub);
      reset();
    } catch (error) {
      console.error('Create club error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 border-b border-base-300 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-base-content">Tạo Câu Lạc Bộ Mới</h2>
              <p className="text-base-content/70 mt-1">Điền thông tin để tạo CLB mới</p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Basic Information */}
          <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg border border-primary/20">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-focus text-primary-content rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">Thông tin cơ bản</h3>
                  <p className="text-base-content/70">Tên, mô tả và loại CLB</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Tên CLB *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="input input-bordered"
                      placeholder="VD: Câu lạc bộ chạy bộ Hà Nội"
                    />
                    {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Tên viết tắt
                    </label>
                    <input
                      type="text"
                      {...register('shortName')}
                      className="input input-bordered"
                      placeholder="VD: CLB HB HN"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      {...register('logoUrl')}
                      className="input input-bordered"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Ảnh bìa URL
                    </label>
                    <input
                      type="url"
                      {...register('coverImageUrl')}
                      className="input input-bordered"
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-base-content">
                    Mô tả CLB
                  </label>
                  <textarea
                    {...register('description')}
                    className="textarea textarea-bordered"
                    placeholder="Mô tả chi tiết về câu lạc bộ, mục tiêu và hoạt động..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Loại CLB *
                    </label>
                    <select
                      {...register('type')}
                      className="select select-bordered"
                    >
                      <option value="">Chọn loại CLB</option>
                      <option value="running">🏃 Chạy bộ</option>
                      <option value="multisport">🏃‍♂️ Đa môn thể thao</option>
                      <option value="fitness">💪 Fitness</option>
                      <option value="social">👥 Giao lưu</option>
                      <option value="cycling">🚴 Đạp xe</option>
                      <option value="swimming">🏊 Bơi lội</option>
                      <option value="hiking">🥾 Leo núi</option>
                      <option value="other">🎯 Khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Số thành viên tối đa
                    </label>
                    <input
                      type="number"
                      {...register('maxMembers', { valueAsNumber: true })}
                      className="input input-bordered"
                      min="1"
                      max="10000"
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Ngày thành lập
                    </label>
                    <input
                      type="date"
                      {...register('foundedAt')}
                      className="input input-bordered"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Location */}
          <div className="card bg-gradient-to-br from-secondary/5 to-accent/5 shadow-lg border border-secondary/20">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">Địa điểm</h3>
                  <p className="text-base-content/70">Thông tin địa chỉ và vị trí</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-base-content">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    className="input input-bordered"
                    placeholder="VD: 123 Đường ABC, Quận XYZ"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      className="input input-bordered"
                      placeholder="VD: Hà Nội"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      {...register('state')}
                      className="input input-bordered"
                      placeholder="VD: Hà Nội"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      className="input input-bordered"
                      placeholder="VD: Việt Nam"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Mã bưu điện
                    </label>
                    <input
                      type="text"
                      {...register('postalCode')}
                      className="input input-bordered"
                      placeholder="VD: 100000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Vĩ độ
                    </label>
                    <input
                      type="text"
                      {...register('latitude')}
                      className="input input-bordered"
                      placeholder="VD: 21.0285"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-base-content">
                    Kinh độ
                  </label>
                  <input
                    type="text"
                    {...register('longitude')}
                    className="input input-bordered"
                    placeholder="VD: 105.8542"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Contact & Social */}
          <div className="card bg-gradient-to-br from-accent/5 to-info/5 shadow-lg border border-accent/20">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent-focus text-accent-content rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">Liên hệ & Mạng xã hội</h3>
                  <p className="text-base-content/70">Thông tin liên hệ và kênh truyền thông</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="input input-bordered"
                      placeholder="contact@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="input input-bordered"
                      placeholder="0123456789"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Website
                    </label>
                    <input
                      type="url"
                      {...register('website')}
                      className="input input-bordered"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="divider">Mạng xã hội</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Facebook
                    </label>
                    <input
                      type="url"
                      {...register('facebook')}
                      className="input input-bordered"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Instagram
                    </label>
                    <input
                      type="text"
                      {...register('instagram')}
                      className="input input-bordered"
                      placeholder="@yourpage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      YouTube
                    </label>
                    <input
                      type="url"
                      {...register('youtube')}
                      className="input input-bordered"
                      placeholder="https://youtube.com/channel/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      TikTok
                    </label>
                    <input
                      type="text"
                      {...register('tiktok')}
                      className="input input-bordered"
                      placeholder="@yourpage"
                    />
                  </div>
                </div>

                <div className="divider">Người liên hệ</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Tên người liên hệ
                    </label>
                    <input
                      type="text"
                      {...register('contactPerson')}
                      className="input input-bordered"
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      SĐT người liên hệ
                    </label>
                    <input
                      type="tel"
                      {...register('contactPhone')}
                      className="input input-bordered"
                      placeholder="0123456789"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Email người liên hệ
                    </label>
                    <input
                      type="email"
                      {...register('contactEmail')}
                      className="input input-bordered"
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Club Details */}
          <div className="card bg-gradient-to-br from-info/5 to-success/5 shadow-lg border border-info/20">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-info to-info-focus text-info-content rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">Chi tiết CLB</h3>
                  <p className="text-base-content/70">Phí, quy định và lịch hoạt động</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Phí hàng tháng (VNĐ)
                    </label>
                    <input
                      type="number"
                      {...register('monthlyFee')}
                      className="input input-bordered"
                      placeholder="50000"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Phí hàng năm (VNĐ)
                    </label>
                    <input
                      type="number"
                      {...register('yearlyFee')}
                      className="input input-bordered"
                      placeholder="500000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-base-content">
                    Quy định CLB
                  </label>
                  <textarea
                    {...register('rules')}
                    className="textarea textarea-bordered"
                    placeholder="Các quy định, nội quy của CLB..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-base-content">
                    Lịch hoạt động
                  </label>
                  <textarea
                    {...register('schedule')}
                    className="textarea textarea-bordered"
                    placeholder="Lịch tập luyện, hoạt động thường xuyên..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Settings */}
          <div className="card bg-gradient-to-br from-success/5 to-warning/5 shadow-lg border border-success/20">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-success to-success-focus text-success-content rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">Cài đặt</h3>
                  <p className="text-base-content/70">Cấu hình quyền và hiển thị</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Giao diện
                    </label>
                    <select
                      {...register('theme')}
                      className="select select-bordered"
                    >
                      <option value="light">🌞 Sáng</option>
                      <option value="dark">🌙 Tối</option>
                      <option value="auto">🔄 Tự động</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Thông báo
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('notifications')}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Bật thông báo</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Tự động duyệt
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('autoApprove')}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Tự động duyệt thành viên</span>
                    </div>
                  </div>
                </div>

                <div className="divider">Quyền truy cập</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      CLB công khai
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('isPublic')}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Hiển thị công khai</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Nhận thành viên mới
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('allowNewMembers')}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Cho phép tham gia</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-base-content">
                      Yêu cầu duyệt
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register('requireApproval')}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Cần duyệt tham gia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 p-6 bg-base-200 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading || isSubmitting}
            >
              {loading ? 'Đang tạo...' : 'Tạo CLB'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}