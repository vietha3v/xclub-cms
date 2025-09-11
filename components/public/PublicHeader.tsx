import Link from 'next/link';
import AuthSection from '../common/AuthSection';

export default function PublicHeader() {
  return (
    <header className="bg-base-100/95 backdrop-blur-sm shadow-lg border-b border-base-300 sticky top-0 z-30">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <img 
                src="/logo.png" 
                alt="X-Club Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">X-Club</span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Trang chủ
            </Link>
            <Link href="/clubs" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Câu lạc bộ
            </Link>
            <Link href="/events" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Sự kiện
            </Link>
            <Link href="/races" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Giải chạy
            </Link>
            <Link href="/about" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Giới thiệu
            </Link>
            <Link href="/contact" className="text-sm xl:text-base text-base-content hover:text-primary transition-colors duration-200 font-medium">
              Liên hệ
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Auth Buttons */}
            <AuthSection variant="public" />
          </div>
        </div>
      </div>
    </header>
  );
}
