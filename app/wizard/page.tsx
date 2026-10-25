"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { StepRenderer } from "@/components/wizard/StepRenderer";
import { LivePreviewPanel } from "@/components/preview/LivePreviewPanel";
import { ReviewPanel } from "@/components/review/ReviewPanel";
import { ConflictBanner } from "@/components/wizard/ConflictBanner";
import { useWizardStore } from "@/store/wizard";
import { decodeHashToChoices } from "@/lib/share/decode";
import { detectConflicts } from "@/lib/compiler/conflicts";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  CheckCircle,
  X,
  Sparkles,
} from "lucide-react";

export default function WizardPage() {
  const {
    currentStepIndex,
    nextStep,
    prevStep,
    getVisibleSteps,
    choices,
    updateChoices,
    previewOpenMobile,
    setPreviewOpenMobile,
  } = useWizardStore();

  const [mounted, setMounted] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  // Read URL hash on mount if present
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const res = decodeHashToChoices(hash);
      if (res.success) {
        updateChoices(res.choices);
        setShareNotice("Restored choices successfully from share link!");
        setTimeout(() => setShareNotice(null), 4000);
      }
    }
  }, [updateChoices]);

  const visibleSteps = getVisibleSteps();
  const currentStep = visibleSteps[currentStepIndex] || visibleSteps[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;
  const isReviewStep = currentStep.slug === "review";

  const conflicts = detectConflicts(choices);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-atelier-bg">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-mono text-xs text-atelier-muted">
          Initializing Atelier Studio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg selection:bg-atelier-accent/20">
      <Navbar />
      <WizardProgress />

      {/* Share Restore Alert Toast */}
      {shareNotice && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-2 px-4 text-xs font-mono text-emerald-800 dark:text-emerald-300 text-center">
          {shareNotice}
        </div>
      )}

      {/* Main Two-Column Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Column: Wizard Step Interaction Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto w-full flex flex-col justify-between">
          <div className="space-y-6">
            {/* Step Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-atelier-accent font-semibold">
                  {currentStep.category}
                </span>
                <span className="text-atelier-muted text-xs">•</span>
                <span className="text-xs font-mono text-atelier-muted">
                  Step {currentStepIndex + 1} of {visibleSteps.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-atelier-text tracking-tight mb-2">
                {currentStep.title}
              </h1>
              <p className="text-xs sm:text-sm text-atelier-muted leading-relaxed">
                {currentStep.helpText}
              </p>
            </div>

            {/* Design Conflicts Warning Banner */}
            <ConflictBanner conflicts={conflicts} />

            {/* Step Content: StepRenderer or ReviewPanel */}
            {isReviewStep ? (
              <ReviewPanel />
            ) : (
              <StepRenderer step={currentStep} />
            )}
          </div>

          {/* Persistent Step Navigation Action Bar */}
          <div className="pt-8 pb-4 mt-8 border-t border-atelier-border flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={isFirstStep}
              className="px-4 py-2.5 rounded border border-atelier-border bg-atelier-surface hover:bg-atelier-card disabled:opacity-30 disabled:pointer-events-none text-xs font-medium text-atelier-text flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Mobile Preview Toggle Button */}
              <button
                type="button"
                onClick={() => setPreviewOpenMobile(!previewOpenMobile)}
                className="lg:hidden px-3 py-2 rounded border border-atelier-border bg-atelier-surface text-xs font-medium text-atelier-text flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-atelier-accent" />
                <span>Preview</span>
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 rounded bg-atelier-text text-atelier-bg hover:opacity-90 text-xs font-medium flex items-center gap-2 transition-all active:scale-95 shadow-soft"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("review-export-bar");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-2.5 rounded bg-atelier-accent text-atelier-ink font-semibold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-soft"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prompt Compiled</span>
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Right Column: Live Preview Panel (Desktop Sticky Sidecar) */}
        <aside className="hidden lg:block w-[420px] xl:w-[480px] shrink-0 border-l border-atelier-border h-[calc(100vh-64px-52px)] sticky top-[116px]">
          <LivePreviewPanel />
        </aside>

        {/* Mobile Bottom Sheet Preview Drawer */}
        {previewOpenMobile && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
            <div className="bg-atelier-surface w-full max-h-[85vh] rounded-t-2xl shadow-float flex flex-col border-t border-atelier-border overflow-hidden">
              <div className="px-4 py-3 border-b border-atelier-border flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-atelier-text uppercase">
                  Live Preview
                </span>
                <button
                  onClick={() => setPreviewOpenMobile(false)}
                  className="p-1 rounded-full text-atelier-muted hover:text-atelier-text"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <LivePreviewPanel />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
