# Atelier

> **"Answer a few questions about the look and feel. Get a prompt that actually produces a good result."**

Atelier is a free, transparent web app that walks non-experts and designers through every design decision for a website or mobile application, shows a live preview of choices in real time, and compiles everything into a precise, copy-ready prompt for AI coding tools (Claude, Antigravity, Cursor, ChatGPT, etc.).

---

## Key Principles

1. **No AI Model Inside v1:** The prompt is produced by a pure, deterministic TypeScript template compiler. Same choices in, same prompt out, every single time.
2. **Trust Through Transparency:** Every section of the compiled prompt includes a *"Why this is here"* note. No hidden characters or stealth instructions.
3. **Zero Backend & No Accounts in v1:** State lives strictly in local browser storage and compressed into the URL hash. No tracking cookies or telemetry.
4. **Beginner-First, Expert-Friendly:** Quick mode (~3 minutes) with smart defaults, and Advanced mode with granular architectural controls.
5. **Luxury Editorial Design:** Warm alabaster, volcanic charcoal, and champagne gold accents with fluid responsive viewports and dark mode.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom editorial design tokens
- **State Management:** Zustand with `persist` middleware
- **Validation & Sharing:** Zod schemas + LZ-String URL hash compression
- **Testing:** Vitest (11 passing tests)
- **PWA:** Web App Manifest, Service Worker offline cache, maskable SVG icons

---

## Project Structure

```
/app
  ├── page.tsx          # Landing page with demo, mode selection, presets
  ├── wizard/page.tsx   # Interactive step-by-step wizard + live preview
  ├── review/page.tsx   # Full prompt review, collapsible sections, export
  ├── gallery/page.tsx  # Community gallery (honest empty state)
  ├── tested-on/page.tsx # Model compatibility benchmarks
  ├── changelog/page.tsx # Public compiler release history
  ├── privacy/page.tsx  # Privacy policy in one transparent paragraph
  ├── layout.tsx        # Root layout with fonts, PWA, anti-flash theme
  └── globals.css       # Design tokens & editorial typography
/components
  ├── navigation/       # Navbar & Footer
  ├── preview/          # LivePreviewPanel (responsive desktop/tablet/phone mockups)
  ├── wizard/           # WizardProgress, StepRenderer, ConflictBanner
  ├── review/           # ReviewPanel (sections, copy, download, share)
  └── ui/               # Button, ThemeToggle, Card, etc.
/config
  └── brand.ts          # Single source of truth for brand name & version
/data
  ├── steps.ts          # 13 step definitions, options & metadata
  ├── palettes.ts       # 12 curated palettes with WCAG contrast info
  ├── fonts.ts          # 10 curated font pairings & type scales
  └── presets/          # 8 production presets (JSON + TypeScript index)
/lib
  ├── compiler/         # Pure compiler, mappings, conflict detection, templates
  └── share/            # Zod schema, URL hash encoder & decoder
/tests
  ├── compiler.test.ts  # Determinism, checklist, do-nots, presets, clashes
  └── share.test.ts     # Share URL roundtripping, prefix handling, error tolerance
/public
  ├── brand/            # Official Atelier logo & icon asset kit (SVG, PNG)
  ├── favicon.ico       # Web favicon
  ├── manifest.json     # PWA manifest
  └── sw.js             # Service Worker offline caching
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the Test Suite
```bash
npm test
```
Executes all Vitest unit tests verifying compiler determinism, step mappings, checklist presence, and conflict detection.

### 4. Build for Production
```bash
npm run build
```

---

## Compiler Output Structure

### Website Specification
1. **Overview & Creative Directive**
2. **Design System & Tokens** (exact hex codes, type scale, border/shadow rules)
3. **Layout & Grid Architecture** (columns, gutters, container max-widths)
4. **Imagery & Visual Assets** (framing, aspect ratios, loading priority)
5. **Component Specifications** (buttons, cards, forms, hover states)
6. **Motion Choreography** (exact easing curves, durations, reduced-motion)
7. **Responsive Behavior & Platform Support** (breakpoints, touch targets)
8. **Tech Stack & File Architecture**
9. **Content & Tone of Voice** (real copy fragments, no lorem ipsum)
10. **Verification Checklist** (7-point QA verification)
11. **Explicit Prohibitions (Do-Nots)**

### App Specification
1. **Overview & Application Scope**
2. **Users & Core User Journeys** (onboarding, primary loops, inspection)
3. **Application Screens & Views**
4. **Mobile Navigation & Shell Architecture** (bottom tabs, header bars, sheets)
5. **State Management & Data Architecture** (offline sync, optimistic UI)
6. **Design System & Tokens**
7. **Platform & Offline Behavior** (safe area insets, haptics, PWA)
8. **Authentication & Security Guidelines**
9. **Mobile Verification Checklist**
10. **Explicit Mobile Prohibitions**
