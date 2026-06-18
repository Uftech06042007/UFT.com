import type { MetadataRoute } from "next";

const BASE = "https://uftech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/careers", priority: 0.8 },
    { path: "/jobs", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
