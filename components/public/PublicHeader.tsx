'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function PublicHeader() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-base-100 shadow-lg border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="X-Club Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-primary">X-Club</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-base-content hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <Link href="/clubs" className="text-base-content hover:text-primary transition-colors">
              Câu lạc bộ
            </Link>
            <Link href="/events" className="text-base-content hover:text-primary transition-colors">
              Sự kiện
            </Link>
            <Link href="/races" className="text-base-content hover:text-primary transition-colors">
              Giải chạy
            </Link>
            <Link href="/about" className="text-base-content hover:text-primary transition-colors">
              Giới thiệu
            </Link>
            <Link href="/contact" className="text-base-content hover:text-primary transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="loading loading-spinner loading-sm"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {session.user?.image ? (
                      <img alt="avatar" src={session.user.image} />
                    ) : (
                      <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center">
                        {session.user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link href="/dashboard" className="justify-between">
                      Dashboard
                      <span className="badge badge-primary">New</span>
                    </Link>
                  </li>
                  <li><Link href="/profile">Hồ sơ</Link></li>
                  <li><Link href="/settings">Cài đặt</Link></li>
                  <li><button onClick={() => signOut()}>Đăng xuất</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-base-300">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-base-content hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <Link href="/clubs" className="text-base-content hover:text-primary transition-colors">
                Câu lạc bộ
              </Link>
              <Link href="/events" className="text-base-content hover:text-primary transition-colors">
                Sự kiện
              </Link>
              <Link href="/races" className="text-base-content hover:text-primary transition-colors">
                Giải chạy
              </Link>
              <Link href="/about" className="text-base-content hover:text-primary transition-colors">
                Giới thiệu
              </Link>
              <Link href="/contact" className="text-base-content hover:text-primary transition-colors">
                Liên hệ
              </Link>
              
              <div className="pt-4 border-t border-base-300">
                {session ? (
                  <div className="space-y-2">
                    <Link href="/dashboard" className="block text-base-content hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block text-base-content hover:text-primary transition-colors">
                      Hồ sơ
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="block w-full text-left text-base-content hover:text-primary transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="btn btn-outline btn-sm w-full">
                      Đăng nhập
                    </Link>
                    <Link href="/register" className="btn btn-primary btn-sm w-full">
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
