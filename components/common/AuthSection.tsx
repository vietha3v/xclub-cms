'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { tokenManager } from '@/lib/api';
import { Bell, MessageCircle, User, LogOut, Settings, Trophy, BarChart3 } from 'lucide-react';

interface AuthSectionProps {
  variant?: 'header' | 'public' | 'mobile';
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
    { id: 1, title: 'Chào mừng bạn đến với X-Club!', time: '2 phút trước', read: false, type: 'success' },
    { id: 2, title: 'Có sự kiện mới trong CLB của bạn', time: '1 giờ trước', read: false, type: 'info' },
    { id: 3, title: 'Bạn đã hoàn thành thử thách chạy bộ', time: '3 giờ trước', read: true, type: 'success' },
    { id: 4, title: 'Nhắc nhở: Cuộc thi chạy marathon sắp diễn ra', time: '5 giờ trước', read: false, type: 'warning' },
    { id: 5, title: 'Thông báo bảo trì hệ thống', time: '1 ngày trước', read: true, type: 'info' },
  ]);


  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
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
    
    if (variant === 'mobile') {
      return (
        <div className="flex flex-col space-y-3">
          <Link 
            href="/login" 
            className="btn btn-outline btn-sm w-full"
          >
            Đăng nhập
          </Link>
          <Link 
            href="/register" 
            className="btn btn-primary btn-sm w-full"
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
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-base-content truncate">
              {session?.user?.name || 'Người dùng'}
            </p>
            <p className="text-xs text-base-content/70 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Link href="/dashboard" className="btn btn-outline btn-sm flex items-center justify-center">
            <BarChart3 className="w-4 h-4 mr-0.5" />
            Dashboard
          </Link>
          <Link href="/profile" className="btn btn-outline btn-sm flex items-center justify-center">
            <User className="w-4 h-4 mr-0.5" />
            Profile
          </Link>
        </div>

        
        <div className="grid grid-cols-2 gap-2">
          <Link href="/achievements" className="btn btn-outline btn-sm flex items-center justify-center">
            <Trophy className="w-4 h-4 mr-0.5" />
            Thành tích
          </Link>
          <Link href="/settings" className="btn btn-outline btn-sm flex items-center justify-center">
            <Settings className="w-4 h-4 mr-0.5" />
            Cài đặt
          </Link>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="btn btn-error btn-sm w-full flex items-center justify-center"
        >
          <LogOut className="w-4 h-4 mr-0.5" />
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      {showNotifications && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadCount > 0 && (
                <span className="badge badge-xs badge-primary indicator-item text-xs">{unreadCount}</span>
              )}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content dropdown-content-end mt-3 z-[1] p-2 sm:p-2 shadow bg-base-100 rounded-box w-72 sm:w-80 max-h-[70vh] overflow-y-auto">
            <li className="menu-title">
              <span className="text-sm sm:text-base font-semibold">Thông báo</span>
            </li>
            {notifications.length === 0 ? (
              <li><span className="text-xs sm:text-sm text-base-content/70">Không có thông báo mới</span></li>
            ) : (
              <>
                {notifications.slice(0, 5).map((notification) => (
                  <li key={notification.id}>
                    <a 
                      className={`${!notification.read ? 'bg-primary/10' : ''}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex flex-col">
                        <span className={`text-xs sm:text-sm ${!notification.read ? 'font-semibold' : 'font-normal'}`}>
                          {notification.title}
                        </span>
                        <span className="text-xs text-base-content/60">{notification.time}</span>
                      </div>
                    </a>
                  </li>
                ))}
                <li><hr /></li>
                <li><Link href="/notifications" className="text-center text-xs sm:text-sm font-medium">Xem tất cả</Link></li>
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
