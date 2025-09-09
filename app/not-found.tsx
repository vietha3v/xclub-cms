import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-base-content mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-base-content mb-4">
          Trang không tìm thấy
        </h2>
        <p className="text-base-content/70 mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link 
          href="/"
          className="btn btn-primary"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
