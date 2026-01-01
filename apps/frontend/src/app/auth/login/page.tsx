'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/game');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-turkish-red-900/20 to-gray-900 p-4">
      <div className="turkish-pattern absolute inset-0 opacity-5" />
      <div className="relative w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
