"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ReviewPanel } from "@/components/review/ReviewPanel";
import { useWizardStore } from "@/store/wizard";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function StandaloneReviewPage() {
  const { choices } = useWizardStore();

  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text selection:bg-atelier-accent/20">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6 w-full">
        <div className="flex items-center justify-between pb-4 border-b border-atelier-border">
          <Link
            href="/wizard"
            className="text-xs font-mono text-atelier-muted hover:text-atelier-text flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Wizard</span>
          </Link>

          <span className="text-xs font-mono text-atelier-muted">
            Target: <strong className="text-atelier-text uppercase">{choices.target}</strong>
          </span>
        </div>

        <ReviewPanel />
      </main>

      <Footer />
    </div>
  );
}
