import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/login", "/preview"]
      }
    ],
    sitemap: "https://suxingapparel.com/sitemap.xml",
    host: "https://suxingapparel.com"
  };
}
