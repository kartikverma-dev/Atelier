export const BRAND = {
  name: "Atelier",
  tagline: "The Design-to-Prompt Compiler for AI Coding Tools",
  promise: "Answer a few questions about the look and feel. Get a prompt that actually produces a good result.",
  description: "A free, transparent web app that walks you through every design decision for a website or app, previews choices in real-time, and compiles them into a deterministic, copy-ready prompt.",
  version: "1.0",
  compilerVersion: "2026-10",
  repository: "https://github.com/kartikverma-dev/Atelier",
  author: "Atelier Design Team",
  footerCreditUrl: "", // Empty by default
  defaultTarget: "website" as const,
  logo: {
    horizontal: {
      light: "/brand/svg/atelier-logo-horizontal-light.svg",
      dark: "/brand/svg/atelier-logo-horizontal-dark.svg",
      monoBlack: "/brand/svg/atelier-logo-horizontal-mono-black.svg",
      monoWhite: "/brand/svg/atelier-logo-horizontal-mono-white.svg",
      sturdy: {
        light: "/brand/svg/atelier-logo-horizontal-light-sturdy.svg",
        dark: "/brand/svg/atelier-logo-horizontal-dark-sturdy.svg",
        monoBlack: "/brand/svg/atelier-logo-horizontal-mono-black-sturdy.svg",
        monoWhite: "/brand/svg/atelier-logo-horizontal-mono-white-sturdy.svg",
      },
    },
    stacked: {
      light: "/brand/svg/atelier-logo-stacked-light.svg",
      dark: "/brand/svg/atelier-logo-stacked-dark.svg",
      monoBlack: "/brand/svg/atelier-logo-stacked-mono-black.svg",
      monoWhite: "/brand/svg/atelier-logo-stacked-mono-white.svg",
      sturdy: {
        light: "/brand/svg/atelier-logo-stacked-light-sturdy.svg",
        dark: "/brand/svg/atelier-logo-stacked-dark-sturdy.svg",
        monoBlack: "/brand/svg/atelier-logo-stacked-mono-black-sturdy.svg",
        monoWhite: "/brand/svg/atelier-logo-stacked-mono-white-sturdy.svg",
      },
    },
    mark: {
      light: "/brand/svg/atelier-mark-light.svg",
      dark: "/brand/svg/atelier-mark-dark.svg",
      monoBlack: "/brand/svg/atelier-mark-mono-black.svg",
      monoWhite: "/brand/svg/atelier-mark-mono-white.svg",
      sturdy: {
        light: "/brand/svg/atelier-mark-light-sturdy.svg",
        dark: "/brand/svg/atelier-mark-dark-sturdy.svg",
        monoBlack: "/brand/svg/atelier-mark-mono-black-sturdy.svg",
        monoWhite: "/brand/svg/atelier-mark-mono-white-sturdy.svg",
      },
    },
    appIcon: "/brand/svg/atelier-app-icon.svg",
    favicon: "/brand/svg/favicon.svg",
    faviconIco: "/favicon.ico",
    appleTouchIcon: "/brand/png/apple-touch-icon.png",
    ogImage: "/brand/png/og-image-1200x630.png",
  },
};

export type BrandConfig = typeof BRAND;
