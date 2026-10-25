"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import { compile } from "@/lib/compiler";
import { createShareUrl } from "@/lib/share/encode";
import { BRAND } from "@/config/brand";
import {
  Copy,
  Check,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Edit3,
  Sparkles,
  Info,
  FileText,
  EyeOff,
  Eye,
} from "lucide-react";
import Link from "next/link";

export function ReviewPanel() {
  const { choices, goToStepBySlug } = useWizardStore();
  const [stripWhy, setStripWhy] = useState(false);

  const compiled = compile(choices, choices.target, { stripWhyComments: stripWhy });

  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [shareUrl, setShareUrl] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(compiled.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };

  const handleDownloadFile = (extension: "md" | "txt") => {
    const filename = `${choices.content.brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-design-prompt.${extension}`;
    const blob = new Blob([compiled.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenShare = () => {
    const url = createShareUrl(choices);
    setShareUrl(url);
    setShareModalOpen(true);
  };

  const handleCopyShareLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch (e) {
      console.error("Share copy failed:", e);
    }
  };

  // Section ID to wizard step slug mapping for Edit button jump
  const sectionStepMap: Record<string, string> = {
    overview: "goal",
    "design-system": "ui-style",
    "layout-grid": "layout",
    imagery: "imagery",
    components: "components",
    motion: "motion",
    "responsive-pwa": "behavior",
    "tech-stack": "tech",
    content: "content",
    flows: "goal",
    screens: "content",
    navigation: "layout",
    "state-data": "tech",
    "platform-behavior": "behavior",
    auth: "tech",
    "quality-checklist": "goal",
    "do-nots": "goal",
  };

  const wordCount = compiled.text.trim().split(/\s+/).length;
  const charCount = compiled.text.length;

  return (
    <div className="space-y-6">
      {/* Top Action & Export Bar */}
      <div className="p-5 rounded-md border border-atelier-border bg-atelier-surface shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 className="text-base font-semibold text-atelier-text font-serif">
              Compiled Prompt Ready for AI Coding
            </h2>
          </div>
          <p className="text-xs text-atelier-muted">
            {wordCount} words • {charCount} characters • 100% deterministic • Seed #{choices.seed}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Strip Why Comments Toggle */}
          <button
            type="button"
            onClick={() => setStripWhy(!stripWhy)}
            className={`px-3 py-2 rounded border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
              stripWhy
                ? "bg-atelier-text text-atelier-bg border-atelier-text"
                : "border-atelier-border bg-atelier-card text-atelier-muted hover:text-atelier-text"
            }`}
            title="Toggle inclusion of 'Why this is here' rationale comments in the copied prompt"
          >
            {stripWhy ? <EyeOff className="w-3.5 h-3.5 text-atelier-accent" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{stripWhy ? "Why Comments Stripped" : "Include Why Comments"}</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className="px-4 py-2 rounded bg-atelier-text text-atelier-bg hover:opacity-90 font-medium text-xs flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleDownloadFile("md")}
            className="px-3 py-2 rounded border border-atelier-border bg-atelier-card hover:bg-atelier-border/50 text-atelier-text text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <button
            onClick={() => handleDownloadFile("txt")}
            className="px-3 py-2 rounded border border-atelier-border bg-atelier-card hover:bg-atelier-border/50 text-atelier-text text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>.txt</span>
          </button>

          <button
            onClick={handleOpenShare}
            className="px-3 py-2 rounded border border-atelier-border bg-atelier-card hover:bg-atelier-border/50 text-atelier-text text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
        </div>
      </div>

      {/* Honest Limits Note */}
      <div className="p-4 rounded-md border border-atelier-border/70 bg-atelier-card/40 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-atelier-accent shrink-0 mt-0.5" />
        <div className="text-atelier-muted leading-relaxed">
          <strong className="text-atelier-text font-medium">Honest Limits Note:</strong> Results depend on the AI model you paste this into (Claude, ChatGPT, Antigravity, Cursor). Atelier produces precise, deterministic constraints and exact tokens to eliminate ambiguity, but the prompt is an exceptionally strong starting point, not an automated guarantee.{" "}
          <Link href="/tested-on" className="text-atelier-accent hover:underline font-medium">
            See benchmarked results across models →
          </Link>
        </div>
      </div>

      {/* Share Link Modal */}
      {shareModalOpen && (
        <div className="p-4 rounded-md border border-atelier-accent/40 bg-atelier-card shadow-elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-atelier-text">
              Shareable Compressed Link
            </span>
            <button
              onClick={() => setShareModalOpen(false)}
              className="text-xs text-atelier-muted hover:text-atelier-text"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-atelier-muted mb-2">
            This URL contains your complete choices validated and compressed into the URL hash. No account or database is needed. Anyone opening this link restores your exact state.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-1.5 text-xs font-mono rounded border border-atelier-border bg-atelier-surface text-atelier-text truncate"
            />
            <button
              onClick={handleCopyShareLink}
              className="px-4 py-1.5 rounded bg-atelier-text text-atelier-bg text-xs font-medium shrink-0 flex items-center gap-1"
            >
              {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{shareCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Collapsible Prompt Sections */}
      <div className="space-y-3">
        {compiled.sections.map((section) => {
          const isCollapsed = !!collapsedSections[section.id];
          const targetStepSlug = sectionStepMap[section.id] || "goal";

          return (
            <div
              key={section.id}
              className="rounded-md border border-atelier-border bg-atelier-surface overflow-hidden transition-all"
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                className="px-4 py-3 bg-atelier-card/30 hover:bg-atelier-card/60 flex items-center justify-between cursor-pointer select-none border-b border-atelier-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-xs text-atelier-text font-mono">
                    {section.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToStepBySlug(targetStepSlug);
                    }}
                    title={`Jump back to edit ${targetStepSlug}`}
                    className="px-2 py-1 rounded text-[11px] font-mono text-atelier-muted hover:text-atelier-text hover:bg-atelier-border/50 flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-atelier-accent" />
                    <span>Edit</span>
                  </button>

                  <div className="text-atelier-muted">
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* "Why this line?" transparency note */}
              {!stripWhy && (
                <div className="px-4 py-2 bg-atelier-subtle/30 border-b border-atelier-border/30 text-[11px] font-mono text-atelier-muted flex items-start gap-1.5">
                  <span className="text-atelier-accent font-semibold shrink-0">WHY THIS IS HERE:</span>
                  <span>{section.why}</span>
                </div>
              )}

              {/* Section Content Body */}
              {!isCollapsed && (
                <div className="p-4 text-xs font-mono leading-relaxed text-atelier-text whitespace-pre-wrap bg-atelier-surface">
                  {section.body}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prompt Version Footer Stamp */}
      <div className="p-4 rounded border border-atelier-border text-center text-xs font-mono text-atelier-muted space-y-1">
        <div>
          {BRAND.name} prompt v{BRAND.version}, compiler {BRAND.compilerVersion}
        </div>
        <div className="text-[11px] opacity-75">
          Deterministic SHA Seed: #{choices.seed} • Target: {choices.target} • Schema: Zod 3.x
        </div>
      </div>
    </div>
  );
}
