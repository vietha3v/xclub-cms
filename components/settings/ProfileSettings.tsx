'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { ProfileSkeleton } from '@/components/common/LoadingSkeleton';

interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const { showToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    location: '',
    website: ''
  });

  const [{ data: userData, loading: fetchLoading }, refetch] = useAxios('/api/user/profile');
  const [{ loading: updateLoading }, executeUpdate] = useAxios(
    {
      url: '/api/user/profile',
      method: 'PUT'
    },
    { manual: true }
  );

  useEffect(() => {
    if (userData) {
      setProfile(userData);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
        bio: userData.bio || '',
        location: userData.location || '',
        website: userData.website || ''
      });
      setLoading(false);
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const { data } = await executeUpdate({
        data: formData
      });

      setProfile(data);
      setEditing(false);
      
      showToast({
        type: 'success',
        message: 'Cập nhật thông tin thành công!',
        title: 'Thành công'
      });
    } catch (error) {
      console.error('Lỗi cập nhật profile:', error);
      showToast({
        type: 'error',
        message: 'Lỗi cập nhật thông tin. Vui lòng thử lại.',
        title: 'Lỗi'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || ''
      });
    }
    setEditing(false);
  };

  if (loading || fetchLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">👤</span>
                Thông tin cá nhân
              </h2>
              <p className="text-base-content/70 mt-1">
                Quản lý thông tin cá nhân và hồ sơ của bạn
              </p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary btn-sm"
              >
                ✏️ Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {profile?.firstName && profile?.lastName 
                      ? `${profile.firstName} ${profile.lastName}`
                      : profile?.email
                    }
                  </h3>
                  <p className="text-base-content/70">{profile?.email}</p>
                  {editing && (
                    <button className="btn btn-outline btn-xs mt-2">
                      📷 Thay đổi ảnh
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Thông tin cơ bản</h4>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Họ</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                  placeholder="Nhập họ của bạn"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tên</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="input input-bordered input-disabled"
                  placeholder="Email"
                />
                <label className="label">
                  <span className="label-text-alt">Email không thể thay đổi</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Số điện thoại</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Thông tin bổ sung</h4>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ngày sinh</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Giới tính</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="select select-bordered"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Địa chỉ</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Website</span>
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="input input-bordered"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="md:col-span-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Giới thiệu bản thân</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="textarea textarea-bordered h-24"
                  placeholder="Viết một vài dòng về bản thân..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {editing && (
            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={handleCancel}
                className="btn btn-outline btn-sm"
                disabled={saving}
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary btn-sm"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Đang lưu...
                  </>
                ) : (
                  '💾 Lưu thay đổi'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">Thông tin tài khoản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-base-content/70">Ngày tạo tài khoản:</span>
              <span className="ml-2">
                {profile?.createdAt 
                  ? new Date(profile.createdAt).toLocaleDateString('vi-VN')
                  : 'N/A'
                }
              </span>
            </div>
            <div>
              <span className="text-base-content/70">Cập nhật lần cuối:</span>
              <span className="ml-2">
                {profile?.updatedAt 
                  ? new Date(profile.updatedAt).toLocaleDateString('vi-VN')
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
