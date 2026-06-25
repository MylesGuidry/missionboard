"use client";

import { createClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type Props = {
  missionId: string;
  missionName: string;
};

export default function FavoriteButton({ missionId, missionName }: Props) {
  const supabase = createClient();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userData.user.id)
        .eq("mission_id", missionId)
        .single();

      setIsFavorite(!!data);
    }

    checkFavorite();
  }, [missionId]);

  async function toggleFavorite() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userData.user.id)
        .eq("mission_id", missionId);

      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({
        user_id: userData.user.id,
        mission_id: missionId,
        mission_name: missionName,
      });

      setIsFavorite(true);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
     >
      {isFavorite ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}