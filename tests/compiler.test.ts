import { describe, it, expect } from "vitest";
import { compile } from "@/lib/compiler";
import { DEFAULT_CHOICES, Choices } from "@/lib/share/schema";
import { detectConflicts } from "@/lib/compiler/conflicts";
import { STEPS, UI_STYLE_OPTIONS } from "@/data/steps";
import { STYLE_MAPPINGS } from "@/lib/compiler/mappings/style";
import { PALETTES } from "@/data/palettes";
import { FONT_PAIRINGS } from "@/data/fonts";
import { PRESETS } from "@/data/presets";

describe("Atelier Deterministic Compiler", () => {
  it("produces byte-identical output given the same input choices", () => {
    const run1 = compile(DEFAULT_CHOICES, "website");
    const run2 = compile(DEFAULT_CHOICES, "website");
    expect(run1.text).toBe(run2.text);
    expect(run1.text.length).toBeGreaterThan(500);
    expect(run1.sections.length).toBe(run2.sections.length);
  });

  it("produces byte-identical output for mobile app target", () => {
    const run1 = compile(DEFAULT_CHOICES, "app");
    const run2 = compile(DEFAULT_CHOICES, "app");
    expect(run1.text).toBe(run2.text);
    expect(run1.sections.some((s) => s.id === "flows")).toBe(true);
    expect(run1.sections.some((s) => s.id === "screens")).toBe(true);
  });

  it("ensures every UI style in UI_STYLE_OPTIONS has a concrete style mapping", () => {
    for (const opt of UI_STYLE_OPTIONS) {
      const mapping = STYLE_MAPPINGS[opt.id as keyof typeof STYLE_MAPPINGS];
      expect(mapping).toBeDefined();
      expect(mapping.headingTone.length).toBeGreaterThan(10);
      expect(mapping.materiality.length).toBeGreaterThan(10);
      expect(mapping.borderRadiusRule.length).toBeGreaterThan(5);
      expect(mapping.shadowRule.length).toBeGreaterThan(5);
    }
  });

  it("ensures every compiled prompt contains the verification checklist and explicit do-nots", () => {
    const webResult = compile(DEFAULT_CHOICES, "website");
    expect(webResult.text).toContain("Verification Checklist");
    expect(webResult.text).toContain("Explicit Prohibitions (Do-Nots)");
    expect(webResult.text).toContain("DO NOT use lorem ipsum");
    expect(webResult.text).toContain("Lighthouse target scores: 95+");

    const appResult = compile(DEFAULT_CHOICES, "app");
    expect(appResult.text).toContain("Mobile Verification Checklist");
    expect(appResult.text).toContain("Explicit Mobile Prohibitions (Do-Nots)");
    expect(appResult.text).toContain("DO NOT render web-style desktop scrollbars");
  });

  it("all 8 presets compile valid prompts without error", () => {
    for (const preset of PRESETS) {
      const res = compile(preset.data, preset.target);
      expect(res.text.length).toBeGreaterThan(1000);
      expect(res.sections.length).toBeGreaterThanOrEqual(10);
    }
  });

  it("conflict detection triggers for at least 5 known design clashes", () => {
    // Clash 1: Low contrast text on background
    const lowContrastChoices: Choices = {
      ...DEFAULT_CHOICES,
      color: {
        ...DEFAULT_CHOICES.color,
        background: "#FFFFFF",
        text: "#E5E5E5", // very pale gray on white
      },
    };
    const c1 = detectConflicts(lowContrastChoices);
    expect(c1.some((c) => c.id === "low-contrast-text-bg")).toBe(true);

    // Clash 2: Minimal style with expressive GSAP
    const minimalGsapChoices: Choices = {
      ...DEFAULT_CHOICES,
      uiStyle: "minimal",
      motion: {
        ...DEFAULT_CHOICES.motion,
        library: "gsap",
        pageLoadIntensity: "expressive",
      },
    };
    const c2 = detectConflicts(minimalGsapChoices);
    expect(c2.some((c) => c.id === "minimal-vs-heavy-motion")).toBe(true);

    // Clash 3: Brutalist with frosted glass or pill buttons
    const brutalistGlassChoices: Choices = {
      ...DEFAULT_CHOICES,
      uiStyle: "brutalist",
      components: {
        ...DEFAULT_CHOICES.components,
        buttonShape: "pill",
        cardStyle: "frosted-glass",
      },
    };
    const c3 = detectConflicts(brutalistGlassChoices);
    expect(c3.some((c) => c.id === "brutalist-vs-soft-components")).toBe(true);

    // Clash 4: Dark luxury with Space Mono display font
    const luxuryMonoChoices: Choices = {
      ...DEFAULT_CHOICES,
      uiStyle: "dark-luxury",
      typography: {
        ...DEFAULT_CHOICES.typography,
        pairingId: "spacemono-dmsans",
        headingFont: "Space Mono",
      },
    };
    const c4 = detectConflicts(luxuryMonoChoices);
    expect(c4.some((c) => c.id === "luxury-vs-monospace-heading")).toBe(true);

    // Clash 5: 3D Animated background with 'none' motion engine
    const threeDWithoutEngineChoices: Choices = {
      ...DEFAULT_CHOICES,
      background: {
        type: "animated-3d",
        details: "Full Three.js wave",
      },
      motion: {
        ...DEFAULT_CHOICES.motion,
        library: "none",
      },
    };
    const c5 = detectConflicts(threeDWithoutEngineChoices);
    expect(c5.some((c) => c.id === "3d-bg-without-motion-engine")).toBe(true);

    // Clash 6: App target with 12 columns
    const app12ColChoices: Choices = {
      ...DEFAULT_CHOICES,
      target: "app",
      layout: {
        ...DEFAULT_CHOICES.layout,
        columns: 12,
      },
    };
    const c6 = detectConflicts(app12ColChoices);
    expect(c6.some((c) => c.id === "mobile-app-12-columns")).toBe(true);
  });
});
