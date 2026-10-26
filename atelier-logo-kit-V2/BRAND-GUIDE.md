# Atelier: Logo Guide

## The idea
The mark is an **A drawn as the legs of a drafting compass**: two precise strokes meeting at a pivot point, with a **gold arch** as the crossbar. It says three things at once: *craft* (a draftsman's tool), *architecture* (the arch), and *precision* (every value in the prompt is exact).

The wordmark is **ATELIER** in a high-contrast display serif (Italiana), widely tracked. All lettering is converted to outlines, so the files do not need any font installed.

## Colors
| Role | Name | Hex |
|---|---|---|
| Ink | Near-black | `#141312` |
| Paper | Warm alabaster | `#FBF9F5` |
| Accent | Champagne gold | `#C8A97E` |

## Files
- `svg/atelier-logo-horizontal-{light,dark,mono-black,mono-white}.svg`: main lockup. `light` is for light backgrounds, `dark` for dark backgrounds.
- `svg/atelier-logo-stacked-*.svg`: centered version for square or narrow spaces.
- `svg/atelier-mark-*.svg`: the symbol alone.
- `svg/atelier-app-icon.svg` and `png/app-icon-{192,512}.png`, `png/app-icon-maskable-512.png`: PWA and app icons. The mark sits inside the central safe zone, so it survives circular masks.
- `svg/favicon.svg`, `web/favicon.ico`, `png/favicon-{16,32,48}.png`, `png/apple-touch-icon.png`: a heavier-stroke version made for tiny sizes.
- `png/og-image-1200x630.png`: social preview image.
- PNG lockups have their background baked in. Use the SVGs when you need transparency.

## Two weights: fine and sturdy
The wordmark font has hairline strokes (for example the left stroke of the "A" and the crossbars of the E). At small sizes those hairlines become thinner than one screen pixel and fade out, especially light text on a dark background.

- **Fine** (`atelier-logo-*.svg`): the original elegant drawing. Use it only when the logo is large (horizontal lockup 48px tall or more, stacked lockup 260px wide or more).
- **Sturdy** (`atelier-logo-*-sturdy.svg`, `atelier-mark-*-sturdy.svg`): the same drawing with the hairlines thickened and the compass legs made heavier. Use it for headers, footers, cards, hero logos on dark backgrounds and anything smaller than the fine thresholds above.
- When unsure, use sturdy. On dark backgrounds, always use sturdy below 80px tall.

## Usage rules
- **Clear space:** keep at least the height of the letter "E" free on all sides.
- **Minimum size:** horizontal lockup 150 px wide (sturdy version); mark alone 24 px. Below 24 px, use the favicon version.
- **Recommended sizes:** header lockup 36 px tall (32 px on phones); hero stacked lockup 200 px wide or more; footer lockup 32 px tall.
- **Rendering:** never apply opacity below 1, blur, filters or text-shadow to the logo, because each one makes thin strokes fade further.
- **Backgrounds:** use `light` on backgrounds lighter than about 60% luminance and `dark` on darker ones. Over photos, put the logo on a solid or heavily dimmed area.
- **Mono versions** are for single-color print, stamps and watermarks.
- **Do not:** recolor the gold arch, stretch or rotate the logo, add shadows or glows, re-typeset the wordmark in another font, or place it on busy imagery.

## Before commercial use
A compass-style "A" is a common idea in design and architecture. Run a reverse-image search and a trademark search in your region before you promote Atelier widely or register the name.

The wordmark font (Italiana) is licensed under the SIL Open Font License, which allows its outlines to be used in a logo.
