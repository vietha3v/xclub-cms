import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Đăng ký tài khoản
          </h1>
          <p className="text-base-content/70">
            Tham gia cộng đồng X-Club ngay hôm nay
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Đã có tài khoản?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
