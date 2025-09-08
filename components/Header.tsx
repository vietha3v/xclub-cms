'use client'

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
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
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 xclub-navbar navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a className="hover:text-primary">Trang chủ</a></li>
            <li><a className="hover:text-primary">Hoạt động</a></li>
            <li><a className="hover:text-primary">Câu lạc bộ</a></li>
            <li><a className="hover:text-primary">Giải chạy</a></li>
            <li><a className="hover:text-primary">Gây quỹ</a></li>
            <li><a className="hover:text-primary">Thành tích</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="X-Club Logo" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold xclub-text-gradient">X-Club</span>
        </div>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-primary font-medium">Trang chủ</a></li>
          <li><a className="hover:text-primary font-medium">Hoạt động</a></li>
          <li><a className="hover:text-primary font-medium">Câu lạc bộ</a></li>
          <li><a className="hover:text-primary font-medium">Giải chạy</a></li>
          <li><a className="hover:text-primary font-medium">Gây quỹ</a></li>
          <li><a className="hover:text-primary font-medium">Thành tích</a></li>
        </ul>
      </div>
      
      <div className="navbar-end">
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z" />
              </svg>
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
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/profile">👤 Hồ sơ cá nhân</Link></li>
            <li><Link href="/settings">⚙️ Cài đặt</Link></li>
            <li><Link href="/achievements">🏆 Thành tích</Link></li>
            <li><Link href="/analytics">📊 Thống kê</Link></li>
            <li><hr /></li>
            <li><button onClick={handleSignOut}>🚪 Đăng xuất</button></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
