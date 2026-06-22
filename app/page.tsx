const launch = {
  mission: "Artemis II",
  agency: "NASA",
  rocket: "Space Launch System",
  location: "Kennedy Space Center",
  status: "GO",
  days: 12,
  hours: 4,
  minutes: 33,
};

const upcomingLaunches = [
  "Artemis II",
  "Crew-11",
  "Europa Clipper",
  "Starlink Mission",
];

export default function Home() {
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
            <CountdownBox label="Days" value={launch.days} />
            <CountdownBox label="Hours" value={launch.hours} />
            <CountdownBox label="Minutes" value={launch.minutes} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <InfoCard title="Rocket" value={launch.rocket} />
            <InfoCard title="Launch Site" value={launch.location} />
            <InfoCard title="Agency" value={launch.agency} />
            <InfoCard title="Status" value={launch.status} />
          </div>

          <a
            href="/discussion"
            className="mt-6 inline-block rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Join Mission Discussion
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Upcoming Missions</h2>

            <ul className="mt-4 space-y-3">
              {upcomingLaunches.map((mission) => (
                <li
                  key={mission}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-3"
                >
                  {mission}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Mission Readiness</h2>

            <p className="mt-4 text-5xl font-bold text-green-400">92/100</p>

            <p className="mt-3 text-slate-300">
              Launch window, ground systems, and vehicle readiness are currently
              favorable.
            </p>
          </div>
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