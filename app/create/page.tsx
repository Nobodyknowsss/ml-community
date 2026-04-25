"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /create/scrim immediately
    router.push("/create/scrim");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-green-400 font-semibold">Redirecting...</p>
      </div>
    </div>
  );
}
