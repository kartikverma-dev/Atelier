import { describe, it, expect } from "vitest";
import LZString from "lz-string";
import { STEPS } from "@/data/steps";
import { DEFAULT_CHOICES, Choices, ChoicesSchema } from "@/lib/share/schema";
import { decodeHashToChoices } from "@/lib/share/decode";
import { compile } from "@/lib/compiler";
import { detectConflicts } from "@/lib/compiler/conflicts";
import { getContrastRatio } from "@/lib/compiler/mappings/color";
import { compileLogoTokens } from "@/lib/compiler/mappings/logo";

describe("Part B: Wizard Step 'Logo & brand mark' and Compiler Output", () => {
  it("new step exists, has 14 total steps, appears directly after typography, and is in quick mode", () => {
    expect(STEPS.length).toBe(14);

    const typographyIdx = STEPS.findIndex((s) => s.slug === "typography");
    const logoIdx = STEPS.findIndex((s) => s.slug === "logo");

    expect(typographyIdx).toBe(3); // 4th step (id: 4, index: 3)
    expect(logoIdx).toBe(4); // 5th step (id: 5, index: 4)
    expect(logoIdx).toBe(typographyIdx + 1);

    const logoStep = STEPS[logoIdx];
    expect(logoStep.id).toBe(5);
    expect(logoStep.title).toBe("Brand Mark, Logo & Icon Set");
    expect(logoStep.shortTitle).toBe("Logo");
    expect(logoStep.category).toBe("Aesthetics");
    expect(logoStep.quickMode).toBe(true);
  });

  it("old share links and saved state without 'logo' or 'schemaVersion' still decode and compile (backward compatibility)", () => {
    // Construct a legacy v1 choices object completely missing `logo` and `schemaVersion`
    const legacyChoices: Record<string, any> = {
      target: "website",
      mode: "quick",
      goal: {
        purpose: "Legacy Archive Monograph",
        audience: "Collectors",
        feelingWords: ["Serene", "Timeless"],
      },
      uiStyle: "dark-luxury",
      color: {
        paletteId: "midnight-executive",
        primary: "#F4F1EA",
        secondary: "#9C988F",
        accent: "#D4AF37",
        background: "#0B0B0F",
        surface: "#14141A",
        text: "#F4F1EA",
        mutedText: "#949087",
        colorScheme: "dark",
      },
      typography: {
        pairingId: "cormorant-inter",
        headingFont: "Cormorant Garamond",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        scale: "dramatic",
        headingWeight: "600",
        bodyWeight: "400",
      },
      background: {
        type: "noise",
        details: "Subtle dark stone",
      },
      imagery: {
        type: "hero-image",
        placement: ["hero"],
        size: "full-bleed",
        shape: "sharp",
      },
      layout: {
        columns: 12,
        containerWidth: "wide",
        gutter: "relaxed",
        spacingScale: "generous",
        sectionOrder: ["hero", "works", "contact"],
        navbarStyle: "floating",
        footerStyle: "editorial",
      },
      components: {
        buttonShape: "sharp",
        buttonSize: "md",
        buttonHover: "fill-expand",
        cardStyle: "border-only",
        formStyle: "crisp-bordered",
        borderRadiusScale: "subtle",
        shadowStyle: "none",
        iconStyle: "stroke-thin",
      },
      motion: {
        library: "framer-motion",
        pageLoadIntensity: "subtle",
        scrollIntensity: "subtle",
        hoverIntensity: "subtle",
        transitionIntensity: "subtle",
      },
      behavior: {
        responsive: true,
        breakpoints: ["375px", "768px", "1280px"],
        pwa: false,
        darkModeToggle: true,
        languageSupport: "single",
      },
      tech: {
        framework: "nextjs",
        styling: "tailwind",
        hosting: "vercel",
        mobileEngine: "pwa",
      },
      content: {
        brandName: "Studio Monolith",
        tagline: "Timeless Architecture",
        sections: ["Introduction", "Monographs", "Inquiries"],
        toneOfVoice: "Poetic",
        realCopy: "Stone endures.",
        unusualDetail: "Coordinate tracking watermark",
      },
      uniquenessBoost: true,
      seed: 55412,
      // NOTE: NO logo, NO schemaVersion
    };

    // Compress using standard LZ-string to simulate a v1 share link
    const legacyHash = LZString.compressToEncodedURIComponent(JSON.stringify(legacyChoices));
    const decoded = decodeHashToChoices(legacyHash);

    expect(decoded.success).toBe(true);
    expect(decoded.choices.logo).toBeDefined();
    expect(decoded.choices.logo.source).toBe("design-new");
    expect(decoded.choices.schemaVersion).toBe(2);

    // Ensure it compiles without error
    const compiled = compile(decoded.choices, "website");
    expect(compiled.text).toContain("Brand Mark, Logo & Icon Set");
    expect(compiled.sections.some((s) => s.id === "brand-logo")).toBe(true);
  });

  it("compiler: each logo type produces matching concrete instructions and identical choices give identical output", () => {
    // 1. Wordmark
    const wordmarkChoices: Choices = {
      ...DEFAULT_CHOICES,
      content: { ...DEFAULT_CHOICES.content, brandName: "Maison Aurelia" },
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "wordmark",
        letteringStyle: "heading-font",
        letterCase: "uppercase",
        tracking: "wide",
        navbarHeight: 28,
      },
    };
    const resWordmark = compile(wordmarkChoices, "website");
    expect(resWordmark.text).toContain("Convert the text \"Maison Aurelia\" to outlined paths");
    expect(resWordmark.text).toContain("uppercase");
    expect(resWordmark.text).toContain("letter-spacing 0.24em");
    expect(resWordmark.text).toContain("height 28px in the navigation bar");

    // 2. Monogram
    const monogramChoices: Choices = {
      ...DEFAULT_CHOICES,
      content: { ...DEFAULT_CHOICES.content, brandName: "Maison Aurelia" },
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "monogram",
        colorUse: "two-color",
      },
    };
    const resMonogram = compile(monogramChoices, "website");
    expect(resMonogram.text).toContain("Create a 40x40 rounded-square badge");
    expect(resMonogram.text).toContain("initials \"MA\"");

    // 3. Symbol + Wordmark
    const symbolChoices: Choices = {
      ...DEFAULT_CHOICES,
      content: { ...DEFAULT_CHOICES.content, brandName: "Maison Aurelia" },
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "symbol-wordmark",
        symbolIdea: "A stylized aperture lens",
        symbolStyle: "geometric",
      },
    };
    const resSymbol = compile(symbolChoices, "website");
    expect(resSymbol.text).toContain("Vector Symbol: geometric aesthetic representing \"A stylized aperture lens\"");

    // 4. Badge / Emblem
    const badgeChoices: Choices = {
      ...DEFAULT_CHOICES,
      content: { ...DEFAULT_CHOICES.content, brandName: "Maison Aurelia" },
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "badge",
      },
    };
    const resBadge = compile(badgeChoices, "website");
    expect(resBadge.text).toContain("architectural emblem/badge seal");

    // 5. Existing File
    const existingChoices: Choices = {
      ...DEFAULT_CHOICES,
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "already-have",
        existingFile: "/public/brand/logo.svg",
        hasDarkVersion: true,
      },
    };
    const resExisting = compile(existingChoices, "website");
    expect(resExisting.text).toContain("Use the existing SVG file at \"/public/brand/logo.svg\" as given");
    expect(resExisting.text).toContain("Do not redraw, recolor, or restyle it");
    expect(resExisting.text).toContain("/public/brand/logo-dark.svg");

    // Determinism test: identical choices produce byte-identical text
    const runA = compile(symbolChoices, "website");
    const runB = compile(symbolChoices, "website");
    expect(runA.text).toBe(runB.text);

    // App target placement test: Section 7 in App
    const appRun = compile(symbolChoices, "app");
    const appLogoSection = appRun.sections.find((s) => s.id === "brand-logo");
    expect(appLogoSection).toBeDefined();
    expect(appLogoSection?.title).toBe("7. Brand Mark, Logo & Icon Set");
  });

  it("prompt always contains SVG-only, icon-set, contrast, and 'do not imitate' rules", () => {
    const webResult = compile(DEFAULT_CHOICES, "website");
    expect(webResult.text).toContain("Logo must be pure SVG");
    expect(webResult.text).toContain("Outline conversion");
    expect(webResult.text).toContain("minimum 3:1 contrast ratio");
    expect(webResult.text).toContain("clear-space perimeter");
    expect(webResult.text).toContain("Do not imitate, copy, or resemble any existing company's trademarked logo");
    expect(webResult.text).toContain("Favicon:");
    expect(webResult.text).toContain("Apple Touch Icon:");
    expect(webResult.text).toContain("Open Graph");

    // Verification checklist contains logo items
    expect(webResult.text).toContain("Logo contrast verification");
    expect(webResult.text).toContain("Logo rendering & CLS");
  });

  it("conflict engine fires for all 5 specified logo conflict cases", () => {
    // Case 1: Logo color fails 3:1 contrast against navbar surface
    const lowContrastLogo: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        surface: "#1A1A1A",
        text: "#242424", // barely visible against #1A1A1A
      },
      logo: {
        ...DEFAULT_CHOICES.logo,
        colorUse: "single-color",
      },
    };
    const c1 = detectConflicts(lowContrastLogo);
    expect(c1.some((c) => c.id === "logo-contrast-below-3-to-1")).toBe(true);

    // Case 2: Monogram selected but brand name missing or only 1 character
    const shortNameMonogram: Choices = {
      ...DEFAULT_CHOICES,
      content: {
        ...DEFAULT_CHOICES.content,
        brandName: "A", // Only 1 character
      },
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "monogram",
      },
    };
    const c2 = detectConflicts(shortNameMonogram);
    expect(c2.some((c) => c.id === "logo-monogram-brand-name-too-short")).toBe(true);

    // Case 3: "Already have a logo" selected but no file path given
    const missingFilePath: Choices = {
      ...DEFAULT_CHOICES,
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "already-have",
        existingFile: "   ",
      },
    };
    const c3 = detectConflicts(missingFilePath);
    expect(c3.some((c) => c.id === "logo-missing-existing-file-path")).toBe(true);

    // Case 4: Very ornate symbol idea combined with 24px navbar logo height
    const ornateSmallLogo: Choices = {
      ...DEFAULT_CHOICES,
      logo: {
        ...DEFAULT_CHOICES.logo,
        source: "design-new",
        logoType: "symbol-wordmark",
        navbarHeight: 24,
        symbolIdea: "A highly ornate baroque heraldic crest with intricate filigree",
      },
    };
    const c4 = detectConflicts(ornateSmallLogo);
    expect(c4.some((c) => c.id === "logo-ornate-symbol-at-small-height")).toBe(true);

    // Case 5: Placement includes loading screen but PWA and motion are off
    const loadingScreenNoMotion: Choices = {
      ...DEFAULT_CHOICES,
      behavior: {
        ...DEFAULT_CHOICES.behavior,
        pwa: false,
      },
      motion: {
        ...DEFAULT_CHOICES.motion,
        library: "none",
        pageLoadIntensity: "none",
      },
      logo: {
        ...DEFAULT_CHOICES.logo,
        placement: ["navbar-left", "loading-screen"],
      },
    };
    const c5 = detectConflicts(loadingScreenNoMotion);
    expect(c5.some((c) => c.id === "logo-loading-screen-without-pwa-or-motion")).toBe(true);
  });

  it("logo contrast math reuses existing WCAG helper", () => {
    // Pure black and white ratio should be 21:1
    const maxRatio = getContrastRatio("#000000", "#FFFFFF");
    expect(maxRatio).toBe(21);

    // 3:1 boundary check
    const ratio3 = getContrastRatio("#767676", "#FFFFFF");
    expect(ratio3).toBeGreaterThanOrEqual(4.5); // Standard AA
  });
});
