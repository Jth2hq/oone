# oone — Design Refresh 2026 · Release Notes

**Date:** 2026-05-02
**Mode:** SHIP (option E — procedural bubbles retained, photoreal deferred to v2)

---

## What landed

### Documentation
- `00-DIRECTION.md` — design direction (mood, material, type, color, motion, viz brief)
- `01-BRAND-VOICE.md` — voice spec (attributes, tone-by-context, vocab, patterns, before/after)
- `02-TOKENS.css` — drop-in `:root` tokens (OKLCH ladder, type, spacing, motion, glass, per-scheme overrides)
- `02-TOKENS.md` — token-architecture annotation
- `03-DISCOVERY.md` — brand-asset discovery report (12 sources across Drive + local)
- `.claude/brand-voice-guidelines.md` — canonical, single-file brand guide for downstream use

### Code (in `oone.html`)
- `body{background:#1A0C06;color:#FAF0E8}` — FERRO base now matches tokens (was `#1C1412/#F9F0E8`)
- `<link rel="stylesheet" href="docs/design-refresh-2026/02-TOKENS.css">` — token cascade above inline styles
- `<link rel="stylesheet" href="assets/scheme-oone-2026.css">` — OONE direction overlays (delicate)
- `<script src="assets/viz-refresh-2026.js" defer>` — viz patches load after inline script

### OONE direction applied substantially (`assets/scheme-oone-2026.css` + `viz-refresh-2026.js`)

The OONE scheme is the production aesthetic. These moves push the live site toward the infrared / photoreal / editorial register defined in `00-DIRECTION.md`.

| # | Where | Move |
|---|---|---|
| 1 | body vignette | Two-stop radial multiply (warm haze center + dark periphery, alpha .32 outer) |
| 2 | full-viewport grain | SVG fractalNoise overlay @ 11% mix-overlay |
| 3 | drawer paper grain | SVG noise inside `#dw-body` @ 10% soft-light |
| 4 | cursor | Iridescent halo around `#cur` + warm drop-shadow on SVG |
| 5 | display headlines | `.about-name`, `.brand-name`, `.tut-title` get caustic baseline rule + 9–11s shimmer |
| 6 | section eyebrows | "on record · oone — vol. 01" above About; "services · by the season" above Services; double-rule on CV section labels |
| 7 | brand mark | Iridescent drop-shadow halo, expands on hover |
| 8 | glass panels | Conic-gradient soap-film rim on every floating glass surface (panel-key, panel-filter, tip, tut-card, tc-panel, drawer) via masked pseudo-element |
| 9 | gallery tiles | Inset cinematic vignette (warm top, dark bottom) + 1.6s scale on hover |
| 10 | services list | Catalog menu treatment — `01`-style row counters + dotted leaders + larger display |
| 11 | viz indicators | 3.4s breathing pulse on active layer dots; tracked panel heads w/ leading film dot |
| 12 | feed ticker | Grayscale/sepia treatment, restores on hover |
| 13 | **canvas bubbles — procedural Newton-ring iridescence** | Five-pass film overlay added in `viz-refresh-2026.js` after the procedural lensing: pink/cream warm hemisphere + cyan/violet cool hemisphere + lemon Newton-ring pinch + dominant white caustic upper-left + soft secondary caustic + Fresnel rim. Bloom intensity scales with cursor proximity. Runs WITHOUT sprite assets — bubbles read iridescent today. |

**No-asset photoreal:** move 13 is the killer — the canvas bubbles now show iridescent thin-film + caustics + Fresnel rim purely procedurally. When the photoreal PNGs eventually land (post-billing), the sprite compositor layers ON TOP of this; the procedural pass becomes the floor, not the ceiling.

### Pilot landing override (`viz-refresh-2026.js` §0 + §5b)

The OONE pilot in `schemes/oone.html` defines the canonical landing recipe. Two enforcement moves now ensure the live `oone.html` matches it:

