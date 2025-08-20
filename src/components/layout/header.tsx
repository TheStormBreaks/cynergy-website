"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const navLinks = [
  { href: "/", label: "<Home/>" },
  { href: "/team", label: "<Team/>" },
  { href: "/events", label: "<Events/>" },
  { href: "/projects", label: "<Projects/>" },
  { href: "/contact", label: "<Contact Us/>" },
];

export default function Header() {
  const pathname = usePathname();
  const { userRole, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline">{`{Cynergy Coding Club}`}</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-foreground/60"
              )}
            >
              {label}
            </Link>
          ))}
           {userRole === 'faculty' && (
             <Link
              href="/admin/create-event"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/admin/create-event" ? "text-primary" : "text-foreground/60"
              )}
            >
              &lt;Create Event/&gt;
            </Link>
           )}
           {userRole === 'student' && (
             <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/dashboard" ? "text-primary" : "text-foreground/60"
              )}
            >
              &lt;Dashboard/&gt;
            </Link>
           )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {userRole ? (
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
