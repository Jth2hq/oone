# OONE — Design Direction (synthesis)

_Source pool: `oone.html`, `oone-v9-object.html`, `oone-v6-variations.html`,
`oone-aino-rework.html`, `oone-avant-garde.html`, `oone_9/10/11.html`._

Two alternate schemes are derived from this direction:

- **A · Room Search** — pan left/right/up/down through a weathered
  interior; works hung in the field like a gallery after hours.
- **B · Steam Mirror** — a hyperreal glass surface fogged with steam;
  the Powder Room photo is the room beyond; you wipe the glass to see.

---

## Common ground across every variation

| Signal                  | Treatment                                                      |
|-------------------------|----------------------------------------------------------------|
| **Palette anchor**      | paper / vellum warm neutral + bitumen ink + ember amber accent |
| **Wordmark**            | `o o n e` in Fraunces; the second `o` always italic + amber     |
| **Type stack**          | Fraunces (serif) · Hanken Grotesk (sans) · JetBrains Mono (data) |
| **Atmosphere constant** | fine SVG grain + radial vignette + ember pulse                  |
| **Motion ethos**        | slow cubic-bezier easing, `0.6–1.2s`, no bounce                 |
| **Voice**               | "in itself, in orbit" — architectural, quiet, specific          |

## Material language — push to photoreal

The existing canvas painters (radial-glow, liquid, thermal, grain,
bodies, metal, steam) are **good atmospheric primers, not final skins**.
Replace or overlay them at hero moments with pre-rendered photoreal
frames (see `scripts/banana-generate.sh`) so wet/glassy/bubble
surfaces read as material, not as gradient.

Photoreal targets:

1. **Soap film iridescence** — thin-film interference across a
   curved surface; Newton's ring banding; warm biased.
2. **Condensation on cold glass** — thousands of droplets at random
   radii; backlit; a single drip tracking vertically.
3. **Steam-mirror fog** — depth-varying blur; hand-wipe reveals
   crisp mirror; edges re-steam over 6–10s.
4. **Wet concrete** — specular darker patches under a thin water
   film; paper-fine grain held beneath.

## Type behavior

- **Breathing display glyphs.** Variable-axis `opsz + wght` animated
  over `~8–10s`, phase-offset per letter. This is the OONE signature.
- **Italic emphasis = amber.** Always. The only color the type takes.
- **Mono labels = observatory.** Coordinates, timestamps, codes,
  section markers. Lowercased.
- **Serif sentences = hand-written.** Italic clauses in the middle of
  sentences carry the weight. Never center-aligned prose.

## Color behavior

```
paper        #efe8db   — default surface
paper-2      #e4dccb   — recessed
paper-3      #d8cebb   — deeper
ink          #13100e   — body copy, objects
ink-soft     #3a3430
ink-mute     rgba(19,16,14,0.42)

vellum       #efe6d4   — inverted hero surfaces
bitumen      #14110c   — deep dark
concrete     #8a8478   — stained ground
lichen       #4a5848   — living patina
rust-stain   #6a3418   — dried bloodrust
water        #38423a

amber        #c4601a   — the only accent
amber-dim    #9b4b14
ember        #e88a3a   — highlight of the amber
```

Hover is always toward `amber`. Selection is always `amber` on `paper`.

## Motion principles

- **No parallax gimmicks** — motion is spatial (pan, scroll, wipe),
  not decorative.
- **Cursor is an instrument** — rings, ember dots, wipe fingers,
  thermal trails; never the OS default on desktop.
- **Everything decays** — wipes re-fog, trails fade, mouse ripples
  dissolve. Nothing stays lit forever.
- **Entrance rise** — `opacity 0 → 1` with `translateY(14px) → 0`,
  `0.9s cubic-bezier(.16,1,.3,1)`.

## Scheme briefs

### A — Room Search

Field: `6400 × 5000` pannable surface (from v9-object). The room is
implied by gradient walls, a faint floor-vanishing-point, pitting
texture. Works are lit objects floating at intentional positions.
Inscriptions bleach into the plaster. Signature NW, contact SE.
Minimap ember shows where you are in the room.

Navigation: drag, WASD/arrows, scroll-wheel zoom, space returns
home. A small observatory readout tracks coordinates. Objects reveal
captions only when you approach (the `--near` CSS var).

Photoreal assets: 1–2 soap-bubble spheres drifting slowly across the
room, and a single condensed-glass frame around the "oone" wordmark.

### B — Steam Mirror

A full-viewport composition: the **Powder Room photograph is the
world behind the glass**. In front: a pane of cold mirrored glass
fogged with steam. Everything is slightly off-color through the fog.

Interaction: cursor becomes a finger-wipe. Where you drag, the steam
clears — through the clear streaks you see the room sharply, with
saturation, contrast, and a tiny chromatic aberration. Drips form
from the lower edge of wiped regions and track downward. Over 6–10s
the wiped area re-fogs.

"oone · in itself, in orbit" is **etched into the glass** — visible
as a subtle bevel always, brightening when the area around it is
wiped. Works and nav live as etched labels that reveal only under
the wipe.

Photoreal assets: a baseline steam-fog layer (rendered once via
banana, animated by offset), 12–24 condensation droplet sprites for
micro-detail, one bevel of the wordmark etched into glass.

## Brief for `create-viz`

The existing canvas painters remain useful as **ambient data skins**
inside Scheme A's work-tile frames. Tighten them:

- use HDR-like screen blending only over warm cores,
- reduce stripe count on `grain-wash` to ≤ 40 (GPU rest),
- introduce a `soap-film` painter: polar-noise `phase` drives hue
  across a narrow window `hsl(14..40, 60%, 60%)` on a mid-grey base
  — reads as bubble membrane even without banana frames.

Data reactivity — cursor proximity drives a `--near` variable
already; extend it to cross-fade between the canvas painter and a
pre-rendered banana still at `--near > 0.8`. That's the final
"photoreal close, procedural far" behavior.
