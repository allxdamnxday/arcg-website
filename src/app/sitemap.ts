import type { MetadataRoute } from "next";
import { getLiveProjects, PROJECTS_LIVE } from "@/lib/projects";

const BASE = "https://arcontractglazing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Projects are staged out of the index until real photography lands — see
  // PROJECTS_LIVE in src/lib/projects.ts.
  if (!PROJECTS_LIVE) return core;

  return [
    ...core,
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getLiveProjects().map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
