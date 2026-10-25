import { Choices } from "@/lib/share/schema";

export function compileLayoutTokens(layout: Choices["layout"], sections: string[]): string {
  const containerWidthMap = {
    narrow: "max-width: 1040px (optimized for editorial prose and reading focus)",
    default: "max-width: 1240px (balanced desktop measure)",
    wide: "max-width: 1440px (expansive architectural showcase with wide margins)",
    full: "max-width: 100% with padding-inline: 48px",
  };

  const gutterMap = {
    compact: "gap: 16px (high-density layout)",
    default: "gap: 24px (standard grid rhythm)",
    relaxed: "gap: 40px (editorial breathing space)",
  };

  const spacingScaleMap = {
    compact: "padding-block: 64px; element spacing: 24px;",
    comfortable: "padding-block: 96px; element spacing: 32px;",
    generous: "padding-block: 128px; element spacing: 48px;",
  };

  const navbarMap = {
    top: "Fixed top navbar with frosted backdrop and 1px bottom border separator",
    floating: "Floating island pill navigation (top: 24px; width: fit-content; border-radius: 9999px; padding: 12px 24px; backdrop-filter: blur(12px); border: 1px solid var(--border-color);)",
    sidebar: "Fixed vertical left navigation rail (width: 260px) with collapsible mobile drawer",
    hidden: "Hidden minimalist drawer menu opened via single top-right corner trigger",
  };

  const footerMap = {
    minimal: "Single-line horizontal baseline colophon with copyright, status indicator, and legal links",
    "multi-column": "4-column structured directory footer with categorized links and newsletter signup",
    editorial: "Large-type editorial footer featuring prominent contact inquiry CTA, local studio coordinates, and colophon",
    centered: "Centered symmetric stack with emblem, primary nav links, and social channels",
  };

  return `
Grid Architecture & Spatial Hierarchy:
- Grid System: ${layout.columns}-column CSS Grid architecture with 1-column mobile collapse.
- Max Container Measure: ${containerWidthMap[layout.containerWidth]}
- Grid Gutters: ${gutterMap[layout.gutter]}
- Vertical Spacing Rhythm: ${spacingScaleMap[layout.spacingScale]}
- Navigation Pattern: ${navbarMap[layout.navbarStyle]}
- Footer Architecture: ${footerMap[layout.footerStyle]}
- Section Sequence (Unified with Content): ${sections.map((s, i) => `${i + 1}. [${s}]`).join(" -> ")}
`.trim();
}
