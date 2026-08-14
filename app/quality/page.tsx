const checks = ["Incoming material review", "Cutting and sewing checkpoints", "Finishing and measurement review", "Final packing inspection", "Third-party inspection support"];

export default function QualityPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Quality Control</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">Inspection-first production management.</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        Suxing uses staged checks to keep materials, workmanship, measurements, and packing aligned with confirmed order requirements.
      </p>
      <div className="mt-10 grid gap-4">
        {checks.map((check) => (
          <div key={check} className="rounded-[1.5rem] border border-sky-100 bg-white/86 p-6 text-lg font-semibold shadow-airy">{check}</div>
        ))}
      </div>
    </main>
  );
}
