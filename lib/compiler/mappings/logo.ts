import { Choices, LogoChoices } from "@/lib/share/schema";

/**
 * Extracts clean, deterministic initials from a brand name (e.g. "Maison Aurelia" -> "MA").
 */
export function getBrandInitials(brandName: string): string {
  const trimmed = (brandName || "").trim();
  if (!trimmed) return "AT";
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
  if (trimmed.length >= 2) {
    return trimmed.slice(0, 2).toUpperCase();
  }
  return trimmed.toUpperCase();
}

/**
 * Resolves font specification for logo lettering.
 */
function resolveLetteringFont(
  letteringStyle: string,
  typography: { headingFont: string; headingWeight?: string }
): string {
  switch (letteringStyle) {
    case "heading-font":
      return `"${typography.headingFont}", ${typography.headingWeight || "600"}`;
    case "high-contrast-serif":
      return `"Playfair Display", 600`;
    case "geometric-sans":
      return `"Space Grotesk", 700`;
    case "humanist-sans":
      return `"Plus Jakarta Sans", 600`;
    case "monospace":
      return `"JetBrains Mono", 500`;
    default:
      return `"${letteringStyle || typography.headingFont}", 600`;
  }
}

/**
 * Compiles exact, deterministic prompt specifications for brand mark, logo, and icon set.
 */
