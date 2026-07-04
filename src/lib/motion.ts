// Shared GSAP motion constants. CLIENT-ONLY: registering CustomEase and calling
// CustomEase.create run at module load, so this must only be imported from
// "use client" modules (Reveal, PageHero, home page.tsx). Importing it from a
// server component would pull gsap into the server bundle.
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// Signature structural ease — steep attack, long settle. The CSS twin is the
// --ease-glass family used by the route-transition panel wipe.
CustomEase.create("arcgStruct", "0.7,0,0.16,1");

export const EASE = {
  /** Structural moves: rules drawing in, panels clipping, hero image. */
  struct: "arcgStruct",
  /** Text rises — snappier than structural so copy reads first. */
  text: "expo.out",
  /** Small UI (buttons, tags). */
  ui: "power2.out",
  /** Content blocks (cards, paragraphs). */
  content: "power3.out",
} as const;

export const DUR = { xs: 0.5, sm: 0.7, md: 0.9, lg: 1.2 } as const;

export const STAGGER = { text: 0.09, ui: 0.07, card: 0.1 } as const;
