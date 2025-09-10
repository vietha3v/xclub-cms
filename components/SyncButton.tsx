import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import dlv from 'dlv';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

interface SyncButtonProps {
  platform?: 'strava' | 'garmin';
  daysBack?: number;
  className?: string;
  children?: React.ReactNode;
}

interface SyncResponse {
  success: boolean;
  newActivities: number;
  syncTime: string;
  message: string;
  error?: string;
  duration?: number;
}

export const SyncButton: React.FC<SyncButtonProps> = ({
  platform,
  daysBack = 7,
  className = '',
  children = 'Đồng bộ ngay'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [{ }, executeSync] = useAxios<SyncResponse>(
    {
      url: platform ? `/api/integrations/sync/${platform}` : '/api/integrations/sync',
      method: 'POST',
      data: { daysBack }
    },
    { manual: true }
  );

  const handleSync = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const { data } = await executeSync();
      
      if (data.success) {
        if (data.newActivities > 0) {
          showToast({
            type: 'success',
            message: `${data.message} (${data.duration}ms)`,
            title: 'Đồng bộ thành công'
          });
        } else {
          showToast({
            type: 'info',
            message: data.message,
            title: 'Đồng bộ hoàn tất'
          });
        }
      } else {
        showToast({
          type: 'error',
          message: data.error || 'Đồng bộ thất bại',
          title: 'Lỗi đồng bộ'
        });
      }
    } catch (error: unknown) {
      console.error('Lỗi đồng bộ:', error);
      showToast({
        type: 'error',
        message: dlv(error as object, 'response.data.message') || dlv(error as object, 'message') || 'Đã xảy ra lỗi không xác định',
        title: 'Lỗi đồng bộ'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={isLoading}
      className={`btn ${className}`}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Đang đồng bộ...
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4 mr-2" />
          {children}
        </>
      )}
    </button>
  );
};

// Component riêng cho từng nền tảng
export const StravaSyncButton: React.FC<Omit<SyncButtonProps, 'platform'>> = (props) => (
  <SyncButton platform="strava" {...props} />
);

export const GarminSyncButton: React.FC<Omit<SyncButtonProps, 'platform'>> = (props) => (
  <SyncButton platform="garmin" {...props} />
);

// Component hiển thị trạng thái đồng bộ
export const SyncStatus: React.FC<{ lastSyncTime?: string; syncStatus?: string }> = ({ 
  lastSyncTime, 
  syncStatus 
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'error': return 'text-error';
      case 'syncing': return 'text-warning';
      default: return 'text-base-content/70';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'active': return 'Đồng bộ thành công';
      case 'error': return 'Đồng bộ lỗi';
      case 'syncing': return 'Đang đồng bộ';
      default: return 'Chưa đồng bộ';
    }
  };

  return (
    <div className="text-sm">
      <div className={`font-medium ${getStatusColor(syncStatus)}`}>
        {getStatusText(syncStatus)}
      </div>
      {lastSyncTime && (
        <div className="text-base-content/70">
          Lần cuối: {new Date(lastSyncTime).toLocaleString('vi-VN')}
        </div>
      )}
    </div>
  );
};
