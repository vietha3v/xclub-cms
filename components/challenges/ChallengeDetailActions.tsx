'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { Challenge } from '@/types/challenge';
import { Plus, Minus, Share2, ArrowLeft } from 'lucide-react';

interface ChallengeDetailActionsProps {
  challenge: Challenge;
  onUpdate: () => void;
}

export default function ChallengeDetailActions({ challenge, onUpdate }: ChallengeDetailActionsProps) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const [{ loading: joinLoading }, joinChallenge] = useAxios(
    {
      url: `/api/challenges/${challenge.id}/join`,
      method: 'POST',
    },
    { manual: true }
  );

  const [{ loading: leaveLoading }, leaveChallenge] = useAxios(
    {
      url: `/api/challenges/${challenge.id}/leave`,
      method: 'POST',
    },
    { manual: true }
  );

  const handleJoin = async () => {
    if (!confirm('Bạn có chắc chắn muốn tham gia thử thách này?')) {
      return;
    }

    setIsJoining(true);
    try {
      await joinChallenge();
      onUpdate();
      alert('Tham gia thử thách thành công!');
    } catch (error) {
      console.error('Join challenge error:', error);
      alert('Có lỗi xảy ra khi tham gia thử thách');
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm('Bạn có chắc chắn muốn rời khỏi thử thách này?')) {
      return;
    }

    setIsLeaving(true);
    try {
      await leaveChallenge();
      onUpdate();
      alert('Rời khỏi thử thách thành công!');
    } catch (error) {
      console.error('Leave challenge error:', error);
      alert('Có lỗi xảy ra khi rời khỏi thử thách');
    } finally {
      setIsLeaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: challenge.title,
        text: challenge.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link thử thách!');
    }
  };

  const canJoin = challenge.status === 'active' || challenge.status === 'published';
  const canLeave = challenge.status === 'active' || challenge.status === 'published';

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
                  Tham gia thử thách
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
                  Rời khỏi thử thách
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

        {/* Challenge Status Info */}
        <div className="divider"></div>
        <div className="text-center">
          <div className="text-sm text-base-content/70 mb-2">Trạng thái thử thách</div>
          <div className={`badge ${
            challenge.status === 'active' ? 'badge-success' :
            challenge.status === 'published' ? 'badge-primary' : 'badge-neutral'
          } badge-lg`}>
            {challenge.status === 'active' ? 'Đang diễn ra' :
             challenge.status === 'published' ? 'Đã công bố' :
             challenge.status === 'completed' ? 'Đã hoàn thành' : 'Nháp'}
          </div>
        </div>

        {/* Progress Info */}
        <div className="divider"></div>
        <div className="text-center">
          <div className="text-sm text-base-content/70 mb-2">Tiến độ</div>
          <div className="text-2xl font-bold text-primary">
            {challenge.currentParticipants} người tham gia
          </div>
          {challenge.maxParticipants && (
            <div className="text-sm text-base-content/50">
              Tối đa {challenge.maxParticipants} người
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
