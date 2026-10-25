/**
 * Curated list of distinctive, opinionated design flourishes.
 * Driven deterministically by seed so same seed + choices = byte-identical prompt.
 */
export const UNIQUENESS_CONSTRAINTS = [
  "Incorporate a persistent micro-colophon in the lower-right viewport displaying active reading section, scroll percentage, and UTC timestamp.",
  "Use asymmetrical margin overhangs on prominent imagery, allowing featured visuals to break 40px outside the primary column boundary on desktop.",
  "Feature an audio-visual micro-indicator or subtle ambient sound toggle with visual harmonic waves.",
  "Integrate a tactile magnetic hover effect on primary interactive buttons that pulls the element 4px toward cursor coordinates.",
  "Implement custom typography-driven numeral numbering (01, 02, 03) styled with 50% opacity superscripts preceding each major section heading.",
  "Add an interactive command palette (Cmd+K / Ctrl+K) allowing quick navigation between sections and themes.",
  "Render a bespoke cursor follower that inverts contrast when hovering above headings and expands when hovering clickable media.",
  "Incorporate fine architectural hairline corner crosshair tick marks (+) on all major card containers.",
  "Include a live local studio time indicator and sunrise/sunset ambient color shift based on client geographical timezone.",
  "Design a horizontal accordion drawer mechanism for secondary case studies or project metadata.",
  "Display subtle coordinate typography (lat/long or matrix index) embedded into section divider lines.",
  "Utilize an editorial drop-cap letterform on the opening paragraph styled with the accent color token.",
];

/**
 * Returns a deterministic uniqueness constraint chosen based on the seed.
 */
export function getDeterministicUniquenessConstraint(seed: number): string {
  const index = Math.abs(seed) % UNIQUENESS_CONSTRAINTS.length;
  return UNIQUENESS_CONSTRAINTS[index];
}
