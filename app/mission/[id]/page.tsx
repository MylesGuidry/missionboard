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
      
              <h1 className="mt-3 text-4xl font-bold">
                {launch.name}
              </h1>
      
              <p className="mt-4 max-w-3xl text-slate-300">
                {launch.mission?.description || "No description available."}
              </p>
      
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
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <p className="text-sm text-slate-400">{title}</p>
            <p className="mt-2 font-semibold">{value}</p>
          </div>
        );
      }}