import { UIStyle, Choices } from "@/lib/share/schema";

export interface StyleMapping {
  headingTone: string;
  materiality: string;
  borderRadiusRule: string;
  shadowRule: string;
  borderRule: string;
  spacingPhilosophy: string;
  aestheticSummary: string;
}

/**
 * Dynamically compiles style descriptions using the user's chosen fonts, colors, and motion library.
 * Resolves contradictions between style text, font choice, and motion engine.
 * Never leaks Atelier brand colors or alternative motion libraries.
 * Replaces all ranges with single exact values.
 */
export function compileStyleTokens(
  uiStyle: UIStyle,
  typography: Partial<Choices["typography"]> & {
    headingFont: string;
    bodyFont: string;
    headingWeight?: string;
  },
  motion: Choices["motion"],
  color: Choices["color"]
): StyleMapping {
  const motionLibNotice =
    motion.library === "none"
      ? "Zero animation runtime with instant state changes."
      : `Orchestrated exclusively using ${motion.library} with zero secondary animation dependencies.`;

  switch (uiStyle) {
    case "minimal":
      return {
        headingTone: `Disciplined typography set in "${typography.headingFont}" (${typography.headingWeight} weight, letter-spacing -0.015em) paired with "${typography.bodyFont}" for hyper-clean legibility.`,
        materiality: `Pure planar surfaces utilizing user background ${color.background} and card surface ${color.surface} with 40% negative space ratio.`,
        borderRadiusRule: "0px radius across containers; 2px radius on interactive controls.",
        shadowRule: "box-shadow: none (layering achieved exclusively via 1px border lines and tonal contrast).",
        borderRule: `1px solid ${color.mutedText}26 (subtle hairline borders).`,
        spacingPhilosophy: "Typographic line-height 1.7; vertical section padding 120px; prose measure 65ch.",
        aestheticSummary: `Swiss-inspired architectural minimalism driven by "${typography.headingFont}" headings, quiet negative space, and disciplined layout rhythm. ${motionLibNotice}`,
      };

    case "editorial":
      return {
        headingTone: `Refined display typography set in "${typography.headingFont}" (${typography.headingWeight} weight, letter-spacing -0.015em) paired with "${typography.bodyFont}" for literary immersion.`,
        materiality: `Tactile print-inspired canvas on background ${color.background} with card surface ${color.surface}.`,
        borderRadiusRule: "4px radius on buttons and card containers.",
        shadowRule: "box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04) (soft wide-diffuse ambient depth).",
        borderRule: `1px solid ${color.mutedText}33 (warm paper-tone border).`,
        spacingPhilosophy: "Reading measure 68ch on prose; vertical section padding 112px; line-height 1.7.",
        aestheticSummary: `Prestige monograph editorial atmosphere combining "${typography.headingFont}" headlines with book-weight cadence. ${motionLibNotice}`,
      };

    case "dark-luxury":
      return {
        headingTone: `Cinematic typography set in "${typography.headingFont}" (${typography.headingWeight} weight, letter-spacing -0.02em) with luminous contrast against dark surfaces.`,
        materiality: `Matte dark slate on background ${color.background} and card surface ${color.surface} with ${color.accent} metallic accents.`,
        borderRadiusRule: "4px radius on control elements; 8px radius on content cards.",
        shadowRule: "box-shadow: none (depth achieved with 1px border highlights at 8% opacity).",
        borderRule: `1px solid ${color.mutedText}26 with ${color.accent}40 highlights on hover.`,
        spacingPhilosophy: "Deep cinematic breathing room; vertical section padding 140px; line-height 1.65.",
        aestheticSummary: `Luxury atelier aesthetic rooted in dark planar restraint, bespoke typography in "${typography.headingFont}", and disciplined ${color.accent} accents. ${motionLibNotice}`,
      };

    case "brutalist":
      return {
        headingTone: `High-impact display typography set in "${typography.headingFont}" (${typography.headingWeight} weight, uppercase, letter-spacing -0.02em) with raw industrial authority.`,
        materiality: `Unpolished structural canvas on background ${color.background} with high-contrast surface ${color.surface} and exposed frame lines.`,
        borderRadiusRule: "0px border-radius strictly enforced across all elements.",
        shadowRule: "box-shadow: 4px 4px 0px #000000 (hard offset drop-shadow with 0px blur).",
        borderRule: `2px solid ${color.text} (heavy structural borders).`,
        spacingPhilosophy: "Dense functional packing; vertical section padding 80px; structural divider lines between modules.",
        aestheticSummary: `Neo-brutalist digital architecture celebrating structural honesty, "${typography.headingFont}" typography, and tactile hard stamp shadows. ${motionLibNotice}`,
      };

    case "glassmorphism":
      return {
        headingTone: `Modern display typography in "${typography.headingFont}" (${typography.headingWeight} weight, letter-spacing -0.01em) floating above specular translucent planes.`,
        materiality: `Translucent frosted glass panels (backdrop-filter: blur(16px)) on background ${color.background} and surface ${color.surface}.`,
        borderRadiusRule: "16px radius on glass panels; 9999px pill radius on controls.",
        shadowRule: "box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25).",
        borderRule: `1px solid ${color.mutedText}33 (specular border highlight).`,
        spacingPhilosophy: "Floating card layouts; vertical section padding 96px; line-height 1.6.",
        aestheticSummary: `Futuristic frosted glass design with specular highlights and depth blurs anchored by "${typography.headingFont}". ${motionLibNotice}`,
      };

    case "corporate-clean":
      return {
        headingTone: `Engineered clear typography in "${typography.headingFont}" (${typography.headingWeight} weight, letter-spacing -0.01em) prioritizing speed of comprehension.`,
        materiality: `Crisp structured panels on surface ${color.surface} resting on canvas ${color.background} with confident ${color.accent} actions.`,
        borderRadiusRule: "8px radius on cards; 6px radius on input fields and buttons.",
        shadowRule: "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05).",
        borderRule: `1px solid ${color.mutedText}26 transitioning to ${color.accent} on focus.`,
        spacingPhilosophy: "Bento grid hierarchy; 24px consistent gutters; vertical section padding 96px.",
        aestheticSummary: `World-class enterprise clarity balancing high technical density with "${typography.headingFont}" headings. ${motionLibNotice}`,
      };

    case "neo-retro":
      return {
        headingTone: `Vintage-inspired display typography in "${typography.headingFont}" (${typography.headingWeight} weight) evoking classic print editorial archives.`,
        materiality: `Warm paper feel on background ${color.background} and surface ${color.surface} with subtle halftone dot accents.`,
        borderRadiusRule: "6px radius across interactive components.",
        shadowRule: `box-shadow: 3px 3px 0px ${color.mutedText}40 (warm offset stamp shadow).`,
        borderRule: `1.5px solid ${color.text} (crisp ink borders).`,
        spacingPhilosophy: "Classic editorial column measure; vertical section padding 96px; line-height 1.65.",
        aestheticSummary: `Charming analog nostalgia merging vintage editorial printing traditions in "${typography.headingFont}" with modern digital layout. ${motionLibNotice}`,
      };

    case "soft-3d":
      return {
        headingTone: `Tactile volumetric typography in "${typography.headingFont}" (${typography.headingWeight} weight) with soft friendly curves.`,
        materiality: `Pillowed clay-like volumes on background ${color.background} with diffused ambient lighting on surface ${color.surface}.`,
        borderRadiusRule: "16px radius on cards; 9999px pill radius on badges.",
        shadowRule: "box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.08), -6px -6px 16px rgba(255, 255, 255, 0.6).",
        borderRule: `1px solid ${color.mutedText}1A.`,
        spacingPhilosophy: "Generous volumetric padding; vertical section padding 112px; line-height 1.6.",
        aestheticSummary: `Tactile soft-volume aesthetic delivering physical digital components with realistic lighting and "${typography.headingFont}" display type. ${motionLibNotice}`,
      };

    case "playful":
      return {
        headingTone: `Joyful, energetic display typography in "${typography.headingFont}" (${typography.headingWeight} weight, curved counters) radiating optimism.`,
        materiality: `High-contrast cheerful card containers on background ${color.background} and surface ${color.surface} with punchy ${color.accent} highlights.`,
        borderRadiusRule: "20px radius on cards; 9999px pill radius on buttons.",
        shadowRule: "box-shadow: 0 8px 0px rgba(0, 0, 0, 0.12) (bouncy offset stamp).",
        borderRule: `2px solid ${color.text}20.`,
        spacingPhilosophy: "Buoyant vertical rhythm; vertical section padding 96px; line-height 1.6.",
        aestheticSummary: `Playful, high-energy visual experience that delights users with rounded geometry and "${typography.headingFont}" headlines. ${motionLibNotice}`,
      };
  }
}

