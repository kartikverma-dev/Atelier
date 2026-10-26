import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/config/brand";

describe("Part A: Atelier Brand Logo & Assets", () => {
  it("renders all three Logo variants (horizontal, stacked, mark)", () => {
    const horizontalHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "horizontal", tone: "auto", height: 28 })
    );
    expect(horizontalHtml).toContain(BRAND.logo.horizontal.light);
    expect(horizontalHtml).toContain(BRAND.logo.horizontal.dark);
    expect(horizontalHtml).toContain('alt="Atelier"');

    const stackedHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "stacked", tone: "auto", height: 50 })
    );
    expect(stackedHtml).toContain(BRAND.logo.stacked.light);
    expect(stackedHtml).toContain(BRAND.logo.stacked.dark);

    const markHtml = renderToStaticMarkup(
      React.createElement(Logo, { variant: "mark", tone: "auto", height: 32 })
    );
    expect(markHtml).toContain(BRAND.logo.mark.light);
    expect(markHtml).toContain(BRAND.logo.mark.dark);
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

    // Verify all referenced icon files exist on disk
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
          // Should not reference the old standalone "/icon.svg"
          expect(content).not.toMatch(/(["'])\/icon\.svg\1/);
        }
      }
    }

    checkDir(path.join(process.cwd(), "public"));
    checkDir(path.join(process.cwd(), "app"));
  });
});
