import FavoriteButton from "@/components/FavoriteButton";
import { getLaunch } from "@/lib/launches";

type Props = {
    params: Promise<{
      id: string;
    }>;
  };
  
  export default async function MissionPage({ params }: Props) {
    const { id } = await params;
    const launch = await getLaunch(id);

    const launchDate = new Date(launch.net);
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
    const hours = Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0);
    const minutes = Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);

    const status = launch.status?.name || "Unknown";

    const statusStyle =
      status.toLowerCase().includes("go") || status.toLowerCase().includes("success")
        ? "bg-green-500/20 text-green-300 border-green-500/30"
        : status.toLowerCase().includes("hold") || status.toLowerCase().includes("failure")
        ? "bg-red-500/20 text-red-300 border-red-500/30"
        : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black p-8 text-white">
          <section className="mx-auto max-w-5xl">
            <a href="/dashboard" className="text-blue-300 hover:underline">
              ← Back to Dashboard
            </a>
      
            <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-widest text-blue-300">
                  Mission Details
                </p>

                <FavoriteButton
                  missionId={launch.id}
                  missionName={launch.name}
                />
              </div>
      
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold">
                    {launch.name}
                  </h1>

                  <span className={`mt-4 inline-block rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle}`}>
  {status}
</span>

                  <p className="mt-3 max-w-3xl text-slate-300">
                    {launch.mission?.description || "No description available."}
                  </p>

                  {launch.image && (
  <img
    src={launch.image}
    alt={launch.name}
    className="mt-6 h-[350px] w-full rounded-2xl border border-slate-700 object-cover"
  />
)}
                </div>
              </div>      

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
  <CountdownCard label="Days" value={days} />
  <CountdownCard label="Hours" value={hours} />
  <CountdownCard label="Minutes" value={minutes} />
</div>
      
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <DetailCard title="Rocket" value={launch.rocket?.configuration?.name || "Unknown"} />
                <DetailCard title="Agency" value={launch.launch_service_provider?.name || "Unknown"} />
                <DetailCard title="Launch Site" value={launch.pad?.location?.name || "Unknown"} />
                <DetailCard title="Status" value={launch.status?.name || "Unknown"} />
                <DetailCard title="Launch Time (Local)" value={new Date(launch.net).toLocaleString()} />
              </div>

              <div className="mt-6">
                <a
                  href={`/discussion?mission=${launch.id}`}
                  className="inline-block rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                >
                  Discuss Mission
                </a>
              </div>

            </div>
          </section>
        </main>
      );

      function DetailCard({ title, value }: { title: string; value: string }) {
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500 hover:bg-slate-700">
            <p className="text-sm uppercase tracking-widest text-slate-400">{title}</p>
            <p className="mt-3 text-lg font-semibold text-white">{value}</p>
          </div>
        );
      }
      
      function CountdownCard({ label, value }: { label: string; value: number }) {
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center">
            <p className="text-5xl font-bold text-blue-300">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-slate-400">
              {label}
            </p>
          </div>
        );
      }}