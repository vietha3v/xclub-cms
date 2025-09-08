'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NotificationsDropdown from '../dashboard/NotificationsDropdown';
import UserMenuDropdown from '../dashboard/UserMenuDropdown';

interface UserActionsProps {
  variant?: 'desktop' | 'mobile';
  showMessages?: boolean;
}

export default function UserActions({ 
  variant = 'desktop', 
  showMessages = true 
}: UserActionsProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-sm"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={variant === 'mobile' ? 'space-y-2' : 'flex items-center space-x-4'}>
        <Link 
          href="/login" 
          className={`btn btn-outline btn-sm ${variant === 'mobile' ? 'w-full' : ''}`}
        >
          Đăng nhập
        </Link>
        <Link 
          href="/register" 
          className={`btn btn-primary btn-sm ${variant === 'mobile' ? 'w-full' : ''}`}
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  // Authenticated user actions
  if (variant === 'mobile') {
    return (
      <div className="space-y-4">
        {/* Mobile Notifications */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Thông báo</span>
          <NotificationsDropdown />
        </div>
        
        {/* Mobile Messages */}
        {showMessages && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tin nhắn</span>
            <button className="btn btn-ghost btn-sm">
              <div className="indicator">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="badge badge-xs badge-secondary indicator-item">3</span>
              </div>
            </button>
          </div>
        )}
        
        {/* Mobile User Menu */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Tài khoản</span>
          <UserMenuDropdown />
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <NotificationsDropdown />

      {/* Messages */}
      {showMessages && (
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="badge badge-xs badge-secondary indicator-item">3</span>
          </div>
        </button>
      )}

      {/* User Profile Menu */}
      <UserMenuDropdown />
    </div>
  );
}
