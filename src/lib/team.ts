export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** One line on what this person means for the GC's job. */
  forGCs: string;
  /** Portrait photo (4:5). When absent, the card shows a brand hairline instead
      of a fake initials avatar. */
  photo?: string;
}

// TODO(arcg): confirm titles and bios before launch.
export const team: TeamMember[] = [
  {
    name: "Alfonso Rodriguez",
    role: "Owner / Principal",
    bio: "Decades in the field before founding ARCG. Final word on means and methods.",
    forGCs: "Walks the tough conditions himself.",
  },
  {
    name: "Julien Rodriguez",
    role: "Overall Project Manager",
    bio: "Runs every project. Crews, schedule, manpower, and GC coordination run through him.",
    forGCs: "Your point of contact from bid to closeout.",
  },
  {
    name: "Nicholas Rodriguez",
    role: "Superintendent",
    bio: "Runs the field. Owns the install sequence, the crews, and the daily coordination on site.",
    forGCs: "The person holding your schedule floor by floor.",
  },
  {
    name: "Braden Freeman",
    role: "Director of Operations",
    bio: "Project controls, payroll, compliance, and closeout docs.",
    forGCs: "Keeps the paperwork moving as fast as the glass.",
  },
];
