# Asset Slots

Drop your Photoshop exports into this folder. The site references these exact filenames.
Missing files fall back to solid black — no errors.

| File | Where it appears | Recommended size | Format |
|---|---|---|---|
| `hero-bg.jpg` | Hero section full-bleed background | 2560 × 1440px minimum | JPG (compress to ~300KB) |
| `texture-overlay.png` | Fixed overlay across entire page | 800 × 800px (tiled) | PNG with transparency |

## Notes

- `hero-bg.jpg` — this is the main hero background. Will have a dark gradient overlay applied
  on top in code so the white text always reads clearly. Export dark/moody for best results.
- `texture-overlay.png` — displayed at fixed position, tiled across the whole page at low opacity.
  A grain or noise texture works well here. The code sets opacity to ~4%.

## To apply the texture overlay

Once you have `texture-overlay.png` ready, add this to `app/globals.css` under `/* ─── BASE ─── */`:

```css
body::after {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  background-image: url('/assets/texture-overlay.png');
  background-repeat: repeat;
}
```
