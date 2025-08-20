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
  const { userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
        if (userRole !== 'faculty') {
            router.push('/login');
        }
    }
  }, [userRole, loading, router]);

  // While checking auth, show a loader
  if (loading || userRole !== 'faculty') {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If faculty, show the content
  return <>{children}</>;
}
