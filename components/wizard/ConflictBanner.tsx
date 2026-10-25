"use client";

import React from "react";
import { DesignConflict } from "@/lib/compiler/conflicts";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { useWizardStore } from "@/store/wizard";

export function ConflictBanner({ conflicts }: { conflicts: DesignConflict[] }) {
  const { goToStepBySlug } = useWizardStore();
  const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({});

  const activeConflicts = conflicts.filter((c) => !dismissed[c.id]);
  if (activeConflicts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {activeConflicts.map((conflict) => (
        <div
          key={conflict.id}
          className="p-4 rounded-md border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 text-atelier-text flex items-start justify-between gap-3 text-xs"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-700 dark:text-amber-400 mb-0.5 flex items-center gap-2">
                <span>{conflict.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Step: {conflict.stepSlug}
                </span>
              </div>
              <p className="text-atelier-muted leading-relaxed mb-2">
                {conflict.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Suggestion: {conflict.suggestion}
                </span>
                <button
                  onClick={() => goToStepBySlug(conflict.stepSlug)}
                  className="font-mono text-[11px] underline text-atelier-accent hover:text-atelier-text flex items-center gap-1"
                >
                  Jump to step <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed((prev) => ({ ...prev, [conflict.id]: true }))}
            className="text-atelier-muted hover:text-atelier-text p-1"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
