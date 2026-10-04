# Performance pass — Marlow landing

This pass optimizes the existing Level 1 landing page in `level-1/task-1-landing`. The readable source stays in that folder. `npm run build` writes a minified copy to `level-1/task-1-landing/dist`.

## What changed

- The below-the-fold workshop image is WebP (37,342 bytes), with `width`, `height`, `loading="lazy"`, and `decoding="async"`.
- The hero drawing is preloaded and marked `fetchpriority="high"` so the first screen does not wait on the lower image.
- The Google font stylesheet loads with `display=swap` and is switched on after preload, so it does not block the first paint. A `noscript` fallback remains.
- Page JavaScript uses `defer`.
- `npm run build` minifies CSS and JavaScript with esbuild.
- `level-1/task-1-landing/_headers` sets a long cache for `/assets/*` and a shorter cache for CSS and JavaScript, for Netlify.

## Measured size

| File | Source | Minified |
| --- | ---: | ---: |
| styles.css | 6,299 bytes | 4,904 bytes |
| script.js | 934 bytes | 789 bytes |

## Build

```bash
cd level-1/task-1-landing
npm install
npm run build
```

Open `dist/index.html` for the minified page, or `index.html` while editing.

## Lighthouse

A full Lighthouse score needs Chrome on this machine and a local static server. The changes above are the ones Lighthouse flags for images, render-blocking fonts, unused transfer size, and caching. Run this from the landing folder after the build if Chrome is installed:

```bash
npx serve dist
npx lighthouse http://localhost:3000 --only-categories=performance --view
```
