'use client';

import Link from 'next/link';
import UserActions from '../common/UserActions';
import { Menu } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {

  return (
    <header className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-30">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6">
        {/* Left Side - Mobile Menu + Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden btn btn-ghost btn-sm hover:bg-primary/10 transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo và Brand */}
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <img 
              src="/logo.png" 
              alt="X-Club Logo" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-primary">X-Club</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* User Actions */}
          <div className="hidden sm:block">
            <UserActions variant="desktop" />
          </div>
          <div className="sm:hidden">
            <UserActions variant="mobile" />
          </div>
        </div>
      </div>

    </header>
  );
}
