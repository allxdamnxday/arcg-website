export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  stats: { label: string; value: string }[];
  image: string;
  gallery?: string[];
  featured?: boolean;
}

// TODO: Replace placeholder images with real CompanyCam photos
export const projects: Project[] = [
  {
    slug: "hollywood-park-hotel",
    title: "Hollywood Park Hotel",
    client: "Clayco",
    location: "Inglewood, CA",
    year: "2024–Present",
    scope: "Curtain Wall Installation",
    description:
      "Our flagship project — a 12-story luxury hotel at the Hollywood Park development adjacent to SoFi Stadium. Full curtain wall installation including unitized panels across all elevations, with complex geometric transitions at the podium levels. Over 5,000 individual units coordinated with multiple trades in an active entertainment district.",
    stats: [
      { label: "Floors", value: "12" },
      { label: "Units", value: "5,000+" },
      { label: "GC", value: "Clayco" },
      { label: "Status", value: "Active" },
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
    featured: true,
  },
  {
    slug: "david-yurman",
    title: "David Yurman Flagship",
    client: "Bellapart",
    location: "Beverly Hills, CA",
    year: "2024",
    scope: "Specialty Storefront Glazing",
    description:
      "High-end retail storefront for the David Yurman flagship store on Rodeo Drive. Precision-installed architectural glass with custom mullion profiles and specialty hardware. Every detail visible to the public — zero tolerance for imperfection.",
    stats: [
      { label: "Type", value: "Retail Storefront" },
      { label: "Glass", value: "Custom Profile" },
      { label: "Client", value: "Bellapart" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=85",
    featured: true,
  },
  {
    slug: "mixed-use-tower",
    title: "Mixed-Use Tower",
    client: "Ventana DBS",
    location: "Los Angeles, CA",
    year: "2023",
    scope: "Curtain Wall & Window Systems",
    description:
      "Multi-story mixed-use development in downtown Los Angeles. Stick-built curtain wall system with integrated operable windows on residential floors. Coordinated with BIM to resolve clashes before field installation, keeping the schedule tight.",
    stats: [
      { label: "Type", value: "Mixed-Use" },
      { label: "System", value: "Stick-Built CW" },
      { label: "GC", value: "Ventana DBS" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    featured: true,
  },
  {
    slug: "luxury-condominiums",
    title: "Luxury Condominiums",
    client: "General Contractor",
    location: "Santa Monica, CA",
    year: "2022",
    scope: "Window Systems & Glass Railings",
    description:
      "Oceanfront luxury condominium building featuring floor-to-ceiling window systems and glass railing installations on every balcony. Salt-air rated hardware and coatings throughout.",
    stats: [
      { label: "Type", value: "Residential" },
      { label: "System", value: "Windows + Railings" },
      { label: "Location", value: "Oceanfront" },
      { label: "Status", value: "Complete" },
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=85",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
