'use client';

import React, { useState } from 'react';
import { Challenge, ChallengeCategory } from '@/types/challenge';
import { X, CheckCircle, Clock, AlertCircle, UserPlus, Loader2 } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

interface ChallengeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  onSuccess?: () => void;
}

interface RegistrationResult {
  success: boolean;
  requiresApproval?: boolean;
  message: string;
  participantId?: string;
}

export default function ChallengeRegistrationModal({
  isOpen,
  onClose,
  challenge,
  onSuccess
}: ChallengeRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);
  const { showToast } = useToast();

  const [, refetch] = useAxios<RegistrationResult>(
    challenge ? `/api/challenges/${challenge.id}/join` : '',
    { manual: true }
  );

  const handleRegister = async () => {
    if (!challenge) return;

    setIsSubmitting(true);
    setRegistrationResult(null);

    try {
      const response = await refetch({
        method: 'POST'
      });

      if (response.data) {
        setRegistrationResult(response.data);
        
        if (response.data.success) {
          showToast({
            type: response.data.requiresApproval ? 'info' : 'success',
            message: response.data.message
          });
          onSuccess?.();
        } else {
          showToast({
            type: 'error',
            message: response.data.message || 'Đăng ký thất bại'
          });
        }
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      setRegistrationResult({
        success: false,
        message: (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Có lỗi xảy ra khi đăng ký'
      });
      showToast({
        type: 'error',
        message: 'Có lỗi xảy ra khi đăng ký thử thách'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRegistrationResult(null);
    onClose();
  };

  if (!isOpen || !challenge) return null;

  // Bỏ hết validation để test API
  const canRegister = true;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Đăng ký thử thách
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Challenge Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">
              {challenge.category === ChallengeCategory.TEAM ? '👥' : '🏃'}
            </div>
            <div>
              <h4 className="font-semibold text-base">{challenge.name}</h4>
              <p className="text-sm text-base-content/60">
                {challenge.category === ChallengeCategory.TEAM ? 'Thử thách tập thể' : 'Thử thách cá nhân'}
              </p>
            </div>
          </div>
          
          <div className="text-sm text-base-content/70">
            <p><strong>Mô tả:</strong> {challenge.description}</p>
            {challenge.rules && (
              <p className="mt-2"><strong>Quy tắc:</strong> {challenge.rules}</p>
            )}
          </div>
        </div>

        {/* Registration Result */}
        {registrationResult && (
          <div className="mb-6">
            {registrationResult.success ? (
              <div className={`alert ${registrationResult.requiresApproval ? 'alert-info' : 'alert-success'}`}>
                {registrationResult.requiresApproval ? (
                  <>
                    <Clock className="w-5 h-5" />
                    <div>
                      <h4 className="font-semibold">Đăng ký thành công!</h4>
                      <p className="text-sm">
                        {registrationResult.message}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <h4 className="font-semibold">Chúc mừng!</h4>
                      <p className="text-sm">
                        {registrationResult.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="alert alert-error">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <h4 className="font-semibold">Đăng ký thất bại</h4>
                  <p className="text-sm">
                    {registrationResult.message || 'Có lỗi xảy ra khi đăng ký thử thách'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isSubmitting && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-primary">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Đang xử lý đăng ký...</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="modal-action">
          {!registrationResult ? (
            <>
              <button
                className="btn btn-ghost"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                className="btn btn-primary"
                onClick={handleRegister}
                disabled={!canRegister || isSubmitting}
              >
                <UserPlus className="w-4 h-4" />
                Xác nhận đăng ký
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleClose}
            >
              Đóng
            </button>
          )}
        </div>

        {/* Bỏ warning để test API */}
      </div>
    </div>
  );
}
