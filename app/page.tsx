"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { BRAND } from "@/config/brand";
import { PRESETS, PresetMeta } from "@/data/presets";
import { useWizardStore } from "@/store/wizard";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Smartphone,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { setMode, setTarget, applyPreset } = useWizardStore();
  const [selectedTarget, setSelectedTargetState] = useState<"website" | "app">("website");

  const handleStart = (mode: "quick" | "advanced") => {
    setMode(mode);
    setTarget(selectedTarget);
    router.push("/wizard");
  };

  const handlePresetSelect = (preset: PresetMeta) => {
    applyPreset(preset.id);
    router.push("/wizard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text selection:bg-atelier-accent/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-atelier-border">
        {/* Subtle Luxury Atmospheric Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-atelier-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-muted shadow-xs">
            <span className="w-2 h-2 rounded-full bg-atelier-accent" />
            <span>Deterministic Design-to-Prompt Compiler</span>
            <span className="text-atelier-muted/40">•</span>
            <span>No AI Model Inside v1</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-atelier-text max-w-4xl mx-auto leading-[1.05]">
            Answer a few questions about the look and feel.{" "}
            <span className="italic font-normal text-atelier-accent">
              Get a prompt that actually produces a good result.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-atelier-muted max-w-2xl mx-auto leading-relaxed">
            Stop struggling with vague prompts like "modern, sleek website." {BRAND.name} guides you through every design decision, live-previews your choices, and compiles an exact, token-level specification you can paste into Claude, ChatGPT, Cursor, or Antigravity.
          </p>

          {/* Target Selector: Website or App */}
          <div className="inline-flex items-center p-1 rounded-lg border border-atelier-border bg-atelier-surface shadow-xs">
            <button
              onClick={() => setSelectedTargetState("website")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium uppercase font-mono transition-all ${
                selectedTarget === "website"
                  ? "bg-atelier-text text-atelier-bg shadow-xs"
                  : "text-atelier-muted hover:text-atelier-text"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
            <button
              onClick={() => setSelectedTargetState("app")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium uppercase font-mono transition-all ${
                selectedTarget === "app"
                  ? "bg-atelier-text text-atelier-bg shadow-xs"
                  : "text-atelier-muted hover:text-atelier-text"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile / Web App</span>
            </button>
          </div>

          {/* Primary Action Buttons: Quick vs Advanced */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleStart("quick")}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-atelier-text text-atelier-bg hover:opacity-90 text-sm font-semibold flex items-center justify-center gap-2 shadow-elevated transition-all active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-atelier-accent group-hover:rotate-12 transition-transform" />
              <span>Start Quick Mode (about 3 min)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleStart("advanced")}
              className="w-full sm:w-auto px-7 py-3.5 rounded border border-atelier-border bg-atelier-surface hover:bg-atelier-card text-atelier-text text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-atelier-muted" />
              <span>Advanced Mode (everything)</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-atelier-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-atelier-accent" />
              <span>Zero AI inside v1 (Deterministic)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-atelier-accent" />
              <span>Exact Hex & Typographic Tokens</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-atelier-accent" />
              <span>100% Free & No Account Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Interactive Demo / How it works */}
      <section className="py-20 border-b border-atelier-border bg-atelier-surface/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-atelier-accent font-semibold">
              The Architecture of a Working Prompt
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-atelier-text tracking-tight">
              Why generic prompts fail — and how Atelier fixes them
            </h2>
            <p className="text-xs sm:text-sm text-atelier-muted">
              AI models produce generic blue templates when given vague instructions. Atelier generates concrete design tokens, explicit do-nots, and verification checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">
                <span>✕ The Typical Vague Prompt</span>
              </div>
              <div className="p-4 rounded bg-atelier-surface border border-red-500/20 font-mono text-xs text-atelier-muted leading-relaxed">
                "Make me a modern, clean, beautiful portfolio website for an architect with dark mode and nice animations."
              </div>
              <ul className="text-xs space-y-2 text-atelier-muted">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">→</span>
                  <span>AI uses default Tailwind blue (#3B82F6) and generic Inter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">→</span>
                  <span>Fills cards with "Lorem ipsum dolor sit amet" nonsense.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">→</span>
                  <span>Breaks on mobile viewports with horizontal scrolling bugs.</span>
                </li>
              </ul>
            </div>

            {/* The Atelier Way */}
            <div className="p-6 rounded-lg border border-atelier-accent/40 bg-atelier-accent/5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-atelier-accent font-bold uppercase tracking-wider">
                <span>✓ The Atelier Compiled Specification</span>
              </div>
              <div className="p-4 rounded bg-atelier-surface border border-atelier-border font-mono text-xs text-atelier-text leading-relaxed whitespace-pre-wrap">
{`## Design system
Style: dark luxury. Background #0B0B0F, surface #14141A, text #F4F1EA, accent #D4AF37.
Headings: "Cormorant Garamond", 600, tracking -0.015em. Body: "Inter", 400, 17px/1.65.
Radius: 4px on controls, 12px on cards. Shadows: none; 1px borders at 8% white.
Buttons: 48px tall, hover fills with accent over 250ms ease-out.`}
              </div>
              <ul className="text-xs space-y-2 text-atelier-muted">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Exact hex colors, verified WCAG AA contrast (14.2:1).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Explicit prohibitions: No lorem ipsum, no stock blue, no CLS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Verification checklist the AI must run before finalizing code.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Curated Presets Browser */}
      <section className="py-20 border-b border-atelier-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-atelier-accent font-semibold block mb-1">
                Jumpstart from Proven Directions
              </span>
              <h2 className="text-3xl font-serif font-bold text-atelier-text tracking-tight">
                8 Curated Production Presets
              </h2>
            </div>
            <p className="text-xs text-atelier-muted max-w-sm">
              Each preset is a complete, validated design system. Click any preset to load its exact choices into the wizard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className="p-5 rounded-lg border border-atelier-border bg-atelier-surface hover:border-atelier-text/40 hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-atelier-subtle text-atelier-muted uppercase">
                      {preset.category}
                    </span>
                    <span className="text-atelier-accent font-semibold">
                      {preset.target.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-atelier-text mb-2 group-hover:text-atelier-accent transition-colors">
                    {preset.title}
                  </h3>

                  <p className="text-xs text-atelier-muted leading-relaxed mb-4">
                    {preset.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-atelier-border/50 flex items-center justify-between text-xs font-mono">
                  <span className="text-atelier-muted/75 text-[11px] truncate max-w-[160px]">
                    {preset.previewVibe}
                  </span>
                  <span className="text-atelier-text font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Feature Grid */}
      <section className="py-20 bg-atelier-surface/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-atelier-accent font-semibold">
              Principles & Guarantees
            </span>
            <h2 className="text-3xl font-serif font-bold text-atelier-text tracking-tight">
              Trust Through Radical Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-md border border-atelier-border bg-atelier-surface space-y-3">
              <Cpu className="w-5 h-5 text-atelier-accent" />
              <h3 className="font-semibold text-sm text-atelier-text">
                No AI Model Inside v1
              </h3>
              <p className="text-xs text-atelier-muted leading-relaxed">
                The prompt compiler is 100% deterministic TypeScript. Same choices in, same prompt out, every single time. Byte-identical and reproducible.
              </p>
            </div>

            <div className="p-6 rounded-md border border-atelier-border bg-atelier-surface space-y-3">
              <Shield className="w-5 h-5 text-atelier-accent" />
              <h3 className="font-semibold text-sm text-atelier-text">
                Zero Data Leaves Browser
              </h3>
              <p className="text-xs text-atelier-muted leading-relaxed">
                No account, no tracking cookies, no telemetry, and no database in v1. All choices live entirely in your browser and your shareable URL hash.
              </p>
            </div>

            <div className="p-6 rounded-md border border-atelier-border bg-atelier-surface space-y-3">
              <Terminal className="w-5 h-5 text-atelier-accent" />
              <h3 className="font-semibold text-sm text-atelier-text">
                "Why this line?" Notes
              </h3>
              <p className="text-xs text-atelier-muted leading-relaxed">
                Every section of your compiled prompt includes an explicit rationale so you understand why each constraint is placed there before you copy it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
