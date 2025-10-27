"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireProfileSetup?: boolean;
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireProfileSetup = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/auth");
      } else if (!requireAuth && isAuthenticated) {
        // Check if profile setup is needed before redirecting to dashboard
        if (user && !user.profileSetupCompleted) {
          router.push("/profile-setup");
        } else {
          router.push("/");
        }
      } else if (
        requireAuth &&
        isAuthenticated &&
        requireProfileSetup &&
        user &&
        !user.profileSetupCompleted
      ) {
        router.push("/profile-setup");
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    requireProfileSetup,
    user,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  if (
    requireAuth &&
    isAuthenticated &&
    requireProfileSetup &&
    user &&
    !user.profileSetupCompleted
  ) {
    return null;
  }

  return <>{children}</>;
}
