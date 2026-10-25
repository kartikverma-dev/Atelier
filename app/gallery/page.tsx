"use client";

import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { BRAND } from "@/config/brand";
import { Sparkles, ArrowRight, Compass, PlusCircle, ShieldAlert } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text selection:bg-atelier-accent/20">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 w-full">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-muted">
            <span className="w-2 h-2 rounded-full bg-atelier-accent" />
            <span>Community Gallery</span>
            <span className="text-atelier-muted/40">•</span>
            <span>Unfabricated Real Deployments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-atelier-text tracking-tight">
            Sites Built with Atelier Prompts
          </h1>
          <p className="text-sm text-atelier-muted max-w-xl leading-relaxed">
            Every submission showcases the exact choices used in the prompt compiler, the target AI tool used, and a link to the live production result.
          </p>
        </div>

        {/* Empty State Showcase per Principle 8 ("Seed it empty with a clear 'be the first' state. Do not fabricate examples.") */}
        <div className="p-12 sm:p-16 rounded-xl border border-dashed border-atelier-border bg-atelier-surface/60 text-center space-y-5 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-atelier-card border border-atelier-border mx-auto flex items-center justify-center text-atelier-accent">
            <Compass className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-atelier-text">
              Be the first to showcase your site.
            </h3>
            <p className="text-xs sm:text-sm text-atelier-muted leading-relaxed max-w-md mx-auto">
              Per our core principles, we do not fabricate fake testimonials or imaginary gallery entries. If you compiled a prompt with Atelier and built a live website or application, share your work.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/wizard"
              className="px-6 py-2.5 rounded bg-atelier-text text-atelier-bg text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
              <span>Compile Your First Prompt</span>
            </Link>

            <a
              href="https://github.com/kartikverma-dev/Atelier/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded border border-atelier-border bg-atelier-surface text-atelier-text text-xs font-medium hover:bg-atelier-card transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit a Project</span>
            </a>
          </div>
        </div>

        {/* Submission Criteria */}
        <div className="p-6 rounded-md border border-atelier-border bg-atelier-surface space-y-3 text-xs text-atelier-muted">
          <div className="flex items-center gap-2 font-mono text-atelier-text font-semibold uppercase">
            <ShieldAlert className="w-4 h-4 text-atelier-accent" />
            <span>Submission Integrity Guidelines</span>
          </div>
          <p className="leading-relaxed">
            To maintain transparency, every approved gallery entry must provide: (1) the public URL of the live site, (2) the original Atelier share link or choices configuration, and (3) the AI coding tool used (e.g. Claude 3.7 Sonnet, Cursor, Antigravity, or ChatGPT).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
