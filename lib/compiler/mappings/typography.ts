import { Choices } from "@/lib/share/schema";
import { TYPE_SCALES } from "@/data/fonts";

export function compileTypographyTokens(typography: Choices["typography"]): {
  spec: string;
  fontImports: string;
} {
  const scale = TYPE_SCALES[typography.scale] || TYPE_SCALES.balanced;

  const fontImports = `Import Google Fonts:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(typography.headingFont)}:wght@${typography.headingWeight};700&family=${encodeURIComponent(typography.bodyFont)}:wght@${typography.bodyWeight};500;600&family=${encodeURIComponent(typography.monoFont)}:wght@400;500&display=swap" rel="stylesheet">`;

  const spec = `
Typographic Architecture:
- Display & Headings: "${typography.headingFont}", font-weight ${typography.headingWeight}, letter-spacing -0.02em, tight optical kerning.
- Interface & Body Text: "${typography.bodyFont}", font-weight ${typography.bodyWeight}, letter-spacing -0.005em.
- Monospace / Technical Accents: "${typography.monoFont}", font-weight 400, letter-spacing +0.02em.

Type Scale System (${scale.name.toUpperCase()} Scale):
- Hero H1: ${scale.h1} (line-height: ${scale.lineHeightH1})
- Section H2: ${scale.h2} (line-height: 1.2)
- Card / Subsection H3: ${scale.h3} (line-height: 1.3)
- Body Paragraphs: ${scale.body} (line-height: ${scale.lineHeightBody})
- Small / Metadata / Badges: ${scale.small} (line-height: 1.4)
- Prose Measure: Limit long-form reading copy strictly to max-width: 65ch to prevent line exhaustion.
`.trim();

  return { spec, fontImports };
}
