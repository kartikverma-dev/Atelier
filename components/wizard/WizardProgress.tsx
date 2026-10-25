"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard";
import { Dices, Sparkles, AlertCircle } from "lucide-react";
import { detectConflicts } from "@/lib/compiler/conflicts";

export function WizardProgress() {
  const {
    currentStepIndex,
    setCurrentStepIndex,
    getVisibleSteps,
    choices,
    surpriseMe,
  } = useWizardStore();

  const visibleSteps = getVisibleSteps();
  const currentStep = visibleSteps[currentStepIndex] || visibleSteps[0];
  const progressPercent = Math.round(
    ((currentStepIndex + 1) / visibleSteps.length) * 100
  );

  const conflicts = detectConflicts(choices);

  return (
    <div className="w-full bg-atelier-surface/90 border-b border-atelier-border px-4 sm:px-6 py-3 shrink-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {/* Top progress details bar */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-atelier-text">
              STEP {currentStepIndex + 1} OF {visibleSteps.length}
            </span>
            <span className="text-atelier-muted">•</span>
            <span className="text-atelier-muted truncate max-w-[180px] sm:max-w-xs">
              {currentStep.title}
            </span>
            {conflicts.length > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <AlertCircle className="w-3 h-3" />
                {conflicts.length} Notice{conflicts.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Surprise me button */}
            <button
              onClick={() => surpriseMe()}
              title="Surprise me with a fresh curated seed"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-atelier-card hover:bg-atelier-border/60 text-atelier-text border border-atelier-border text-[11px] font-mono transition-colors active:scale-95"
            >
              <Dices className="w-3.5 h-3.5 text-atelier-accent" />
              <span>Surprise Me</span>
              <span className="text-atelier-muted text-[10px]">#{choices.seed}</span>
            </button>

            <span className="font-semibold text-atelier-accent">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Continuous progress bar track */}
        <div className="w-full h-1.5 rounded-full bg-atelier-subtle overflow-hidden relative">
          <div
            className="h-full bg-atelier-text transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step chips navigation (desktop) */}
        <div className="hidden sm:flex items-center justify-between gap-1 overflow-x-auto pt-1">
          {visibleSteps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`text-[10px] font-mono uppercase tracking-wider py-1 px-1.5 rounded transition-all whitespace-nowrap ${
                  isCurrent
                    ? "font-bold text-atelier-text border-b-2 border-atelier-text"
                    : isDone
                    ? "text-atelier-muted hover:text-atelier-text"
                    : "text-atelier-muted/40 hover:text-atelier-muted"
                }`}
              >
                {step.shortTitle}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
