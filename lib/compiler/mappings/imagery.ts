import { Choices } from "@/lib/share/schema";

export function compileImageryTokens(imagery: Choices["imagery"]): string {
  if (imagery.type === "none") {
    return `Asset Strategy: Strict typographic and layout focus. No decorative photography or illustrations. Rely entirely on whitespace, high-contrast typography, and structural lines.`;
  }

  const placementList = imagery.placement.join(", ");
  const shapeMap = {
    sharp: "border-radius: 0px (strict architectural razor-sharp cuts)",
    rounded: "border-radius: 12px with overflow: hidden and subtle 1px border stroke",
    pill: "border-radius: 9999px pill masks on featured vignettes",
    "organic-mask": "custom clip-path mask (polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%))",
  };

  const sizeMap = {
    compact: "Contained within columns, height: 320px, object-fit: cover",
    medium: "Span 8 columns in grid, height: 520px, aspect-ratio: 16/10",
    "full-bleed": "Full-bleed container (width: 100vw, margin-left: calc(50% - 50vw)), height: 720px, aspect-ratio: 16/9",
  };

  return `
Imagery & Visual Asset Rules:
- Primary Asset Type: ${imagery.type.replace("-", " ").toUpperCase()}
- Designated Placements: ${placementList}
- Asset Framing & Geometry: ${shapeMap[imagery.shape]}
- Scale & Bleed Strategy: ${sizeMap[imagery.size]}
- Imagery Sourcing Rule: Assets must be loaded from a local user-supplied folder (/public/images/) or rendered as CSS/SVG art-directed placeholders with explicit width/height and descriptive alt text. Never load unauthenticated external stock URLs or broken third-party CDNs.
- Image Loading Performance: All hero assets must have priority={true} (in Next.js) or fetchpriority="high", explicit width and height attributes to eliminate Cumulative Layout Shift (CLS), and modern WebP/AVIF formats.
- Visual Tone: High-fidelity curation consistent with brand feeling; never use generic royalty-free stock imagery or artificial gradient placeholder boxes.
`.trim();
}
