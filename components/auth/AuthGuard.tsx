"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireProfileSetup?: boolean;
  requireOnboarding?: boolean;
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireProfileSetup = true,
  requireOnboarding = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/auth");
      } else if (!requireAuth && isAuthenticated) {
        // Check if onboarding is needed first
        if (user && !user.onboardingCompleted) {
          router.push("/onboarding");
        } else if (user && !user.profileSetupCompleted) {
          router.push("/profile-setup");
        } else {
          router.push("/");
        }
      } else if (requireAuth && isAuthenticated) {
        // Check onboarding first
        if (requireOnboarding && user && !user.onboardingCompleted) {
          router.push("/onboarding");
        }
        // Then check profile setup
        else if (requireProfileSetup && user && !user.profileSetupCompleted) {
          router.push("/profile-setup");
        }
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    requireProfileSetup,
    requireOnboarding,
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

  // Check onboarding
  if (
    requireAuth &&
    isAuthenticated &&
    requireOnboarding &&
    user &&
    !user.onboardingCompleted
  ) {
    return null;
  }

  // Check profile setup
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
