import type { StaticImageData } from "next/image";
// Real CompanyCam photos from the Hollywood Park (Kali Hotel) job. Static imports
// give free blurDataURL (placeholder="blur"). Curated with a vision pass and
// hand-verified: no GC (Clayco) signage, no other-sub vests, timestamps cropped.
import hphHero from "../images/hph/hero.webp";
import hphG1 from "../images/hph/g1.webp";
import hphG2 from "../images/hph/g2.webp";
import hphG3 from "../images/hph/g3.webp";
import hphG4 from "../images/hph/g4.webp";
import hphG5 from "../images/hph/g5.webp";
import hphG6 from "../images/hph/g6.webp";

export interface Project {
  slug: string;
  title: string;
  /** Internal reference only — GC names are not displayed publicly (kept generic). */
  client: string;
  /** Public-facing sector label shown in place of the GC name. */
  sector: string;
  location: string;
  year: string;
  scope: string;
  /** Service slugs this project exercised (see src/lib/services.ts). */
  services: string[];
  description: string;
  stats: { label: string; value: string }[];
  image: string | StaticImageData;
  gallery?: (string | StaticImageData)[];
  featured?: boolean;
  /** Only projects with real photography are shown/indexed. Others stay staged. */
  live?: boolean;
}

// TODO: Replace remaining Unsplash placeholders with real CompanyCam photos, then
// set live:true on that project (this un-hides it in the nav, index, and sitemap).
export const projects: Project[] = [
  {
    slug: "hollywood-park-hotel",
    title: "Hollywood Park Hotel",
    client: "Clayco",
    sector: "Hospitality",
    location: "Inglewood, CA",
    year: "2024–Present",
    scope: "Curtain Wall Installation",
    services: ["curtain-wall", "layout-coordination", "qaqc-closeout"],
    description:
      "Our flagship job. A 12-story hotel at the Hollywood Park development next to SoFi Stadium. Full curtain wall in unitized panels across every elevation, with tricky geometric transitions at the podium. Over 5,000 units, sequenced around a dozen other trades on an active site.",
    stats: [
      { label: "Floors", value: "12" },
      { label: "Units", value: "5,000+" },
      { label: "System", value: "Unitized CW" },
      { label: "Status", value: "Active" },
    ],
    image: hphHero,
    gallery: [hphG1, hphG2, hphG3, hphG4, hphG5, hphG6],
    featured: true,
    live: true,
  },
  {
    slug: "david-yurman",
    title: "David Yurman Flagship",
    client: "Bellapart",
    sector: "Retail",
    location: "Beverly Hills, CA",
    year: "2024",
    scope: "Specialty Storefront Glazing",
    services: ["storefront-entrances", "specialty-glazing"],
    description:
      "A storefront for the David Yurman flagship on Rodeo Drive. Custom mullion profiles, specialty hardware, and tight reveals, where every joint sits at arm's length from the sidewalk.",
    stats: [
      { label: "Type", value: "Retail Storefront" },
      { label: "Glass", value: "Custom Profile" },
      { label: "Location", value: "Rodeo Drive" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=85",
    featured: true,
  },
  {
    slug: "mixed-use-tower",
    title: "Mixed-Use Tower",
    client: "Ventana DBS",
    sector: "Mixed-Use",
    location: "Los Angeles, CA",
    year: "2023",
    scope: "Curtain Wall & Window Systems",
    services: ["curtain-wall", "window-systems", "layout-coordination"],
    description:
      "A multi-story mixed-use development in downtown Los Angeles. Stick-built curtain wall with operable windows integrated on the residential floors. We resolved clashes against the BIM model before installation to hold the schedule.",
    stats: [
      { label: "Type", value: "Mixed-Use" },
      { label: "System", value: "Stick-Built CW" },
      { label: "Location", value: "Downtown LA" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    featured: true,
  },
  {
    slug: "luxury-condominiums",
    title: "Luxury Condominiums",
    client: "General Contractor",
    sector: "Residential",
    location: "Santa Monica, CA",
    year: "2022",
    scope: "Window Systems & Glass Railings",
    services: ["window-systems", "specialty-glazing"],
    description:
      "An oceanfront condominium with floor-to-ceiling windows and glass railings on every balcony. Salt-air-rated hardware and coatings throughout, since the building takes weather straight off the water.",
    stats: [
      { label: "Type", value: "Residential" },
      { label: "System", value: "Windows + Railings" },
      { label: "Location", value: "Oceanfront" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=85",
  },
];

// The projects section (nav link, /projects index, sitemap, indexing) turns on as
// soon as any project has real photography (live:true). Staged projects stay hidden.
export const PROJECTS_LIVE = projects.some((p) => p.live);

/** Only projects with real photography — drives the index, detail routes, sitemap. */
export function getLiveProjects(): Project[] {
  return projects.filter((p) => p.live);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** First project that exercised a given service slug — for services↔projects cross-links. */
export function getProjectForService(serviceSlug: string): Project | undefined {
  return projects.find((p) => p.services.includes(serviceSlug));
}
