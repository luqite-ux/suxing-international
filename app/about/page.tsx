import Image from "next/image";
import { siteConfig } from "@/src/data/site";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">About</p>
          <h1 className="mt-3 text-5xl font-semibold text-ink">Zhejiang Suxing Knitting Co., Ltd.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            SUXING International supports B2B buyers with knitwear, wool sweaters, goose down outerwear, and custom apparel programs from a scalable Zhejiang manufacturing base.
          </p>
        </div>
        <Image src={siteConfig.factoryImages[1]} alt="SUXING factory exterior" width={900} height={600} className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-airy" />
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {Object.entries(siteConfig.facility).slice(0, 4).map(([key, value]) => (
          <div key={key} className="rounded-[1.5rem] bg-white/82 p-6 shadow-airy">
            <p className="text-2xl font-semibold text-ocean">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">{key.replace(/[A-Z]/g, " $&")}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