1. **FERRO scheme as landing default** — `applyScheme('s-fal','v2')` runs on first visit if no `oone_scheme_explicit` flag is in `localStorage`. Once a user explicitly picks any scheme via the chooser, the wrapped `applyScheme` records that choice and respects it on subsequent loads.

2. **Procedural Newton-ring pass re-tuned to match pilot bubble geometry exactly** — the 8 layers below now use the same gradient anchor points and colors as the pilot's `.bub` CSS:

| Layer | Pilot CSS counterpart | Canvas implementation |
|---|---|---|
| 1 caustic | `radial-gradient(circle at 30% 28%, rgba(255,255,255,.55) → 0 at 18%)` | offset `-r*.40, -r*.44`, `screen` blend, alpha 0.55 + 0.18·prox |
| 2 warm film | `radial-gradient(circle at 70% 70%, --film-warm → 0 at 38%)` | offset `+r*.40, +r*.40`, `screen`, `rgba(255,170,120,.55)` |
| 3 cool film | `radial-gradient(circle at 30% 75%, --film-cool → 0 at 42%)` | offset `-r*.40, +r*.50`, `screen`, `rgba(140,180,210,.45)` |
| 4 accent center | `radial-gradient(circle at 50% 50%, rgba(228,68,28,.18) → 0 at 70%)` | center, `overlay` blend, alpha 0.18 |
| 5 frosted rim | `inset 0 0 30px rgba(255,255,255,.18)` | radial gradient r·.68 → r·.985, `screen`, alpha 0 → 0.22 |
| 6 accent interior | `inset 0 0 60px rgba(228,68,28,.10)` | radial gradient r·.30 → r·.95, `screen`, alpha 0 → 0.10 |
| 7 Fresnel hairline | (implicit in CSS gradients) | 1px arc stroke, `source-over`, alpha 0.20 + 0.12·prox |
| 8 drop shadow | `0 16px 40px rgba(0,0,0,.55)` | ellipse below bubble, `destination-over`, alpha 0.40 → 0 |

All static — no per-frame phase. Bubbles read as photographs, not as pulsing CSS effects. Proximity bumps intensity only.

Honors `prefers-reduced-motion`. Recolors across all 5 schemes (FERRO/COBALT/PATINA/SUMMER/STONE) via inherited `--ink/--acc/--film-warm/--film-cool`.

### Viz patches (`assets/viz-refresh-2026.js`)
1. **`thermalColor()` time-linked hue drift** — ±3° drift over a ~14-min cycle, driven by `Date.now()` so it continues when the tab blurs
2. **`buildThermal()` variable-bandwidth kernel** — per-entry bandwidth = mean distance to k=4 nearest neighbours (clamped 22–180px). Dense regions tighten, sparse regions diffuse — fixes flat-blob look at both timeline and geographic modes
3. **`drawBubble()` sprite compositor** — wraps the procedural function. Procedural lensing still runs (refraction of thermal field). On top, if `assets/bubbles/hero/{slot}-{idle|hover}.png` is loaded, paints the iridescent skin in `screen` blend, alpha biased by cursor proximity (`bubbleProximityT`)
4. **Ground-caustic sprite hook** — `window.drawGroundCaustic(ctx,bx,by,r)` available to replace stage-7 procedural caustic when `assets/bubbles/hero/ground-caustic.png` lands

All four are **fail-open**: if assets are missing, `img.onerror` is silent and the compositor short-circuits. Procedural visuals render unchanged.

### Scheme pilots (`schemes/`)
Four standalone scheme pilots from `oone.html` baseline:
- `oone.html` — scheme 01 OONE (infrared / photoreal / editorial)
- `light-room.html` — scheme 02 Light Room (milky glass + cursor magnifier)
- `wine-bar.html` — scheme 03 Wine Bar (collage / torn paper / NYT op-ed)
- `queer-space.html` — scheme 04 Queer Space (pixelated / primary / publication)
- `index.html` — 4-up iframe gallery
- `_shell.css` + `_shell.js` — shared baseline (tokens, primitives, components, canvas tick, drawer/theme/tip/gallery logic)

