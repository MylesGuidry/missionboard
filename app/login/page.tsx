"use client";

import { createClient } from "@/lib/supabaseClient";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Check your email to confirm your account.");
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-md">

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h1 className="text-3xl font-bold">MissionBoard Login</h1>

          <input
            className="mt-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className="mt-4 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="mt-6 flex gap-3">
            <button
              onClick={signIn}
              className="rounded-xl bg-blue-500 px-5 py-3 font-semibold hover:bg-blue-600"
            >
              Sign In
            </button>

            <button
              onClick={signUp}
              className="rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:bg-slate-800"
            >
              Sign Up
            </button>
          </div>

          {message && <p className="mt-4 text-slate-300">{message}</p>}
        </div>
      </section>
    </main>
  );
}