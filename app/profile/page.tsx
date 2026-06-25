"use client";

import { createClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) return;

      setEmail(data.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setUsername(profile.username);
        setSavedUsername(profile.username);
      }
    }

    loadProfile();
  }, []);

  async function saveUsername() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    await supabase.from("profiles").upsert({
      id: data.user.id,
      username,
    });

    setSavedUsername(username);
    alert("Username saved!");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/dashboard" className="text-blue-300 hover:underline">
         ← Back to Dashboard
        </a>

        <h1 className="text-4xl font-bold">Profile</h1>

        <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-slate-400">Email</p>
          <p className="mt-1">{email}</p>

          <p className="mt-6 text-slate-400">Username</p>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-lg bg-slate-800 p-3"
          />

          <button
            onClick={saveUsername}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2"
          >
            Save Username
          </button>

          {savedUsername && (
            <p className="mt-4 text-green-400">
              Current Username: {savedUsername}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}