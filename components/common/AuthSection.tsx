'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { tokenManager } from '@/lib/api';
import { Bell, MessageCircle, User, LogOut, Settings, Trophy, BarChart3 } from 'lucide-react';

interface AuthSectionProps {
  variant?: 'header' | 'public';
  showNotifications?: boolean;
  showMessages?: boolean;
}

export default function AuthSection({ 
  variant = 'header', 
  showNotifications = true,
  showMessages = true 
}: AuthSectionProps) {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Chào mừng bạn đến với X-Club!', time: '2 phút trước', read: false },
    { id: 2, title: 'Có sự kiện mới trong CLB của bạn', time: '1 giờ trước', read: false },
    { id: 3, title: 'Bạn đã hoàn thành thử thách chạy bộ', time: '3 giờ trước', read: true },
  ]);


  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    try {
      // Bước 1: Xóa Next Auth session
      await signOut({ redirect: false });
      
      // Bước 2: Xóa tất cả tokens từ tokenManager
      tokenManager.clearTokens();
      
      // Bước 3: Redirect thủ công
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-sm"></div>
      </div>
    );
  }

  // Not authenticated - show login/register buttons
  if (!session) {
    if (variant === 'public') {
      return (
        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="btn btn-outline btn-sm"
          >
            Đăng nhập
          </Link>
          <Link 
            href="/register" 
            className="btn btn-primary btn-sm"
          >
            Đăng ký
          </Link>
        </div>
      );
    }
    
    // For header variant, return null (handled by parent)
    return null;
  }

  // Authenticated - show user actions
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      {showNotifications && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="badge badge-xs badge-primary indicator-item">{unreadCount}</span>
              )}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80">
            <li className="menu-title">
              <span>Thông báo</span>
            </li>
            {notifications.length === 0 ? (
              <li><span className="text-base-content/70">Không có thông báo mới</span></li>
            ) : (
              <>
                {notifications.slice(0, 3).map((notification) => (
                  <li key={notification.id}>
                    <a 
                      className={`${!notification.read ? 'bg-primary/10' : ''}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex flex-col">
                        <span className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </span>
                        <span className="text-xs text-base-content/60">{notification.time}</span>
                      </div>
                    </a>
                  </li>
                ))}
                <li><hr /></li>
                <li><Link href="/notifications" className="text-center">Xem tất cả</Link></li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Messages */}
      {showMessages && (
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <MessageCircle className="w-5 h-5" />
            <span className="badge badge-xs badge-secondary indicator-item">3</span>
          </div>
        </button>
      )}

      {/* User Menu */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {session?.user?.image ? (
              <img alt="Avatar" src={session.user.image} />
            ) : (
              <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
          {/* User Info Section */}
          <li className="menu-title">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-primary">
                Xin chào, {session?.user?.name || 'Thành viên'}!
              </span>
              {session?.user?.email && (
                <span className="text-xs text-base-content/70">
                  {session.user.email}
                </span>
              )}
            </div>
          </li>
          <li><hr /></li>
          
          {/* Menu Items */}
          <li>
            <Link href="/profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Hồ sơ cá nhân
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cài đặt
            </Link>
          </li>
          <li>
            <Link href="/achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Thành tích
            </Link>
          </li>
          <li>
            <Link href="/analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Thống kê
            </Link>
          </li>
          <li><hr /></li>
          <li>
            <button onClick={handleSignOut} className="flex items-center gap-2 text-error">
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
