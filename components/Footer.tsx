export default function Footer() {
  return (
    <footer className="xclub-footer footer footer-center p-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img 
            src="/logo.png" 
            alt="X-Club Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold xclub-text-gradient">X-Club</span>
        </div>
        <p className="text-base text-base-content/80 max-w-md">
          Nền tảng kết nối cộng đồng - để khỏe hơn, vui hơn, và mang lại điều tốt đẹp hơn cho cộng đồng
        </p>
        <p className="text-xs text-base-content/60 mt-3">© 2024 X-Club. Tất cả quyền được bảo lưu.</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-6">
          <a className="link link-hover">Về chúng tôi</a>
          <a className="link link-hover">Liên hệ</a>
          <a href="/privacy-policy" className="link link-hover">Chính sách bảo mật</a>
          <a href="/terms-of-service" className="link link-hover">Điều khoản sử dụng</a>
          <a className="link link-hover">Hỗ trợ</a>
        </div>
      </div>
    </footer>
  );
}
