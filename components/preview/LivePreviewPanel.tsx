"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import {
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  Sliders,
  ChevronRight,
  Shield,
  Search,
  Plus,
  Home,
  Bookmark,
  User,
  Bell,
  Battery,
  Wifi,
} from "lucide-react";
import { TYPE_SCALES } from "@/data/fonts";

export function LivePreviewPanel() {
  const { choices, deviceMode, setDeviceMode } = useWizardStore();
  const [activeTab, setActiveTab] = useState("home");
  const [cardChecked, setCardChecked] = useState<Record<number, boolean>>({ 1: true });

  const isApp = choices.target === "app";
  const { color, typography, components, layout, uiStyle } = choices;
  const typeScale = TYPE_SCALES[typography.scale] || TYPE_SCALES.balanced;

  // Compute CSS styling variables based on choices
  const borderRadiusValue = {
    none: "0px",
    subtle: "4px",
    medium: "8px",
    large: "16px",
    full: "24px",
  }[components.borderRadiusScale];

  const buttonRadiusValue = {
    sharp: "0px",
    "subtle-round": "6px",
    pill: "9999px",
  }[components.buttonShape];

  const shadowValue = {
    none: "none",
    crisp: "3px 3px 0px rgba(0,0,0,0.85)",
    soft: "0 4px 20px -2px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.04)",
    deep: "0 20px 40px -15px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.06)",
  }[components.shadowStyle];

  // Device container width
  const containerWidthStyle = {
    phone: "max-w-[375px]",
    tablet: "max-w-[620px]",
    desktop: "max-w-full",
  }[deviceMode];

  return (
    <div className="flex flex-col h-full bg-atelier-surface border-l border-atelier-border relative overflow-hidden">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-atelier-border bg-atelier-card/40 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-atelier-muted">
            Live Preview • {choices.target.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-[11px] font-mono px-2 py-0.5 rounded bg-atelier-subtle text-atelier-text/75 border border-atelier-border">
            {uiStyle}
          </span>
        </div>

        {/* Device toggles */}
        <div className="flex items-center bg-atelier-surface border border-atelier-border rounded-md p-0.5">
          <button
            onClick={() => setDeviceMode("phone")}
            title="Mobile (375px)"
            className={`p-1.5 rounded transition-all ${
              deviceMode === "phone"
                ? "bg-atelier-text text-atelier-bg shadow-xs"
                : "text-atelier-muted hover:text-atelier-text"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            title="Tablet (768px)"
            className={`p-1.5 rounded transition-all ${
              deviceMode === "tablet"
                ? "bg-atelier-text text-atelier-bg shadow-xs"
                : "text-atelier-muted hover:text-atelier-text"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("desktop")}
            title="Desktop (100%)"
            className={`p-1.5 rounded transition-all ${
              deviceMode === "desktop"
                ? "bg-atelier-text text-atelier-bg shadow-xs"
                : "text-atelier-muted hover:text-atelier-text"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Frame Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex items-start justify-center bg-atelier-subtle/30">
        <div
          className={`w-full ${containerWidthStyle} transition-all duration-300 ease-out shadow-float overflow-hidden flex flex-col`}
          style={{
            backgroundColor: color.background,
            color: color.text,
            fontFamily: typography.bodyFont,
            borderRadius: isApp || deviceMode === "phone" ? "32px" : "8px",
            border: isApp || deviceMode === "phone" ? "8px solid #1A1918" : `1px solid ${color.mutedText}25`,
            minHeight: isApp || deviceMode === "phone" ? "680px" : "auto",
          }}
        >
          {/* Mobile Status Bar (shown when target is App or Phone mode) */}
          {(isApp || deviceMode === "phone") && (
            <div
              className="px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono shrink-0 select-none"
              style={{ color: color.mutedText }}
            >
              <span>9:41</span>
              <div className="w-20 h-4 rounded-full bg-black/40 mx-auto" />
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {isApp ? (
            /* =========================================
               APP TARGET MOCKUP
               ========================================= */
            <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
              {/* App Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <span
                      className="text-[11px] uppercase tracking-wider font-mono block opacity-70"
                      style={{ color: color.mutedText }}
                    >
                      {choices.content.brandName || "Atelier App"}
                    </span>
                    <h2
                      className="text-lg font-bold tracking-tight"
                      style={{
                        fontFamily: typography.headingFont,
                        color: color.text,
                      }}
                    >
                      Daily Dashboard
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{
                        borderColor: `${color.mutedText}30`,
                        backgroundColor: color.surface,
                      }}
                    >
                      <Bell className="w-3.5 h-3.5" style={{ color: color.text }} />
                    </button>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{
                        backgroundColor: color.accent,
                        color: color.background,
                      }}
                    >
                      M
                    </div>
                  </div>
                </div>

                {/* Hero Stat / Highlight Banner */}
                <div
                  className="p-4 mb-4 transition-all"
                  style={{
                    backgroundColor: color.surface,
                    borderRadius: borderRadiusValue,
                    border: `1px solid ${color.mutedText}25`,
                    boxShadow: shadowValue,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: color.mutedText }}>
                      Active Sprint Focus
                    </span>
                    <span
                      className="text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold"
                      style={{
                        backgroundColor: `${color.accent}20`,
                        color: color.accent,
                      }}
                    >
                      85% Complete
                    </span>
                  </div>
                  <p
                    className="text-sm font-semibold mb-3 leading-snug"
                    style={{
                      fontFamily: typography.headingFont,
                      color: color.text,
                    }}
                  >
                    "{choices.content.tagline || "Spatial Monograph & Habit Engine"}"
                  </p>

                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-black/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: "85%",
                        backgroundColor: color.accent,
                      }}
                    />
                  </div>
                </div>

                {/* List Items / Routine Checklist */}
                <div className="space-y-2 mb-4">
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider block mb-1 opacity-70"
                    style={{ color: color.mutedText }}
                  >
                    Core Sections
                  </span>

                  {choices.content.sections.slice(0, 3).map((sec, i) => {
                    const isChecked = !!cardChecked[i];
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          setCardChecked((prev) => ({ ...prev, [i]: !prev[i] }))
                        }
                        className="p-3 flex items-center justify-between cursor-pointer transition-all"
                        style={{
                          backgroundColor: color.surface,
                          borderRadius: borderRadiusValue,
                          border: `1px solid ${color.mutedText}20`,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                              isChecked ? "border-transparent" : "border"
                            }`}
                            style={{
                              backgroundColor: isChecked ? color.accent : "transparent",
                              borderColor: `${color.mutedText}40`,
                            }}
                          >
                            {isChecked && (
                              <CheckCircle2
                                className="w-3.5 h-3.5"
                                style={{ color: color.background }}
                              />
                            )}
                          </div>
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: isChecked ? color.mutedText : color.text,
                              textDecoration: isChecked ? "line-through" : "none",
                            }}
                          >
                            {sec}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Action Button & Tab Bar */}
              <div className="mt-auto pt-2">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-xs tracking-wide transition-transform active:scale-95 mb-3"
                  style={{
                    backgroundColor: color.accent,
                    color: color.background,
                    borderRadius: buttonRadiusValue,
                    boxShadow: shadowValue,
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Execute Primary Action</span>
                </button>

                {/* Bottom App Tab Bar */}
                <div
                  className="pt-2 pb-1 px-4 flex items-center justify-around border-t"
                  style={{
                    borderColor: `${color.mutedText}20`,
                    backgroundColor: color.surface,
                    borderRadius: borderRadiusValue,
                  }}
                >
                  {[
                    { id: "home", label: "Home", icon: Home },
                    { id: "explore", label: "Explore", icon: Compass },
                    { id: "activity", label: "Activity", icon: Layers },
                    { id: "profile", label: "Profile", icon: User },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex flex-col items-center gap-1 transition-colors"
                        style={{
                          color: active ? color.accent : color.mutedText,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] font-medium tracking-tight">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* =========================================
               WEBSITE TARGET MOCKUP
               ========================================= */
            <div className="flex flex-col min-h-[520px]">
              {/* Site Navbar */}
              <header
                className={`px-5 py-3.5 flex items-center justify-between border-b transition-colors ${
                  layout.navbarStyle === "floating"
                    ? "my-2 mx-3 rounded-full shadow-soft"
                    : ""
                }`}
                style={{
                  borderColor: `${color.mutedText}20`,
                  backgroundColor: `${color.surface}E6`,
                  borderRadius: layout.navbarStyle === "floating" ? "9999px" : "0px",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px]"
                    style={{
                      backgroundColor: color.text,
                      color: color.background,
                    }}
                  >
                    {choices.content.brandName.charAt(0) || "A"}
                  </div>
                  <span
                    className="font-bold text-xs tracking-tight"
                    style={{
                      fontFamily: typography.headingFont,
                      color: color.text,
                    }}
                  >
                    {choices.content.brandName || "Atelier Studio"}
                  </span>
                </div>

                <div
                  className="hidden sm:flex items-center gap-4 text-[11px] font-medium tracking-wide"
                  style={{ color: color.mutedText }}
                >
                  <span>Works</span>
                  <span>Manifesto</span>
                  <span>Colophon</span>
                </div>

                <button
                  className="px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-all"
                  style={{
                    backgroundColor: color.accent,
                    color: color.background,
                    borderRadius: buttonRadiusValue,
                  }}
                >
                  Inquire
                </button>
              </header>

              {/* Hero Section */}
              <section className="px-5 py-8 sm:py-12 flex flex-col justify-center">
                <div className="max-w-xl">
                  <span
                    className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded mb-3"
                    style={{
                      backgroundColor: `${color.accent}20`,
                      color: color.accent,
                    }}
                  >
                    {choices.goal.feelingWords.join(" • ")}
                  </span>

                  <h1
                    className="font-bold tracking-tight leading-[1.08] mb-3 transition-all"
                    style={{
                      fontFamily: typography.headingFont,
                      fontSize: typeScale.h2,
                      color: color.text,
                    }}
                  >
                    {choices.content.tagline || "Architectural Proportions in Digital Form"}
                  </h1>

                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-6 opacity-85 max-w-md"
                    style={{ color: color.mutedText }}
                  >
                    {choices.content.realCopy ||
                      "Every structure is an unspoken dialogue between natural light, enduring minerals, and the passage of human time."}
                  </p>

                  {/* Button Row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="px-4 py-2.5 text-xs font-semibold tracking-wide flex items-center gap-2 transition-all"
                      style={{
                        backgroundColor: color.accent,
                        color: color.background,
                        borderRadius: buttonRadiusValue,
                        boxShadow: shadowValue,
                      }}
                    >
                      <span>Explore Monographs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      className="px-4 py-2.5 text-xs font-medium border tracking-wide transition-all"
                      style={{
                        borderColor: `${color.mutedText}40`,
                        color: color.text,
                        borderRadius: buttonRadiusValue,
                        backgroundColor: "transparent",
                      }}
                    >
                      View Manifesto
                    </button>
                  </div>
                </div>
              </section>

              {/* Dynamic Feature / Card Grid */}
              <section className="px-5 py-6 mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider"
                    style={{ color: color.mutedText }}
                  >
                    Selected Works
                  </span>
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: color.accent }}
                  >
                    01 — 03
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: choices.content.sections[0] || "Monograph I",
                      tag: "2024",
                      vibe: "Limestone & Bronze",
                    },
                    {
                      title: choices.content.sections[1] || "Monograph II",
                      tag: "2025",
                      vibe: "Volcanic Basalt",
                    },
                    {
                      title: choices.content.sections[2] || "Monograph III",
                      tag: "2026",
                      vibe: "Cast Glass Pavilion",
                    },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 transition-all group hover:scale-[1.01]"
                      style={{
                        backgroundColor: color.surface,
                        borderRadius: borderRadiusValue,
                        border: `1px solid ${color.mutedText}25`,
                        boxShadow: shadowValue,
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-2" style={{ color: color.mutedText }}>
                        <span>{card.tag}</span>
                        <span style={{ color: color.accent }}>0{idx + 1}</span>
                      </div>
                      <h4
                        className="font-semibold text-xs mb-1"
                        style={{
                          fontFamily: typography.headingFont,
                          color: color.text,
                        }}
                      >
                        {card.title}
                      </h4>
                      <p className="text-[11px] opacity-75" style={{ color: color.mutedText }}>
                        {card.vibe}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Site Footer Colophon */}
              <footer
                className="mt-6 px-5 py-3 border-t flex items-center justify-between text-[10px] font-mono"
                style={{
                  borderColor: `${color.mutedText}20`,
                  color: color.mutedText,
                }}
              >
                <span>© {choices.content.brandName || "Atelier Studio"}</span>
                <span>{uiStyle.toUpperCase()} • SEED #{choices.seed}</span>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
