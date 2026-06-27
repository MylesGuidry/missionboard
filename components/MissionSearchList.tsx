"use client";

import Link from "next/link";
import { useState } from "react";

type Launch = {
    id: string;
    mission: string;
    agency: string;
    rocket: string;
    location: string;
    status: string;
    launchTime: string;
};

export default function MissionSearchList({
  launches,
}: {
  launches: Launch[];
}) {
  const [search, setSearch] = useState("");

  const filtered = launches.filter((launch) => {
    const term = search.toLowerCase();

    return (
      launch.mission.toLowerCase().includes(term) ||
      launch.rocket.toLowerCase().includes(term) ||
      launch.location.toLowerCase().includes(term) ||
      launch.agency.toLowerCase().includes(term)
    );
  });

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">Upcoming Missions</h2>

      <input
        type="text"
        placeholder="Search missions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full rounded-lg bg-slate-800 p-3 outline-none"
      />

      <div className="mt-5 space-y-3 max-h-[450px] overflow-y-auto">
        {filtered.map((launch) => (
          <Link
            key={launch.id}
            href={`/mission/${launch.id}`}
            className="block rounded-lg border border-slate-700 bg-slate-800 p-4 transition hover:bg-slate-700"
          >
            <h3 className="font-semibold">{launch.mission}</h3>

            <p className="mt-1 text-sm text-slate-400">
              🚀 {launch.rocket}
            </p>

            <p className="text-sm text-slate-400">
              📍 {launch.location}
            </p>

            <p className="text-sm text-slate-400">
              🛰 {launch.agency}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {new Date(launch.launchTime).toLocaleString()}
            </p>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-400">No missions found.</p>
        )}
      </div>
    </div>
  );
}