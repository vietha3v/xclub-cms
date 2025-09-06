'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';
import { SettingsSkeleton } from '@/components/common/LoadingSkeleton';

interface NotificationSettings {
  emailNotifications: {
    enabled: boolean;
    activities: boolean;
    achievements: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
    marketing: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    activities: boolean;
    achievements: boolean;
    reminders: boolean;
  };
  frequency: {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      enabled: true,
      activities: true,
      achievements: true,
      weeklyReport: true,
      monthlyReport: false,
      marketing: false
    },
    pushNotifications: {
      enabled: true,
      activities: true,
      achievements: true,
      reminders: false
    },
    frequency: {
      daily: true,
      weekly: true,
      monthly: false
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00'
    }
  });

  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [{ data: notificationData, loading }, refetch] = useAxios('/api/user/notifications');
  const [{ loading: updateLoading }, executeUpdate] = useAxios(
    {
      url: '/api/user/notifications',
      method: 'PUT'
    },
    { manual: true }
  );

  useEffect(() => {
    if (notificationData) {
      setSettings(notificationData);
    }
  }, [notificationData]);

  const handleToggle = (path: string) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = !current[keys[keys.length - 1]];
      return newSettings;
    });
  };

  const handleTimeChange = (path: string, value: string) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      await executeUpdate({
        data: settings
      });
      
      showToast({
        type: 'success',
        message: 'Cập nhật cài đặt thông báo thành công!',
        title: 'Thành công'
      });
    } catch (error) {
      console.error('Lỗi cập nhật notification settings:', error);
      showToast({
        type: 'error',
        message: 'Lỗi cập nhật cài đặt. Vui lòng thử lại.',
        title: 'Lỗi'
      });
    } finally {
      setSaving(false);
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
                <span className="text-3xl">🔔</span>
                Cài đặt thông báo
              </h2>
              <p className="text-base-content/70 mt-1">
                Quản lý cách bạn nhận thông báo từ ứng dụng
              </p>
            </div>
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
                '💾 Lưu cài đặt'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>📧</span>
              Thông báo Email
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.emailNotifications.enabled}
              onChange={() => handleToggle('emailNotifications.enabled')}
            />
          </div>
          
          {settings.emailNotifications.enabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Hoạt động mới</span>
                    <p className="text-sm text-base-content/70">Thông báo khi có hoạt động mới</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.emailNotifications.activities}
                    onChange={() => handleToggle('emailNotifications.activities')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Thành tích</span>
                    <p className="text-sm text-base-content/70">Thông báo khi đạt thành tích mới</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.emailNotifications.achievements}
                    onChange={() => handleToggle('emailNotifications.achievements')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Báo cáo tuần</span>
                    <p className="text-sm text-base-content/70">Tóm tắt hoạt động hàng tuần</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.emailNotifications.weeklyReport}
                    onChange={() => handleToggle('emailNotifications.weeklyReport')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Báo cáo tháng</span>
                    <p className="text-sm text-base-content/70">Tóm tắt hoạt động hàng tháng</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.emailNotifications.monthlyReport}
                    onChange={() => handleToggle('emailNotifications.monthlyReport')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Tin tức & Ưu đãi</span>
                    <p className="text-sm text-base-content/70">Thông tin về sản phẩm và ưu đãi</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.emailNotifications.marketing}
                    onChange={() => handleToggle('emailNotifications.marketing')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>📱</span>
              Thông báo Push
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.pushNotifications.enabled}
              onChange={() => handleToggle('pushNotifications.enabled')}
            />
          </div>
          
          {settings.pushNotifications.enabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Hoạt động mới</span>
                    <p className="text-sm text-base-content/70">Thông báo ngay khi có hoạt động</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.pushNotifications.activities}
                    onChange={() => handleToggle('pushNotifications.activities')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Thành tích</span>
                    <p className="text-sm text-base-content/70">Thông báo khi đạt thành tích</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.pushNotifications.achievements}
                    onChange={() => handleToggle('pushNotifications.achievements')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Nhắc nhở</span>
                    <p className="text-sm text-base-content/70">Nhắc nhở tập luyện</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={settings.pushNotifications.reminders}
                    onChange={() => handleToggle('pushNotifications.reminders')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequency Settings */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⏰</span>
            Tần suất thông báo
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Hàng ngày</span>
                <p className="text-sm text-base-content/70">Nhận thông báo mỗi ngày</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={settings.frequency.daily}
                onChange={() => handleToggle('frequency.daily')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Hàng tuần</span>
                <p className="text-sm text-base-content/70">Nhận thông báo mỗi tuần</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={settings.frequency.weekly}
                onChange={() => handleToggle('frequency.weekly')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Hàng tháng</span>
                <p className="text-sm text-base-content/70">Nhận thông báo mỗi tháng</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={settings.frequency.monthly}
                onChange={() => handleToggle('frequency.monthly')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>🌙</span>
              Giờ yên tĩnh
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.quietHours.enabled}
              onChange={() => handleToggle('quietHours.enabled')}
            />
          </div>
          
          {settings.quietHours.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bắt đầu</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={settings.quietHours.startTime}
                  onChange={(e) => handleTimeChange('quietHours.startTime', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kết thúc</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={settings.quietHours.endTime}
                  onChange={(e) => handleTimeChange('quietHours.endTime', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification History */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📋</span>
            Lịch sử thông báo
          </h3>
          
          <div className="text-center py-8 text-base-content/50">
            <p>Chức năng lịch sử thông báo đang được phát triển</p>
          </div>
        </div>
      </div>
    </div>
  );
}
