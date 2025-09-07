'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Event } from '@/types/event';
import { Plus, Minus, Share2, ArrowLeft } from 'lucide-react';

interface EventDetailActionsProps {
  event: Event;
  onUpdate: () => void;
}

export default function EventDetailActions({ event, onUpdate }: EventDetailActionsProps) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const [{ loading: joinLoading }, joinEvent] = useAxios(
    {
      url: `/api/events/${event.id}/join`,
      method: 'POST',
    },
    { manual: true }
  );

  const [{ loading: leaveLoading }, leaveEvent] = useAxios(
    {
      url: `/api/events/${event.id}/leave`,
      method: 'DELETE',
    },
    { manual: true }
  );

  const handleJoin = async () => {
    if (!confirm('Bạn có chắc chắn muốn tham gia sự kiện này?')) {
      return;
    }

    setIsJoining(true);
    try {
      await joinEvent();
      onUpdate();
      alert('Tham gia sự kiện thành công!');
    } catch (error) {
      console.error('Join event error:', error);
      alert('Có lỗi xảy ra khi tham gia sự kiện');
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm('Bạn có chắc chắn muốn rời khỏi sự kiện này?')) {
      return;
    }

    setIsLeaving(true);
    try {
      await leaveEvent();
      onUpdate();
      alert('Rời khỏi sự kiện thành công!');
    } catch (error) {
      console.error('Leave event error:', error);
      alert('Có lỗi xảy ra khi rời khỏi sự kiện');
    } finally {
      setIsLeaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link sự kiện!');
    }
  };

  const canJoin = event.status === 'registration_open' || event.status === 'published';
  const canLeave = event.status === 'registration_open' || event.status === 'published';

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">🎯 Hành động</h2>

        <div className="space-y-3">
          {canJoin && (
            <button
              onClick={handleJoin}
              disabled={isJoining || joinLoading}
              className="btn btn-primary btn-sm btn-block"
            >
              {isJoining || joinLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang tham gia...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-1" />
                  Tham gia sự kiện
                </>
              )}
            </button>
          )}

          {canLeave && (
            <button
              onClick={handleLeave}
              disabled={isLeaving || leaveLoading}
              className="btn btn-outline btn-sm btn-block"
            >
              {isLeaving || leaveLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang rời khỏi...
                </>
              ) : (
                <>
                  <Minus className="w-5 h-5 mr-1" />
                  Rời khỏi sự kiện
                </>
              )}
            </button>
          )}

          <button onClick={handleShare} className="btn btn-secondary btn-sm btn-block">
            <Share2 className="w-5 h-5 mr-1" />
            Chia sẻ
          </button>

          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm btn-block"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Quay lại
          </button>
        </div>

        {/* Event Status Info */}
        <div className="divider"></div>
        <div className="text-center">
          <div className="text-sm text-base-content/70 mb-2">Trạng thái sự kiện</div>
          <div className={`badge ${
            event.status === 'published' || event.status === 'registration_open' ? 'badge-primary' :
            event.status === 'active' ? 'badge-success' : 'badge-neutral'
          } badge-lg`}>
            {event.status === 'published' ? 'Đã công bố' :
             event.status === 'registration_open' ? 'Mở đăng ký' :
             event.status === 'active' ? 'Đang diễn ra' : 
             event.status === 'completed' ? 'Đã kết thúc' : 'Nháp'}
          </div>
        </div>
      </div>
    </div>
  );
}
