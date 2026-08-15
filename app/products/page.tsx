import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories, products } from "@/src/data/site";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">Catalog</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">Product Collections</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Explore real product styles from the supplied collection materials. Every product path leads to a B2B inquiry workflow.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {productCategories.map((category) => (
          <a key={category.slug} href={`#${category.slug}`} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ocean hover:text-ocean">
            {category.name}
          </a>
        ))}
      </div>
      {productCategories.map((category) => (
        <section key={category.slug} id={category.slug} className="scroll-mt-28 py-12">
          <h2 className="text-3xl font-semibold">{category.name}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.filter((product) => product.category === category.name).map((product) => (
              <article key={product.slug} className="reveal-card overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white">
                <Link href={`/products/${product.slug}`} className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-white via-sky-50/60 to-white p-3">
                  <Image src={product.image} alt={product.name} width={520} height={520} className="h-full w-full object-contain" />
                </Link>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean">{product.id}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.spec}</p>
                  <Link href={`/products/${product.slug}#inquiry-form`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ocean">
                    Send Inquiry <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
