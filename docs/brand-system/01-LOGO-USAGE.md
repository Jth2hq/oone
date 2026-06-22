# Logo Usage — Orbit of One

## The mark, today

In `oone.html`, `markGlyph(letter)` builds the brand mark: a heavy condensed letter (`.wm`)
wrapped by two SVG ring layers — `ring-back` (full ellipse, behind the letter) and
`ring-front` (lower arc, crossing in front). The result is **a letter inside a planet
ring** — the orbit. It hydrates anywhere via `data-mark="O"` / `data-mark="C"`.

- **O + ONE** = the hero / editorial brand.
- **C + TANNER** = the design practice within ONE.

This orbit-ring-around-a-letter *is* the system's idea (a body at a threshold, a world
around a one). Keep it. The job below is to formalize it into **three tiers** and stop
mixing marks.

---

## Rule: one mark per surface

Never render the ONE mark and the TANNER mark as two separate logos on the same surface.
Either:
- use **one** of them as the surface's mark, or
- use the **deliberate co-brand lockup** (ONE › TANNER) where the nesting is the message.

Today the manifesto/zone copy stacks `O+ONE` and `C+TANNER` repeatedly inline — that's
fine as *typeset wordmarks in body copy*, but it is **not** a logo. A surface gets exactly
one logo.

---

## The three tiers

### Tier 1 — Primary lockup
Full mark: ringed letter + wordmark + (optional) descriptor.
```
( O )  ONE
        in itself, in orbit
```
- **Use on:** site header / hero, cover surfaces, the one "front door" of a screen.
- **Min width:** ~180px. Below this, drop to Tier 2.
- **Rings:** both `ring-back` and `ring-front` visible.

### Tier 2 — Secondary lockup
Ringed letter + wordmark, no descriptor.
```
( O ) ONE
```
- **Use on:** section headers, panel brand (`.panel-brand`), repeated zone titles.
- **Min width:** ~96px. Below this, drop to Tier 3.

### Tier 3 — Tiny icon
Ringed letter **only** — no wordmark.
```
( O )
```
- **Use on:** favicon, avatars, nav glyph, footer watermark, anywhere ≤ 32px.
- This is the icon that must survive shrinking — see the simplification ladder.

---

## Simplification ladder (simplify *before* you shrink — Rule 4)

| Size | What renders |
|---|---|
| ≥ 180px | Tier 1: rings + letter + wordmark + descriptor |
| 96–180px | Tier 2: rings + letter + wordmark |
| 32–96px | Tier 3: rings + letter |
| ≤ 32px | Tier 3, **single ring** (drop `ring-front`, keep `ring-back` ellipse + letter) |
| ≤ 16px (favicon) | Letter in a plain circle; rings collapse to one stroke |

Never scale the full Tier-1 lockup below its min width — strip a layer instead.

---

## Clear space & placement
- **Clear space** = the height of the ring ellipse (the letter's cap height) on all sides.
- The mark sits **on structure**, not floating in texture — keep its bounding box clear of
  thermal/halftone/grain so the rings stay legible (Rule 12).
- One logo per surface, anchored to the layout grid (top-left or centered hero), never two.

---

## Misuse (don't)
- ❌ Combine O+ONE and C+TANNER as two logos on one surface.
- ❌ Shrink the full lockup until the wordmark is unreadable — drop tiers instead.
- ❌ Recolor the rings per scheme for decoration; the mark uses `--ink` (or `--bg` reversed).
  Accent color is for focal/active moments, not the logo (Rule 7).
- ❌ Place the mark over a busy texture without clear space.
- ❌ Add a third ring, glow, or bloom as "brand flair."

---

## Reduced-motion
If the rings ever animate (orbit spin on hover/entry), they must have a still state that is
the default for `prefers-reduced-motion: reduce` (Rule 11). The static ringed letter is the
canonical form; motion is an enhancement only.
