"use client";

import { createClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type Favorite = {
    id: string;
    mission_id: string;
    mission_name: string;
    created_at: string;
  };

  type Comment = {
    id: string;
    mission_id: string;
    message: string;
    created_at: string;
  };

export default function ProfilePage() {
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

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

      const { data: favoritesData } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      if (favoritesData) {
        setFavorites(favoritesData);
      }
      
      const commentName = profile?.username || data.user.email;

      const { data: commentsData } = await supabase
        .from("comments")
        .select("*")
        .eq("name", commentName)
        .order("created_at", { ascending: false });

        if (commentsData) {
          setComments(commentsData);
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

        <div className="flex items-center justify-between">
  <h1 className="text-4xl font-bold">Profile</h1>

  <button
    onClick={logout}
    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
  >
    Logout
  </button>
</div>

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

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
    <p className="text-slate-400 text-sm">Favorite Missions</p>
    <p className="mt-3 text-5xl font-bold text-blue-400">
      {favorites.length}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
    <p className="text-slate-400 text-sm">Comments Posted</p>
    <p className="mt-2 text-4xl font-bold text-green-400">
      {comments.length}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
    <p className="text-slate-400 text-sm">Member Since</p>
    <p className="mt-2 text-lg font-semibold">
      {new Date().getFullYear()}
    </p>
  </div>

</div>

<div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-6">
  <h2 className="text-2xl font-bold">Favorite Launches</h2>

  {favorites.length === 0 ? (
    <p className="mt-4 text-slate-400">
      You have not favorited any missions yet.
    </p>
  ) : (
    <div className="mt-4 space-y-3">
      {favorites.map((favorite) => (
        <a
        key={favorite.id}
        href={`/mission/${favorite.mission_id}`}
        className="block rounded-2xl border border-slate-700 bg-slate-800 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-700 hover:shadow-xl hover:shadow-blue-500/10"
      >
        <p className="text-xl font-bold tracking-tight text-white">
          {favorite.mission_name}
        </p>
      
        <p className="mt-2 text-sm text-slate-400">
            Saved{" "}
            {new Date(favorite.created_at).toLocaleDateString()}
      </p>
      
        <p className="mt-4 text-sm font-semibold text-blue-300">
          View Mission →
        </p>
      </a>
      ))}
    </div>
  )}
</div>

<div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-6">
  <h2 className="text-2xl font-bold">Recent Comments</h2>

  {comments.length === 0 ? (
    <p className="mt-4 text-slate-400">
      No comments yet.
    </p>
  ) : (
    <div className="mt-4 space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-xl bg-slate-800 p-4"
        >
          <p>{comment.message}</p>

          <p className="mt-2 text-sm text-slate-400">
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

    </main>
  );
}