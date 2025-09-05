'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { useToast } from '@/components/Toast';

interface StravaConnectProps {
  onConnected?: () => void;
}

export default function StravaConnect({ onConnected }: StravaConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  
  const [{ data: stravaStatus }, refetchStatus] = useAxios('/api/integrations/strava/status');
  const [{ loading: authorizeLoading }, executeAuthorize] = useAxios(
    {
      url: '/api/integrations/strava/authorize',
      method: 'GET'
    },
    { manual: true }
  );
  const [{ loading: callbackLoading }, executeCallback] = useAxios(
    {
      url: '/api/integrations/strava/callback',
      method: 'POST'
    },
    { manual: true }
  );
  const [{ loading: disconnectLoading }, executeDisconnect] = useAxios(
    {
      url: '/api/integrations/strava/disconnect',
      method: 'DELETE'
    },
    { manual: true }
  );

  // Xử lý callback từ Strava
  useEffect(() => {
    const handleStravaCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      console.log('StravaConnect: Checking callback params', { code: !!code, state: !!state });

      if (code && state) {
        console.log('StravaConnect: Processing Strava callback');
        try {
          setIsConnecting(true);
          setError(null);

          const { data } = await executeCallback({
            data: { code, state }
          });

          console.log('StravaConnect: Callback successful', data);
          
          showToast({
            type: 'success',
            message: 'Kết nối Strava thành công!',
            title: 'Thành công'
          });

          // Refresh trạng thái kết nối
          await refetchStatus();
          onConnected?.();
          
          // Redirect về trang settings sạch
          router.replace('/settings');
        } catch (err: any) {
          console.error('StravaConnect: Error handling callback:', err);
          
          let errorMessage = 'Lỗi kết nối Strava. Vui lòng thử lại.';
          
          if (err?.response?.status === 400) {
            errorMessage = 'Authorization code không hợp lệ hoặc đã hết hạn. Vui lòng thử kết nối lại.';
          } else if (err?.response?.status === 401) {
            errorMessage = 'Lỗi xác thực. Vui lòng đăng nhập lại.';
          }
          
          showToast({
            type: 'error',
            message: errorMessage,
            title: 'Lỗi kết nối'
          });
          
          // Redirect về trang settings sạch ngay cả khi lỗi
          router.replace('/settings');
        } finally {
          setIsConnecting(false);
        }
      }
    };

    handleStravaCallback();
  }, [searchParams, executeCallback, refetchStatus, onConnected, router, showToast]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Lấy OAuth URL từ backend bằng useAxios
      const { data } = await executeAuthorize();

      if (data?.authUrl) {
        // Redirect đến Strava OAuth
        window.location.href = data.authUrl;
      } else {
        throw new Error('Không thể lấy OAuth URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi kết nối Strava');
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Bạn có chắc muốn ngắt kết nối với Strava?')) {
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

  // Hiển thị loading khi đang xử lý callback hoặc authorize
  if (authorizeLoading || callbackLoading || (isConnecting && searchParams.get('code'))) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.13 14.828h4.169"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">🏃‍♂️ Strava</h3>
                <p className="text-sm text-base-content/70">Đang xử lý...</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="text-sm">Đang kết nối...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stravaStatus?.connected) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.13 14.828h4.169"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">🏃‍♂️ Strava</h3>
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
            <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.13 14.828h4.169"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">🏃‍♂️ Strava</h3>
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
            {authorizeLoading ? 'Đang kết nối...' : '🔗 Kết nối với Strava'}
          </button>
        </div>
      </div>
    </div>
  );
}
