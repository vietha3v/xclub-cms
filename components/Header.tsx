'use client'

import Link from 'next/link';
import AuthSection from './common/AuthSection';

export default function Header() {
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
        <AuthSection variant="header" />
      </div>
    </header>
  );
}