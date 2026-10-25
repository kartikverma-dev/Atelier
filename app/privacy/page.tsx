"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { BRAND } from "@/config/brand";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text selection:bg-atelier-accent/20">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-32 flex flex-col justify-center w-full">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-atelier-border bg-atelier-surface text-xs font-mono text-atelier-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-atelier-accent" />
            <span>Privacy Policy</span>
            <span className="text-atelier-muted/40">•</span>
            <span>Version 1.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-atelier-text tracking-tight">
            Privacy in One Paragraph
          </h1>

          <div className="p-6 sm:p-8 rounded-lg border border-atelier-border bg-atelier-surface shadow-soft space-y-4">
            <p className="text-sm sm:text-base text-atelier-text leading-relaxed font-serif">
              {BRAND.name} requires no account, stores no personal data on any server, runs no tracking cookies or third-party analytics in version 1, and transmits none of your design choices across the network. All wizard choices, custom hex codes, brand copy, and compiled prompt outputs live strictly inside your local browser storage and in your client-side share URL hash. When you close the tab, your privacy remains completely unbroken.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs font-mono text-atelier-accent hover:text-atelier-text flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to {BRAND.name}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
