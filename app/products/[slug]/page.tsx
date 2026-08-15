import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { getProductBySlug, products } from "@/src/data/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found | SUXING International"
    };
  }

  const description = product.description || `${product.name} for B2B apparel sourcing and private-label programs.`;

  return {
    title: `${product.name} | ${product.id} | SUXING International`,
    description,
    alternates: {
      canonical: `/products/${product.slug}`
    },
    openGraph: {
      title: `${product.name} | ${product.id}`,
      description,
      url: `https://suxingapparel.com/products/${product.slug}`,
      siteName: "SUXING International",
      images: [{ url: product.image, alt: product.name }],
      locale: "en_US",
      type: "website"
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex max-h-[760px] min-h-[420px] items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-white via-sky-50/70 to-white p-5 shadow-airy">
          <Image src={product.image} alt={product.name} width={980} height={980} className="max-h-[720px] w-full object-contain" priority />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">{product.category}</p>
        <h1 className="mt-3 text-5xl font-semibold text-ink">{product.name}</h1>
        <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-sky-100 bg-white/82 p-5 text-sm text-slate-700">
          <p><span className="font-semibold text-ink">Model:</span> {product.id}</p>
          <p><span className="font-semibold text-ink">Color / Size:</span> {product.spec || "Custom program details available by inquiry"}</p>
          <p><span className="font-semibold text-ink">Materials:</span> {product.materials.join(", ") || "Confirmed by style and fabric selection"}</p>
        </div>
        <p className="mt-8 text-lg leading-8 text-slate-600">{product.description || "A customizable apparel style prepared for B2B seasonal development and private-label programs."}</p>
        {product.detail ? <p className="mt-5 text-base leading-8 text-slate-600">{product.detail}</p> : null}
        <div className="mt-10">
          <InquiryForm product={product} />
        </div>
      </div>
    </main>
  );
}
