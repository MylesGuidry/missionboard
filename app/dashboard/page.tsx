import LaunchButton from "@/components/LaunchButton";
import MissionSearchList from "@/components/MissionSearchList";
import { getApod } from "@/lib/apod";
import { getUpcomingLaunches } from "@/lib/launches";
import Link from "next/link";

export default async function Home() {

  const launches = await getUpcomingLaunches();
  const launch = launches[0];

  const launchDate = new Date(launch.launchTime);
  const now = new Date();
  const diff = launchDate.getTime() - now.getTime();

  const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0);
  const minutes = Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);

  const apod = await getApod();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black p-8 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold">🚀 MissionBoard</h1>
        <p className="mt-2 text-slate-300">
          NASA Launch & Mission Operations Dashboard
        </p>

        <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow">
          <p className="text-sm uppercase tracking-widest text-blue-300">
            Next Launch
          </p>

          <h2 className="mt-3 text-4xl font-bold">{launch.mission}</h2>
          <p className="mt-2 text-slate-300">{launch.agency}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <CountdownBox label="Days" value={days} />
            <CountdownBox label="Hours" value={hours} />
            <CountdownBox label="Minutes" value={minutes} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <InfoCard title="Rocket" value={launch.rocket} />
            <InfoCard title="Launch Site" value={launch.location} />
            <InfoCard title="Agency" value={launch.agency} />
            <InfoCard title="Status" value={launch.status} />
          </div>

          <Link href="/discussion" className="mt-6 inline-block">
            <LaunchButton />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
        <MissionSearchList launches={launches} />

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Mission Readiness</h2>

            <p className="mt-4 text-5xl font-bold text-green-400">92/100</p>

            <p className="mt-3 text-slate-300">
              Launch window, ground systems, and vehicle readiness are currently
              favorable.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">
            NASA Astronomy Picture of the Day
          </h2>

          {apod.mediaType === "image" ? (
            <img
             src={apod.url}
             alt={apod.title}
             className="mt-4 max-h-[450px] w-full rounded-xl object-cover"
            />
          ) : (
            <a
             href={apod.url}
             target="_blank"
             rel="noopener noreferrer"
             className="mt-4 block rounded-xl border border-slate-700 bg-slate-800 p-6 text-blue-300 hover:underline"
            >
             Watch NASA APOD Video →
          </a>
        )}

          <h3 className="mt-4 text-2xl font-bold">
            {apod.title}
          </h3>

          <p className="mt-3 text-slate-300">
            {apod.explanation.slice(0, 400)}...
          </p>
        </div>
      </section>
    </main>
  );
}

function CountdownBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-slate-800 p-5 text-center">
      <p className="text-5xl font-bold text-blue-300">{value}</p>
      <p className="mt-2 text-sm uppercase tracking-widest text-slate-400">
        {label}
      </p>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}