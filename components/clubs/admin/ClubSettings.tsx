'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Club } from '@/types/club';
import { Settings, Trash2, Save, RotateCcw } from 'lucide-react';
import ConfirmDelete from '@/components/common/ConfirmDelete';

interface ClubSettingsProps {
  clubId: string;
}

export default function ClubSettings({ clubId }: ClubSettingsProps) {
  const [club, setClub] = useState<Club | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'public' as 'public' | 'private',
    status: 'active' as 'active' | 'inactive'
  });

  const [{ data: clubData, loading: clubLoading, error: clubError }, refetchClub] = useAxios<Club>(
    `/api/clubs/${clubId}`,
    { manual: true }
  );

  const [{ loading: updateLoading }, executeUpdate] = useAxios(
    {
      url: `/api/clubs/${clubId}`,
      method: 'PUT'
    },
    { manual: true }
  );

  const [{ loading: deleteLoading }, executeDelete] = useAxios(
    {
      url: `/api/clubs/${clubId}`,
      method: 'DELETE'
    },
    { manual: true }
  );

  useEffect(() => {
    if (clubId) {
      refetchClub();
    }
  }, [clubId, refetchClub]);

  useEffect(() => {
    if (clubData) {
      setClub(clubData);
      setFormData({
        name: clubData.name || '',
        description: clubData.description || '',
        type: clubData.type || 'public',
        status: clubData.status || 'active'
      });
    }
  }, [clubData]);

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

      setClub(data);
      setEditing(false);
      
      // Show success message (you can add toast notification here)
      console.log('Club updated successfully');
    } catch (error) {
      console.error('Error updating club:', error);
      // Show error message (you can add toast notification here)
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (club) {
      setFormData({
        name: club.name || '',
        description: club.description || '',
        type: club.type || 'public',
        status: club.status || 'active'
      });
    }
    setEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      
      await executeDelete();
      
      // Redirect to clubs list after successful deletion
      window.location.href = '/clubs';
    } catch (error) {
      console.error('Error deleting club:', error);
      // Show error message (you can add toast notification here)
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (clubLoading) {
    return (
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-sm animate-pulse">
          <div className="card-body">
            <div className="h-8 bg-base-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-base-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm animate-pulse">
          <div className="card-body">
            <div className="h-6 bg-base-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-base-200 rounded w-full"></div>
              <div className="h-4 bg-base-200 rounded w-3/4"></div>
              <div className="h-4 bg-base-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Lỗi tải dữ liệu</h2>
          <p className="text-base-content/70 mb-6">
            Không thể tải thông tin CLB. Vui lòng thử lại.
          </p>
          <button onClick={() => refetchClub()} className="btn btn-primary">
            <RotateCcw className="w-4 h-4 mr-2" />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Cài đặt CLB
              </h2>
              <p className="text-base-content/70 mt-1">
                Quản lý thông tin và cài đặt của CLB
              </p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary btn-sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Club Settings Form */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tên CLB</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="input input-bordered"
                    placeholder="Nhập tên CLB"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Loại CLB</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="select select-bordered"
                  >
                    <option value="public">Công khai</option>
                    <option value="private">Riêng tư</option>
                  </select>
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Mô tả</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="textarea textarea-bordered h-24"
                  placeholder="Nhập mô tả về CLB..."
                />
              </div>
            </div>

            {/* Status Settings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Trạng thái</h3>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Trạng thái hoạt động</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="select select-bordered"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex gap-2 justify-end">
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
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Club Info */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">Thông tin CLB</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-base-content/70">ID CLB:</span>
              <span className="ml-2 font-mono text-xs">{club.id}</span>
            </div>
            <div>
              <span className="text-base-content/70">Ngày tạo:</span>
              <span className="ml-2">
                {club.createdAt ? new Date(club.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-base-content/70">Cập nhật lần cuối:</span>
              <span className="ml-2">
                {club.updatedAt ? new Date(club.updatedAt).toLocaleDateString('vi-VN') : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-base-content/70">Số thành viên:</span>
              <span className="ml-2 font-semibold">{club.memberCount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-100 shadow-sm border border-error/20">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-error mb-4">Vùng nguy hiểm</h3>
          <p className="text-base-content/70 mb-4">
            Các hành động này không thể hoàn tác. Hãy cẩn thận khi thực hiện.
          </p>
          <button
            onClick={handleDeleteClick}
            className="btn btn-error btn-sm"
            disabled={deleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa CLB
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Xóa Câu lạc bộ"
        message={`Bạn có chắc chắn muốn xóa CLB "${club?.name}" không? Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu liên quan bao gồm thành viên, sự kiện và thử thách.`}
        confirmText="Xóa CLB"
        cancelText="Hủy"
        isLoading={deleting}
        itemName={club?.name}
        itemType="CLB"
      />
    </div>
  );
}
