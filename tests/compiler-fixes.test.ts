import { describe, it, expect } from "vitest";
import { compile } from "@/lib/compiler";
import { DEFAULT_CHOICES, Choices } from "@/lib/share/schema";
import { detectConflicts } from "@/lib/compiler/conflicts";
import { compileColorTokens } from "@/lib/compiler/mappings/color";
import { compileStyleTokens } from "@/lib/compiler/mappings/style";
import { BRAND } from "@/config/brand";

describe("Atelier Compiler Fixes & Validations", () => {
  // Test 1: Never use Atelier's own brand colors in compiled output
  it("never includes Atelier's own brand colors in compiled output, only user palette colors", () => {
    // Custom user palette with distinctive vibrant magenta/teal
    const customChoices: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        paletteId: "custom",
        primary: "#112233",
        secondary: "#445566",
        accent: "#FF0055", // User vibrant accent
        background: "#010203",
        surface: "#0A0B0C",
        text: "#FFFFFF",
        mutedText: "#8899AA",
        colorScheme: "dark",
      },
    };

    const res = compile(customChoices, "website");

    // Atelier's internal brand colors must NOT appear in output
    expect(res.text).not.toContain("#C8A97E");
    expect(res.text).not.toContain("#E2CEB0");
    expect(res.text).not.toContain("#9E7B45");
    expect(res.text).not.toContain("rgba(200, 169, 126");
    expect(res.text).not.toContain("rgba(212, 175, 55");

    // Must contain user's exact colors
    expect(res.text).toContain("#FF0055");
    expect(res.text).toContain("#010203");
    expect(res.text).toContain("#0A0B0C");
  });

  // Test 2: Conflict detection for contradictory background descriptions & card values
  it("detects contradictory background descriptions (light canvas with dark/charcoal text)", () => {
    const lightWithDarkDesc: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#FFFFFF", // very light
      },
      background: {
        type: "noise",
        details: "Deep matte charcoal with obsidian texture", // contradictory dark text
      },
    };

    const conflicts = detectConflicts(lightWithDarkDesc);
    expect(
      conflicts.some((c) => c.id === "contradictory-background-light-with-dark-desc")
    ).toBe(true);

    const darkWithLightDesc: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#050505", // very dark
      },
      background: {
        type: "noise",
        details: "Warm alabaster white linen background", // contradictory light text
      },
    };

    const conflictsDark = detectConflicts(darkWithLightDesc);
    expect(
      conflictsDark.some((c) => c.id === "contradictory-background-dark-with-light-desc")
    ).toBe(true);
  });

  it("detects card surface values that do not match the palette mode", () => {
    // Dark palette with pure white card surface
    const darkWithWhiteCard: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#0B0B0F",
        colorScheme: "dark",
        surface: "#FFFFFF", // white card clashes with dark mode
      },
    };

    const conflicts = detectConflicts(darkWithWhiteCard);
    expect(
      conflicts.some((c) => c.id === "card-surface-mismatch-dark-mode")
    ).toBe(true);

    // Light palette with near-black card surface
    const lightWithBlackCard: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#FAFAFA",
        colorScheme: "light",
        surface: "#080808", // black card clashes with light mode
      },
    };

    const conflictsLight = detectConflicts(lightWithBlackCard);
    expect(
      conflictsLight.some((c) => c.id === "card-surface-mismatch-light-mode")
    ).toBe(true);
  });

  // Test 3: Contrast verified for every text/background pair, printed in prompt, warned when < 4.5:1
  it("verifies contrast for all 5 text/background pairs and prints each ratio in the prompt", () => {
    const res = compile(DEFAULT_CHOICES, "website");
    expect(res.text).toContain("Primary Text on Canvas Background");
    expect(res.text).toContain("Primary Text on Card Surface");
    expect(res.text).toContain("Muted Text on Canvas Background");
    expect(res.text).toContain("Muted Text on Card Surface");
    expect(res.text).toContain("on Interactive Accent");

    // Verify compileColorTokens checks all pairs
    const report = compileColorTokens(DEFAULT_CHOICES.color);
    expect(report.pairs.length).toBe(5);
    report.pairs.forEach((p) => {
      expect(typeof p.ratio).toBe("number");
      expect(p.ratio).toBeGreaterThan(0);
    });

    // Test failing pair triggers warning
    const failingChoices: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#FFFFFF",
        mutedText: "#E0E0E0", // fails contrast
      },
    };
    const conflicts = detectConflicts(failingChoices);
    expect(conflicts.some((c) => c.id === "low-contrast-text-pair")).toBe(true);
  });

  // Test 4: Style descriptions use chosen fonts and mention only selected motion library
  it("makes style descriptions use chosen fonts and mentions only the selected motion library", () => {
    const customChoices: Choices = {
      ...DEFAULT_CHOICES,
      typography: {
        ...DEFAULT_CHOICES.typography,
        headingFont: "Fraunces",
        bodyFont: "Work Sans",
      },
      motion: {
        ...DEFAULT_CHOICES.motion,
        library: "framer-motion",
      },
    };

    const res = compile(customChoices, "website");
    const designSection = res.sections.find((s) => s.id === "design-system");
    const overviewSection = res.sections.find((s) => s.id === "overview");

    expect(designSection?.body).toContain('"Fraunces"');
    expect(designSection?.body).toContain('"Work Sans"');
    expect(overviewSection?.body).toContain('"Fraunces"');

    // Must mention ONLY the selected motion library, not other libraries
    const motionSection = res.sections.find((s) => s.id === "motion");
    expect(motionSection?.body).toContain("Framer Motion");
    expect(motionSection?.body).not.toContain("Three.js WebGL");
    expect(motionSection?.body).not.toContain("GSAP (GreenSock)");
    expect(motionSection?.body).not.toContain("Lenis smooth");
  });

  // Test 5: Replace all range values with single exact values
  it("replaces all range values with single exact values in durations, easings, and dimensions", () => {
    const res = compile(DEFAULT_CHOICES, "website");
    // Should NOT contain range expressions
    expect(res.text).not.toMatch(/\b\d+ms\s+to\s+\d+ms\b/);
    expect(res.text).not.toMatch(/\b\d+px\s+to\s+\d+px\b/);
    expect(res.text).not.toMatch(/\bclamp\(\d+px/);
    expect(res.text).not.toMatch(/\b\d+px\/\d+px\b/);
    expect(res.text).not.toMatch(/\b6 to 8 columns\b/);

    // Should contain single exact values
    expect(res.text).toMatch(/over \d+ms/);
  });

  // Test 6: One section list used in both Layout and Content
  it("uses one identical section list in both Layout and Content", () => {
    const customSectionsChoices: Choices = {
      ...DEFAULT_CHOICES,
      content: {
        ...DEFAULT_CHOICES.content,
        sections: ["Prose Monograph", "Spatial Archive", "Material Index", "Studio Inquiries"],
      },
    };

    const res = compile(customSectionsChoices, "website");
    const layoutSection = res.sections.find((s) => s.id === "layout-grid");
    const contentSection = res.sections.find((s) => s.id === "content");

    expect(layoutSection?.body).toContain("1. [Prose Monograph] -> 2. [Spatial Archive] -> 3. [Material Index] -> 4. [Studio Inquiries]");
    expect(contentSection?.body).toContain("1. [Prose Monograph]");
    expect(contentSection?.body).toContain("2. [Spatial Archive]");
    expect(contentSection?.body).toContain("3. [Material Index]");
    expect(contentSection?.body).toContain("4. [Studio Inquiries]");
  });

  // Test 7: Imagery sourcing rule: user-supplied images folder or CSS/SVG art directed placeholders
  it("includes the imagery sourcing rule in the compiled prompt", () => {
    const res = compile(DEFAULT_CHOICES, "website");
    const imgSection = res.sections.find((s) => s.id === "imagery");
    expect(imgSection?.body).toContain("Imagery Sourcing Rule");
    expect(imgSection?.body).toContain("/public/images/");
    expect(imgSection?.body).toContain("CSS/SVG art-directed placeholders");
    expect(imgSection?.body).toContain("descriptive alt text");
  });

  // Test 8: Remove 'or' choices in tech stack, pick one concrete option
  it("removes 'or' choices in tech stack and picks one concrete option", () => {
    const res = compile(DEFAULT_CHOICES, "website");
    const techSection = res.sections.find((s) => s.id === "tech-stack");

    expect(techSection?.body).not.toContain("compatible or server-rendered");
    expect(techSection?.body).not.toContain("styled-components or Emotion");
    expect(techSection?.body).not.toContain("Static S3 / CloudFront");
    expect(techSection?.body).not.toContain("/app (or /src)");
    expect(techSection?.body).not.toContain("/styles or /tokens");
    expect(techSection?.body).toContain("Next.js 14 App Router with TypeScript and static export configuration");
  });

  // Test 9: Footer credit URL config value (empty by default) & option to strip why comments
  it("footer credit URL is empty by default and omits URL when empty", () => {
    expect(BRAND.footerCreditUrl).toBe("");
    const res = compile(DEFAULT_CHOICES, "website");
    expect(res.text).toContain(`<!-- Generated deterministically by ${BRAND.name}. Version ${BRAND.version}`);
    expect(res.text).not.toContain("https://atelier.design");
  });

  it("strips why comments when stripWhyComments option is enabled", () => {
    const withWhy = compile(DEFAULT_CHOICES, "website", { stripWhyComments: false });
    expect(withWhy.text).toContain("<!-- Why:");

    const withoutWhy = compile(DEFAULT_CHOICES, "website", { stripWhyComments: true });
    expect(withoutWhy.text).not.toContain("<!-- Why:");
  });
});
