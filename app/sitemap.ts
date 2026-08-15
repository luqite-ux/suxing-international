import type { MetadataRoute } from "next";
import { products } from "@/src/data/site";

const baseUrl = "https://suxingapparel.com";

const staticRoutes = ["", "/about", "/products", "/manufacturing", "/oem-odm", "/quality", "/faq", "/news", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
