'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="bg-base-100 shadow-lg border-b border-base-300">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo và Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="X-Club Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-primary">X-Club</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="input input-bordered w-full pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01M6 3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          {/* Messages */}
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

          {/* User Profile Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
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
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                isProfileMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <li className="menu-title">
                <span className="text-sm font-medium">{session?.user?.name || 'Thành viên'}</span>
              </li>
              <li className="menu-title">
                <span className="text-xs text-base-content/70">{session?.user?.email}</span>
              </li>
              <div className="divider my-2"></div>
              <li>
                <Link href="/dashboard" className="justify-between">
                  Dashboard
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li><Link href="/profile">Hồ sơ cá nhân</Link></li>
              <li><Link href="/settings">Cài đặt</Link></li>
              <li><Link href="/help">Trợ giúp</Link></li>
              <div className="divider my-2"></div>
              <li><button onClick={() => signOut()}>Đăng xuất</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
