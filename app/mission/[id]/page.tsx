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
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="mx-auto max-w-4xl">
          <a href="/" className="text-blue-300 hover:underline">
            ← Back to Dashboard
          </a>
  
          <h1 className="mt-6 text-4xl font-bold">
            {launch.name}
          </h1>
  
          <p className="mt-4 text-slate-300">
            {launch.mission?.description || "No description available."}
          </p>
        </div>
      </main>
    );
  }