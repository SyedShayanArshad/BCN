// app/page.js
"use client";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect based on role
      if (session.user.role === "owner") {
        router.push("/AdminHome");
      } else {
        router.push("/UserHome");
      }
    } else if (status === "unauthenticated") {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [status, session, router]);

  // Show loading state while checking authentication
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-xl"><Loading/></div>
    </div>
  );
}