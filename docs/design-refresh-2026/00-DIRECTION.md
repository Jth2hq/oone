# oone — Design Direction 2026

A brief to guide brand voice, design tokens, pre-rendered bubble assets, and data-viz refresh for `oone.html`.

## One-line intent

Push the existing poetic/architectural site toward **photoreal wet-glass materiality** without losing its quiet, seasonal restraint. The navigation bubbles and any glassy/wet type should read as actual soap bubbles — iridescent, refractive, load-bearing — not as CSS effects.

---

## 1. Mood

- **Archival wetness.** The site is a field notebook caught in condensation. Every surface has been touched by breath or rain.
- **Seasonal, not thematic.** FALL / WINTER / SPRING / SUMMER / STONE remain the five moods. Keep STONE as the neutral/archival mode.
- **Slow and deliberate.** No micro-animations for their own sake. Motion earns its place by carrying information (hover, focus, time-of-day).
- **Night-first.** Dark ground (`#1C1412` base; seasonal tint over it). Light is scarce and rewarded.

## 2. Material language

Three canonical surface states. Every floating element picks one.

| State | Role | Treatment |
|---|---|---|
| **SOAP** | Navigation bubbles, logo mark, primary CTAs | Photoreal pre-rendered frames (iridescent Newton-ring film, spherical lensing of background, moving caustics, ground shadow) |
| **GLASS** | Panels, drawers, tooltips, theme chooser | Frosted backdrop-blur + Fresnel rim + surface-tension noise (current `.lg-surface` language, refined) |
| **FILM** | Body text, gallery dither, thermal field | Flat — never glossy. The field recedes so the bubbles can live. |

**Bubble spec (for banana brief):**
- Thin-film iridescence (soap, not oil slick) — Newton rings in the pink/cyan/lemon/violet register, not rainbow.
- Visible spherical refraction of whatever is behind (we'll composite the frame over the live thermal field, so frames should have transparent interior and sell the *skin* only).
- One dominant caustic specular at upper-left, one secondary rim caustic, one faint ground light patch.
- Scale: render at 2048×2048, transparent PNG, 60 frames per state for a seamless 2s loop at 30fps.
- States required per bubble (×4 nav bubbles — ABOUT, SERVICES, LOG, THEME):
  - `idle` (gentle surface-tension wobble)
  - `hover` (iridescence blooms, caustic sweeps across)
  - `pop-in` (first 12 frames, for page load + drawer-close reveal)

## 3. Type

Keep the trio, refine the hierarchy.

- **Cormorant / Cormorant Garamond** (italic) — display + editorial body. The *voice* of the site. Add one new treatment: **wet-serif shimmer** — a pre-rendered soap-film overlay applied to H1 display type only, driven by scroll-linked offset (see `create-viz` brief).
- **Space Mono** — labels, nav, meta. Already drifting letter-spacing; keep it.
- **IBM Plex Mono** — structural/CV data. Stays neutral.

Hierarchy:
```
display  → Cormorant italic, clamp(52px,7vw,96px)    ← wet-serif shimmer applies here
h1       → Cormorant italic, clamp(32px,4vw,54px)
h2       → Cormorant italic, clamp(20px,2vw,24px)
body     → Cormorant, clamp(13px,1.1vw,15px), line-height 1.75
meta/eyebrow → Space Mono, 9–11px, tracking .14–.22em, uppercase
```

## 4. Color behavior

Retain the seasonal system. Refine the role of color tokens:

```
--bg      ground (deepest, ~8% luminance)
--ink     primary text (warm/cool per season)
--ink2    secondary text (~35% of ink)
--acc     single seasonal accent — used for: active nav dot, cursor center, log category
--bar-bg  chrome background (panel behind nav/drawer)
```

New tokens for the refresh (to be codified by `design-system`):

```
--film-warm     iridescent film highlight (pink/cream)
--film-cool     iridescent film highlight (cyan/violet)
--caustic       bright specular (pure white at 85% alpha)
--fresnel       rim-light gradient stop
--thermal-lo    heatmap low (already in RAMPS)
--thermal-hi    heatmap high (already in RAMPS)
```

Each season ships its own `--film-warm` / `--film-cool` so iridescence *shifts* per theme — FALL leans amber→teal, WINTER leans violet→ice, etc.

## 5. Motion principles

1. **Frame-based, not interpolated.** Bubble animation runs off a pre-rendered frame strip (no per-pixel JS for the bubble skin). Interior still uses the live thermal cache for refraction fidelity; frames carry only the film + caustics.
2. **30 fps max.** Everything above that is waste on this canvas.
3. **Reactive layers respond in one of three ways:**
   - *Cursor proximity* (nearest bubble advances frame index)
   - *Time-of-day* (thermal ramp drifts ±5% across 24h)
   - *Scroll linkage* (wet-serif shimmer offset on display type)
4. **Never more than two things moving.** If a panel opens, the ambient field pauses.

## 6. Data-viz / algorithmic reactivity (brief for `create-viz`)

Current canvas does three things: (a) thermal heatmap background, (b) bubble nav, (c) grain overlay. Refresh priorities:

1. **Heatmap palette audit.** Replace any non-perceptual ramps with OKLCH-uniform ramps that hold legibility across the seasonal schemes. Keep the existing `RAMPS` data shape so the interpolator (`thermalColor()`) doesn't have to change.
2. **Entry density visualization.** Move from isotropic Gaussian splats to a *variable-bandwidth* kernel — dense regions tighten, sparse regions diffuse. This makes the map legible at both timeline and geographic modes.
3. **Cursor-to-bubble coupling.** The magnetic snap should influence the frame index: hover advances the iridescence sweep, so the bubble reacts as if *looking at* the cursor. Build a small reactivity curve (ease-out cubic on distance, clamped to [0,1], mapped to frame index 30–59 of the hover loop).
4. **Time-linked schemes.** Apply a gentle ±3° hue drift across the active ramp over the visible session, driven by `Date.now()` not frame count (so it doesn't pause when the tab blurs).
5. **Ground caustic.** Replace the procedural ground caustic (currently stage 7 of `drawBubble`) with a single pre-rendered PNG sprite per bubble, to guarantee photoreal quality.

Non-goals: adding new charts, adding new data sources, adding any third-party viz library. Everything stays canvas + CSS.

## 7. Deliverables downstream

- `/brand-voice:generate-guidelines` → `docs/design-refresh-2026/01-BRAND-VOICE.md`
- `/design-system` → `docs/design-refresh-2026/02-TOKENS.css` (drop-in replacement for `:root` block in `oone.html`)
- `/banana` → `assets/bubbles/{about,services,log,theme}/{idle,hover,popin}/frame-{000..059}.png` (+ contact sheet + one hero render for README)
- `/data:create-viz` → patches to `buildThermal()`, `thermalColor()`, `drawBubble()` stage 7, and new cursor→frame coupling
- Final integration → new `oone.html` with `<link rel="preload">` for frame strips, updated `drawBubble` to composite frames over thermal cache, updated tokens.

## 8. Acceptance criteria

- Bubbles at 1:1 look indistinguishable from a photographed soap bubble at 1m distance.
- Season switch updates iridescence register, not just background tint.
- All existing interaction paths (nav, drawer, theme chooser, gallery, tutorial) still work unchanged.
- Page weight increase ≤ 8 MB total for frame assets (aggressive WebP/AVIF, sprite sheets where possible).
- 60 fps cursor response; bubble skin at 30 fps; no jank on M-series hardware at 1×DPR.
