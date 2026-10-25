"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { BRAND } from "@/config/brand";
import { ShieldCheck, HelpCircle } from "lucide-react";

interface BenchmarkTool {
  name: string;
  provider: string;
  score?: number; // Numerical benchmark score if formally tested
  status: "Not Yet Tested" | "Verified Pass";
  notes: string;
}

const BENCHMARKS: BenchmarkTool[] = [
  {
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "ChatGPT-4o",
    provider: "OpenAI",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "OpenAI o1 / o3-mini",
    provider: "OpenAI",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "Gemini 2.0 Flash / Pro",
    provider: "Google DeepMind",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "Antigravity",
    provider: "Google DeepMind",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "Cursor (Composer)",
    provider: "Anysphere",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "Windsurf (Cascade)",
    provider: "Codeium",
    status: "Not Yet Tested",
    notes: "Formal numerical benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
  {
    name: "DeepSeek Coder V2 / R1",
    provider: "DeepSeek",
    status: "Not Yet Tested",
    notes: "Community benchmark run pending in v1.1. Marked as Not Yet Tested per our transparency principle.",
  },
];

function getStatusBadge(status: BenchmarkTool["status"], score?: number) {
  if (!score || status === "Not Yet Tested") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-atelier-subtle text-atelier-muted border border-atelier-border">
        <HelpCircle className="w-3 h-3" />
        Not Yet Tested
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
      Score: {score}/100
    </span>
  );
}

export default function TestedOnPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text selection:bg-atelier-accent/20">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 w-full">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-atelier-accent" />
            <span>AI Model Compatibility Matrix</span>
            <span className="text-atelier-muted/40">•</span>
            <span>Compiler {BRAND.compilerVersion}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-atelier-text tracking-tight">
            Tested-On Benchmarks & Badges
          </h1>
          <p className="text-sm text-atelier-muted max-w-xl leading-relaxed">
            Per our core trust rules, every AI tool without a verified numerical benchmark score is strictly marked "Not Yet Tested". We do not publish unverified pass badges.
          </p>
        </div>

        {/* Benchmarks Table */}
        <div className="rounded-lg border border-atelier-border bg-atelier-surface overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-atelier-card/50 border-b border-atelier-border text-[11px] font-mono uppercase tracking-wider text-atelier-muted">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">AI Coding Tool</th>
                  <th className="py-3.5 px-4 font-semibold">Provider</th>
                  <th className="py-3.5 px-4 font-semibold">Benchmark Status</th>
                  <th className="py-3.5 px-4 font-semibold">Observations & Verification Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier-border">
                {BENCHMARKS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-atelier-subtle/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-atelier-text">
                      <div className="text-sm font-medium">{item.name}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-atelier-muted whitespace-nowrap">
                      {item.provider}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status, item.score)}
                    </td>
                    <td className="py-4 px-4 text-atelier-muted max-w-sm leading-relaxed">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testing Methodology */}
        <div className="p-6 rounded-md border border-atelier-border bg-atelier-card/40 space-y-2 text-xs text-atelier-muted leading-relaxed">
          <h4 className="font-semibold text-atelier-text font-mono uppercase">
            Testing Integrity Standard
          </h4>
          <p>
            No AI tool will be marked "Verified" until our reproducible benchmark suite records quantified metrics across WCAG compliance, zero console warnings, token accuracy, and responsive breakpoint adherence. Until then, every tool displays "Not Yet Tested".
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
