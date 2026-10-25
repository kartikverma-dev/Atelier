import { Choices } from "@/lib/share/schema";

export function compileComponentTokens(components: Choices["components"], accentHex: string): string {
  const shapeMap = {
    sharp: "border-radius: 0px",
    "subtle-round": "border-radius: 6px",
    pill: "border-radius: 9999px",
  };

  const sizeMap = {
    sm: "height: 38px; padding-inline: 16px; font-size: 13px; font-weight: 500;",
    md: "height: 48px; padding-inline: 24px; font-size: 14px; font-weight: 600; letter-spacing: 0.02em;",
    lg: "height: 56px; padding-inline: 32px; font-size: 16px; font-weight: 600;",
  };

  const hoverMap = {
    "subtle-lift": "transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12); transition: transform 200ms ease, box-shadow 200ms ease;",
    "fill-expand": `background: ${accentHex}; transition: background 250ms cubic-bezier(0.16, 1, 0.3, 1);`,
    glow: `box-shadow: 0 0 24px ${accentHex}66; transition: box-shadow 300ms ease;`,
    invert: "filter: invert(1); transition: filter 150ms ease;",
    scale: "transform: scale(1.03); transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);",
  };

  const cardMap = {
    "border-only": "background: transparent; border: 1px solid var(--border-color); box-shadow: none;",
    "subtle-elevated": "background: var(--surface-color); border: 1px solid var(--border-color); box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);",
    "frosted-glass": "background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.12);",
    "tinted-flat": "background: var(--surface-color); border: none; box-shadow: none;",
    "deep-shadow": "background: var(--surface-color); box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color);",
  };

  const formMap = {
    "minimal-underline": `Input fields have 0px side and top borders, with 1.5px bottom border that transitions to ${accentHex} on focus.`,
    "enclosed-pill": "Input fields have 9999px pill enclosure with 20px internal horizontal padding.",
    "crisp-bordered": `Input fields have 1px solid border, 6px border-radius, and focus ring (outline: 2px solid ${accentHex}; outline-offset: 2px;).`,
    "floating-label": "Input fields feature floating animated labels translating -16px upon input focus.",
  };

  const radiusScaleMap = {
    none: "--radius-base: 0px",
    subtle: "--radius-sm: 2px; --radius-md: 4px; --radius-lg: 8px;",
    medium: "--radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;",
    large: "--radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px;",
    full: "--radius-controls: 9999px; --radius-cards: 24px;",
  };

  const shadowMap = {
    none: "box-shadow: none !important (flat planes and borders only)",
    crisp: "box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.9) (brutalist hard stamp)",
    soft: "box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.03)",
    deep: "box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.08)",
  };

  const iconMap = {
    "stroke-thin": "Lucide icons rendered with strokeWidth={1.25}",
    "stroke-bold": "Lucide icons rendered with strokeWidth={2.5}",
    duotone: "Duotone SVG icons featuring secondary fill at 20% opacity and primary stroke at 2px",
    solid: "Filled solid glyphs for categorical clarity",
  };

  return `
Component Specifications & Interactive Micro-Tokens:
- Button Architecture: ${shapeMap[components.buttonShape]}; ${sizeMap[components.buttonSize]}
- Button Hover Choreography: ${hoverMap[components.buttonHover]}
- Card Treatment: ${cardMap[components.cardStyle]}
- Form Field System: ${formMap[components.formStyle]}
- Global Radius Scale: ${radiusScaleMap[components.borderRadiusScale]}
- Elevation & Shadows: ${shadowMap[components.shadowStyle]}
- Iconography Style: ${iconMap[components.iconStyle]}
- Interactive States: All clickable controls MUST implement explicit :focus-visible { outline: 2px solid ${accentHex}; outline-offset: 2px; } for keyboard accessibility.
`.trim();
}
