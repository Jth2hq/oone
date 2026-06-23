# Cleanup List — Redundancies in `oone.html`

Every item below is a place where two things do the same job (Rule 15), grounded in the
current `oone.html`. Ordered by impact. Treat each as: **keep one, remove the other.**

---

## A. Type — 8 variables doing 3 jobs

| # | Redundancy | Status | Action taken / remaining |
|---|---|---|---|
| A1 | `--ff-ui` **==** `--ff-body` (both `early-sans`) | ✅ done | `--ff-ui` now aliases the `--ff-utility` role; the one old sans `--ff-body` usage (`.of-txt`) repointed to `--ff-utility`. |
| A2 | `--ff-redaction` + `--ff-redaction-it` two faces for one effect | ✅ done | `--ff-redaction` deleted (0 uses); `--ff-redaction-it` kept as a **treatment** resolving into `--ff-body`. |
| A3 | `--ff-liquida` overlaps `--ff-serif` | ✅ done | Demoted to a decorative treatment resolving into `--ff-body`. |
| A4 | Embedded base64 `oone-gothic` `@font-face` | ⏳ **pending** | Now **orphaned** — removed from all role chains; only the `@font-face` remains (line ~15). Delete it for a large payload win (this is what bloats the file). Needs your go-ahead since it's an embedded asset. |
| A5 | Display face: **Anton** vs **Benzol** | ✅ resolved | Now **Saira Semi Condensed** (tall/heavy/condensed, ROT look) — swapped from Anton via specimen. `--ff-display` is the single knob. Druk Condensed Super (paid) / Benzol = future swaps. |

**Net achieved:** 8 family variables → **3 roles** (`--ff-display` / `--ff-utility` / `--ff-body`), with `--ff-mono` as the utility data variant. Legacy `--ff-head/ui/serif` retained as aliases so existing markup keeps working. Verified in-browser, no console errors.

---

## B. Font loading — 3 sources

| # | Redundancy | Evidence | Action |
|---|---|---|---|
| B1 | Three font origins: Typekit, Google, embedded base64 | ◑ partial | **Anton stays** → Google link (line 9) is the canonical display path; Typekit serves utility/body/treatments/mono. The embedded `oone-gothic` (line 15) is the only redundant origin left → see A4. |
| B2 | `display-anton` `font-synthesis` guard for Anton's single weight | ✅ keep | Still needed — Anton is the standardized display face, so this guard stays. |

---

## C. Color — "two co-equal accents" (re-examined)

| # | Finding | Status | Resolution |
|---|---|---|---|
| C1 | The doc called `--warm`/`--cool` redundant décor. On inspection that's **wrong.** | ✅ **no change — was a misread** | Every `--warm`/`--cool` usage is bound to `is-lead`/`is-ref` or `data-rel="itself"/"orbit"` (lines ~552–671). They **encode the itself/orbit relationship** — core brand data, same status as the thermal ramp — not arbitrary page accents. The zone color-story (line ~250) already runs "one hue leads per mode, others support," satisfying Rule 5. Flattening this would gut an intentional system, so it stays. The only standing guidance: don't introduce a *new* décor-only accent that competes with the lead hue. |

---

## D. Texture — multiple heroes stacked

| # | Finding | Status | Resolution |
|---|---|---|---|
| D1 | `halftone-screen` + canvas thermal + grain can paint the same screen | ◑ **kept as a rule, not a rip** | There is **no dead duplicate to delete** — each texture is wired to a real surface. Removing one needs per-surface visual judgment, not a code edit. Enforced as standing art-direction: **1 hero + 1 support per surface** (mapping in `02-TYPE-COLOR-TEXTURE.md`), grain the only shared support. Do this as a deliberate per-surface pass when desired. |
| D2 | Mouse trails + bubbles + orbit rings as simultaneous ambient texture | ◑ same | One ambient layer per editorial screen; none on utility. Art-direction discipline, applied per surface. |

---

## E. Motion — reduced-motion handled many times over

| # | Redundancy | Status | Resolution |
|---|---|---|---|
| E1 | ~15 separate `@media (prefers-reduced-motion:reduce)` blocks (the doc undercounted at 9) | ✅ **done** | Added **one global switch** (`*,*::before,*::after` → near-zero animation/transition duration). Removed the **7 pure `animation:none` blocks** it makes redundant. **8 targeted exceptions remain on purpose** — each sets a specific resting frame the switch can't (halftone `opacity:.28`, fog `clip-path`/`filter` reset, lead-object `box-shadow` glow, `wf-plane`/`guf-w` rests, `heat-spark` `display:none`). JS canvas keeps its own `REDUCED` constant. Net: 15 → 9, Rule 11 now guaranteed by default. Verified: normal motion still runs; no console errors. |

---

## F. Marks repeated as inline logos

| # | Redundancy | Evidence | Action |
|---|---|---|---|
| F1 | `O+ONE` and `C+TANNER` lockups rendered many times inline across manifesto/zone copy | lines ~2391–2466 | In running copy these are **typeset wordmarks**, fine. But ensure **one logo per surface** (Rule 2): the header/panel mark is the logo; inline mentions are text, not additional logos. Don't let a screen show the header lockup *and* a second standalone lockup. |

---

## Suggested order of execution
1. **A1–A4 + B**: collapse type to 3 roles and one font path (biggest clutter + payload win).
2. **A5**: resolve Anton vs Benzol (decision, then one-line swap).
3. **C1**: one lead accent per page.
4. **E1**: single reduced-motion switch.
5. **D1–D2**: enforce the texture budget per surface.
6. **F1**: audit each surface for a single logo.

Each is independently shippable; none requires a build step — edit `oone.html`, refresh.
