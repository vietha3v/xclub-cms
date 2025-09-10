'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { RefreshCw, Info, AlertCircle } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { SyncButton } from '../SyncButton';
import StravaConnect from './StravaConnect';
import GarminConnect from './GarminConnect';
import { useToast } from '@/components/Toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🔗</span>
                Tích hợp thiết bị
              </h2>
              <p className="text-base-content/70 mt-1">
                Kết nối với các nền tảng thể thao để đồng bộ hoạt động tự động
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
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Làm mới
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strava Integration */}
        <StravaConnect />

        {/* Garmin Integration */}
        <GarminConnect />
      </div>

      {/* Sync Actions */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">🔄</span>
            Đồng bộ thủ công
          </h3>
          <p className="text-base-content/70 mb-4">
            Đồng bộ dữ liệu từ các nền tảng đã kết nối
          </p>
          <div className="flex flex-wrap gap-4">
            <SyncButton platform="strava" daysBack={7} />
            <SyncButton platform="garmin" daysBack={7} />
            <SyncButton daysBack={7} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-info mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-info mb-3 text-lg">Thông tin về tích hợp</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span>🔒</span>
                    Bảo mật dữ liệu
                  </h5>
                  <ul className="text-base-content/70 space-y-1 text-sm">
                    <li>• Chỉ đọc dữ liệu hoạt động</li>
                    <li>• Không lưu trữ mật khẩu</li>
                    <li>• Sử dụng OAuth 2.0</li>
                    <li>• Có thể ngắt kết nối bất kỳ lúc nào</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span>⚡</span>
                    Đồng bộ tự động
                  </h5>
                  <ul className="text-base-content/70 space-y-1 text-sm">
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
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle className="w-6 h-6" />
          <span>Lỗi tải danh sách tích hợp: {error.message}</span>
        </div>
      )}
    </div>
  );
}
