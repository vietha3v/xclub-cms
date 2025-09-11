import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="bg-base-300 text-base-content">
      {/* Mobile Layout */}
      <div className="block sm:hidden px-4 py-8">
        {/* Hàng 1: Logo + Social Icons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="X-Club Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold">X-Club</span>
          </div>
          <div className="flex gap-3">
            <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Hàng 2: Liên kết nhanh + Hỗ trợ */}
        <div className="flex justify-between">
          <div className="text-left">
            <h3 className="font-bold text-sm mb-3">Liên kết nhanh</h3>
            <div className="space-y-2">
              <Link href="/clubs" className="block text-xs hover:text-primary transition-colors">Câu lạc bộ</Link>
              <Link href="/events" className="block text-xs hover:text-primary transition-colors">Sự kiện</Link>
              <Link href="/races" className="block text-xs hover:text-primary transition-colors">Giải chạy</Link>
              <Link href="/fundraising" className="block text-xs hover:text-primary transition-colors">Gây quỹ</Link>
              <Link href="/news" className="block text-xs hover:text-primary transition-colors">Tin tức</Link>
            </div>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-sm mb-3">Hỗ trợ</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-xs hover:text-primary transition-colors">Trung tâm trợ giúp</Link>
              <Link href="/faq" className="block text-xs hover:text-primary transition-colors">Câu hỏi thường gặp</Link>
              <Link href="/contact" className="block text-xs hover:text-primary transition-colors">Liên hệ</Link>
              <Link href="/feedback" className="block text-xs hover:text-primary transition-colors">Góp ý</Link>
              <Link href="/terms-of-service" className="block text-xs hover:text-primary transition-colors">Điều khoản sử dụng</Link>
              <Link href="/privacy-policy" className="block text-xs hover:text-primary transition-colors">Chính sách bảo mật</Link>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-base-content/20 text-center">
          <p className="text-xs text-base-content/60">© 2025 X-Club. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>

      {/* Desktop Layout - Giữ nguyên */}
      <div className="hidden sm:block container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="X-Club Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold">X-Club</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Cộng đồng chạy bộ hàng đầu Việt Nam, kết nối con người qua từng bước chạy.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-base-content hover:text-primary transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content hover:text-primary transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content hover:text-primary transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content hover:text-primary transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/clubs" className="hover:text-primary transition-colors">Câu lạc bộ</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Sự kiện</Link></li>
              <li><Link href="/races" className="hover:text-primary transition-colors">Giải chạy</Link></li>
              <li><Link href="/fundraising" className="hover:text-primary transition-colors">Gây quỹ</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">Tin tức</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/help" className="hover:text-primary transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Liên hệ</Link></li>
              <li><Link href="/feedback" className="hover:text-primary transition-colors">Góp ý</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">info@x-club.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="truncate">+84 24 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-base-content/20 text-center">
          <p className="text-xs sm:text-sm text-base-content/60">© 2025 X-Club. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
