'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
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

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01M6 3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z"
            />
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
  );
}