Each pilot includes nav, key panel, filter panel, drawer, tip, theme-chooser, tutorial, gallery slot, feed-ticker, custom cursor — plus one scheme-defining hero artifact.

---

## Conflicts resolved

| # | Conflict | Resolution |
|---|---|---|
| 1 | FERRO bg: live `#1C1412` vs tokens `#1A0C06` | Tokens value adopted; oone.html patched |
| 2 | Drive intake doc lists "Space Grotesk" — not in any other source | Disregarded (placeholder template artifact) |
| 3 | Drive intake doc lists 5–6 nav bubbles vs live 4 | Live count canonical (ABOUT, SERVICES, LOG, THEME) |

---

## Deferred to v2

### Photoreal soap-bubble sprites
- **Status:** blocked — both available `GOOGLE_AI_API_KEY` keys have `limit: 0` on every Gemini image model + Imagen returns "paid plans only"
- **Cause:** project-level billing not enabled on the Google AI Studio project that owns the keys
- **Unblock:** enable billing at https://ai.dev/projects (~$0.30 for the 8-shot batch)
- **Generator script:** `assets/bubbles/hero/_run.sh` retained — drops 8 named PNGs into the slot directory once quota is restored
- **Wiring:** already in place. The day a sprite lands, the compositor finds it via `img.onload` and overlays it on the next frame — no further code change required

### Other deferred items (from discovery)
- About copy, Services list, 5 project descriptions, OG description rewrite, log password, domain/canonical URL — all blocked on content authoring (use `01-BRAND-VOICE.md` patterns)
- Standalone wordmark SVG export — derive from existing CSS rendering
- WTTO.pdf probe (96 MB on Drive) — too large for MCP read; manual download required
- Light Room / Wine Bar / Queer Space pilots — keep-as-roadmap or archive decision

---

## How to verify

```bash
open /Users/jth2hq/Desktop/website/Oone-Site/oone.html
# Console should log: [oone] viz-refresh-2026 active — sprites: 0/8
# Thermal field should show density-aware kernels (tighter where entries cluster)
# Bubble nav still renders procedurally; hover still works
# No 404s in network tab except the 8 missing bubble PNGs (expected, fail-open)

open /Users/jth2hq/Desktop/website/Oone-Site/schemes/index.html
# 4-up gallery; click any tile to open its pilot
```

## How to reactivate photoreal bubbles (v2)

```bash
# 1. Enable billing on the GCP project
# 2. Re-run the generator
bash /Users/jth2hq/Desktop/website/Oone-Site/assets/bubbles/hero/_run.sh
# 3. Reload oone.html — sprites auto-discovered via image preload
```

To disable the compositor entirely (keep tokens + viz patches, drop sprite layer), set before the script loads:
```html
<script>window.OONE_USE_PHOTOREAL_BUBBLES=false;</script>
```

---

## File map

```
Oone-Site/
├── oone.html                                          ← live site (patched)
├── CLAUDE.md
├── .claude/
│   └── brand-voice-guidelines.md                      ← canonical brand guide
├── assets/
│   ├── viz-refresh-2026.js                            ← viz patches
│   └── bubbles/hero/
│       └── _run.sh                                    ← v2 sprite generator (blocked)
├── docs/design-refresh-2026/
│   ├── 00-DIRECTION.md
│   ├── 01-BRAND-VOICE.md
│   ├── 02-TOKENS.css
│   ├── 02-TOKENS.md
│   ├── 03-DISCOVERY.md
│   └── 04-RELEASE-NOTES.md                            ← this file
└── schemes/
    ├── index.html                                     ← 4-up pilot gallery
    ├── _shell.css
    ├── _shell.js
    ├── oone.html                                      ← pilot 01
    ├── light-room.html                                ← pilot 02
    ├── wine-bar.html                                  ← pilot 03
    └── queer-space.html                               ← pilot 04
```
