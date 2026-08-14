const steps = ["Design Brief", "Material Sourcing", "Sample Development", "Bulk Production", "In-Line Checks", "Packing Coordination"];

export default function OemOdmPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">OEM / ODM</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">Custom apparel programs from concept to shipment.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="reveal-card rounded-[1.5rem] border border-sky-100 bg-white/86 p-6">
            <p className="text-sm font-semibold text-ocean">0{index + 1}</p>
            <h2 className="mt-3 text-2xl font-semibold">{step}</h2>
            <p className="mt-3 text-slate-600">Clear milestones help buyers align fabric, fit, workmanship, and delivery requirements.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
