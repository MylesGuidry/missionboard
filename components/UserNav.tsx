"use client";

import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserNav() {
  const supabase = createClient();
  const [label, setLabel] = useState("Account");
  const pathname = usePathname();

if (pathname === "/login") {
  return null;
}

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setLabel("Login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .single();

      setLabel(profile?.username || data.user.email || "Account");
    }

    loadUser();
  }, []);

  return (
    <div className="fixed right-6 top-6 z-50">
      <Link
        href="/profile"
        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-blue-300 shadow hover:bg-slate-800"
      >
        {label}
      </Link>
    </div>
  );
}