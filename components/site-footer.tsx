import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/src/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[linear-gradient(135deg,#eefaff,#ffffff_45%,#f8f0d8)] text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean">{siteConfig.brandName}</p>
          <h2 className="mt-3 text-3xl font-semibold">Premium apparel manufacturing for global B2B programs.</h2>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-airy transition hover:bg-ink">
            Send Inquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/products" className="hover:text-ocean">Products</Link>
            <Link href="/manufacturing" className="hover:text-ocean">Manufacturing</Link>
            <Link href="/oem-odm" className="hover:text-ocean">OEM/ODM</Link>
            <Link href="/quality" className="hover:text-ocean">Quality</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <span className="flex gap-2"><Phone className="h-4 w-4 text-ocean" /> {siteConfig.contact.phone}</span>
            <span className="flex gap-2"><Mail className="h-4 w-4 text-ocean" /> {siteConfig.contact.email}</span>
            <span className="flex gap-2"><MapPin className="h-4 w-4 text-ocean" /> {siteConfig.contact.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-sky-100 px-4 py-5 text-center text-xs text-slate-500">
        © 2026 {siteConfig.companyName}. B2B apparel manufacturing website.
      </div>
    </footer>
  );
}
