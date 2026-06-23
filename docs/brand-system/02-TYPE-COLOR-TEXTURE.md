# Type · Color · Texture — Orbit of One

---

## 1. Type system → three roles

### Live state (the problem)
`oone.html` declares **7+ families across 8 variables**:

| Variable | Face | Source |
|---|---|---|
| `--ff-head` | Anton | Google Fonts **+** also a fallback chain |
| `--ff-body` | early-sans | Typekit |
| `--ff-ui` | early-sans | Typekit — **identical to `--ff-body`** |
| `--ff-serif` | gratia | Typekit (+ embedded `oone-gothic`) |
| `--ff-redaction` | redaction-bold | Typekit |
| `--ff-redaction-it` | redaction-50 | Typekit |
| `--ff-liquida` | liquida | Typekit |
| `--ff-mono` | config-mono-vf | Typekit |

Loaded from **three places**: Typekit (`use.typekit.net/ohy2syh.css`), Google
(`Anton`), and a **base64-embedded `oone-gothic`** `@font-face`.

> ✅ **Resolved (2026-06):** display face = **Saira Semi Condensed** (tall, heavy, condensed —
> the ROT-studio look). Swapped in from Anton after a 4-up specimen; Anton's expanded width
> read stumpy. Druk Condensed Super (Adobe, paid) is the exact-ROT upgrade if wanted; Benzol
> still parked. All a one-line `--ff-display` change. The three-role collapse below is
> **implemented** in `oone.html`. Specimen: `type-specimen-v2.html`.

### Target: system v3 — 4 fonts / 3 families (planned)
The role tokens stay; what they point to changes. The defining rule: **utility (sans) and
body (serif) come from ONE superfamily** so the system is 4 fonts across 3 families. Gratia
becomes a sanctioned *decorative* role, not the body face. Data folds into the utility sans
(tabular figures) — the dedicated mono is dropped.

| Role | Token | Job | Face (v3) | Family |
|---|---|---|---|---|
| **Display** | `--ff-display` | Headlines, zone titles, wordmark (lockup 02, raised prefix) | **Geist** | 1 |
| **Utility (sans)** | `--ff-utility` | UI, labels, captions, **data** (tabular nums) | **superfamily sans** (e.g. IBM Plex Sans) | 2 |
| **Body (serif)** | `--ff-body` | Reading text | **superfamily serif** (e.g. IBM Plex Serif) | 2 |
| **Decorative** | `--ff-deco` | Manifesto voice, editorial pull-quotes — one per screen | **Gratia** | 3 |

**Superfamily candidates (utility + body, pick one):** IBM Plex (recommended — clean,
modern, pairs with Geist) · Source (warmer, bookish) · Alegreya (literary, most character).
Specimen: `type-system-v3.html`.

**Status:** decided in principle; **not yet wired into `oone.html`** (the live file still runs
the earlier Saira/early-sans/Gratia/config-mono set). Wiring is a token-and-loader swap plus
repointing `.zpara`/footnotes off `config-mono` to the body serif.

> **History:** an earlier pass collapsed 8 family vars → 3 roles (Saira display, early-sans
> utility, Gratia body, config-mono data) and deleted the orphaned `oone-gothic` @font-face.
> v3 supersedes that: display → Geist, body → a superfamily serif, Gratia → decorative.

---

## 2. Color system → one lead + one support

### Live tokens
```
--bg:#E8E4DC   --bg-2:#DAD6CF   --ink:#1A1A1A   --ink-2:rgba(26,26,26,.55)   (light)
--bg:#1A1A1A   --bg-2:#0E0E0E   --ink:#DAD6CF   --ink-2:rgba(218,214,207,.55) (dark)
--warm:#E8821C  --cool:#2F62C4 / #3B82FF
```
`--warm` and `--cool` currently run as **two co-equal accents** feeding the thermal ramp.

### Target
- **Base (quiet):** `--bg`, `--bg-2`, `--ink`, `--ink-2`. Backgrounds stay quiet (Rule 7).
- **Lead accent (per page):** pick **one** of `--warm` / `--cool` as that page's lead.
  Use it for focal moments, labels, and active states **only**.
- **Support accent:** the other one, used sparingly (a single secondary state).
- **Thermal ramp:** keep the `--warm`↔`--cool` ramp **only** where it encodes data
  (entry density/age on the canvas). That is a *visualization*, not page décor — it doesn't
  count against the one-lead-accent rule because it's information, not styling.

Practical mapping: editorial/ONE pages lead **warm**; practice/TANNER + utility pages lead
**cool**. One lead each, never both as décor.

---

## 3. Texture system → 1 hero + 1 support per screen

### Live textures (too many coexist)
- `halftone-screen` overlay
- canvas **thermal heatmap** (`buildThermal` / `drawField`)
- **dither** (gallery images)
- **grain** (`grainTri`)
- **fractal-noise crinkle** (shrink-wrap displacement)
- **mouse trails** + bubbles

### Target: texture budget
Each screen gets **one hero texture + one support texture**, assigned by surface:

| Surface | Hero texture | Support texture |
|---|---|---|
| Log / canvas (editorial) | thermal heatmap | grain |
| Gallery | dither | grain |
| Object / still-life | fractal-noise crinkle | grain |
| Utility panels (about/services/log lists) | **none** | grain (very low) at most |

- **Grain** is the one shared connective texture — keep it quiet and global.
- **Halftone, dither, thermal, crinkle, trails** are *heroes* — only one per screen, never
  layered together.
- Utility screens trend toward **no hero texture** (Rule 14): structure over atmosphere.

---

## 4. Spacing & structure (standardize — Rule 13)
- Adopt a single spacing scale (e.g. 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64) and use tokens, not
  ad-hoc px.
- One column grid for editorial, a tighter grid for utility.
- Atmosphere (texture/motion) renders **behind** the structural grid, never instead of it.

---

## 5. Quick reference card
- **Type:** Display · Utility · Body. Nothing else is a role.
- **Color:** quiet base + **one** lead accent + one support. Ramp = data only.
- **Texture:** one hero + one support. Grain is the shared support.
- **Decoration:** max **one** decorative type treatment per screen (redaction/liquida).
