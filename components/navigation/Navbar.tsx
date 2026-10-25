"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/config/brand";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useWizardStore } from "@/store/wizard";
import { Sparkles, Layers, ShieldCheck, History, Image as ImageIcon } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { choices, setMode } = useWizardStore();
  const isWizard = pathname?.startsWith("/wizard");

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-atelier-bg/85 border-b border-atelier-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atelier-accent rounded-sm">
            <span className="w-8 h-8 rounded bg-atelier-text text-atelier-bg flex items-center justify-center font-serif text-lg font-bold group-hover:scale-105 transition-transform duration-200">
              A
            </span>
            <span className="font-serif text-xl tracking-tight font-medium text-atelier-text">
              {BRAND.name}
            </span>
          </Link>

          <span className="hidden md:inline-block text-xs uppercase tracking-widest text-atelier-muted/70 font-mono pl-2 border-l border-atelier-border">
            v{BRAND.version}
          </span>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-atelier-muted">
          <Link
            href="/wizard"
            className={`transition-colors hover:text-atelier-text flex items-center gap-1.5 ${
              isWizard ? "text-atelier-text font-semibold" : ""
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
            Wizard
          </Link>
          <Link
            href="/gallery"
            className={`transition-colors hover:text-atelier-text flex items-center gap-1.5 ${
              pathname === "/gallery" ? "text-atelier-text font-semibold" : ""
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Gallery
          </Link>
          <Link
            href="/tested-on"
            className={`transition-colors hover:text-atelier-text flex items-center gap-1.5 ${
              pathname === "/tested-on" ? "text-atelier-text font-semibold" : ""
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Tested On
          </Link>
          <Link
            href="/changelog"
            className={`transition-colors hover:text-atelier-text flex items-center gap-1.5 ${
              pathname === "/changelog" ? "text-atelier-text font-semibold" : ""
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Changelog
          </Link>
        </nav>

        {/* Right side controls: Mode Toggle & Theme */}
        <div className="flex items-center gap-3">
          {isWizard && (
            <div className="flex items-center bg-atelier-surface border border-atelier-border rounded-full p-0.5 text-xs">
              <button
                onClick={() => setMode("quick")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  choices.mode === "quick"
                    ? "bg-atelier-text text-atelier-bg shadow-xs"
                    : "text-atelier-muted hover:text-atelier-text"
                }`}
              >
                Quick (~3m)
              </button>
              <button
                onClick={() => setMode("advanced")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  choices.mode === "advanced"
                    ? "bg-atelier-text text-atelier-bg shadow-xs"
                    : "text-atelier-muted hover:text-atelier-text"
                }`}
              >
                Advanced
              </button>
            </div>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
