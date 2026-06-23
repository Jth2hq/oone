# Orbit of One — Brand Guide Outline

**System:** ONE (hero / editorial brand) containing TANNER (design practice).
**Core idea (do not lose):** home, orientation, threshold, layered private/public space, controlled entropy.
**Tone to preserve:** editorial, queer, architectural.

---

## The 15 brand rules (the standard)

1. **Hold the core idea.** Every surface must read as home / orientation / threshold — layered private→public space with controlled entropy.
2. **One mark per surface.** Never combine marks unless co-branding is deliberate (ONE × TANNER lockup).
3. **Three logo tiers only:** primary lockup, secondary lockup, tiny icon.
4. **Simplify before you shrink.** At small sizes drop the rings/wordmark — don't just scale the full lockup down.
5. **One lead accent per page.** The second accent is support only.
6. **One hero texture + one support texture, max, per screen.**
7. **Quiet backgrounds.** Reserve color for focal moments, labels, and active states.
8. **Four type roles, three families:** display, utility (sans), body (serif), and one editorial-decorative. Utility + body come from a single serif/sans superfamily; display and the decorative are their own families. Total: **4 fonts / 3 families.** Data uses the utility sans (tabular figures) — no separate mono.
9. **One decorative moment per screen.** Gratia is the *sanctioned* decorative face — reserved for the manifesto voice and editorial pull-quotes, never body or UI, max once per screen.
10. **Purposeful motion only:** drift, breath, trace, reveal, orbit.
11. **Every animated state needs a still / reduced-motion equivalent.**
12. **Structure first.** Rigid, legible layout; atmosphere sits on top of structure, never replaces it.
13. **Standardize** spacing, alignment, and component sizing.
14. **Utility screens are simpler than editorial screens.**
15. **No duplicate jobs.** If two elements do the same work, remove one.

---

## Guide structure (sections this system documents)

1. **Foundations** — core idea, voice, the ONE/TANNER relationship, naming.
2. **Logo system** — three tiers, clear space, sizing, simplification ladder, misuse. → `01-LOGO-USAGE.md`
3. **Type system** — three roles (display/utility/body) and the mapping from today's 7 families. → `02-TYPE-COLOR-TEXTURE.md`
4. **Color system** — base + one lead accent + one support accent; the thermal ramp as a *data* tool, not décor.
5. **Texture system** — the texture budget (1 hero + 1 support) and which texture owns which surface.
6. **Motion system** — the five verbs (drift, breath, trace, reveal, orbit) + one global reduced-motion switch.
7. **Layout & spacing** — the structural grid, spacing scale, component sizing.
8. **Editorial vs. utility** — how the same system dials up or down by screen type.
9. **Governance / cleanup** — redundancies removed and rules for adding new pieces. → `03-CLEANUP-REDUNDANCIES.md`

---

## What to simplify (summary — detail in `03-CLEANUP-REDUNDANCIES.md`)

- **Type:** 7+ live families (`--ff-head, body, ui, serif, redaction, redaction-it, liquida, mono`) → **3 roles**. `body` and `ui` are already the *same* face (`early-sans`).
- **Font loading:** 3 sources (Typekit + Google Anton + base64-embedded `oone-gothic`) → **1 path**.
- **Display face conflict:** memory/intent says **Benzol**; the live site ships **Anton**. Pick one.
- **Color:** `--warm` + `--cool` run as two co-equal accents → **one lead + one support**.
- **Texture:** halftone, canvas thermal heatmap, dither, grain, fractal-noise crinkle, mouse trails all coexist → **1 hero + 1 support per screen**.
- **Motion:** 9 separate `prefers-reduced-motion` blocks → **one global switch**.

---

## How the four deliverables fit together

| File | Answers |
|---|---|
| `00-BRAND-GUIDE-OUTLINE.md` (this) | What the system is and what it documents |
| `01-LOGO-USAGE.md` | The three logo tiers and how to use the mark |
| `02-TYPE-COLOR-TEXTURE.md` | The collapsed type, color, and texture systems |
| `03-CLEANUP-REDUNDANCIES.md` | Exact duplicates in `oone.html` to remove |