// Fallback constant for backwards compatibility with tests
export const STYLE_MAPPINGS: Record<UIStyle, StyleMapping> = {
  minimal: compileStyleTokens("minimal", { pairingId: "inter-inter", headingFont: "Inter", bodyFont: "Inter", scale: "balanced", headingWeight: "600", bodyWeight: "400" }, { library: "css-only", pageLoadIntensity: "subtle", scrollIntensity: "none", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "atelier-signature", primary: "#141312", secondary: "#5C564E", accent: "#C8A97E", background: "#FBF9F5", surface: "#FFFFFF", text: "#141312", mutedText: "#746E65", colorScheme: "light" }),
  editorial: compileStyleTokens("editorial", { pairingId: "fraunces-inter", headingFont: "Fraunces", bodyFont: "Inter", scale: "dramatic", headingWeight: "700", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "subtle", scrollIntensity: "subtle", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "editorial-terracotta", primary: "#211612", secondary: "#6B554C", accent: "#C25E3E", background: "#FAF6F0", surface: "#FFFFFF", text: "#211612", mutedText: "#7E6A61", colorScheme: "light" }),
  "dark-luxury": compileStyleTokens("dark-luxury", { pairingId: "cormorant-inter", headingFont: "Cormorant Garamond", bodyFont: "Inter", scale: "dramatic", headingWeight: "600", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "subtle", scrollIntensity: "subtle", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "midnight-executive", primary: "#F4F1EA", secondary: "#9C988F", accent: "#D4AF37", background: "#0B0B0F", surface: "#14141A", text: "#F4F1EA", mutedText: "#949087", colorScheme: "dark" }),
  brutalist: compileStyleTokens("brutalist", { pairingId: "syne-spacegrotesk", headingFont: "Syne", bodyFont: "Space Grotesk", scale: "dramatic", headingWeight: "800", bodyWeight: "500" }, { library: "css-only", pageLoadIntensity: "subtle", scrollIntensity: "none", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "brutalist-mono", primary: "#000000", secondary: "#333333", accent: "#FF3B00", background: "#FFFFFF", surface: "#F4F4F4", text: "#000000", mutedText: "#666666", colorScheme: "light" }),
  glassmorphism: compileStyleTokens("glassmorphism", { pairingId: "playfair-jakarta", headingFont: "Playfair Display", bodyFont: "Plus Jakarta Sans", scale: "balanced", headingWeight: "600", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "subtle", scrollIntensity: "subtle", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "frosted-glass-aurora", primary: "#171026", secondary: "#58486E", accent: "#8B5CF6", background: "#FAF7FD", surface: "#FFFFFF", text: "#171026", mutedText: "#7E7391", colorScheme: "light" }),
  "corporate-clean": compileStyleTokens("corporate-clean", { pairingId: "cabinet-satoshi", headingFont: "Montserrat", bodyFont: "DM Sans", scale: "balanced", headingWeight: "700", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "subtle", scrollIntensity: "subtle", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "saas-velocity", primary: "#0F172A", secondary: "#334155", accent: "#4F46E5", background: "#F8FAFC", surface: "#FFFFFF", text: "#0F172A", mutedText: "#64748B", colorScheme: "light" }),
  "neo-retro": compileStyleTokens("neo-retro", { pairingId: "epilogue-publicsans", headingFont: "Epilogue", bodyFont: "Public Sans", scale: "balanced", headingWeight: "700", bodyWeight: "400" }, { library: "css-only", pageLoadIntensity: "subtle", scrollIntensity: "none", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "analog-paperback", primary: "#1E1E1E", secondary: "#525252", accent: "#26547C", background: "#F4EFEA", surface: "#FCFAF7", text: "#1E1E1E", mutedText: "#6E6B66", colorScheme: "both" }),
  "soft-3d": compileStyleTokens("soft-3d", { pairingId: "playfair-jakarta", headingFont: "Playfair Display", bodyFont: "Plus Jakarta Sans", scale: "balanced", headingWeight: "600", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "subtle", scrollIntensity: "subtle", hoverIntensity: "subtle", transitionIntensity: "subtle" }, { paletteId: "saas-velocity", primary: "#0F172A", secondary: "#334155", accent: "#4F46E5", background: "#F8FAFC", surface: "#FFFFFF", text: "#0F172A", mutedText: "#64748B", colorScheme: "light" }),
  playful: compileStyleTokens("playful", { pairingId: "playfair-jakarta", headingFont: "Playfair Display", bodyFont: "Plus Jakarta Sans", scale: "balanced", headingWeight: "600", bodyWeight: "400" }, { library: "framer-motion", pageLoadIntensity: "expressive", scrollIntensity: "moderate", hoverIntensity: "moderate", transitionIntensity: "moderate" }, { paletteId: "solar-citrus", primary: "#181411", secondary: "#5C4F44", accent: "#E67E22", background: "#FDFBF7", surface: "#FFFFFF", text: "#181411", mutedText: "#7A6C5F", colorScheme: "light" }),
};
