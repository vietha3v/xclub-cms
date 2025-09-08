'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import UserActions from '../common/UserActions';

export default function DashboardHeader() {

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
        <SearchBar />

        {/* Right Side Actions */}
        <UserActions variant="desktop" />
      </div>
    </header>
  );
}
