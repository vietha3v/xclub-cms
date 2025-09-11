'use client'

import Link from 'next/link';
import AuthSection from './common/AuthSection';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 xclub-navbar navbar bg-base-100/95 backdrop-blur-sm shadow-sm border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Trang chủ</a></li>
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Hoạt động</a></li>
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Câu lạc bộ</a></li>
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Giải chạy</a></li>
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Gây quỹ</a></li>
            <li><a className="hover:text-primary hover:bg-primary/10 transition-colors">Thành tích</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/logo.png" 
            alt="X-Club Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
          />
          <span className="text-lg sm:text-xl lg:text-2xl font-bold xclub-text-gradient">X-Club</span>
        </div>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Trang chủ</a></li>
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Hoạt động</a></li>
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Câu lạc bộ</a></li>
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Giải chạy</a></li>
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Gây quỹ</a></li>
          <li><a className="hover:text-primary font-medium transition-colors duration-200">Thành tích</a></li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <div className="hidden sm:block">
          <AuthSection variant="header" />
        </div>
        <div className="sm:hidden">
          <AuthSection variant="mobile" />
        </div>
      </div>
    </header>
  );
}