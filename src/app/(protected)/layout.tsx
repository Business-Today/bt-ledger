"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // Not logged in
      if (!user) {
        router.replace("/login");
        return;
      }

      // Domain check
      const email = user.email?.toLowerCase() ?? "";

      const allowed =
        email.endsWith("@princeton.edu") ||
        email.endsWith("@businesstoday.org");

      if (!allowed) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  useEffect(() => {
    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
        router.replace("/login");
        }
    });

    return () => subscription.unsubscribe();
    }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}