export default function DiscussionPage() {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <section className="mx-auto max-w-4xl">
          <a href="/" className="text-blue-300 hover:underline">
            ← Back to Dashboard
          </a>
  
          <h1 className="mt-6 text-4xl font-bold">Mission Discussion</h1>
          <p className="mt-2 text-slate-300">
            Talk about upcoming launches, mission updates, and space exploration.
          </p>
  
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <textarea
              placeholder="Share your thoughts about this mission..."
              className="h-32 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
            />
  
            <button className="mt-4 rounded-xl bg-blue-500 px-5 py-3 font-semibold hover:bg-blue-600">
              Post Comment
            </button>
          </div>
  
          <div className="mt-6 space-y-4">
            <Comment
              name="Mission Fan"
              text="Excited to see this launch window. The countdown feature is really helpful."
            />
            <Comment
              name="Space Student"
              text="Would love to see weather data added for the launch site."
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
    <h2 className="text-xl font-semibold">🔥 Trending Missions</h2>

    <ul className="mt-4 space-y-3">
      <li className="rounded-lg bg-slate-800 p-3">Artemis II</li>
      <li className="rounded-lg bg-slate-800 p-3">Crew-11</li>
      <li className="rounded-lg bg-slate-800 p-3">Europa Clipper</li>
    </ul>
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
    <h2 className="text-xl font-semibold">📰 Latest Space News</h2>

    <ul className="mt-4 space-y-3 text-slate-300">
      <li>NASA prepares for future Artemis missions.</li>
      <li>Commercial crew missions continue supporting space station operations.</li>
      <li>Upcoming launches highlight growing activity in low Earth orbit.</li>
    </ul>
  </div>
</div>
        </section>
      </main>
    );
  }
  
  function Comment({ name, text }: { name: string; text: string }) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="font-semibold text-blue-300">{name}</p>
        <p className="mt-2 text-slate-300">{text}</p>
      </div>
    );
  }