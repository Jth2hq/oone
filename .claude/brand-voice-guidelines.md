# oone — Brand Voice Guidelines

**Generated:** 2026-05-02
**Sources:** discovery report (`docs/design-refresh-2026/03-DISCOVERY.md`) consolidating local docs (01-BRAND-VOICE, 00-DIRECTION, 02-TOKENS, CLAUDE.md, oone.html), Drive (`web_dev_llm_template` tab 2, `OONE website content`, `Portfolio.pdf`), and FILM/mood references.

This is the canonical brand-voice guide for `oone` — Josh Harrison's single-author portfolio. When generating any copy, asset, or component for this brand, apply this document first.

---

## 1. One-line identity

A field notebook caught in condensation — a Brooklyn architect's portfolio, organized as a living log of *ideas / artifacts / sensations*, with seasonal weather as its theme system.

**Tagline:** *in itself, in orbit.*

---

## 2. Voice attributes

| We are | We are not |
|---|---|
| **Spare** — one good word over three | Terse to the point of cold |
| **Sensory** — edges, thresholds, light, weight, breath | Florid, romantic, or lifestyle-y |
| **Lowercase-confident** — quiet authority | Falsely humble or self-effacing |
| **Architectural** — composition, scale, attention | Trade jargon-y (no "ideation," "stakeholder," "synergies") |
| **Receptive** — observation before assertion | Passive, hedging, or apologetic |
| **Night-first** — dark ground, scarce light | Bright, perky, ad-y |

---

## 3. Tone by surface

| Surface | Tone | Exemplar |
|---|---|---|
| About / bio | Plain-spoken, slightly intimate | *"I care about edges, thresholds, and the moment a room becomes a feeling."* |
| Project descriptions | Declarative, factual, sense-led | *"A wellness room cut into the foundation. Stone, water, low light."* |
| Service descriptions | Catalog cadence — noun phrases, no verbs | *"Schematic design, massing studies, space planning."* |
| Log prompts | One open question | *"what did you notice?"* |
| Tooltips / tutorial | Whispered, deferential | *"Before we begin."* |
| Buttons / CTAs | Lowercase verb, single word where possible | *log · expand · collapse cv · send* |
| Errors / empty states | Honest, no apology pile-on | *"nothing logged yet."* / *"that doesn't read as an email."* |
| Meta / labels | TRACKED UPPERCASE in mono | IDEAS · ARTIFACTS · SENSATIONS |
| OG / social | Sensory, single sentence | (replace current "spatial work" with "edges and thresholds") |

---

## 4. Vocabulary

**Use freely:** attention, threshold, edge, surface, weight, scale, room, light, breath, time, place, material, palette, condition, presence, gesture, drift, season, observe, notice, arrange, hold, return.

**Avoid:** synergy, leverage, holistic, journey (as metaphor), passion, unlock, empower, curated (overused), cutting-edge, world-class, bespoke (overused), seamless, immersive, ecosystem, solutions.

**Brand-specific (load-bearing — never rename):**
- **ideas / artifacts / sensations** — the three log categories. Lowercase always.
- **itself / orbit** — the two relationship modes. Lowercase.
- **log** — the verb and the panel. Never "journal," "notes," "entries."
- **scheme + variation** — the theming system. The five schemes have proper names: **FERRO · COBALT · PATINA · SUMMER · STONE**. UPPERCASE in body copy, never quoted.
- **field** — the canvas (thermal heatmap). Not "background."
- **drawer** — the bottom-rising panel. Not "modal" or "sheet."
- **bubble** — the navigation orbs. Not "button" or "node."

---

## 5. Sentence patterns

- **Sensory triplet** — three nouns or short phrases in series, no filler.
  > *"edges, thresholds, and the moment a room becomes a feeling."*
- **Em-dash aside** — widens a thought.
  > *"My work moves between scales — development strategy down to mosaic detailing — but the question is always the same."*
- **One open question per surface.** Never two in a row.
  > *"what did you notice?"* / *"how does this shape attention?"*
- **Catalog cadence** — noun phrases comma-separated, no verbs.
  > *"Schematic design, massing studies, space planning."*
- **No exclamations. No emoji. No ellipses for drama.**

---

## 6. Capitalization & punctuation

- UI buttons & CTAs: **lowercase** (`log`, `expand`, `send`, `see full cv`)
- Section labels (eyebrows, nav, panel headers): **TRACKED UPPERCASE** in mono
- Body copy: **sentence case** (italic Cormorant Garamond for headlines)
- Scheme names: **UPPERCASE** in body, no quotes (FERRO, COBALT)
- Em-dashes: spaced ` — ` (not `—` flush)
- Oxford comma: yes
- Periods on UI button labels: never
- Periods in tooltip body: yes

