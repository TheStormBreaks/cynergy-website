
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is loaded and user is not faculty, redirect
    if (userRole && userRole !== 'faculty') {
      router.push('/login');
    }
    // If auth state is not loaded (e.g. page refresh) and there's no role, redirect
    if (userRole === null) {
        router.push('/login');
    }
  }, [userRole, router]);

  // While checking auth, show a loader
  if (userRole !== 'faculty') {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If faculty, show the content
  return <>{children}</>;
}
