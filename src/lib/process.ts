export interface ProcessStep {
  num: string;
  title: string;
  body: string;
}

// How a glazing scope runs from bid day to closeout. Deliverables and sequencing
// only — no invented durations. Lead-time numbers can slot into the bodies later
// if the owner supplies them.
export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Preconstruction",
    body: "We review the drawings and spec, price the scope, and flag long-lead items. If the budget's tight, we'll tell you where the money is.",
  },
  {
    num: "02",
    title: "BIM & Clash Coordination",
    body: "We work off your model. Clashes get found and resolved before fabrication, while they're cheap to fix.",
  },
  {
    num: "03",
    title: "Shop Drawings & Submittals",
    body: "Shop drawings, engineering calcs, and finish samples through architect approval. Every submittal is tracked to a date.",
  },
  {
    num: "04",
    title: "Fabrication & Procurement",
    body: "Glass and aluminum get released to match the install sequence. We track lead times weekly and report them to your team.",
  },
  {
    num: "05",
    title: "Layout & Installation",
    body: "Total-station layout, embeds and anchors, then glass floor by floor. One crew, sequenced with your other trades.",
  },
  {
    num: "06",
    title: "Water Testing & QA",
    body: "AAMA field water testing and thermal imaging before the envelope consultant shows up. We punch our own work first.",
  },
  {
    num: "07",
    title: "Closeout",
    body: "Warranties, as-builts, and the O&M package, complete. Retention shouldn't wait on paperwork.",
  },
];
