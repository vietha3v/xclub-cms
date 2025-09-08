import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full max-w-md">
          <RegisterForm />
          
          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Đã có tài khoản?{' '}
              <a href="/login" className="link link-primary font-medium">
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
