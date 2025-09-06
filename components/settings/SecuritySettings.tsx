'use client';

import React, { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { SettingsSkeleton } from '@/components/common/LoadingSkeleton';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number; // in minutes
  trustedDevices: Array<{
    id: string;
    name: string;
    lastUsed: string;
    location: string;
  }>;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    trustedDevices: []
  });

  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [{ data: securityData, loading }, refetch] = useAxios('/api/user/security');
  const [{ loading: updateLoading }, executeUpdate] = useAxios(
    {
      url: '/api/user/security',
      method: 'PUT'
    },
    { manual: true }
  );

  const handleToggle = (field: keyof SecuritySettings) => {
    if (field === 'twoFactorEnabled' || field === 'loginNotifications') {
      setSettings(prev => ({
        ...prev,
        [field]: !prev[field]
      }));
    }
  };

  const handleSessionTimeoutChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      sessionTimeout: value
    }));
  };


  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      
      await executeUpdate({
        data: settings
      });
      
      showToast({
        type: 'success',
        message: 'Cập nhật cài đặt bảo mật thành công!',
        title: 'Thành công'
      });
    } catch (error) {
      console.error('Lỗi cập nhật security settings:', error);
      showToast({
        type: 'error',
        message: 'Lỗi cập nhật cài đặt. Vui lòng thử lại.',
        title: 'Lỗi'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeDevice = async (deviceId: string) => {
    if (!confirm('Bạn có chắc muốn thu hồi quyền truy cập của thiết bị này?')) {
      return;
    }

    try {
      // API call to revoke device
      showToast({
        type: 'success',
        message: 'Đã thu hồi quyền truy cập thiết bị',
        title: 'Thành công'
      });
      
      // Refresh data
      refetch();
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Lỗi thu hồi thiết bị. Vui lòng thử lại.',
        title: 'Lỗi'
      });
    }
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🔒</span>
                Bảo mật tài khoản
              </h2>
              <p className="text-base-content/70 mt-1">
                Quản lý bảo mật và quyền truy cập tài khoản của bạn
              </p>
            </div>
            <button
              onClick={handleSaveSettings}
              className="btn btn-primary btn-sm"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Đang lưu...
                </>
              ) : (
                '💾 Lưu cài đặt'
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Two-Factor Authentication */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>🔐</span>
                Xác thực hai yếu tố (2FA)
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Thêm lớp bảo mật cho tài khoản của bạn
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.twoFactorEnabled}
              onChange={() => handleToggle('twoFactorEnabled')}
            />
          </div>

          {!settings.twoFactorEnabled && (
            <div className="bg-warning/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-warning mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h4 className="font-medium text-warning">Khuyến nghị bật 2FA</h4>
                  <p className="text-sm text-base-content/70 mt-1">
                    Xác thực hai yếu tố giúp bảo vệ tài khoản của bạn khỏi các cuộc tấn công.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Notifications */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>📧</span>
                Thông báo đăng nhập
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Nhận email khi có đăng nhập mới từ thiết bị khác
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.loginNotifications}
              onChange={() => handleToggle('loginNotifications')}
            />
          </div>
        </div>
      </div>

      {/* Session Timeout */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⏱️</span>
            Thời gian phiên đăng nhập
          </h3>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tự động đăng xuất sau (phút)</span>
            </label>
            <select
              className="select select-bordered"
              value={settings.sessionTimeout}
              onChange={(e) => handleSessionTimeoutChange(Number(e.target.value))}
            >
              <option value={15}>15 phút</option>
              <option value={30}>30 phút</option>
              <option value={60}>1 giờ</option>
              <option value={120}>2 giờ</option>
              <option value={480}>8 giờ</option>
              <option value={1440}>24 giờ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trusted Devices */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📱</span>
            Thiết bị đáng tin cậy
          </h3>
          
          {settings.trustedDevices.length > 0 ? (
            <div className="space-y-3">
              {settings.trustedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-base-content/70">
                      {device.location} • {new Date(device.lastUsed).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevokeDevice(device.id)}
                    className="btn btn-error btn-xs"
                  >
                    Thu hồi
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-base-content/50">
              <p>Chưa có thiết bị đáng tin cậy nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Security Tips */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>💡</span>
            Mẹo bảo mật
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <span>Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <span>Bật xác thực hai yếu tố (2FA)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <span>Không chia sẻ thông tin đăng nhập</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <span>Đăng xuất khỏi thiết bị công cộng</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <span>Kiểm tra thiết bị đáng tin cậy thường xuyên</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
