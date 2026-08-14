import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/src/data/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "OEM/ODM", href: "/oem-odm" },
  { label: "Quality", href: "/quality" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link aria-label="SUXING International home" href="/" className="flex min-w-0 items-center gap-3">
          <Image src={siteConfig.logo} alt="SUXING International logo" width={54} height={54} className="h-11 w-11 rounded-full object-cover" priority />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-ink sm:block">{siteConfig.brandName}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ocean">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-semibold text-white shadow-airy transition hover:bg-ocean sm:px-4">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Send Inquiry</span>
        </Link>
      </div>
    </header>
  );
}
