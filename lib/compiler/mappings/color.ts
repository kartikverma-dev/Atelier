import { Choices } from "@/lib/share/schema";

/**
 * Calculates relative luminance from hex string according to WCAG 2.1 specifications.
 */
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return 0.5;

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Returns contrast ratio between two hex colors (e.g. 4.5:1 -> 4.5).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

export interface ContrastPairCheck {
  label: string;
  foregroundToken: string;
  foregroundHex: string;
  backgroundToken: string;
  backgroundHex: string;
  ratio: number;
  wcagAAMet: boolean;
}

export interface ColorCompilationResult {
  tokenBlock: string;
  pairs: ContrastPairCheck[];
  allWcagAAMet: boolean;
  failedPairs: ContrastPairCheck[];
  notes: string;
}

/**
 * Verifies contrast for every text/background pair, including button label on accent and muted text.
 * Prints each ratio in the prompt and highlights any failing pair under 4.5:1.
 * Strictly uses only user palette colors.
 */
export function compileColorTokens(color: Choices["color"]): ColorCompilationResult {
  // Determine which palette token gives best contrast for button label on accent
  const bgOnAccent = getContrastRatio(color.background, color.accent);
  const textOnAccent = getContrastRatio(color.text, color.accent);
  const buttonLabelToken = bgOnAccent >= textOnAccent ? "Canvas Background" : "Primary Text";
  const buttonLabelHex = bgOnAccent >= textOnAccent ? color.background : color.text;
  const buttonLabelRatio = Math.max(bgOnAccent, textOnAccent);

  const pairs: ContrastPairCheck[] = [
    {
      label: "Primary Text on Canvas Background",
      foregroundToken: "color.text",
      foregroundHex: color.text,
      backgroundToken: "color.background",
      backgroundHex: color.background,
      ratio: getContrastRatio(color.text, color.background),
      wcagAAMet: getContrastRatio(color.text, color.background) >= 4.5,
    },
    {
      label: "Primary Text on Card Surface",
      foregroundToken: "color.text",
      foregroundHex: color.text,
      backgroundToken: "color.surface",
      backgroundHex: color.surface,
      ratio: getContrastRatio(color.text, color.surface),
      wcagAAMet: getContrastRatio(color.text, color.surface) >= 4.5,
    },
    {
      label: "Muted Text on Canvas Background",
      foregroundToken: "color.mutedText",
      foregroundHex: color.mutedText,
      backgroundToken: "color.background",
      backgroundHex: color.background,
      ratio: getContrastRatio(color.mutedText, color.background),
      wcagAAMet: getContrastRatio(color.mutedText, color.background) >= 4.5,
    },
    {
      label: "Muted Text on Card Surface",
      foregroundToken: "color.mutedText",
      foregroundHex: color.mutedText,
      backgroundToken: "color.surface",
      backgroundHex: color.surface,
      ratio: getContrastRatio(color.mutedText, color.surface),
      wcagAAMet: getContrastRatio(color.mutedText, color.surface) >= 4.5,
    },
    {
      label: `Button Label (${buttonLabelToken}) on Interactive Accent`,
      foregroundToken: buttonLabelToken,
      foregroundHex: buttonLabelHex,
      backgroundToken: "color.accent",
      backgroundHex: color.accent,
      ratio: buttonLabelRatio,
      wcagAAMet: buttonLabelRatio >= 4.5,
    },
  ];

  const failedPairs = pairs.filter((p) => !p.wcagAAMet);
  const allWcagAAMet = failedPairs.length === 0;

  const contrastReport = pairs
    .map(
      (p) =>
        `- ${p.label} (${p.foregroundHex} on ${p.backgroundHex}): ${p.ratio}:1 [${
          p.ratio >= 7.0
            ? "WCAG AAA Pass"
            : p.ratio >= 4.5
            ? "WCAG AA Pass"
            : "FAIL: Below WCAG AA 4.5:1 minimum threshold"
        }]`
    )
    .join("\n");

  const tokenBlock = `
Exact Color Tokens:
- Primary Brand: ${color.primary}
- Secondary / Supporting: ${color.secondary}
- Interactive Accent: ${color.accent}
- Canvas Background: ${color.background}
- Card / Panel Surface: ${color.surface}
- Body Text (Primary): ${color.text}
- Muted / Caption Text: ${color.mutedText}
- Active Color Scheme Mode: ${color.colorScheme.toUpperCase()} (${color.colorScheme === "both" ? "Light base with dark mode toggle" : color.colorScheme + " theme only"})

Contrast Ratio Verification (Every Pair Checked):
${contrastReport}
`.trim();

  let notes = `All colors must be registered in CSS variables or tailwind.config.ts (--color-primary: ${color.primary}; --color-background: ${color.background}; --color-surface: ${color.surface}; --color-accent: ${color.accent}; --color-text: ${color.text}; --color-muted: ${color.mutedText}). Never use generic framework blue or uncalibrated grays outside this user palette.`;
  if (!allWcagAAMet) {
    notes += ` Attention: ${failedPairs.length} text pair(s) fail the 4.5:1 threshold: ${failedPairs.map((f) => f.label + ` (${f.ratio}:1)`).join(", ")}. Provide high-contrast fallbacks when rendered for body copy.`;
  }

  return {
    tokenBlock,
    pairs,
    allWcagAAMet,
    failedPairs,
    notes,
  };
}
