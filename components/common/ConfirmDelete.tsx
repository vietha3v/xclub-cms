'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  itemName?: string;
  itemType?: string;
}

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận xóa',
  message,
  confirmText = 'Xóa',
  cancelText = 'Hủy',
  isLoading = false,
  itemName,
  itemType = 'mục này'
}: ConfirmDeleteProps) {
  if (!isOpen) return null;

  const defaultMessage = itemName 
    ? `Bạn có chắc chắn muốn xóa "${itemName}" không? Hành động này không thể hoàn tác!`
    : `Bạn có chắc chắn muốn xóa ${itemType} không? Hành động này không thể hoàn tác!`;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-error flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4">
          <p className="text-base-content/80 mb-4">
            {message || defaultMessage}
          </p>
          
          {/* Warning box */}
          <div className="alert alert-warning">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">
              Hành động này sẽ xóa vĩnh viễn và không thể khôi phục.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn btn-outline"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-error"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Đang xóa...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
