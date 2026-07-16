"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const hasSession = !!data.session;
      setAuthenticated(hasSession);
      setChecking(false);
      if (!hasSession && !isLoginPage) router.replace("/admin/login");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      if (!session && !isLoginPage) router.replace("/admin/login");
    });

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  if (isLoginPage) return <>{children}</>;
  if (checking) {
    return <p className="mx-auto max-w-5xl px-5 py-12 text-ink/50">Vérification de la connexion...</p>;
  }
  if (!authenticated) return null; // redirection en cours vers /admin/login

  return <>{children}</>;
}
