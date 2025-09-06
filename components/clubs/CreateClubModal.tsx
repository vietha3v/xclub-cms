'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Club } from '@/types/club';
import useAxios from '@/hooks/useAxios';
import { validationUtils, validationMessages } from '@/utils/validation';
import { FormField } from '@/components/common/ValidationError';

interface CreateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (club: Club) => void;
}

// Validation schema with comprehensive validation
const createClubSchema = z.object({
  // Required fields
  name: z.string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.tooShort(2))
    .max(100, validationMessages.tooLong(100))
    .transform(val => validationUtils.cleanString(val)),
  
  type: z.string()
    .min(1, validationMessages.required),
  
  // Optional text fields with length validation
  shortName: z.string()
    .max(50, validationMessages.tooLong(50))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  description: z.string()
    .max(500, validationMessages.tooLong(500))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  address: z.string()
    .max(200, validationMessages.tooLong(200))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  city: z.string()
    .max(100, validationMessages.tooLong(100))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  state: z.string()
    .max(100, validationMessages.tooLong(100))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  country: z.string()
    .max(100, validationMessages.tooLong(100))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  // URL fields with validation
  logoUrl: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanUrl(val) : '')
    .refine(val => !val || validationUtils.isValidUrl(val), {
      message: validationMessages.invalidUrl
    }),
  
  coverImageUrl: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanUrl(val) : '')
    .refine(val => !val || validationUtils.isValidUrl(val), {
      message: validationMessages.invalidUrl
    }),
  
  website: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanUrl(val) : '')
    .refine(val => !val || validationUtils.isValidUrl(val), {
      message: validationMessages.invalidUrl
    }),
  
  facebook: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanUrl(val) : '')
    .refine(val => !val || validationUtils.isValidUrl(val), {
      message: validationMessages.invalidUrl
    }),
  
  youtube: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanUrl(val) : '')
    .refine(val => !val || validationUtils.isValidUrl(val), {
      message: validationMessages.invalidUrl
    }),
  
  // Email fields with validation
  email: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidEmail(val), {
      message: validationMessages.invalidEmail
    }),
  
  contactEmail: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidEmail(val), {
      message: validationMessages.invalidEmail
    }),
  
  // Phone fields with validation
  phone: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidPhone(val), {
      message: validationMessages.invalidPhone
    }),
  
  contactPhone: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidPhone(val), {
      message: validationMessages.invalidPhone
    }),
  
  // Social media handles
  instagram: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanSocialHandle(val) : '')
    .refine(val => !val || validationUtils.isValidSocialHandle(val, 'instagram'), {
      message: validationMessages.invalidSocialHandle('Instagram')
    }),
  
  tiktok: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanSocialHandle(val) : '')
    .refine(val => !val || validationUtils.isValidSocialHandle(val, 'tiktok'), {
      message: validationMessages.invalidSocialHandle('TikTok')
    }),
  
  // Contact person
  contactPerson: z.string()
    .max(100, validationMessages.tooLong(100))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  // Location coordinates
  latitude: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidNumber(val, -90, 90), {
      message: 'Vĩ độ phải từ -90 đến 90'
    }),
  
  longitude: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidNumber(val, -180, 180), {
      message: 'Kinh độ phải từ -180 đến 180'
    }),
  
  // Postal code
  postalCode: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidPostalCode(val), {
      message: validationMessages.invalidPostalCode
    }),
  
  // Date fields
  foundedAt: z.string()
    .optional()
    .refine(val => !val || validationUtils.isValidDate(val), {
      message: validationMessages.invalidDate
    }),
  
  // Number fields
  maxMembers: z.number()
    .min(1, 'Số thành viên tối đa phải lớn hơn 0')
    .max(10000, 'Số thành viên tối đa không được vượt quá 10,000')
    .optional(),
  
  monthlyFee: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidNumber(val, 0, 10000000), {
      message: 'Phí hàng tháng phải từ 0 đến 10,000,000 VND'
    }),
  
  yearlyFee: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : '')
    .refine(val => !val || validationUtils.isValidNumber(val, 0, 100000000), {
      message: 'Phí hàng năm phải từ 0 đến 100,000,000 VND'
    }),
  
  // Text areas
  rules: z.string()
    .max(2000, validationMessages.tooLong(2000))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  schedule: z.string()
    .max(1000, validationMessages.tooLong(1000))
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  // Theme
  theme: z.string()
    .optional()
    .transform(val => val ? validationUtils.cleanString(val) : ''),
  
  // Boolean fields
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
    watch,
    trigger,
  } = useForm<CreateClubFormData>({
    resolver: zodResolver(createClubSchema),
    mode: 'onChange', // Enable real-time validation
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

  // Watch specific fields for real-time validation
  const watchedFields = watch(['name', 'email', 'phone', 'website', 'logoUrl', 'coverImageUrl']);

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
        latitude: data.latitude && !isNaN(parseFloat(data.latitude)) ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude && !isNaN(parseFloat(data.longitude)) ? parseFloat(data.longitude) : undefined,
        
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
        monthlyFee: data.monthlyFee && !isNaN(parseFloat(data.monthlyFee)) ? parseFloat(data.monthlyFee) : undefined,
        yearlyFee: data.yearlyFee && !isNaN(parseFloat(data.yearlyFee)) ? parseFloat(data.yearlyFee) : undefined,
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
                  <FormField label="Tên CLB" required error={errors.name}>
                    <input
                      type="text"
                      {...register('name')}
                      className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                      placeholder="VD: Câu lạc bộ chạy bộ Hà Nội"
                    />
                  </FormField>

                  <FormField label="Tên viết tắt" error={errors.shortName}>
                    <input
                      type="text"
                      {...register('shortName')}
                      className={`input input-bordered ${errors.shortName ? 'input-error' : ''}`}
                      placeholder="VD: CLB HB HN"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Logo URL" error={errors.logoUrl}>
                    <input
                      type="url"
                      {...register('logoUrl')}
                      className={`input input-bordered ${errors.logoUrl ? 'input-error' : ''}`}
                      placeholder="https://example.com/logo.png"
                    />
                  </FormField>

                  <FormField label="Ảnh bìa URL" error={errors.coverImageUrl}>
                    <input
                      type="url"
                      {...register('coverImageUrl')}
                      className={`input input-bordered ${errors.coverImageUrl ? 'input-error' : ''}`}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </FormField>
                </div>

                <FormField label="Mô tả CLB" error={errors.description}>
                  <textarea
                    {...register('description')}
                    className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
                    placeholder="Mô tả chi tiết về câu lạc bộ, mục tiêu và hoạt động..."
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Loại CLB" required error={errors.type}>
                    <select
                      {...register('type')}
                      className={`select select-bordered ${errors.type ? 'select-error' : ''}`}
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
                  </FormField>

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
                  <FormField label="Email" error={errors.email}>
                    <input
                      type="email"
                      {...register('email')}
                      className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                      placeholder="contact@example.com"
                    />
                  </FormField>

                  <FormField label="Số điện thoại" error={errors.phone}>
                    <input
                      type="tel"
                      {...register('phone')}
                      className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                      placeholder="0123456789"
                    />
                  </FormField>

                  <FormField label="Website" error={errors.website}>
                    <input
                      type="url"
                      {...register('website')}
                      className={`input input-bordered ${errors.website ? 'input-error' : ''}`}
                      placeholder="https://example.com"
                    />
                  </FormField>
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