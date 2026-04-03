# OONE Site — RULES

**Stack:** Single static HTML file (`oone.html`), inline CSS + JS. No build, no npm, no framework unless the owner adds one.

**Run:** Open `oone.html` in a browser; edit and refresh.

**Source of truth:** If this repo only holds `assets/`, `components/`, and `motion/`, the live app file may live in the parent folder (e.g. `website/oone.html`). Edit whichever file actually ships.

---

## For contributors and AI assistants

- Make **small, task-scoped** changes. No drive-by refactors or mass reformatting.
- **Match** existing naming, patterns, and comment style in the file you touch.
- **Do not** add dependencies, bundlers, or a SPA framework without explicit owner approval.
- **Canvas / `tick()`** — keep per-frame work light; avoid new allocations in the animation loop.
- **`localStorage`** — key is `oone_v27`. If you change stored shape, bump the key or migrate old data; document it in a comment near the key.

---

## Architecture map

| Symbol / area | Purpose |
|---------------|---------|
| `ARCH` | Runtime state (load/save with `localStorage`) |
| `PROJECTS` | Portfolio items: `spa`, `bigsky`, `troub`, `ranch`, `twins`, … |
| `GAL_IMGS` | Gallery images (often base64 data URIs) |
| `SCHEMES`, `SVARS`, `RAMPS`, `SCHEME_CATS` | Themes + thermal ramp colors |
| `drawField`, `buildThermal`, `tick` | Main canvas: heatmap, trails, grain, rAF loop |
| `drawBubble`, `drawBubbles` | Nav bubbles (ABOUT, SERVICES, LOG) |
| `entryPos`, `geoProject` | Timeline vs map layout |
| `setMainView`, `navTo`, `openDrawer` | View switching |
| `openProject`, `openAbout`, `openServices`, `openLog` | Panel content |
| `toggleTimeSpace` | Temporal vs spatial canvas |
| `buildImageView`, `fillImageGrid`, `buildDither` | Gallery + dither |

### Log entry shape

```js
{
  cat: 'ideas' | 'artifacts' | 'sensations',
  rel: 'itself' | 'orbit',
  title: string,
  sub: string,
  place: string,
  lat?: number,
  lng?: number,
  t: number,      // ms
  id?: string    // optional project id
}
```

### Theming

Five schemes (FALL, WINTER, SPRING, SUMMER, STONE), three variations each. Use CSS variables (`--bg`, `--ink`, `--ink2`, `--acc`, `--bar-bg`) and `applyScheme()`; avoid hard-coded theme colors in new UI.

### Gallery categories

architecture · interiors · urban design · print+digital · photography

---

## Repo layout (`OONE-Site/`)

| Folder | Intent |
|--------|--------|
| `assets/` | Static support files; **this** `RULES.md` is the canonical project rules doc |
| `components/` | Optional split-out pieces if the app is modularized |
| `motion/` | Optional motion-related assets or code |

---

## Privacy and security

Log data stays in **localStorage** on the user’s machine. Do not exfiltrate it without clear purpose and consent. Never commit API keys or secrets into static HTML.

---

*Keep in sync with real code: storage key, entry fields, project ids, and main filename. Parent reference: `website/CLAUDE.md`.*
