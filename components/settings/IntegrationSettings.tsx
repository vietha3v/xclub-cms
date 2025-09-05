'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { SyncButton } from '../SyncButton';
import StravaConnect from './StravaConnect';
import GarminConnect from './GarminConnect';
import { useToast } from '@/components/Toast';

// SyncStatus Component
const SyncStatus: React.FC<{ lastSyncTime?: string; syncStatus?: string }> = ({ lastSyncTime, syncStatus }) => {
  if (!lastSyncTime) {
    return <span className="badge badge-ghost">Chưa đồng bộ</span>;
  }
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'error': return 'badge-error';
      case 'syncing': return 'badge-warning';
      default: return 'badge-info';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`badge ${getStatusColor(syncStatus)}`}>
        {syncStatus === 'active' ? 'Hoạt động' : 
         syncStatus === 'error' ? 'Lỗi' :
         syncStatus === 'syncing' ? 'Đang đồng bộ' : 'Không xác định'}
      </span>
      <span className="text-xs text-base-content/60">
        {lastSyncTime ? new Date(lastSyncTime).toLocaleString('vi-VN') : 'Chưa đồng bộ'}
      </span>
    </div>
  );
};

interface IntegrationResponse {
  integrations: any[];
  total: number;
}

export default function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  // Không cần gọi API lấy danh sách integrations nữa
  const [data, setData] = useState<IntegrationResponse | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setLoading(true);
    try {
      // Không cần lấy danh sách integrations từ backend
      setIntegrations([]);
    } catch (error) {
      console.error('Lỗi tải danh sách tích hợp:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadIntegrations();
      showToast({
        type: 'success',
        message: 'Đã làm mới danh sách tích hợp',
        title: 'Thành công'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Lỗi làm mới danh sách tích hợp',
        title: 'Lỗi'
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">🔗 Tích hợp thiết bị</h2>
            <p className="text-base-content/70">
              Kết nối với Strava, Garmin để đồng bộ hoạt động tự động
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn btn-outline btn-sm"
          >
            {refreshing ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Đang tải...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Làm mới
              </>
            )}
          </button>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strava Integration */}
          <StravaConnect />

          {/* Garmin Integration */}
          <GarminConnect />
        </div>

        {/* Sync Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">🔄 Đồng bộ thủ công</h3>
          <div className="flex flex-wrap gap-4">
            <SyncButton platform="strava" daysBack={7} />
            <SyncButton platform="garmin" daysBack={7} />
            <SyncButton daysBack={7} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-info/10 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-info mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-info mb-2">Thông tin về tích hợp</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-1">🔒 Bảo mật dữ liệu</h5>
                  <ul className="text-base-content/70 space-y-1">
                    <li>• Chỉ đọc dữ liệu hoạt động</li>
                    <li>• Không lưu trữ mật khẩu</li>
                    <li>• Sử dụng OAuth 2.0</li>
                    <li>• Có thể ngắt kết nối bất kỳ lúc nào</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-1">⚡ Đồng bộ tự động</h5>
                  <ul className="text-base-content/70 space-y-1">
                    <li>• Đồng bộ mỗi 15 phút</li>
                    <li>• Đồng bộ thủ công bất kỳ lúc nào</li>
                    <li>• Hỗ trợ lịch sử 30 ngày</li>
                    <li>• Thông báo hoạt động mới</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-error mt-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Lỗi tải danh sách tích hợp: {error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
