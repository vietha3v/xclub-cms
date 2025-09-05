'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Race } from '@/types/race';

interface RaceDetailActionsProps {
  race: Race;
  onUpdate: () => void;
}

export default function RaceDetailActions({ race, onUpdate }: RaceDetailActionsProps) {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUnregistering, setIsUnregistering] = useState(false);

  const [{ loading: registerLoading }, registerRace] = useAxios(
    {
      url: `/api/races/${race.id}/register`,
      method: 'POST',
    },
    { manual: true }
  );

  const [{ loading: unregisterLoading }, unregisterRace] = useAxios(
    {
      url: `/api/races/${race.id}/unregister`,
      method: 'DELETE',
    },
    { manual: true }
  );

  const handleRegister = async () => {
    if (!confirm('Bạn có chắc chắn muốn đăng ký tham gia giải chạy này?')) {
      return;
    }

    setIsRegistering(true);
    try {
      await registerRace({
        data: {
          category: 'general', // Default category
          emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
          },
          medicalInfo: {
            allergies: '',
            medications: '',
            conditions: ''
          },
          notes: ''
        }
      });
      onUpdate();
      alert('Đăng ký tham gia giải chạy thành công!');
    } catch (error) {
      console.error('Register race error:', error);
      alert('Có lỗi xảy ra khi đăng ký tham gia giải chạy');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!confirm('Bạn có chắc chắn muốn hủy đăng ký tham gia giải chạy này?')) {
      return;
    }

    setIsUnregistering(true);
    try {
      await unregisterRace();
      onUpdate();
      alert('Hủy đăng ký tham gia giải chạy thành công!');
    } catch (error) {
      console.error('Unregister race error:', error);
      alert('Có lỗi xảy ra khi hủy đăng ký tham gia giải chạy');
    } finally {
      setIsUnregistering(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: race.name,
        text: race.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link giải chạy!');
    }
  };

  const canRegister = race.status === 'registration_open';
  const canUnregister = race.status === 'registration_open' || race.status === 'published';

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">🏁 Hành động</h2>

        <div className="space-y-3">
          {canRegister && (
            <button
              onClick={handleRegister}
              disabled={isRegistering || registerLoading}
              className="btn btn-primary btn-block"
            >
              {isRegistering || registerLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang đăng ký...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Đăng ký tham gia
                </>
              )}
            </button>
          )}

          {canUnregister && (
            <button
              onClick={handleUnregister}
              disabled={isUnregistering || unregisterLoading}
              className="btn btn-outline btn-block"
            >
              {isUnregistering || unregisterLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang hủy đăng ký...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hủy đăng ký
                </>
              )}
            </button>
          )}

          <button onClick={handleShare} className="btn btn-secondary btn-block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Chia sẻ
          </button>

          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-block"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </button>
        </div>

        {/* Race Status Info */}
        <div className="divider"></div>
        <div className="text-center">
          <div className="text-sm text-base-content/70 mb-2">Trạng thái giải chạy</div>
          <div className={`badge ${
            race.status === 'published' || race.status === 'registration_open' ? 'badge-primary' :
            race.status === 'active' ? 'badge-success' : 'badge-neutral'
          } badge-lg`}>
            {race.status === 'published' ? 'Đã công bố' :
             race.status === 'registration_open' ? 'Mở đăng ký' :
             race.status === 'active' ? 'Đang diễn ra' : 
             race.status === 'completed' ? 'Đã hoàn thành' : 'Nháp'}
          </div>
        </div>

        {/* Registration Info */}
        <div className="divider"></div>
        <div className="text-center">
          <div className="text-sm text-base-content/70 mb-2">Phí tham gia</div>
          <div className="text-2xl font-bold text-success">
            {race.registrationFee === 0 ? 'Miễn phí' : `${race.registrationFee?.toLocaleString()}đ`}
          </div>
        </div>
      </div>
    </div>
  );
}
