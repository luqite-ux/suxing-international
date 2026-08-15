import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Sparkles, Shirt, Waves } from "lucide-react";
import { productCategories, products, siteConfig } from "@/src/data/site";

const stats = [
  ["100 mu", "facility area"],
  ["7", "workshops"],
  ["60 production lines", "capacity backbone"],
  ["400,000 pcs/month", "planned output"]
];

export default function HomePage() {
  const featured = products.slice(0, 8);
  const factory = siteConfig.factoryImages.slice(0, 4);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div className="orbital-line left-[-8rem] top-20 h-80 w-80" />
        <div className="orbital-line right-[-10rem] top-10 h-[34rem] w-[34rem]" />
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-ocean shadow-airy">
              OEM / ODM apparel manufacturing
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-6xl lg:text-7xl">
              Premium Knitwear & Goose Down Outerwear Partner
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {siteConfig.companyName} builds refined knitwear, pure wool sweaters, and seasonal outerwear programs for global B2B buyers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 font-semibold text-white shadow-airy transition hover:bg-ink">
                Send Inquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-5 py-3 font-semibold text-ink transition hover:border-ocean hover:text-ocean sm:px-6">
                Explore Products
              </Link>
            </div>
          </div>
          <div className="relative min-h-[520px]">
            <Image src={featured[0].image} alt={featured[0].name} width={640} height={820} className="float-soft absolute right-0 top-0 h-[520px] w-[74%] rounded-[3rem] object-cover shadow-airy" priority />
            <Image src={factory[0]} alt="SUXING production environment" width={520} height={360} className="absolute bottom-0 left-0 h-64 w-[56%] rounded-[2rem] border-8 border-white object-cover shadow-airy" />
            <div className="absolute bottom-10 right-6 rounded-[2rem] bg-white/88 p-5 shadow-airy backdrop-blur">
              <p className="text-3xl font-semibold text-ocean">16,000</p>
              <p className="text-sm text-slate-600">pieces daily capacity</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map(([value, label]) => (
          <div key={value} className="rounded-[1.5rem] border border-sky-100 bg-white/78 p-6 shadow-airy">
            <p className="text-2xl font-semibold text-ink">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Collections</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink">Product collections for private-label growth.</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-ocean">View all products <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {productCategories.map((category, index) => {
            const Icon = index === 0 ? Shirt : index === 1 ? Sparkles : Waves;
            return (
              <Link key={category.slug} href={`/products#${category.slug}`} className="reveal-card rounded-[2rem] border border-sky-100 bg-white/82 p-7">
                <Icon className="h-8 w-8 text-ocean" />
                <h3 className="mt-5 text-2xl font-semibold">{category.name}</h3>
                <p className="mt-3 text-slate-600">{category.count} styles with real product imagery prepared for B2B selection.</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white/68 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {featured.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="reveal-card overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white">
                <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-white via-sky-50/60 to-white p-3">
                  <Image src={product.image} alt={product.name} width={520} height={520} className="h-full w-full object-contain" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">{product.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{product.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">Send Inquiry</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Manufacturing</p>
          <h2 className="mt-3 text-4xl font-semibold">A bright, scalable production base for apparel programs.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The factory combines automated lines, custom lines, and flow lines for flexible sampling, seasonal replenishment, and volume production.
          </p>
          <Link href="/manufacturing" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ocean">
            See Manufacturing <Factory className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {factory.map((image, index) => (
            <Image key={image} src={image} alt={`SUXING factory view ${index + 1}`} width={520} height={360} className="h-56 w-full rounded-[1.5rem] object-cover shadow-airy" />
          ))}
        </div>
      </section>
    </main>
  );
}
