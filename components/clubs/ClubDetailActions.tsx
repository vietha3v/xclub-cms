'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Club } from '@/types/club';
import useAxios from '@/hooks/useAxios';
import { Share2, Flag } from 'lucide-react';

interface ClubDetailActionsProps {
  club: Club;
  onJoin: () => void;
  onLeave: () => void;
  isAdmin?: boolean;
}

export default function ClubDetailActions({ club, onJoin, onLeave, isAdmin = false }: ClubDetailActionsProps) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const isMember = club.userRole && club.userRole.length > 0;

  const [{ loading: isDeleting }, deleteClub] = useAxios(
    {
      url: `/api/clubs/${club.id}`,
      method: 'DELETE',
    },
    { manual: true }
  );

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await onJoin();
    } catch (error) {
      console.error('Join error:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    setIsLeaving(true);
    try {
      await onLeave();
    } catch (error) {
      console.error('Leave error:', error);
    } finally {
      setIsLeaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: club.name,
        text: club.description || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log('Report club:', club.id);
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa CLB này? Hành động này không thể hoàn tác.')) {
      return;
    }

    try {
      await deleteClub();
      // Redirect to clubs list
      router.push('/clubs');
    } catch (error) {
      console.error('Delete club error:', error);
      alert('Có lỗi xảy ra khi xóa CLB');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {!isMember ? (
          <button
            className={`btn btn-primary ${isJoining ? 'loading' : ''}`}
            onClick={handleJoin}
            disabled={isJoining || club.status !== 'active' || !club.allowNewMembers}
          >
            {isJoining ? 'Đang tham gia...' : 'Tham gia CLB'}
          </button>
        ) : (
          <button
            className={`btn btn-outline btn-error ${isLeaving ? 'loading' : ''}`}
            onClick={handleLeave}
            disabled={isLeaving}
          >
            {isLeaving ? 'Đang rời...' : 'Rời CLB'}
          </button>
        )}

        <button
          className="btn btn-outline btn-sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-1" />
          Chia sẻ
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={handleReport}
        >
          <Flag className="w-4 h-4 mr-1" />
          Báo cáo
        </button>

        {isAdmin && (
          <button
            className={`btn btn-error btn-outline ${isDeleting ? 'loading' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              'Đang xóa...'
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa CLB
              </>
            )}
          </button>
        )}
      </div>

      {/* Club Status Info */}
      <div className="flex items-center gap-4 text-sm text-base-content/70">
        {club.status !== 'active' && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>CLB đang {club.status === 'pending' ? 'chờ duyệt' : 'không hoạt động'}</span>
          </div>
        )}
        
        {!club.allowNewMembers && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Không nhận thành viên mới</span>
          </div>
        )}
      </div>
    </div>
  );
}
