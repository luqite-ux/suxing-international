export default function NewsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">News</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">News</h1>
      <div className="mt-10 rounded-[2rem] border border-dashed border-sky-200 bg-white/78 p-10 text-center shadow-airy">
        <h2 className="text-2xl font-semibold">No published updates yet.</h2>
        <p className="mt-4 text-slate-600">This section is reserved for company updates after verified articles are published from the future admin workflow.</p>
      </div>
    </main>
  );
}
