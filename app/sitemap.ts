import type { MetadataRoute } from "next";
import { products } from "@/src/data/site";
import { readArticles } from '@/lib/articles.mjs';

export const dynamic = 'force-dynamic';

const baseUrl = "https://suxingapparel.com";

const staticRoutes = ["", "/about", "/products", "/manufacturing", "/oem-odm", "/quality", "/faq", "/news", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await readArticles('en');
  const now = new Date();

  return [
    ...articles.map(article => ({ url: `${baseUrl}/news/${encodeURIComponent(article.slug)}`, lastModified: article.updatedAt, changeFrequency: 'weekly' as const, priority: 0.6 })),
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
