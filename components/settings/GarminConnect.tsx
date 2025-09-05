'use client';

import { useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

interface GarminConnectProps {
  onConnected?: () => void;
}

export default function GarminConnect({ onConnected }: GarminConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  
  const [{ data: garminStatus }, refetchStatus] = useAxios('/api/integrations/garmin/status');
  const [{ loading: authorizeLoading }, executeAuthorize] = useAxios(
    {
      url: '/api/integrations/garmin/authorize',
      method: 'GET'
    },
    { manual: true }
  );
  const [{ loading: disconnectLoading }, executeDisconnect] = useAxios(
    {
      url: '/api/integrations/garmin/disconnect',
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Lấy OAuth URL từ backend bằng useAxios
      const { data } = await executeAuthorize();

      if (data?.authUrl) {
        // Redirect đến Garmin OAuth
        window.location.href = data.authUrl;
      } else {
        throw new Error('Không thể lấy OAuth URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi kết nối Garmin');
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Bạn có chắc muốn ngắt kết nối với Garmin?')) {
      return;
    }

    try {
      const { data } = await executeDisconnect();
      showToast({
        type: 'success',
        message: data?.message || 'Đã ngắt kết nối thành công',
        title: 'Thành công'
      });
      
      // Refresh trạng thái kết nối
      await refetchStatus();
    } catch (error) {
      console.error('Lỗi ngắt kết nối:', error);
      showToast({
        type: 'error',
        message: 'Lỗi ngắt kết nối. Vui lòng thử lại.',
        title: 'Lỗi'
      });
    }
  };

  if (garminStatus?.connected) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">⌚ Garmin</h3>
                <p className="text-sm text-base-content/70">Đã kết nối</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-success">Đã kết nối</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="btn btn-error btn-sm flex-1"
              onClick={handleDisconnect}
            >
              🔌 Ngắt kết nối
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">⌚ Garmin</h3>
              <p className="text-sm text-base-content/70">Chưa kết nối</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-ghost">Chưa kết nối</span>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            className={`btn btn-primary btn-sm flex-1 ${authorizeLoading ? 'loading' : ''}`}
            onClick={handleConnect}
            disabled={authorizeLoading}
          >
            {authorizeLoading ? 'Đang kết nối...' : '🔗 Kết nối với Garmin'}
          </button>
        </div>
      </div>
    </div>
  );
}
