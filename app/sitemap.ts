import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/data";

// Bump this when content changes so lastModified stays a meaningful crawl signal
// (avoids reporting "modified today" on every request).
const CONTENT_UPDATED = "2026-06-24";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/products", priority: 0.9, freq: "weekly" as const },
    { path: "/services", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
  ];

  const productRoutes = PRODUCTS.map((p) => ({
    path: `/products/${p.slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...productRoutes].map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