export function compileLogoTokens(
  logo: LogoChoices,
  brandName: string,
  colors: Choices["color"],
  typography: { headingFont: string; headingWeight?: string },
  pwaEnabled: boolean
): string {
  const initials = getBrandInitials(brandName);
  const fontSpec = resolveLetteringFont(logo.letteringStyle, typography);
  const effectiveBrandName = (brandName || "Atelier").trim();

  const trackingMap = {
    tight: "-0.02em",
    normal: "0.04em",
    wide: "0.24em",
  };
  const trackingValue = trackingMap[logo.tracking] || "0.04em";

  const caseMap = {
    normal: "title-case / standard capitalization",
    uppercase: "uppercase",
    "small-caps": "small-caps font-variant",
  };
  const caseValue = caseMap[logo.letterCase] || "uppercase";

  // Build primary logo instruction block
  let logoInstructions = "";

  if (logo.source === "already-have") {
    const darkSwapNote = logo.hasDarkVersion
      ? ` If a dark-background version is available at "${logo.existingFile.replace(/\.svg$/, "-dark.svg")}", swap it dynamically in dark mode.`
      : ` Ensure the logo is placed over a background that maintains at least 3:1 contrast in both light and dark themes.`;
    logoInstructions = `Use the existing SVG file at "${logo.existingFile}" as given. Do not redraw, recolor, or restyle it.${darkSwapNote}`;
  } else if (logo.source === "wordmark-only" || logo.logoType === "wordmark") {
    logoInstructions = `Build the logo as an inline SVG component \`<Logo />\`. Convert the text "${effectiveBrandName}" to outlined paths using the font ${fontSpec}, ${caseValue}, letter-spacing ${trackingValue}, fill \`currentColor\` (inheriting the text token ${colors.text}), rendered at height ${logo.navbarHeight}px in the navigation bar.`;
  } else if (logo.logoType === "monogram") {
    const badgeColor =
      logo.colorUse === "two-color"
        ? colors.surface
        : logo.colorUse === "single-color"
        ? colors.surface
        : colors.surface;
    const initialColor =
      logo.colorUse === "two-color"
        ? colors.accent
        : colors.text;

    logoInstructions = `Create a 40x40 rounded-square badge (radius 8px) filled with "${badgeColor}", containing the initials "${initials}" in ${fontSpec}, font-size 18px, fill "${initialColor}", with a 1px border at 12% opacity using "${colors.accent}". Render at height ${logo.navbarHeight}px in the navigation bar alongside the wordmark text "${effectiveBrandName}".`;
  } else if (logo.logoType === "symbol-wordmark") {
    const symbolColor = logo.colorUse === "two-color" ? colors.accent : colors.text;
    logoInstructions = `Build an inline SVG component \`<Logo />\` combining a custom vector symbol and wordmark at height ${logo.navbarHeight}px in the navigation bar:
- Vector Symbol: ${logo.symbolStyle} aesthetic representing "${logo.symbolIdea}". Drawn with clean SVG vector paths (no raster embeds or strokes with variable non-scaling widths), filled or stroked in "${symbolColor}".
- Wordmark: The text "${effectiveBrandName}" converted to outlined vector paths in ${fontSpec}, ${caseValue}, letter-spacing ${trackingValue}, fill "${colors.text}".`;
  } else if (logo.logoType === "badge") {
    logoInstructions = `Create an architectural emblem/badge seal (height ${logo.navbarHeight}px in navigation bar):
- Outer geometry: Geometric circular or shield badge with a 1.5px border in "${colors.accent}", enclosing a subtle fill of "${colors.surface}".
- Inner iconography: Vector monogram initials "${initials}" centered in ${fontSpec}, with the brand name "${effectiveBrandName}" inscribed along the lower arc in ${caseValue}, letter-spacing ${trackingValue}.`;
  }

  // Placements
  const placementMap: Record<string, string> = {
    "navbar-left": "Navigation Bar (Left)",
    "navbar-center": "Navigation Bar (Center)",
    footer: "Footer / Colophon",
    hero: "Hero Landmark",
    "loading-screen": "Application Splash / Loading Screen",
  };
  const placementList = (logo.placement || ["navbar-left", "footer"])
    .map((p) => placementMap[p] || p)
    .join(", ");

  // Icon set specification
  const iconSourceType =
    logo.iconSource === "symbol" && logo.logoType !== "wordmark"
      ? `the vector symbol ("${logo.symbolIdea}")`
      : `the brand initials monogram ("${initials}")`;

  const shapeMap = {
    square: "sharp square (0px radius)",
    "rounded-square": "rounded-square (22% radius)",
    circle: "circular (50% radius)",
  };
  const shapeSpec = shapeMap[logo.iconShape] || "rounded-square";

  const pwaIconsSpec = pwaEnabled
    ? `\n- PWA Web App Icons: 192x192 PNG, 512x512 PNG with purpose "any", and 512x512 maskable PNG with purpose "maskable" (ensuring the core glyph sits strictly within the central 80% safe zone).`
    : `\n- PWA Icons: When PWA is enabled, provide 192x192, 512x512, and maskable 512x512 PNG icons.`;

  return `Primary Logo Specification:
${logoInstructions}

Target Placement Landmarks:
- Rendered in: ${placementList}
- Navbar Sizing: Exactly ${logo.navbarHeight}px height with natural intrinsic aspect ratio preserved to prevent layout shift (CLS: 0).

Brand Iconography & Favicon Set:
- Favicon: Multi-resolution favicon suite consisting of \`favicon.svg\` (vector for modern browsers) and \`favicon.ico\` (16x16, 32x32, 48x48 fallback).
- Apple Touch Icon: 180x180 PNG formatted for iOS home screen bookmarks.
- Social Share Preview: Open Graph social card image at 1200x630px featuring the official logo centered on the brand background (${colors.background}) with subtle brand typography.${pwaIconsSpec}
- Icon Visual Treatment: Render ${iconSourceType} inside a ${shapeSpec} container with ${colors.surface} background and ${colors.accent} accent strokes.

Mandatory Architectural & Brand Integrity Rules:
1. Logo must be pure SVG: All logo marks and wordmarks must be rendered as clean inline SVG or standalone SVG files. Raster-only logos (JPEG/PNG) and external CDN image/font URLs are strictly forbidden.
2. Outline conversion: Convert all text in SVG logos to outlined vector paths (\`<path>\` elements) so rendering never depends on external font availability.
3. Contrast & Accessibility: The logo mark and lettering must achieve a minimum 3:1 contrast ratio against the navbar and surface backgrounds across both light and dark themes. Always include an accessible name (\`aria-label="${effectiveBrandName}"\` or \`<title>${effectiveBrandName}</title>\`).
4. Clear-space margin: Maintain a clear-space perimeter around the logo equal to at least the cap-height of the logo's uppercase lettering on all sides.
5. Originality: Do not imitate, copy, or resemble any existing company's trademarked logo or identity.`;
}
