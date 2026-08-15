import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/src/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://suxingapparel.com"),
  title: `${siteConfig.brandName} | Premium Knitwear & Apparel Manufacturing`,
  description: "Bright, premium B2B apparel manufacturing website for knitwear, goose down outerwear, OEM and ODM programs.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteConfig.brandName} | Premium Knitwear & Apparel Manufacturing`,
    description: "B2B apparel manufacturing partner for knitwear, wool sweaters, goose down outerwear, OEM and ODM programs.",
    url: "https://suxingapparel.com",
    siteName: siteConfig.brandName,
    images: [{ url: siteConfig.logo, width: 640, height: 640, alt: "SUXING International logo" }],
    locale: "en_US",
    type: "website"
  },
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
