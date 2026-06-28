import SpaceLoader from "@/components/SpaceLoader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black p-8 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <SpaceLoader />
      </div>
    </main>
  );
}