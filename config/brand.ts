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
};

export type BrandConfig = typeof BRAND;
