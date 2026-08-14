import Image from "next/image";
import { siteConfig } from "@/src/data/site";

export default function ManufacturingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Manufacturing</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">Factory environment and production capacity.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        The production base combines 3 automated lines, 6 custom lines, and 51 flow lines for flexible development and repeat production.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {siteConfig.factoryImages.map((image, index) => (
          <Image key={image} src={image} alt={`Factory environment ${index + 1}`} width={900} height={620} className="h-80 w-full rounded-[2rem] object-cover shadow-airy" />
        ))}
      </div>
    </main>
  );
}
