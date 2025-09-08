'use client';

import Link from 'next/link';
import { useState } from 'react';
import UserActions from '../common/UserActions';

export default function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-lg border-b border-base-300">
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <UserActions variant="desktop" />
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
                <UserActions variant="mobile" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
