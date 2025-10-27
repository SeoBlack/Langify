"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = () => {
    // The AuthGuard will handle the redirect logic based on profile completion
    // No need to manually redirect here
  };

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Langy</h1>
            <p className="mt-2 text-sm text-gray-600">
              Master languages through intelligent practice
            </p>
          </div>

          {isLogin ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
