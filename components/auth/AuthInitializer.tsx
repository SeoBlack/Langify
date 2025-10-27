"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { useAuth } from "@/hooks/use-auth";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token } = useUserStore();
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    // If we have a token but no user data, fetch current user
    if (token && isAuthenticated) {
      getCurrentUser();
    }
  }, [token, isAuthenticated, getCurrentUser]);

  return <>{children}</>;
}
