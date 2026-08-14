import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/src/data/site";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | Premium Knitwear & Apparel Manufacturing`,
  description: "Bright, premium B2B apparel manufacturing website for knitwear, goose down outerwear, OEM and ODM programs.",
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
