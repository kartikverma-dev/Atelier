import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Shield, Sparkles, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-atelier-border bg-atelier-surface/50 text-atelier-muted text-xs transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-atelier-text text-atelier-bg flex items-center justify-center font-serif text-xs font-bold">
                A
              </span>
              <span className="font-serif text-base font-semibold text-atelier-text tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="text-atelier-muted max-w-md leading-relaxed text-xs">
              {BRAND.promise} A deterministic, pure TypeScript compiler transforming design choices into copy-ready prompts for Claude, Antigravity, Cursor, and ChatGPT.
            </p>
            <div className="flex items-center gap-3 text-[11px] font-mono text-atelier-muted/80 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-atelier-accent" /> No AI in v1
              </span>
              <span>•</span>
              <span>No Cookies / Tracking</span>
              <span>•</span>
              <span>Zero Backend</span>
            </div>
          </div>

          {/* Column 2: Trust & Artifacts */}
          <div className="space-y-2.5">
            <h4 className="font-mono uppercase text-[11px] tracking-wider text-atelier-text font-semibold">
              Trust & Transparency
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/tested-on" className="hover:text-atelier-text transition-colors">
                  Tested On (Benchmarked Tools)
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-atelier-text transition-colors">
                  Compiler Changelog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-atelier-text transition-colors">
                  Privacy in One Paragraph
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-atelier-text transition-colors">
                  Community Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Compiler Spec */}
          <div className="space-y-2.5">
            <h4 className="font-mono uppercase text-[11px] tracking-wider text-atelier-text font-semibold">
              Compiler Specifications
            </h4>
            <div className="text-[11px] font-mono space-y-1 text-atelier-muted">
              <div>Version: {BRAND.version}</div>
              <div>Release: {BRAND.compilerVersion}</div>
              <div>Engine: Pure TypeScript</div>
              <div>State: Client & URL Hash</div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-6 border-t border-atelier-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <p>© {new Date().getFullYear()} {BRAND.name} Studio. Open & Free.</p>
          <p className="text-atelier-muted/70">
            {BRAND.name} prompt v{BRAND.version}, compiler {BRAND.compilerVersion}
          </p>
        </div>
      </div>
    </footer>
  );
}
