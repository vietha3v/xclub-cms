'use client';

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
