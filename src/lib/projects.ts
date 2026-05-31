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
      "Our flagship job. A 12-story hotel at the Hollywood Park development next to SoFi Stadium. Full curtain wall in unitized panels across every elevation, with tricky geometric transitions at the podium. Over 5,000 units, sequenced around a dozen other trades on an active site.",
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
      "A storefront for the David Yurman flagship on Rodeo Drive. Custom mullion profiles, specialty hardware, and tight reveals, where every joint sits at arm's length from the sidewalk.",
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
      "A multi-story mixed-use development in downtown Los Angeles. Stick-built curtain wall with operable windows integrated on the residential floors. We resolved clashes against the BIM model before installation to hold the schedule.",
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

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
