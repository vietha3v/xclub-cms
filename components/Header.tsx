'use client'

export default function Header() {
  return (
    <header className="xclub-navbar navbar">
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
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item">3</span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/profile">👤 Hồ sơ cá nhân</a></li>
            <li><a href="/settings">⚙️ Cài đặt</a></li>
            <li><a href="/achievements">🏆 Thành tích</a></li>
            <li><a href="/analytics">📊 Thống kê</a></li>
            <li><hr /></li>
            <li><a href="/logout">🚪 Đăng xuất</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
