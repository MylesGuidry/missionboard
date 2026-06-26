"use client";

import SpaceButton from "@/components/SpaceButton";
import { createClient } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Comment = {
  id: string;
  mission_id: string;
  name: string;
  message: string;
  created_at: string;
};

export default function DiscussionPage() {
  const supabase = createClient();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const missionId = searchParams.get("mission") || "general";

  async function loadComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("mission_id", missionId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  }

  async function postComment() {
    if (!name.trim() || !message.trim()) return;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { error } = await supabase.from("comments").insert({
      mission_id: missionId,
      user_id: userData.user.id,
      name,
      message,
    });

    if (!error) {
      setMessage("");
      await loadComments();
    }
  }

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      console.log("USER DATA:", data);
  
      if (data.user?.email) {
        setUserEmail(data.user.email);
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", data.user.id)
          .single();

          if (profile?.username) {
            setUsername(profile.username);
          }
      }
    }
  
    loadUser();
    loadComments();
  }, [missionId]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-4xl">
        <a href="/dashboard" className="text-blue-300 hover:underline">
          ← Back to Dashboard
        </a>

        <h1 className="mt-6 text-4xl font-bold">Mission Discussion</h1>
        <p className="mt-2 text-slate-300">
          Talk about upcoming launches, mission updates, and space exploration.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="mb-4 text-sm text-slate-400">
          Posting as{" "}
          <span className="font-semibold text-blue-300">
            {username || userEmail || "Guest"}
          </span>
        </p>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share your thoughts about this mission..."
            className="h-32 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <div className="mt-4" onClick={postComment}>
            <SpaceButton />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-4"
            >
              <p className="font-semibold text-blue-300">{comment.name}</p>
              <p className="mt-2 text-slate-300">{comment.message}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}