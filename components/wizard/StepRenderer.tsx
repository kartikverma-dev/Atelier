"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import { UI_STYLE_OPTIONS, StepDefinition } from "@/data/steps";
import { PALETTES } from "@/data/palettes";
import { FONT_PAIRINGS, TYPE_SCALES } from "@/data/fonts";
import { compileColorTokens } from "@/lib/compiler/mappings/color";
import { UIStyle } from "@/lib/share/schema";
import {
  Check,
  Palette as PaletteIcon,
  Type,
  Layout as LayoutIcon,
  Sparkles,
  Zap,
  Sliders,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Plus,
  Trash2,
  HelpCircle,
  Smartphone,
  Globe,
  CheckCircle2,
} from "lucide-react";

export function StepRenderer({ step }: { step: StepDefinition }) {
  const {
    choices,
    updateChoices,
    updateNestedChoice,
    setTarget,
    applySmartDefaultsForStyle,
  } = useWizardStore();

  const [feelingInput, setFeelingInput] = useState("");
  const [newSectionInput, setNewSectionInput] = useState("");
  const [customColorOpen, setCustomColorOpen] = useState(false);

  // Step 1: Goal
  if (step.slug === "goal") {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Target Platform
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTarget("website")}
              className={`p-4 rounded-md border text-left flex items-start gap-3 transition-all ${
                choices.target === "website"
                  ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                  : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
              }`}
            >
              <Globe className="w-5 h-5 text-atelier-accent mt-0.5" />
              <div>
                <span className="font-semibold text-sm block text-atelier-text">Website</span>
                <span className="text-xs text-atelier-muted">
                  Marketing landing, portfolio, editorial magazine, or web storefront.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTarget("app")}
              className={`p-4 rounded-md border text-left flex items-start gap-3 transition-all ${
                choices.target === "app"
                  ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                  : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
              }`}
            >
              <Smartphone className="w-5 h-5 text-atelier-accent mt-0.5" />
              <div>
                <span className="font-semibold text-sm block text-atelier-text">Mobile / Web App</span>
                <span className="text-xs text-atelier-muted">
                  Interactive tool, habit companion, dashboard, or native shell with tabs.
                </span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            What is it for? (Short statement of purpose)
          </label>
          <textarea
            rows={2}
            value={choices.goal.purpose}
            onChange={(e) => updateNestedChoice("goal", { purpose: e.target.value })}
            placeholder="e.g. Minimal portfolio for an architectural photographer showcasing selected monograph projects"
            className="w-full px-3.5 py-2.5 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm focus:border-atelier-accent focus:ring-1 focus:ring-atelier-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Target Audience
          </label>
          <input
            type="text"
            value={choices.goal.audience}
            onChange={(e) => updateNestedChoice("goal", { audience: e.target.value })}
            placeholder="e.g. Creative directors, collectors, and design-conscious clients"
            className="w-full px-3.5 py-2 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm focus:border-atelier-accent focus:ring-1 focus:ring-atelier-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            3 Words Describing the Feeling
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {choices.goal.feelingWords.map((word, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-atelier-subtle text-atelier-text text-xs font-mono flex items-center gap-1.5 border border-atelier-border"
              >
                <span>{word}</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextWords = choices.goal.feelingWords.filter((_, i) => i !== idx);
                    updateNestedChoice("goal", { feelingWords: nextWords.length > 0 ? nextWords : ["Refined"] });
                  }}
                  className="hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={feelingInput}
              onChange={(e) => setFeelingInput(e.target.value)}
              placeholder="Add feeling (e.g. Serene, Monumental)"
              onKeyDown={(e) => {
                if (e.key === "Enter" && feelingInput.trim()) {
                  e.preventDefault();
                  updateNestedChoice("goal", {
                    feelingWords: [...choices.goal.feelingWords, feelingInput.trim()],
                  });
                  setFeelingInput("");
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
            />
            <button
              type="button"
              onClick={() => {
                if (feelingInput.trim()) {
                  updateNestedChoice("goal", {
                    feelingWords: [...choices.goal.feelingWords, feelingInput.trim()],
                  });
                  setFeelingInput("");
                }
              }}
              className="px-4 py-2 bg-atelier-card text-atelier-text rounded-md border border-atelier-border text-xs font-medium hover:bg-atelier-border"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: UI Style
  if (step.slug === "ui-style") {
    return (
      <div className="space-y-4">
        <p className="text-xs text-atelier-muted">
          Selecting a style automatically calibrates intelligent defaults for colors, typography, buttons, and motion. You can tweak any choice later.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {UI_STYLE_OPTIONS.map((opt) => {
            const isSelected = choices.uiStyle === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => applySmartDefaultsForStyle(opt.id as UIStyle)}
                className={`p-4 rounded-md border text-left flex flex-col justify-between transition-all group ${
                  isSelected
                    ? "border-atelier-text bg-atelier-card ring-2 ring-atelier-text/20 shadow-elevated"
                    : "border-atelier-border bg-atelier-surface hover:border-atelier-text/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-atelier-text group-hover:text-atelier-accent transition-colors">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-atelier-text text-atelier-bg flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-atelier-muted leading-relaxed line-clamp-3">
                    {opt.description}
                  </p>
                </div>

                <div
                  className={`mt-4 p-2.5 rounded border text-[11px] font-mono flex items-center justify-between ${opt.previewClass}`}
                >
                  <span>Aa Monograph</span>
                  <span className="opacity-60 text-[9px]">0px / 1px</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Step 3: Color (with all text/background pairs verified and UI warning when < 4.5:1)
  if (step.slug === "color") {
    const colorReport = compileColorTokens(choices.color);

    return (
      <div className="space-y-6">
        {/* All Text/Background Pairs Verification Meter */}
        <div className="p-4 rounded-md border border-atelier-border bg-atelier-card/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-atelier-text flex items-center gap-2">
              {colorReport.allWcagAAMet ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span>WCAG 2.1 Contrast Ratios (Every Text Pair Verified)</span>
            </span>

            {!colorReport.allWcagAAMet && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                {colorReport.failedPairs.length} Pair Under 4.5:1
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {colorReport.pairs.map((p, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded border flex items-center justify-between ${
                  p.wcagAAMet
                    ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-200"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-medium"
                }`}
              >
                <div>
                  <div className="font-medium text-[11px]">{p.label}</div>
                  <div className="text-[10px] opacity-75 font-mono">
                    {p.foregroundHex} on {p.backgroundHex}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-xs">{p.ratio}:1</span>
                  <span className="block text-[9px] uppercase font-mono">
                    {p.wcagAAMet ? "Pass AA" : "Fail (< 4.5:1)"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!colorReport.allWcagAAMet && (
            <div className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>
                Warning: Text contrast below 4.5:1 makes content difficult to read. Adjust text, muted text, or background tokens below.
              </span>
            </div>
          )}
        </div>

        {/* 12 Curated Palettes */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            12 Curated Harmonious Palettes
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PALETTES.map((pal) => {
              const isSelected = choices.color.paletteId === pal.id;
              return (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => {
                    updateNestedChoice("color", {
                      paletteId: pal.id,
                      primary: pal.primary,
                      secondary: pal.secondary,
                      accent: pal.accent,
                      background: pal.background,
                      surface: pal.surface,
                      text: pal.text,
                      mutedText: pal.mutedText,
                      colorScheme: pal.theme === "both" ? "both" : pal.theme,
                    });
                  }}
                  className={`p-3.5 rounded-md border text-left transition-all ${
                    isSelected
                      ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                      : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-atelier-text">
                      {pal.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-atelier-subtle text-atelier-muted">
                      {pal.theme}
                    </span>
                  </div>

                  {/* Palette swatch bar */}
                  <div className="flex h-5 rounded overflow-hidden border border-black/10 mb-2">
                    <div style={{ backgroundColor: pal.background, width: "30%" }} title="Background" />
                    <div style={{ backgroundColor: pal.surface, width: "20%" }} title="Surface" />
                    <div style={{ backgroundColor: pal.text, width: "25%" }} title="Text" />
                    <div style={{ backgroundColor: pal.accent, width: "25%" }} title="Accent" />
                  </div>

                  <p className="text-[11px] text-atelier-muted leading-tight line-clamp-2">
                    {pal.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Preference */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Color Scheme Enforced
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dark", "both"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => updateNestedChoice("color", { colorScheme: mode })}
                className={`py-2 px-3 rounded-md border text-xs font-medium uppercase font-mono text-center transition-all ${
                  choices.color.colorScheme === mode
                    ? "border-atelier-text bg-atelier-card text-atelier-text ring-1 ring-atelier-text"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                }`}
              >
                {mode === "both" ? "Light & Dark Toggle" : mode + " Only"}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Swatches Expander */}
        <div>
          <button
            type="button"
            onClick={() => setCustomColorOpen(!customColorOpen)}
            className="text-xs font-mono text-atelier-accent hover:underline flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{customColorOpen ? "Close Custom Hex Builder" : "Customize Exact Hex Tokens"}</span>
          </button>

          {customColorOpen && (
            <div className="mt-3 p-4 rounded-md border border-atelier-border bg-atelier-card/40 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Background", key: "background" as const },
                { label: "Surface / Cards", key: "surface" as const },
                { label: "Primary Text", key: "text" as const },
                { label: "Muted Text", key: "mutedText" as const },
                { label: "Accent Highlight", key: "accent" as const },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-[11px] font-mono text-atelier-muted mb-1">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={choices.color[key]}
                      onChange={(e) =>
                        updateNestedChoice("color", {
                          [key]: e.target.value.toUpperCase(),
                          paletteId: "custom",
                        })
                      }
                      className="w-7 h-7 rounded border border-atelier-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={choices.color[key]}
                      onChange={(e) =>
                        updateNestedChoice("color", {
                          [key]: e.target.value,
                          paletteId: "custom",
                        })
                      }
                      className="w-20 px-2 py-1 text-xs font-mono rounded border border-atelier-border bg-atelier-surface text-atelier-text"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 4: Typography
  if (step.slug === "typography") {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Typographic Scale Scale
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["compact", "balanced", "dramatic"] as const).map((sc) => {
              const cfg = TYPE_SCALES[sc];
              const isSelected = choices.typography.scale === sc;
              return (
                <button
                  key={sc}
                  type="button"
                  onClick={() => updateNestedChoice("typography", { scale: sc })}
                  className={`p-3 rounded-md border text-left transition-all ${
                    isSelected
                      ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text"
                      : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                  }`}
                >
                  <span className="font-semibold text-xs block text-atelier-text">
                    {cfg.name}
                  </span>
                  <span className="text-[10px] text-atelier-muted line-clamp-2 mt-0.5">
                    H1: {cfg.h1} • Body: {cfg.body}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            10 Curated Typographic Pairings
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FONT_PAIRINGS.map((pair) => {
              const isSelected = choices.typography.pairingId === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    updateNestedChoice("typography", {
                      pairingId: pair.id,
                      headingFont: pair.headingFont,
                      bodyFont: pair.bodyFont,
                      monoFont: pair.monoFont,
                    });
                  }}
                  className={`p-4 rounded-md border text-left transition-all ${
                    isSelected
                      ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                      : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-atelier-text">
                      {pair.name}
                    </span>
                    <span className="text-[10px] font-mono text-atelier-accent">
                      {pair.vibe}
                    </span>
                  </div>

                  <p
                    className="text-base font-semibold leading-tight mb-1"
                    style={{ fontFamily: pair.headingFont }}
                  >
                    {pair.sampleHeading}
                  </p>
                  <p
                    className="text-xs text-atelier-muted line-clamp-2"
                    style={{ fontFamily: pair.bodyFont }}
                  >
                    {pair.sampleBody}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Logo & Brand Mark
  if (step.slug === "logo") {
    const logo = choices.logo || {
      source: "design-new",
      existingFile: "/public/brand/logo.svg",
      hasDarkVersion: true,
      logoType: "symbol-wordmark",
      letteringStyle: "heading-font",
      letterCase: "uppercase",
      tracking: "wide",
      symbolIdea: "A minimalist geometric compass arch",
      symbolStyle: "line",
      colorUse: "two-color",
      placement: ["navbar-left", "footer"],
      navbarHeight: 28,
      iconsEnabled: true,
      iconShape: "rounded-square",
      iconSource: "monogram",
    };

    const togglePlacement = (val: "navbar-left" | "navbar-center" | "footer" | "hero" | "loading-screen") => {
      const current = logo.placement || [];
      if (current.includes(val)) {
        if (current.length > 1) {
          updateNestedChoice("logo", { placement: current.filter((p) => p !== val) });
        }
      } else {
        updateNestedChoice("logo", { placement: [...current, val] });
      }
    };

    return (
      <div className="space-y-8">
        {/* 1. Logo Source */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Logo Source & Strategy
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "design-new",
                label: "Design One For Me",
                desc: "The AI designs an inline SVG mark, monogram, or badge following exact design tokens.",
              },
              {
                id: "wordmark-only",
                label: "Text Wordmark Only",
                desc: "Typeset pure brand text with editorial letter-spacing and outlined paths.",
              },
              {
                id: "already-have",
                label: "I Already Have a Logo",
                desc: "Instruct the AI to use your existing SVG files on disk without modifying artwork.",
              },
            ].map((src) => (
              <button
                key={src.id}
                type="button"
                onClick={() => updateNestedChoice("logo", { source: src.id as any })}
                className={`p-4 rounded-md border text-left flex flex-col justify-between transition-all ${
                  logo.source === src.id
                    ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                    : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                }`}
              >
                <div>
                  <span className="font-semibold text-xs block text-atelier-text mb-1">
                    {src.label}
                  </span>
                  <p className="text-[11px] text-atelier-muted leading-relaxed">
                    {src.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Existing File Settings (when source is already-have) */}
        {logo.source === "already-have" && (
          <div className="p-4 rounded-lg border border-atelier-border bg-atelier-surface space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-1.5">
                Existing Logo File Path (Relative to Project Root)
              </label>
              <input
                type="text"
                value={logo.existingFile}
                onChange={(e) => updateNestedChoice("logo", { existingFile: e.target.value })}
                placeholder="/public/brand/logo.svg"
                className="w-full px-3 py-2 rounded border border-atelier-border bg-atelier-card text-xs font-mono text-atelier-text focus:outline-none focus:ring-1 focus:ring-atelier-accent"
              />
              <span className="text-[11px] text-atelier-muted mt-1 block">
                The AI will be strictly instructed to use this file directly without restyling or redrawing.
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="hasDarkVersion"
                checked={logo.hasDarkVersion}
                onChange={(e) => updateNestedChoice("logo", { hasDarkVersion: e.target.checked })}
                className="w-4 h-4 rounded border-atelier-border text-atelier-accent focus:ring-atelier-accent"
              />
              <label htmlFor="hasDarkVersion" className="text-xs text-atelier-text select-none cursor-pointer">
                A dark-background variant exists (e.g. at{" "}
                <code className="font-mono text-atelier-accent">
                  {logo.existingFile ? logo.existingFile.replace(/\.svg$/, "-dark.svg") : "/public/brand/logo-dark.svg"}
                </code>
                )
              </label>
            </div>
          </div>
        )}

        {/* 3. Logo Type (when source is design-new) */}
        {logo.source === "design-new" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
                Logo Composition & Archetype
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    id: "symbol-wordmark",
                    label: "Symbol + Wordmark",
                    desc: "Distinct vector mark paired with typographic name",
                  },
                  {
                    id: "wordmark",
                    label: "Pure Wordmark",
                    desc: "Art-directed brand typography with no icon",
                  },
                  {
                    id: "monogram",
                    label: "Monogram Badge",
                    desc: "Initials framed inside a geometric container",
                  },
                  {
                    id: "badge",
                    label: "Emblem / Insignia",
                    desc: "Architectural stamp or seal enclosing mark & text",
                  },
                ].map((lt) => (
                  <button
                    key={lt.id}
                    type="button"
                    onClick={() => updateNestedChoice("logo", { logoType: lt.id as any })}
                    className={`p-3 rounded-md border text-left transition-all ${
                      logo.logoType === lt.id
                        ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text"
                        : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                    }`}
                  >
                    <span className="font-semibold text-xs block text-atelier-text mb-1">
                      {lt.label}
                    </span>
                    <p className="text-[10px] text-atelier-muted line-clamp-2">
                      {lt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Symbol Concept and Style (when symbol or badge) */}
            {(logo.logoType === "symbol-wordmark" || logo.logoType === "badge") && (
              <div className="p-4 rounded-lg border border-atelier-border bg-atelier-surface space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-1.5">
                    Symbol Concept (One Short Prompt Line)
                  </label>
                  <input
                    type="text"
                    value={logo.symbolIdea}
                    onChange={(e) => updateNestedChoice("logo", { symbolIdea: e.target.value })}
                    placeholder="e.g. A minimalist geometric compass arch"
                    className="w-full px-3 py-2 rounded border border-atelier-border bg-atelier-card text-xs text-atelier-text focus:outline-none focus:ring-1 focus:ring-atelier-accent"
                  />
                  <span className="text-[11px] text-atelier-muted mt-1 block">
                    Describe the core glyph metaphor in 3–8 words.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
                    Symbol Vector Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: "line", label: "Monoline" },
                      { id: "solid", label: "Solid" },
                      { id: "geometric", label: "Geometric" },
                      { id: "hand-drawn", label: "Hand-Drawn" },
                      { id: "abstract", label: "Abstract" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => updateNestedChoice("logo", { symbolStyle: st.id as any })}
                        className={`py-2 px-3 rounded border text-center text-xs font-medium uppercase font-mono transition-all ${
                          logo.symbolStyle === st.id
                            ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                            : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. Lettering Style & Font Selection */}
        {logo.source !== "already-have" && (
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Lettering Style & Typography Discipline
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: "heading-font",
                  label: "Chosen Heading Font",
                  desc: `Inherit "${choices.typography.headingFont}"`,
                },
                {
                  id: "high-contrast-serif",
                  label: "High-Contrast Serif",
                  desc: "Italiana / Playfair luxury display",
                },
                {
                  id: "geometric-sans",
                  label: "Geometric Sans",
                  desc: "Space Grotesk / Futura architecture",
                },
                {
                  id: "humanist-sans",
                  label: "Humanist Sans",
                  desc: "Plus Jakarta / Frutiger warmth",
                },
                {
                  id: "monospace",
                  label: "Technical Monospace",
                  desc: "JetBrains / Space Mono engineering",
                },
                {
                  id: "custom",
                  label: "Custom Font Name",
                  desc: "Specify exact font family",
                },
              ].map((styleOpt) => (
                <button
                  key={styleOpt.id}
                  type="button"
                  onClick={() => updateNestedChoice("logo", { letteringStyle: styleOpt.id })}
                  className={`p-3 rounded-md border text-left transition-all ${
                    logo.letteringStyle === styleOpt.id
                      ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text"
                      : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                  }`}
                >
                  <span className="font-semibold text-xs block text-atelier-text mb-0.5">
                    {styleOpt.label}
                  </span>
                  <span className="text-[10px] text-atelier-muted">
                    {styleOpt.desc}
                  </span>
                </button>
              ))}
            </div>

            {logo.letteringStyle === "custom" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter custom font family name..."
                  className="w-full px-3 py-2 rounded border border-atelier-border bg-atelier-card text-xs text-atelier-text focus:outline-none focus:ring-1 focus:ring-atelier-accent"
                  onChange={(e) => updateNestedChoice("logo", { letteringStyle: e.target.value })}
                />
              </div>
            )}
          </div>
        )}

        {/* 5. Case and Letter-Spacing (Tracking) */}
        {logo.source !== "already-have" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
                Capitalization & Case
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "normal", label: "Normal" },
                  { id: "uppercase", label: "ALL CAPS" },
                  { id: "small-caps", label: "Small Caps" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateNestedChoice("logo", { letterCase: c.id as any })}
                    className={`py-2 px-2 rounded border text-center text-xs font-mono transition-all ${
                      logo.letterCase === c.id
                        ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                        : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
                Letter-Spacing (Tracking)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "tight", label: "Tight (-0.02em)" },
                  { id: "normal", label: "Normal (0.04em)" },
                  { id: "wide", label: "Wide (0.24em)" },
                ].map((tr) => (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => updateNestedChoice("logo", { tracking: tr.id as any })}
                    className={`py-2 px-2 rounded border text-center text-xs font-mono transition-all ${
                      logo.tracking === tr.id
                        ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                        : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                    }`}
                  >
                    {tr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. Color Use */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Logo Color Treatment
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: "two-color",
                label: "Two-Color (Text + Accent)",
                desc: "Lettering in primary text token, symbol highlighted with accent.",
              },
              {
                id: "single-color",
                label: "Single-Color (Monochrome)",
                desc: "Uniform fill using the primary text token (fill: currentColor).",
              },
              {
                id: "auto-palette",
                label: "Follows Palette Automatically",
                desc: "Adapts dynamic tints across light and dark surface transitions.",
              },
            ].map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => updateNestedChoice("logo", { colorUse: col.id as any })}
                className={`p-3 rounded-md border text-left transition-all ${
                  logo.colorUse === col.id
                    ? "border-atelier-text bg-atelier-card ring-1 ring-atelier-text shadow-xs"
                    : "border-atelier-border bg-atelier-surface hover:border-atelier-muted"
                }`}
              >
                <span className="font-semibold text-xs block text-atelier-text mb-1">
                  {col.label}
                </span>
                <p className="text-[11px] text-atelier-muted leading-relaxed">
                  {col.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 7. Placement Landmarks */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Target Placements (Multi-Select)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: "navbar-left", label: "Navbar Left" },
              { id: "navbar-center", label: "Navbar Center" },
              { id: "footer", label: "Footer / Colophon" },
              { id: "hero", label: "Hero Landmark" },
              { id: "loading-screen", label: "Loading Screen" },
            ].map((place) => {
              const isSelected = (logo.placement || []).includes(place.id as any);
              return (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => togglePlacement(place.id as any)}
                  className={`p-2.5 rounded border text-center text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "border-atelier-text bg-atelier-card text-atelier-text font-bold ring-1 ring-atelier-text"
                      : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-atelier-accent" : "bg-atelier-border"}`} />
                  <span>{place.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. Navbar Logo Height */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Navbar Logo Render Height
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {[24, 28, 32, 40].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => updateNestedChoice("logo", { navbarHeight: h as any })}
                className={`py-3 px-3 rounded-md border text-center font-mono transition-all ${
                  logo.navbarHeight === h
                    ? "border-atelier-text bg-atelier-card text-atelier-text font-bold ring-1 ring-atelier-text"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                }`}
              >
                <span className="block text-sm font-semibold">{h}px</span>
                <span className="text-[10px] text-atelier-muted">
                  {h === 24 ? "Discreet" : h === 28 ? "Standard" : h === 32 ? "Prominent" : "Monumental"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 9. Favicon and App Icons */}
        <div className="p-4 rounded-lg border border-atelier-border bg-atelier-surface space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs block text-atelier-text">
                Generate Favicon, Touch & PWA Icon Suite
              </span>
              <span className="text-[11px] text-atelier-muted">
                Compiles specs for favicon.svg, favicon.ico (16/32/48px), Apple Touch (180px), and Open Graph (1200x630).
              </span>
            </div>
            <div className="flex items-center bg-atelier-card border border-atelier-border rounded p-0.5">
              <button
                type="button"
                onClick={() => updateNestedChoice("logo", { iconsEnabled: true })}
                className={`px-3 py-1 rounded text-xs font-mono font-medium ${
                  logo.iconsEnabled ? "bg-atelier-text text-atelier-bg" : "text-atelier-muted"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => updateNestedChoice("logo", { iconsEnabled: false })}
                className={`px-3 py-1 rounded text-xs font-mono font-medium ${
                  !logo.iconsEnabled ? "bg-atelier-text text-atelier-bg" : "text-atelier-muted"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {logo.iconsEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-atelier-border/50">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-atelier-muted mb-1.5">
                  App Icon Geometry Shape
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "rounded-square", label: "Squircle" },
                    { id: "square", label: "Sharp Square" },
                    { id: "circle", label: "Circle" },
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => updateNestedChoice("logo", { iconShape: sh.id as any })}
                      className={`py-1.5 px-2 rounded border text-center text-xs font-mono transition-all ${
                        logo.iconShape === sh.id
                          ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                          : "border-atelier-border bg-atelier-surface text-atelier-muted"
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-atelier-muted mb-1.5">
                  Icon Visual Motif Source
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "monogram", label: "Initials Monogram" },
                    { id: "symbol", label: "Vector Symbol" },
                  ].map((src) => (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => updateNestedChoice("logo", { iconSource: src.id as any })}
                      className={`py-1.5 px-2 rounded border text-center text-xs font-mono transition-all ${
                        logo.iconSource === src.id
                          ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                          : "border-atelier-border bg-atelier-surface text-atelier-muted"
                      }`}
                    >
                      {src.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 6: Background
  if (step.slug === "background") {
    const bgTypes = ["solid", "gradient", "noise", "image", "video", "animated-3d", "pattern"] as const;
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Atmospheric Canvas Treatment
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {bgTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateNestedChoice("background", { type: t })}
                className={`p-3 rounded-md border text-center text-xs font-medium uppercase font-mono transition-all ${
                  choices.background.type === t
                    ? "border-atelier-text bg-atelier-card text-atelier-text ring-1 ring-atelier-text"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                }`}
              >
                {t.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Canvas Treatment Details & Texture
          </label>
          <textarea
            rows={2}
            value={choices.background.details}
            onChange={(e) => updateNestedChoice("background", { details: e.target.value })}
            placeholder="e.g. Fine monochromatic grain overlay"
            className="w-full px-3.5 py-2.5 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
          />
        </div>
      </div>
    );
  }

  // Step 6: Imagery
  if (step.slug === "imagery") {
    const assetTypes = ["none", "hero-image", "product-shots", "illustrations", "icons", "3d-objects"] as const;
    const shapes = ["sharp", "rounded", "pill", "organic-mask"] as const;
    const sizes = ["compact", "medium", "full-bleed"] as const;

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Primary Visual Asset Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {assetTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateNestedChoice("imagery", { type })}
                className={`p-3 rounded-md border text-xs uppercase font-mono font-medium text-center transition-all ${
                  choices.imagery.type === type
                    ? "border-atelier-text bg-atelier-card text-atelier-text ring-1 ring-atelier-text"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                }`}
              >
                {type.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Framing Shape & Mask
            </label>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateNestedChoice("imagery", { shape: s })}
                  className={`py-2 px-3 rounded-md border text-xs font-mono capitalize text-center ${
                    choices.imagery.shape === s
                      ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                      : "border-atelier-border bg-atelier-surface text-atelier-muted"
                  }`}
                >
                  {s.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Bleed & Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => updateNestedChoice("imagery", { size: sz })}
                  className={`py-2 px-2 rounded-md border text-xs font-mono capitalize text-center ${
                    choices.imagery.size === sz
                      ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                      : "border-atelier-border bg-atelier-surface text-atelier-muted"
                  }`}
                >
                  {sz.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 7: Layout (Uses unified canonical section list from choices.content.sections)
  if (step.slug === "layout") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Columns Grid
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([4, 6, 12] as const).map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => updateNestedChoice("layout", { columns: col })}
                  className={`py-2.5 rounded-md border text-xs font-mono font-bold text-center ${
                    choices.layout.columns === col
                      ? "border-atelier-text bg-atelier-card text-atelier-text"
                      : "border-atelier-border bg-atelier-surface text-atelier-muted"
                  }`}
                >
                  {col} Col
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Container Width
            </label>
            <select
              value={choices.layout.containerWidth}
              onChange={(e) => updateNestedChoice("layout", { containerWidth: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="narrow">Narrow (1040px)</option>
              <option value="default">Default (1240px)</option>
              <option value="wide">Wide (1440px)</option>
              <option value="full">Full Bleed (100%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Navbar Pattern
            </label>
            <select
              value={choices.layout.navbarStyle}
              onChange={(e) => updateNestedChoice("layout", { navbarStyle: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="top">Top Fixed</option>
              <option value="floating">Floating Island Pill</option>
              <option value="sidebar">Sidebar Rail</option>
              <option value="hidden">Minimalist Drawer</option>
            </select>
          </div>
        </div>

        {/* Section Reordering (Unified with Content) */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Unified Section Flow (Click arrows to reorder)
          </label>
          <div className="space-y-2">
            {choices.content.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md border border-atelier-border bg-atelier-surface flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-atelier-muted">0{idx + 1}</span>
                  <span className="font-semibold text-atelier-text capitalize">
                    {section.replace("-", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => {
                      const next = [...choices.content.sections];
                      const temp = next[idx - 1];
                      next[idx - 1] = next[idx];
                      next[idx] = temp;
                      updateNestedChoice("content", { sections: next });
                      updateNestedChoice("layout", { sectionOrder: next });
                    }}
                    className="p-1 rounded hover:bg-atelier-subtle disabled:opacity-30"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === choices.content.sections.length - 1}
                    onClick={() => {
                      const next = [...choices.content.sections];
                      const temp = next[idx + 1];
                      next[idx + 1] = next[idx];
                      next[idx] = temp;
                      updateNestedChoice("content", { sections: next });
                      updateNestedChoice("layout", { sectionOrder: next });
                    }}
                    className="p-1 rounded hover:bg-atelier-subtle disabled:opacity-30"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 8: Components
  if (step.slug === "components") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Button Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["sharp", "subtle-round", "pill"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateNestedChoice("components", { buttonShape: s })}
                  className={`py-2 px-1 rounded-md border text-[11px] font-mono capitalize text-center ${
                    choices.components.buttonShape === s
                      ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                      : "border-atelier-border bg-atelier-surface text-atelier-muted"
                  }`}
                >
                  {s.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Card Elevation Style
            </label>
            <select
              value={choices.components.cardStyle}
              onChange={(e) => updateNestedChoice("components", { cardStyle: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="border-only">Border Only (Flat)</option>
              <option value="subtle-elevated">Subtle Elevated</option>
              <option value="frosted-glass">Frosted Glassmorphism</option>
              <option value="deep-shadow">Deep Cinematic Shadow</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Shadow Style
            </label>
            <select
              value={choices.components.shadowStyle}
              onChange={(e) => updateNestedChoice("components", { shadowStyle: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="none">None (0px)</option>
              <option value="crisp">Crisp Hard Stamp (Brutalist)</option>
              <option value="soft">Soft Ambient</option>
              <option value="deep">Deep Atmospheric</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Button Hover Physics
            </label>
            <select
              value={choices.components.buttonHover}
              onChange={(e) => updateNestedChoice("components", { buttonHover: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="fill-expand">Fill Expand with Accent</option>
              <option value="subtle-lift">Subtle Lift (-2px)</option>
              <option value="glow">Glow Halo</option>
              <option value="invert">Contrast Invert</option>
              <option value="scale">Subtle Scale (1.03x)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Global Border Radius Scale
            </label>
            <select
              value={choices.components.borderRadiusScale}
              onChange={(e) => updateNestedChoice("components", { borderRadiusScale: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="none">None (0px everywhere)</option>
              <option value="subtle">Subtle (2px / 4px)</option>
              <option value="medium">Medium (8px / 12px)</option>
              <option value="large">Large (16px / 24px)</option>
              <option value="full">Full Rounded Pills</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Step 9: Motion
  if (step.slug === "motion") {
    const libs = ["none", "css-only", "framer-motion", "gsap", "lenis", "threejs"] as const;
    const intensities = ["none", "subtle", "moderate", "expressive"] as const;

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Primary Motion Library
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {libs.map((lib) => (
              <button
                key={lib}
                type="button"
                onClick={() => updateNestedChoice("motion", { library: lib })}
                className={`py-3 px-2 rounded-md border text-xs font-mono uppercase font-semibold text-center transition-all ${
                  choices.motion.library === lib
                    ? "border-atelier-text bg-atelier-card text-atelier-text ring-1 ring-atelier-text"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted hover:text-atelier-text"
                }`}
              >
                {lib.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Page Load Entrance Intensity
          </label>
          <div className="grid grid-cols-4 gap-2">
            {intensities.map((int) => (
              <button
                key={int}
                type="button"
                onClick={() => updateNestedChoice("motion", { pageLoadIntensity: int })}
                className={`py-2 px-1 rounded-md border text-xs font-mono capitalize text-center ${
                  choices.motion.pageLoadIntensity === int
                    ? "border-atelier-text bg-atelier-card text-atelier-text font-bold"
                    : "border-atelier-border bg-atelier-surface text-atelier-muted"
                }`}
              >
                {int}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 10: Behavior
  if (step.slug === "behavior") {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="p-4 rounded-md border border-atelier-border bg-atelier-surface flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-atelier-text block">
                Progressive Web App (PWA) Offline Engine
              </span>
              <span className="text-xs text-atelier-muted">
                Generates service worker caching, offline fallback, and installable web manifest.
              </span>
            </div>
            <input
              type="checkbox"
              checked={choices.behavior.pwa}
              onChange={(e) => updateNestedChoice("behavior", { pwa: e.target.checked })}
              className="w-5 h-5 rounded border-atelier-border accent-atelier-accent cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-md border border-atelier-border bg-atelier-surface flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-atelier-text block">
                Interactive Dark Mode Toggle
              </span>
              <span className="text-xs text-atelier-muted">
                Requires the AI to implement class-based theme switching with localStorage sync.
              </span>
            </div>
            <input
              type="checkbox"
              checked={choices.behavior.darkModeToggle}
              onChange={(e) => updateNestedChoice("behavior", { darkModeToggle: e.target.checked })}
              className="w-5 h-5 rounded border-atelier-border accent-atelier-accent cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // Step 11: Tech
  if (step.slug === "tech") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Core Framework
            </label>
            <select
              value={choices.tech.framework}
              onChange={(e) => updateNestedChoice("tech", { framework: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="nextjs">Next.js (App Router)</option>
              <option value="astro">Astro (Zero-JS Islands)</option>
              <option value="react-vite">React + Vite</option>
              <option value="html-css-js">Plain HTML / CSS / JS</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Styling Engine
            </label>
            <select
              value={choices.tech.styling}
              onChange={(e) => updateNestedChoice("tech", { styling: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="tailwind">Tailwind CSS</option>
              <option value="css-modules">CSS Modules</option>
              <option value="styled-components">styled-components</option>
              <option value="vanilla-css">Vanilla CSS Custom Props</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Hosting Target
            </label>
            <select
              value={choices.tech.hosting}
              onChange={(e) => updateNestedChoice("tech", { hosting: e.target.value as any })}
              className="w-full h-10 px-3 rounded-md border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            >
              <option value="vercel">Vercel</option>
              <option value="cloudflare">Cloudflare Pages</option>
              <option value="netlify">Netlify</option>
              <option value="static-s3">Static S3 / CloudFront</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Step 12: Content (Unified section list with Layout)
  if (step.slug === "content") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Site / Brand Name
            </label>
            <input
              type="text"
              value={choices.content.brandName}
              onChange={(e) => updateNestedChoice("content", { brandName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={choices.content.tagline}
              onChange={(e) => updateNestedChoice("content", { tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
            />
          </div>
        </div>

        {/* Unified Section List Manager */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Unified Content & Layout Sections
          </label>
          <div className="space-y-2 mb-3">
            {choices.content.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded border border-atelier-border bg-atelier-surface flex items-center justify-between text-xs font-mono"
              >
                <span>
                  {idx + 1}. {sec}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (choices.content.sections.length > 1) {
                      const updated = choices.content.sections.filter((_, i) => i !== idx);
                      updateNestedChoice("content", { sections: updated });
                      updateNestedChoice("layout", { sectionOrder: updated });
                    }
                  }}
                  className="text-atelier-muted hover:text-red-500 p-1"
                  title="Remove section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSectionInput}
              onChange={(e) => setNewSectionInput(e.target.value)}
              placeholder="Add section name (e.g. Case Studies, Press)"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newSectionInput.trim()) {
                  e.preventDefault();
                  const updated = [...choices.content.sections, newSectionInput.trim()];
                  updateNestedChoice("content", { sections: updated });
                  updateNestedChoice("layout", { sectionOrder: updated });
                  setNewSectionInput("");
                }
              }}
              className="flex-1 px-3 py-1.5 rounded border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-text"
            />
            <button
              type="button"
              onClick={() => {
                if (newSectionInput.trim()) {
                  const updated = [...choices.content.sections, newSectionInput.trim()];
                  updateNestedChoice("content", { sections: updated });
                  updateNestedChoice("layout", { sectionOrder: updated });
                  setNewSectionInput("");
                }
              }}
              className="px-3 py-1.5 rounded bg-atelier-card hover:bg-atelier-border text-xs font-medium border border-atelier-border"
            >
              Add Section
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            Real Copy the AI Must Include (No Lorem Ipsum)
          </label>
          <textarea
            rows={3}
            value={choices.content.realCopy}
            onChange={(e) => updateNestedChoice("content", { realCopy: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-atelier-muted mb-2">
            One Unusual Detail You Want (Signature Flourish)
          </label>
          <input
            type="text"
            value={choices.content.unusualDetail}
            onChange={(e) => updateNestedChoice("content", { unusualDetail: e.target.value })}
            placeholder="e.g. A subtle micro-grid coordinate watermark tracking scroll progress"
            className="w-full px-3.5 py-2 rounded-md border border-atelier-border bg-atelier-surface text-atelier-text text-sm"
          />
        </div>

        {/* Uniqueness boost toggle */}
        <div className="p-4 rounded-md border border-atelier-border bg-atelier-card/50 flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm text-atelier-text flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-atelier-accent" />
              <span>Uniqueness Boost (Deterministic Seed #{choices.seed})</span>
            </span>
            <span className="text-xs text-atelier-muted">
              Appends distinctive, non-generic design constraints driven by your seed so your prompt never produces identical AI code.
            </span>
          </div>
          <input
            type="checkbox"
            checked={choices.uniquenessBoost}
            onChange={(e) => updateChoices({ uniquenessBoost: e.target.checked })}
            className="w-5 h-5 rounded border-atelier-border accent-atelier-accent cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-4 rounded border border-atelier-border bg-atelier-surface text-sm">
      Configure settings for {step.title}.
    </div>
  );
}
