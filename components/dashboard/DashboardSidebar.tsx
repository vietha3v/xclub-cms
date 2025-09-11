'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useMobileMenuScrollLock } from '@/hooks/useScrollLock';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Trophy, 
  Settings, 
  DollarSign, 
  Zap, 
  User, 
  LogOut,
  Home,
  MessageCircle,
  Bell
} from 'lucide-react';

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function DashboardSidebar({ 
  isMobileOpen = false, 
  onMobileClose 
}: DashboardSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Sử dụng custom hook để quản lý scroll lock
  useMobileMenuScrollLock(isMobileOpen);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: 'Câu lạc bộ',
      href: '/clubs',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'Sự kiện',
      href: '/events',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: 'Giải chạy',
      href: '/races',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: 'Hoạt động',
      href: '/activities',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: 'Thử thách',
      href: '/challenges',
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      name: 'Gây quỹ',
      href: '/fundraising',
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  const userNavigation = [
    {
      name: 'Hồ sơ cá nhân',
      href: '/profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      name: 'Cài đặt',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
    {
      name: 'Trợ giúp',
      href: '/help',
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay - Backdrop nhẹ nhàng (không che header) */}
      {isMobileOpen && (
        <div 
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
          onClick={onMobileClose}
        />
      )}

      <aside className={`
        fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out z-50
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
        bg-base-100 border-r border-base-300 min-h-screen shadow-xl lg:shadow-none
      `}>
        <div className="p-4 sm:p-6">

          {/* User Info */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="avatar">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  {session?.user?.image ? (
                    <img alt="avatar" src={session.user.image} />
                  ) : (
                    <span className="text-sm sm:text-lg font-semibold">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base-content truncate">
                  {session?.user?.name || 'Thành viên'}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/70 truncate">
                  {session?.user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

        {/* Main Navigation */}
        <nav className="space-y-1 sm:space-y-2">
          <h4 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-3">
            Menu chính
          </h4>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-lg'
                    : 'text-base-content hover:bg-base-200'
                }`}
                onClick={onMobileClose}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Navigation */}
        <nav className="space-y-1 sm:space-y-2 mt-6 sm:mt-8">
          <h4 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-3">
            Tài khoản
          </h4>
          {userNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-lg'
                    : 'text-base-content hover:bg-base-200'
                }`}
                onClick={onMobileClose}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-base-200 rounded-lg">
          <h4 className="text-sm font-semibold text-base-content mb-3">Thống kê nhanh</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/70">CLB đã tham gia:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Sự kiện đã tham gia:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/70">Tổng km đã chạy:</span>
              <span className="font-medium">156 km</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
