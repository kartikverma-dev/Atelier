import { Choices } from "@/lib/share/schema";
import { getLuminance, compileColorTokens, getContrastRatio } from "./mappings/color";

export interface DesignConflict {
  id: string;
  severity: "warning" | "caution";
  title: string;
  description: string;
  suggestion: string;
  stepSlug: string;
}

/**
 * Detects clashing choices and provides constructive suggestions without silently mutating state.
 */
export function detectConflicts(choices: Choices): DesignConflict[] {
  const conflicts: DesignConflict[] = [];

  // 1. Contrast Verification Across All Text/Background Pairs
  const colorReport = compileColorTokens(choices.color);
  if (!colorReport.allWcagAAMet) {
    const hasTextBgFail = colorReport.failedPairs.some(
      (f) => f.backgroundToken === "color.background" && f.foregroundToken === "color.text"
    );
    if (hasTextBgFail) {
      conflicts.push({
        id: "low-contrast-text-bg",
        severity: "warning",
        title: "Primary Text Contrast Below WCAG AA (4.5:1)",
        description: `Primary text on canvas background fails the 4.5:1 WCAG AA threshold. Text will be unreadable for users under direct light.`,
        suggestion: `Adjust your primary text or background hex token to reach at least 4.5:1.`,
        stepSlug: "color",
      });
    }

    const otherFails = colorReport.failedPairs.filter(
      (f) => !(f.backgroundToken === "color.background" && f.foregroundToken === "color.text")
    );
    if (otherFails.length > 0) {
      conflicts.push({
        id: "low-contrast-text-pair",
        severity: "warning",
        title: "Text Pair Contrast Below WCAG AA (4.5:1)",
        description: `The following text pair(s) fail the 4.5:1 threshold: ${otherFails.map((f) => `${f.label} (${f.ratio}:1)`).join(", ")}.`,
        suggestion: `Adjust your muted text, surface, or accent tokens to ensure all text pairs meet or exceed 4.5:1.`,
        stepSlug: "color",
      });
    }
  }

  // 2. Contradictory Background Description vs Background Color Token
  const bgLum = getLuminance(choices.color.background);
  const bgDetails = choices.background.details.toLowerCase();

  const darkKeywords = /\b(dark|charcoal|black|obsidian|midnight|deep matte|slate|shadow)\b/i;
  const lightKeywords = /\b(light|white|alabaster|cream|parchment|ivory|bright|snow)\b/i;

  if (bgLum > 0.45 && darkKeywords.test(bgDetails)) {
    conflicts.push({
      id: "contradictory-background-light-with-dark-desc",
      severity: "warning",
      title: "Contradictory Canvas Background Description",
      description: `Your canvas background token (${choices.color.background}) is light (luminance ${(bgLum * 100).toFixed(1)}%), but your background text describes "${choices.background.details}", which references dark tones.`,
      suggestion: `Select a dark background hex token, or update your background text description to match your light canvas.`,
      stepSlug: "background",
    });
  } else if (bgLum < 0.25 && lightKeywords.test(bgDetails)) {
    conflicts.push({
      id: "contradictory-background-dark-with-light-desc",
      severity: "warning",
      title: "Contradictory Canvas Background Description",
      description: `Your canvas background token (${choices.color.background}) is dark (luminance ${(bgLum * 100).toFixed(1)}%), but your background text describes "${choices.background.details}", which references light/pale tones.`,
      suggestion: `Select a light background hex token, or update your background text description to match your dark canvas.`,
      stepSlug: "background",
    });
  }

  // 3. Card Values That Don't Match the Palette Mode
  const surfaceLum = getLuminance(choices.color.surface);
  const isDarkMode = choices.color.colorScheme === "dark" || bgLum < 0.25;
  const isLightMode = choices.color.colorScheme === "light" || bgLum > 0.6;

  if (isDarkMode && surfaceLum > 0.45) {
    conflicts.push({
      id: "card-surface-mismatch-dark-mode",
      severity: "warning",
      title: "Card Surface Mismatches Dark Palette Mode",
      description: `Your theme is configured for dark mode (${choices.color.background}), but your card surface token (${choices.color.surface}) has a bright surface luminance (${(surfaceLum * 100).toFixed(1)}%). Bright cards on dark backgrounds create harsh, uncalibrated visual glare.`,
      suggestion: `Set the card surface token to a subtle dark tint (e.g. 5-15% luminance above your background) to preserve dark luxury hierarchy.`,
      stepSlug: "color",
    });
  } else if (isLightMode && surfaceLum < 0.25) {
    conflicts.push({
      id: "card-surface-mismatch-light-mode",
      severity: "warning",
      title: "Card Surface Mismatches Light Palette Mode",
      description: `Your theme is configured for light mode (${choices.color.background}), but your card surface token (${choices.color.surface}) is dark (${(surfaceLum * 100).toFixed(1)}% luminance). Stark dark card blocks on a light canvas clash with standard light mode design systems.`,
      suggestion: `Set the card surface token to pure white or a subtle light tint matching your canvas background.`,
      stepSlug: "color",
    });
  }

  // 4. Minimal Style vs Heavy/Expressive Motion
  if (
    choices.uiStyle === "minimal" &&
    (choices.motion.library === "gsap" || choices.motion.library === "threejs" || choices.motion.pageLoadIntensity === "expressive")
  ) {
    conflicts.push({
      id: "minimal-vs-heavy-motion",
      severity: "warning",
      title: "Minimal Aesthetic vs Expressive Motion",
      description: `Minimal Swiss art direction emphasizes stillness and clarity, but your motion settings call for expressive ${choices.motion.library} choreographies.`,
      suggestion: `Switch motion library to CSS-only or Framer Motion with "subtle" intensity curves to maintain architectural serenity.`,
      stepSlug: "motion",
    });
  }

  // 5. Brutalist Style vs Soft Rounded or Glass Components
  if (
    choices.uiStyle === "brutalist" &&
    (choices.components.buttonShape === "pill" ||
      choices.components.cardStyle === "frosted-glass" ||
      choices.components.cardStyle === "subtle-elevated" ||
      choices.components.borderRadiusScale === "full" ||
      choices.components.borderRadiusScale === "large")
  ) {
    conflicts.push({
      id: "brutalist-vs-soft-components",
      severity: "warning",
      title: "Neo-Brutalist Style vs Soft Glass/Pill Elements",
      description: `Neo-brutalism relies on razor-sharp 0px borders and hard drop shadows. Frosted glass panels or pillowy pill curves directly contradict this visual language.`,
      suggestion: `Change button shape to "sharp" (0px radius) and card style to "border-only" with hard drop shadows.`,
      stepSlug: "components",
    });
  }

  // 6. Dark Luxury with Stark Brutalist / Mono Font Pairings
  if (
    choices.uiStyle === "dark-luxury" &&
    (choices.typography.pairingId === "spacemono-dmsans" || choices.typography.headingFont === "Space Mono")
  ) {
    conflicts.push({
      id: "luxury-vs-monospace-heading",
      severity: "caution",
      title: "Dark Luxury Style vs Monospace Display Font",
      description: `Dark luxury visual identities typically use classical high-contrast serifs or refined geometric sans. Raw technical monospace headings create an industrial developer aesthetic instead of high refinement.`,
      suggestion: `Choose "Cormorant & Inter" or "Newsreader & Outfit" to evoke high-jewelry and prestige editorial craftsmanship.`,
      stepSlug: "typography",
    });
  }

  // 7. Heavy Animated 3D Background with None/CSS-only Motion
  if (
    choices.background.type === "animated-3d" &&
    (choices.motion.library === "none" || choices.motion.library === "css-only")
  ) {
    conflicts.push({
      id: "3d-bg-without-motion-engine",
      severity: "warning",
      title: "3D Background Selected Without 3D Animation Engine",
      description: `You selected an "Animated 3D scene" background canvas, but the motion library is set to "${choices.motion.library}". A 3D canvas requires Three.js or WebGL animation pipelines.`,
      suggestion: `Switch the motion engine to "threejs" or change the background type to "noise", "gradient", or "pattern".`,
      stepSlug: "background",
    });
  }

  // 8. Mobile Target with Excessive Columns
  if (choices.target === "app" && choices.layout.columns === 12) {
    conflicts.push({
      id: "mobile-app-12-columns",
      severity: "caution",
      title: "12-Column Grid on Mobile App Target",
      description: `A 12-column grid is designed for wide desktop displays. Mobile application screens (390px) typically utilize a 4-column or single-stack layout.`,
      suggestion: `Set column count to 4 columns to match standard iOS and Android layout guidelines.`,
      stepSlug: "layout",
    });
  }

  // 9. Logo Color Contrast Below 3:1 Against Navigation Bar
  if (choices.logo) {
    const navbarBg = choices.color.surface;
    const logoFg =
      choices.logo.colorUse === "two-color" ? choices.color.accent : choices.color.text;
    const logoContrast = getContrastRatio(logoFg, navbarBg);
    if (logoContrast < 3.0) {
      conflicts.push({
        id: "logo-contrast-below-3-to-1",
        severity: "warning",
        title: "Logo Color Contrast Below 3:1 Against Navigation Bar",
        description: `The chosen logo foreground color (${logoFg}) only provides a ${logoContrast}:1 contrast ratio against the navigation bar surface (${navbarBg}). Brand marks must achieve at least 3:1 contrast for visual clarity and accessibility.`,
        suggestion: `Adjust your primary text or accent color token, or adjust the surface background token to ensure at least 3:1 contrast.`,
        stepSlug: "logo",
      });
    }

    // 10. Monogram Selected but Brand Name Missing or Too Short
    if (
      choices.logo.source === "design-new" &&
      choices.logo.logoType === "monogram" &&
      (!choices.content.brandName || choices.content.brandName.trim().length <= 1)
    ) {
      conflicts.push({
        id: "logo-monogram-brand-name-too-short",
        severity: "warning",
        title: "Monogram Selected but Brand Name is Too Short",
        description: `You selected a monogram logo badge, but your brand name ("${choices.content.brandName}") is missing or only one character. Monograms require at least two characters to extract legible initials (e.g., 'MA' for 'Maison Aurelia').`,
        suggestion: `Provide a full brand name with at least two characters in the Content step, or choose 'Wordmark' instead.`,
        stepSlug: "logo",
      });
    }

    // 11. "Already have a logo" Selected but No File Path Given
    if (
      choices.logo.source === "already-have" &&
      (!choices.logo.existingFile || choices.logo.existingFile.trim() === "")
    ) {
      conflicts.push({
        id: "logo-missing-existing-file-path",
        severity: "warning",
        title: "Missing Existing Logo File Path",
        description: `You indicated that you already have an existing logo file, but the file path input is empty.`,
        suggestion: `Enter the relative or public file path (e.g. "/public/brand/logo.svg") where the AI can locate your logo file.`,
        stepSlug: "logo",
      });
    }

    // 12. Very Ornate Symbol Idea Combined with 24px Navbar Height
    const ornateRegex =
      /\b(ornate|detailed|intricate|complex|baroque|filigree|crest|detailed engraving|realistic|heraldic|elaborate)\b/i;
    if (
      choices.logo.navbarHeight === 24 &&
      choices.logo.source === "design-new" &&
      (choices.logo.logoType === "symbol-wordmark" || choices.logo.logoType === "badge") &&
      ornateRegex.test(choices.logo.symbolIdea)
    ) {
      conflicts.push({
        id: "logo-ornate-symbol-at-small-height",
        severity: "warning",
        title: "Ornate Symbol Concept at 24px Navbar Height",
        description: `Your symbol idea describes an ornate/intricate design ("${choices.logo.symbolIdea}"), but the navigation bar logo height is set to 24px. Intricate details will blur and become illegible at small rasterized sizes.`,
        suggestion: `Increase the navbar logo height to 32px or 40px, or simplify the symbol idea to a bold, monoline geometric concept.`,
        stepSlug: "logo",
      });
    }

    // 13. Placement Includes Loading Screen but PWA/Motion Settings are Off
    if (
      choices.logo.placement &&
      choices.logo.placement.includes("loading-screen") &&
      !choices.behavior.pwa &&
      (choices.motion.library === "none" || choices.motion.pageLoadIntensity === "none")
    ) {
      conflicts.push({
        id: "logo-loading-screen-without-pwa-or-motion",
        severity: "warning",
        title: "Loading Screen Logo Selected Without Motion or PWA",
        description: `You selected the logo to appear on a loading screen, but PWA is disabled and motion is turned off/none, so the application will render immediately without a loading transition.`,
        suggestion: `Enable PWA in the Behavior step, enable page load motion in the Motion step, or remove 'loading screen' from logo placements.`,
        stepSlug: "logo",
      });
    }
  }

  return conflicts;
}
