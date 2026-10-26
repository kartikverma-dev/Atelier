# Atelier: Logo Integration + "Logo" Wizard Step

You are working in the existing Atelier project (Next.js, TypeScript, Tailwind, Zustand, Zod, Vitest, Framer Motion). The project already has a deterministic compiler, 13 wizard steps, a live preview, presets, share links, a PWA setup and trust pages. **Do not change any existing behavior except where this prompt says so. All existing tests must keep passing.**

The logo files are in the folder `atelier-logo-kit/` that comes with this prompt. Copy them as described below. Do not redraw or modify the logo artwork.

---

## Part A: Use Atelier's own logo throughout the app

### A1. Assets
Copy into the project:
- `svg/*.svg` to `/public/brand/svg/`
- `png/*` to `/public/brand/png/`
- `web/favicon.ico` to `/public/favicon.ico`
- `svg/favicon.svg` to `/app/icon.svg` (Next.js file-based metadata)
- `png/apple-touch-icon.png` to `/app/apple-icon.png`
- `png/og-image-1200x630.png` to `/app/opengraph-image.png`

### A2. A reusable `<Logo />` component
Create `/components/brand/Logo.tsx`:
- Props: `variant: "horizontal" | "stacked" | "mark"`, `tone: "auto" | "light" | "dark" | "mono"`, `height` (px, number), `className`.
- `tone="auto"` follows the site theme (the app's class-based dark mode) and switches between the `light` and `dark` SVGs with no flash on load. Use CSS (two images, toggled by the theme class) instead of JavaScript state.
- Render with `next/image` or a plain `<img>`, with explicit `width` and `height` to avoid layout shift. Include `alt="Atelier"` where it is the only brand text, and `alt=""` plus `aria-hidden` where the word "Atelier" already appears next to it.
- Never add effects, shadows or filters. Respect the clear space rule in `BRAND-GUIDE.md`.

### A3. Replace the current logo everywhere
- Header: replace the current "A" badge and text with `<Logo variant="horizontal" tone="auto" height={28} />`. On screens narrower than 480 px, show the mark only. Keep the `v1.0` tag.
- Landing page hero and footer: use the stacked or horizontal logo where it fits the layout.
- Browser tab: favicon (SVG plus `.ico` fallback) and Apple touch icon.
- Metadata: set `icons`, `openGraph.images` and `twitter.images` in `app/layout.tsx` to the new files.
- PWA: update `public/manifest.json` icons to include 192 and 512 PNGs with `"purpose": "any"`, plus the 512 maskable one with `"purpose": "maskable"`. Set `theme_color` to `#141312` and `background_color` to `#FBF9F5`. Update `public/sw.js` to precache the new icon files and bump its cache version.
- `config/brand.ts`: add `logo: { horizontal, stacked, mark, appIcon }` paths so a future rename or redesign only touches this file.
- Keep the prompt export footer unchanged. Do not add the logo or any URL to exported prompts.

### A4. Tests
- Logo component renders all three variants and sets the correct `alt` or `aria-hidden`.
- Manifest contains 192, 512 and maskable icons and every referenced file exists on disk.
- No file in `/public` or `/app` still references the old icon.

---

## Part B: New wizard step "Logo" (for the user's own website or app)

Goal: let users decide what logo their site should have and have the compiled prompt describe it precisely, so the AI that builds their site produces a proper logo, favicon and app icons.

### B1. Place and schema
- Add a new step **"Logo & brand mark"** directly after **Typography**. The step list becomes 14 steps. Renumber all "Step X of 13" text, progress chips and tests.
- Add `logo` to the Zod choices schema (see fields below). **Backward compatibility:** old share links and saved state without `logo` must still load, using the defaults. Bump the share-link schema version without breaking old links, and add a test with an old-format link.
- Add the step to Quick mode, with smart defaults.

### B2. Fields
| Field | Options |
|---|---|
| Logo source | "I already have a logo file" / "Design one for me" / "Text wordmark only" |
| Existing file (when source is "already have") | Path the AI should use, default `/public/brand/logo.svg`, plus whether a dark-background version exists |
| Logo type (when "design one") | Wordmark, Monogram (initials), Symbol + wordmark, Emblem/badge |
| Lettering style | Uses the chosen heading font, or: high-contrast serif, geometric sans, humanist sans, monospace, custom font name |
| Case and tracking | Normal, ALL CAPS, small caps; tracking: tight, normal, wide |
| Symbol idea | One short free-text line (for example "a stylized lens", "a house made of two lines") |
| Symbol style | Line (monoline), solid, geometric, hand-drawn, abstract |
| Color use | Single color (text token), two color (text + accent), follows palette automatically |
| Placement | Navbar left, navbar center, footer, hero, loading screen (multi-select) |
| Navbar logo height | 24 / 28 / 32 / 40 px (choose one) |
| Favicon and app icon | Yes / No. If yes: shape (square, rounded square, circle), and use the monogram or symbol |

### B3. Live preview
- The preview navbar shows the logo reacting to choices: wordmark in the chosen font, case and tracking, and the monogram as a rounded square badge. When "already have a logo", show a neutral placeholder box labeled "Your logo".
- Add a favicon mockup: a small browser tab with the icon at 16 px and 32 px.

### B4. Compiler
- Add `/lib/compiler/mappings/logo.ts` and a new prompt section **"Brand mark, logo and icons"**, placed after the Design system section in both website and app templates.
- Output exact, concrete instructions. Examples of the expected precision:
  - For a wordmark: "Build the logo as an inline SVG component `<Logo />`. Convert the text 'Maison Aurelia' to outlined paths using the font Playfair Display 600, uppercase, letter-spacing 0.24em, fill `currentColor`, height 28px in the navbar."
  - For a monogram: "Create a 40x40 rounded-square badge (radius 8px) filled with `#171026`, containing the initials 'MA' in Playfair Display 600, 18px, color `#FAF7FD`."
  - For an existing file: "Use `/public/brand/logo.svg` as given. Do not redraw, recolor or restyle it. If a dark-background version is available at `/public/brand/logo-dark.svg`, swap it in dark mode."
- Always add these rules to the prompt:
  - Logo must be SVG, with no raster-only logo and no external image or font URLs.
  - Provide a favicon (SVG plus 32px PNG), an Apple touch icon (180px), and 192, 512 and maskable 512 PWA icons if PWA is enabled.
  - Provide an Open Graph image 1200x630 using the logo on the brand background.
  - The logo must have a minimum 3:1 contrast against the navbar background in both themes, a clear-space margin equal to the logo's cap height, and an accessible name.
  - Do not imitate, copy or resemble an existing company's logo.
- Add to the verification checklist: logo contrast check in light and dark, logo crisp at 1x and 2x, favicon legible at 16px, navbar logo does not shift layout on load.
- All output must stay deterministic: same choices produce byte-identical text.

### B5. Conflict detection
Add warnings (never silent changes) for:
- Logo color that fails 3:1 contrast against the navbar background.
- Monogram selected but brand name is missing or only one character.
- "Already have a logo" selected but no file path given.
- Very ornate symbol idea combined with a navbar logo height of 24px.
- Placement includes loading screen but PWA/motion settings are off (suggest turning on or removing).

### B6. Presets and review
- Give each of the 8 presets a sensible default (for example photographer portfolio: wordmark, ALL CAPS, wide tracking; mobile-first app: monogram badge).
- The "Why this line?" note for the new section: "A logo and icon set is the most recognizable part of a site. Exact sizes, colors and files stop the AI from inventing a generic mark."
- Update the Review "Edit" jump buttons, the Tested-On wording (still "Not yet tested" for every tool, no scores), and the changelog (compiler v1.1 entry).

### B7. Tests
- New step exists, appears after Typography, and is included in Quick mode.
- Old share links without `logo` still decode and compile.
- Compiler: each logo type produces the matching instructions; identical choices give identical output; the prompt always contains the SVG-only, icon-set, contrast and "do not imitate" rules.
- Conflict engine fires for each case in B5.
- Logo contrast math reuses the existing WCAG helper.

---

## Optional stretch (build only after A and B pass)
A "Download starter logo" button on the Logo step that generates a simple SVG wordmark or monogram in the browser from the brand name, chosen font (bundled locally, OFL-licensed only) and palette, with text converted to paths (for example with opentype.js). If any bundled font would require a network request or has an unclear license, skip this stretch and say so.

## When finished
Report: files added or changed, new test count and results, a production build result, anything you could not do, and decisions you made.
