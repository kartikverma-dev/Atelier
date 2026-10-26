import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { Logo, resolveLogoWeight } from "@/components/brand/Logo";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/components/navigation/Navbar";

describe("Atelier Brand Logo & Visibility Fix (Sturdy & Fine Weights)", () => {
  it("renders all three Logo variants in fine or sturdy weights", () => {
    // Explicit fine
    const horizontalFineHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "horizontal", tone: "auto", weight: "fine", height: 48 })
    );
    expect(horizontalFineHtml).toContain(BRAND.logo.horizontal.light);
    expect(horizontalFineHtml).toContain(BRAND.logo.horizontal.dark);
    expect(horizontalFineHtml).toContain('alt="Atelier"');

    // Auto below threshold picks sturdy
    const horizontalSturdyHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "horizontal", tone: "auto", height: 36 })
    );
    expect(horizontalSturdyHtml).toContain(BRAND.logo.horizontal.sturdy.light);
    expect(horizontalSturdyHtml).toContain(BRAND.logo.horizontal.sturdy.dark);

    // Stacked
    const stackedHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "stacked", tone: "auto", width: 220 })
    );
    expect(stackedHtml).toContain(BRAND.logo.stacked.sturdy.light);
    expect(stackedHtml).toContain(BRAND.logo.stacked.sturdy.dark);

    // Mark
    const markHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "mark", tone: "auto", height: 32 })
    );
    expect(markHtml).toContain(BRAND.logo.mark.sturdy.light);
    expect(markHtml).toContain(BRAND.logo.mark.sturdy.dark);
  });

  it("Logo component picks sturdy below thresholds and fine at/above thresholds in both themes", () => {
    // Horizontal in Light theme (threshold: 48px)
    expect(resolveLogoWeight({ variant: "horizontal", height: 36, width: 158, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "horizontal", height: 47, width: 206, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "horizontal", height: 48, width: 211, theme: "light" })).toBe("fine");
    expect(resolveLogoWeight({ variant: "horizontal", height: 60, width: 263, theme: "light" })).toBe("fine");

    // Horizontal in Dark theme (threshold: 80px)
    expect(resolveLogoWeight({ variant: "horizontal", height: 36, width: 158, theme: "dark" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "horizontal", height: 79, width: 346, theme: "dark" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "horizontal", height: 80, width: 351, theme: "dark" })).toBe("fine");
    expect(resolveLogoWeight({ variant: "horizontal", height: 100, width: 439, theme: "dark" })).toBe("fine");

    // Stacked in Light theme (threshold: 260px wide)
    expect(resolveLogoWeight({ variant: "stacked", width: 200, height: 142, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "stacked", width: 259, height: 183, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "stacked", width: 260, height: 184, theme: "light" })).toBe("fine");
    expect(resolveLogoWeight({ variant: "stacked", width: 300, height: 213, theme: "light" })).toBe("fine");

    // Stacked in Dark theme (threshold: 360px wide)
    expect(resolveLogoWeight({ variant: "stacked", width: 220, height: 156, theme: "dark" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "stacked", width: 359, height: 254, theme: "dark" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "stacked", width: 360, height: 255, theme: "dark" })).toBe("fine");
    expect(resolveLogoWeight({ variant: "stacked", width: 400, height: 283, theme: "dark" })).toBe("fine");

    // Mark (threshold: 48px tall)
    expect(resolveLogoWeight({ variant: "mark", height: 32, width: 32, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "mark", height: 47, width: 47, theme: "light" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "mark", height: 48, width: 48, theme: "light" })).toBe("fine");
    expect(resolveLogoWeight({ variant: "mark", height: 32, width: 32, theme: "dark" })).toBe("sturdy");
    expect(resolveLogoWeight({ variant: "mark", height: 48, width: 48, theme: "dark" })).toBe("fine");

    // Explicit overrides
    expect(resolveLogoWeight({ weight: "fine", variant: "horizontal", height: 20, width: 88, theme: "light" })).toBe("fine");
    expect(resolveLogoWeight({ weight: "sturdy", variant: "horizontal", height: 120, width: 526, theme: "light" })).toBe("sturdy");
  });

  it("sets correct alt and aria-hidden attributes", () => {
    // Default accessible name
    const defaultHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "horizontal" })
    );
    expect(defaultHtml).toContain('alt="Atelier"');
    expect(defaultHtml).not.toContain('aria-hidden="true"');

    // Empty alt decorative mode
    const decorativeHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "horizontal", alt: "" })
    );
    expect(decorativeHtml).toContain('alt=""');
    expect(decorativeHtml).toContain('aria-hidden="true"');

    // Explicit aria-hidden
    const hiddenHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "mark", "aria-hidden": true })
    );
    expect(hiddenHtml).toContain('aria-hidden="true"');
  });

  it("Header uses 36px on desktop and 32px on mobile; hero stacked logo is at least 200px wide on desktop", () => {
    const navbarFile = fs.readFileSync(path.join(process.cwd(), "components/navigation/Navbar.tsx"), "utf-8");
    // Header desktop uses height 36
    expect(navbarFile).toMatch(/<Logo\s+variant="horizontal"\s+tone="auto"\s+height=\{36\}/);
    // Header mobile uses height 32
    expect(navbarFile).toMatch(/<Logo\s+variant="horizontal"\s+tone="auto"\s+height=\{32\}/);
    expect(navbarFile).toMatch(/<Logo\s+variant="mark"\s+tone="auto"\s+height=\{32\}/);

    const heroFile = fs.readFileSync(path.join(process.cwd(), "app/page.tsx"), "utf-8");
    // Hero stacked logo desktop width >= 200
    const desktopWidthMatch = heroFile.match(/<Logo\s+variant="stacked"[^>]*width=\{([0-9]+)\}/);
    expect(desktopWidthMatch).not.toBeNull();
    const desktopWidth = parseInt(desktopWidthMatch![1], 10);
    expect(desktopWidth).toBeGreaterThanOrEqual(200);

    // Hero stacked logo mobile width 160
    expect(heroFile).toMatch(/<Logo\s+variant="stacked"[^>]*width=\{160\}/);
  });

  it("All referenced sturdy files exist on disk in /public/brand/svg", () => {
    const sturdyFiles = [
      BRAND.logo.horizontal.sturdy.light,
      BRAND.logo.horizontal.sturdy.dark,
      BRAND.logo.horizontal.sturdy.monoBlack,
      BRAND.logo.horizontal.sturdy.monoWhite,
      BRAND.logo.stacked.sturdy.light,
      BRAND.logo.stacked.sturdy.dark,
      BRAND.logo.stacked.sturdy.monoBlack,
      BRAND.logo.stacked.sturdy.monoWhite,
      BRAND.logo.mark.sturdy.light,
      BRAND.logo.mark.sturdy.dark,
      BRAND.logo.mark.sturdy.monoBlack,
      BRAND.logo.mark.sturdy.monoWhite,
    ];

    for (const fileUrl of sturdyFiles) {
      const cleanPath = fileUrl.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", cleanPath);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it("No CSS in the project applies opacity, filter, or text-shadow to .logo elements", () => {
    const cssPath = path.join(process.cwd(), "app/globals.css");
    const css = fs.readFileSync(cssPath, "utf-8");

    // The .logo rules must enforce opacity: 1, filter: none, text-shadow: none
    expect(css).toContain(".logo");
    expect(css).toContain("opacity: 1 !important");
    expect(css).toContain("filter: none !important");
    expect(css).toContain("text-shadow: none !important");
    expect(css).toContain("shape-rendering: geometricPrecision");

    // No other rule in CSS should reduce opacity or blur .logo
    const badOpacityRegex = /\.logo[^{]*\{[^}]*opacity:\s*0\.[0-9]+/i;
    expect(css).not.toMatch(badOpacityRegex);
  });

  it("manifest contains 192, 512, and maskable icons and every referenced file exists on disk", () => {
    const manifestPath = path.join(process.cwd(), "public", "manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);

    const has192Any = manifest.icons.some(
      (icon: any) => icon.sizes === "192x192" && icon.purpose.includes("any")
    );
    const has512Any = manifest.icons.some(
      (icon: any) => icon.sizes === "512x512" && icon.purpose.includes("any")
    );
    const has512Maskable = manifest.icons.some(
      (icon: any) => icon.sizes === "512x512" && icon.purpose.includes("maskable")
    );

    expect(has192Any).toBe(true);
    expect(has512Any).toBe(true);
    expect(has512Maskable).toBe(true);

    for (const icon of manifest.icons) {
      const cleanPath = icon.src.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", cleanPath);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it("no file in /public or /app still references the old icon", () => {
    const oldIconPath = path.join(process.cwd(), "public", "icon.svg");
    expect(fs.existsSync(oldIconPath)).toBe(false);

    function checkDir(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          checkDir(fullPath);
        } else if (
          entry.isFile() &&
          /\.(ts|tsx|js|json|html|css|md)$/.test(entry.name)
        ) {
          const content = fs.readFileSync(fullPath, "utf-8");
          expect(content).not.toMatch(/(["'])\/icon\.svg\1/);
        }
      }
    }

    checkDir(path.join(process.cwd(), "public"));
    checkDir(path.join(process.cwd(), "app"));
  });
});
