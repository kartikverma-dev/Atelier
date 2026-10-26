# Atelier: Logo visibility fix (thin lettering disappears at small sizes)

## The problem
The ATELIER wordmark uses a font with hairline strokes. At header size and in the home-page hero, strokes such as the left leg of the "A" and the thin crossbars are thinner than one screen pixel, so they fade or disappear, especially light-on-dark. Zooming in makes them reappear. The logo design stays as it is; we are only fixing how it is used.

## What changed in the kit
`atelier-logo-kit/svg/` now also contains **sturdy** variants of every lockup and mark:
- `atelier-logo-horizontal-{light,dark,mono-black,mono-white}-sturdy.svg`
- `atelier-logo-stacked-{light,dark,mono-black,mono-white}-sturdy.svg`
- `atelier-mark-{light,dark,mono-black,mono-white}-sturdy.svg`

Same drawing, with thicker letter outlines and heavier compass legs. The original (fine) files are unchanged. `BRAND-GUIDE.md` has an updated section "Two weights: fine and sturdy" and new recommended sizes. Do not edit or redraw any SVG.

## Tasks

### 1. Assets
Copy all new `*-sturdy.svg` files from `atelier-logo-kit/svg/` into `/public/brand/svg/`. Add them to the service worker precache list and bump its cache version.

### 2. `<Logo />` component
Update `/components/brand/Logo.tsx`:
- Add prop `weight: "auto" | "fine" | "sturdy"` (default `"auto"`).
- In `auto` mode, choose by rendered size:
  - horizontal: sturdy when height is below 48px, fine otherwise
  - stacked: sturdy when width is below 260px, fine otherwise
  - mark: sturdy when height is below 48px, fine otherwise
  - In dark theme, use sturdy whenever horizontal height is below 80px or stacked width is below 360px
- Keep the CSS-only light/dark switching with no flash. Add the sturdy files to the same mechanism.
- Add `shape-rendering="geometricPrecision"` and `image-rendering: auto` where the SVG is inlined or styled. Never apply opacity below 1, blur, filter or text-shadow to a logo anywhere in the app.

### 3. Sizes in the UI
- **Header:** logo height 36px on desktop and 32px on screens under 768px (was 28px). Keep the mark-only fallback under 480px. Keep the `v1.0` tag and spacing balanced after the size change.
- **Home hero:** the stacked logo must be at least 200px wide on desktop and 160px on phones (it is about 90px now). Keep its vertical spacing balanced with the badge and headline below it.
- **Footer:** horizontal logo, 32px tall.
- **Review/export pages and any other place the logo appears:** follow the sizes in `BRAND-GUIDE.md`.
- If any container clips or crowds the larger logo, adjust the container, not the logo.

### 4. Tests
- Logo component picks the sturdy file below the thresholds above and the fine file at or above them, in both themes.
- Header uses 36px (desktop) and 32px (mobile); hero stacked logo is at least 200px wide on desktop.
- All referenced sturdy files exist on disk.
- No CSS in the project applies opacity, filter or text-shadow to `.logo` elements.

### 5. Visual check
Use Playwright (or your browser tool) to screenshot the header and hero in light and dark themes at 1x and 2x device pixel ratio. Check that the left stroke of the "A" and the crossbars of "E" are clearly visible. Save the screenshots in the project (for example `/docs/logo-check/`) and describe what you saw.

## When finished
Report: files changed, test results, production build result, the screenshots you took, and anything you could not do.
