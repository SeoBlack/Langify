"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Brain, User, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Translate", href: "/translate", icon: BookOpen },
  { name: "Practice", href: "/practice", icon: Brain },
  { name: "Results", href: "/quiz-results", icon: ClipboardList },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:top-0 md:left-0 md:bottom-0 md:w-64 md:border-r md:border-t-0">
        <div className="flex md:flex-col md:h-full">
          <div className="hidden md:block p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Langy
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Learn languages smarter
            </p>
          </div>

          <div className="flex flex-1 justify-center items-center px-3">
            <Link href="/auth">
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:top-0 md:left-0 md:bottom-0 md:w-64 md:border-r md:border-t-0">
      <div className="flex md:flex-col md:h-full">
        <div className="hidden md:block p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Langy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Learn languages smarter
          </p>
          {user && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 justify-around md:justify-start md:flex-col md:px-3 md:space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-3 md:px-4 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-5 w-5 md:h-4 md:w-4" />
                <span className="md:flex">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