---

## 7. Visual identity (summary — full spec in `docs/design-refresh-2026/`)

### Color (5 seasonal schemes, night-first)

| Scheme | Name | `--bg` | `--ink` | `--acc` |
|---|---|---|---|---|
| `s-fal` | FERRO | `#1A0C06` | `#FAF0E8` | `#E4441C` |
| `s-win` | COBALT | `#090B1C` | `#E8F0FF` | `#3A66FC` |
| `s-spr` | PATINA | `#081412` | `#E8F8F2` | `#20C694` |
| `s-sum` | SUMMER | `#180E04` | `#FFF6E8` | `#FF6634` |
| `s-stn` | STONE | `#14120F` | `#EEE6D6` | `#C6A880` |

Each scheme also ships its own `--film-warm` / `--film-cool` so iridescence shifts per theme.

### Typography

| Role | Font | Treatment |
|---|---|---|
| Display + editorial body | Cormorant Garamond, italic | wet-serif shimmer on display only |
| Labels / nav / meta | Space Mono | UPPERCASE, drifting letter-spacing |
| Structural / CV data | IBM Plex Mono | neutral |

### Logo
Two overlapping italic Cormorant "o" — one solid, one reversed/outlined/scaled-down. Currently CSS-rendered. SVG export pending.

### Material language
Three canonical surface states:
- **SOAP** — navigation bubbles, primary CTAs, logo (photoreal pre-rendered iridescent film)
- **GLASS** — panels, drawers, tooltips (frosted backdrop-blur + Fresnel rim)
- **FILM** — body text, gallery dither, thermal field (flat — never glossy)

---

## 8. Voice for the new wet-glass material

When writing copy *about* the bubbles or the new material, stay in voice:

- ✅ *"the bubble holds the field behind it."*
- ✅ *"surface tension. iridescence. one second of weather."*
- ❌ *"Experience our innovative new liquid-glass interface!"*
- ❌ *"Stunning soap-bubble animations bring your portfolio to life."*

---

## 9. Before / after

| Surface | Before | After |
|---|---|---|
| Service description | *"We offer cutting-edge architectural solutions tailored to your unique vision."* | *"Schematic design, massing studies, space planning."* |
| Empty state | *"You haven't added any entries yet! Click the + button to get started."* | *"nothing logged yet."* |
| Tutorial step | *"Welcome! Let's take a quick tour of the amazing features."* | *"Before we begin. Choose a palette."* |
| Project tagline | *"A truly immersive luxury spa experience that pushes boundaries."* | *"A wellness room cut into the foundation. Stone, water, low light."* |
| Form error | *"Oops! Email address is invalid. Please try again."* | *"that doesn't read as an email."* |
| Log prompt | *"Add a new journal entry to capture your thoughts."* | *"what did you notice?"* |

---

## 10. Open content gaps (per discovery)

These remain to be written before launch. Use this guide when drafting:

- About copy (headline, sub, three body paragraphs, footer note)
- Services list (5 noun-phrase items, catalog cadence)
- 5 project descriptions (`spa, bigsky, troub, ranch, twins`)
- OG description rewrite (replace "spatial work" → "edges and thresholds")
- Contact form labels + error messages
- Log password
- Domain + canonical URL

---

## 11. Acceptance check (use before publishing any new copy)

- [ ] Lowercase where required (UI/CTAs); UPPERCASE where required (labels)?
- [ ] No banned vocabulary (synergy, holistic, immersive, etc.)?
- [ ] Sensory or factual — never decorative?
- [ ] If a question, exactly one and open?
- [ ] If a list, catalog cadence (noun phrases, no verbs)?
- [ ] No exclamations / emoji / dramatic ellipses?
- [ ] Em-dashes spaced ` — `?
- [ ] Brand-specific terms used exactly (ideas/artifacts/sensations, FERRO, etc.)?

---

## See also
- `docs/design-refresh-2026/00-DIRECTION.md` — design direction
- `docs/design-refresh-2026/01-BRAND-VOICE.md` — voice spec (source for this doc)
- `docs/design-refresh-2026/02-TOKENS.css` — production token set
- `docs/design-refresh-2026/02-TOKENS.md` — token annotation
- `docs/design-refresh-2026/03-DISCOVERY.md` — discovery report
- `CLAUDE.md` — repo root instruction file
- `schemes/` — 4 scheme pilots (OONE, Light room, Wine bar, Queer space)
