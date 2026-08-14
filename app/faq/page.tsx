import { faqs } from "@/src/data/site";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">FAQ</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">Frequently Asked Questions</h1>
      <div className="mt-10 grid gap-4">
        {faqs.map((item) => (
          <section key={item.question} className="rounded-[1.5rem] border border-sky-100 bg-white/86 p-6 shadow-airy">
            <h2 className="text-xl font-semibold">{item.question}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
