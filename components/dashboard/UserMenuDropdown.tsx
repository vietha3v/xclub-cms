'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { tokenManager } from '@/lib/api';

export default function UserMenuDropdown() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    console.log('🚪 UserMenuDropdown - Starting sign out process');
    try {
      // Bước 1: Xóa Next Auth session
      await signOut({ redirect: false });
      
      // Bước 2: Xóa tất cả tokens từ tokenManager
      tokenManager.clearTokens();
      
      console.log('✅ UserMenuDropdown - Sign out completed');
      
      // Bước 3: Redirect thủ công
      window.location.href = '/';
    } catch (error) {
      console.error('❌ UserMenuDropdown - Error signing out:', error);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          {session?.user?.image ? (
            <img alt="avatar" src={session.user.image} />
          ) : (
            <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm p-2 shadow bg-base-100 rounded-box w-52 z-[1]"
      >
        {/* User Info with Avatar */}
        <li className="menu-title">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full">
              {session?.user?.image ? (
                <img alt="avatar" src={session.user.image} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session?.user?.name || 'Thành viên'}</span>
              <span className="text-xs text-base-content/70">{session?.user?.email}</span>
            </div>
          </div>
        </li>
        <div className="divider my-2"></div>
        
        {/* Menu Items with Icons */}
        <li>
          <Link href="/dashboard" className="justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              Dashboard
            </div>
            <span className="badge badge-primary">New</span>
          </Link>
        </li>
        
        <li>
          <Link href="/profile" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Hồ sơ cá nhân
          </Link>
        </li>
        
        <li>
          <Link href="/settings" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cài đặt
          </Link>
        </li>
        
        <li>
          <Link href="/help" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Trợ giúp
          </Link>
        </li>
        
        <li>
          <Link href="/achievements" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Thành tích
          </Link>
        </li>
        
        <li>
          <Link href="/analytics" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Thống kê
          </Link>
        </li>
        
        <div className="divider my-2"></div>
        
        <li>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-error">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}
