'use client';

import { useState } from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Club } from '@/types/club';
import EditClubModal from './EditClubModal';
import useAxios from '@/hooks/useAxios';

interface ClubAdminActionsProps {
  club: Club;
  isAdmin: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function ClubAdminActions({ club, isAdmin, onUpdate, onDelete }: ClubAdminActionsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [{ loading: axiosLoading, error: axiosError }, deleteClub] = useAxios(
    {
      url: `/api/clubs/${club.id}`,
      method: 'DELETE',
    },
    { manual: true }
  );

  if (!isAdmin) {
    return null;
  }

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteClub();

      onDelete?.();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  const handleEditSuccess = () => {
    onUpdate?.();
    setShowEditModal(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="btn btn-outline btn-sm"
          disabled={axiosLoading}
        >
          <Edit className="w-4 h-4" />
          Chỉnh sửa
        </button>
        
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn btn-error btn-sm"
          disabled={axiosLoading}
        >
          <Trash2 className="w-4 h-4" />
          Xóa CLB
        </button>
      </div>

      {/* Edit Modal */}
      <EditClubModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        club={club}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-error" />
              <h3 className="text-lg font-bold">Xác nhận xóa CLB</h3>
            </div>
            
            <p className="mb-6">
              Bạn có chắc chắn muốn xóa CLB <strong>"{club.name}"</strong> không?
              <br />
              <span className="text-error text-sm">
                Hành động này không thể hoàn tác!
              </span>
            </p>

            {axiosError && (
              <div className="alert alert-error mb-4">
                <span>Lỗi: {axiosError.message || 'Có lỗi xảy ra'}</span>
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost btn-sm"
                disabled={axiosLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm"
                disabled={axiosLoading}
              >
                {axiosLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Xóa CLB
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
