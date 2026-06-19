# Brand marks — calligraphic logomark (2026)

Two freestanding marks built from one continuous broad-nib stroke: a tall
tilted loop that coils into a small inset "o".

- **`orbit-of-one.svg`** — the loop closes at the top (a small crossing tail).
  Tilted ~24°. The hero brand of the site.
- **`care-of-tanner.svg`** — the same body broken open at the top-right into a
  rising hook flourish; tilted more aggressively (~30°). The design practice.

Both use `fill="currentColor"` so they inherit the page ink (`--ink` / `--zink`)
and theme automatically with day/night and each zone.

The marks are the *freestanding iconography* — they sit ABOVE the wordmark and
are never used as a text character. In `oone.html` they are baked into the
`BRAND_MARKS` object and rendered via `brandMark()` / `[data-icon]`.

Source geometry + the broad-nib ribbon generator that produced these paths is
documented in the design-refresh notes.
