# oone — Token Spec

Companion to [`02-TOKENS.css`](02-TOKENS.css). One HTML file, so the system is intentionally small.

## Three layers

```
PRIMITIVE  → --ink-100…--ink-05, --fs-*, --dur-*, --radius-*
SEMANTIC   → --color-surface, --color-text-primary, --surface-glass
COMPONENT  → (inline in oone.html — no component tokens yet)
```

The existing `oone.html` already uses *component-level* inline values for most pieces (nav, drawer, panels). That's fine for a single-file site — we're not refactoring every `rgba(255,255,255,.28)` call. The semantic layer exists so *new* markup has a token to reach for.

## Preserved variables

These are the five tokens the JS reads via `applyScheme()` — **do not rename**:

| Token | Role |
|---|---|
| `--bg` | Page ground |
| `--ink` | Primary text |
| `--ink2` | Secondary text (pre-alpha'd) |
| `--acc` | Single seasonal accent |
| `--bar-bg` | Panel/chrome background |

## New tokens (per scheme)

| Token | Role | Consumed by |
|---|---|---|
| `--film-warm` | Iridescent highlight — warm side | Bubble frame tint, wet-serif shimmer |
| `--film-cool` | Iridescent highlight — cool side | Bubble frame tint, wet-serif shimmer |
| `--caustic` | Pure specular highlight | Bubble stage-5 caustic, CTA hover glow |
| `--caustic-dim` | Softer specular | Panel inset top edges |
| `--fresnel` | Gradient for rim lighting | `.lg-surface::after` |
| `--thermal-lo` | Heatmap low-end color | `buildThermal()` base |
| `--thermal-hi` | Heatmap high-end color | `buildThermal()` peak |

## How per-season cascade works

The JS selector `applyScheme(id, variation)` currently sets `data-scheme` on `<body>` *and* writes individual `--bg/--ink/…` values via inline style. With this tokens file added, the `[data-scheme="s-*"]` block provides the iridescence/thermal tokens while the existing JS keeps overwriting the five originals per variation.

Net effect: **no JS changes required**. Just:

1. Paste the contents of `02-TOKENS.css` into the `<style>` block of `oone.html` replacing the current `:root{…}` line.
2. Add `document.body.setAttribute('data-scheme', currentScheme)` inside `applyScheme()` (one line).

## Motion tokens

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 120ms | Tooltip fade, focus rings |
| `--dur-base` | 220ms | Button hover, toggle |
| `--dur-slow` | 450ms | Drawer height change, gallery filter transition |
| `--dur-stage` | 880ms | Staged entrance animations (`oone-peek`) |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | Default — poetic deceleration |
| `--ease-std` | `cubic-bezier(.4,0,.2,1)` | Utility transitions |

Reduced-motion query zeros all durations.

## What I did NOT add

- Component tokens (`--button-*`, `--drawer-*`) — not worth the overhead for one file
- Dark/light duality — the site is night-first by design; no light mode
- A color ramp per scheme beyond `--thermal-lo/hi` — the existing `RAMPS` JS object owns the full gradient
