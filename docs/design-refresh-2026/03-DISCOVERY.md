# oone — Brand Discovery Report

**Date:** 2026-05-02
**Run by:** discover-brand agent
**Platforms:** Google Drive (deep), local filesystem
**Skipped:** Gmail (connector disabled), Slack/Notion/Confluence/Figma/Gong/Granola/Box/SharePoint (not connected)

---

## Summary

- **Drive search queries executed:** 18 (title + fullText anchors across all specified terms)
- **Total sources found:** 12 distinct documents/assets across Drive and local repo
- **Sources analyzed in depth:** 8 (full content read)
- **Key brand elements discovered:** voice attributes, palette system (5 schemes), typography (3-font stack), logo mark logic, UI/UX direction, project language, content schema
- **Single-platform caveat:** All findings are Drive + local filesystem only.

---

## 1. Search Log

| Query | Hits | Top file IDs / titles |
|---|---|---|
| `title contains 'oone'` | 1 | `1di5ohGSY3IC6BZ4ez5RkkXN8jenyEwuDNKn28f0oHN4` — "OONE website content" |
| `title contains 'brand' / 'style guide' / 'voice' / 'tone'` | 0 | — |
| `title contains 'josh harrison' / 'wesley moon' / 'harrisonjt95'` | 0 | — |
| `title contains 'template' / 'framer' / 'launch' / 'deck'` | 1 | `1jValob5H4QWRN3s1_1loxWSH5507s4Kx5OnVe2_WVz8` — "web_dev_llm_template" |
| `title contains 'portfolio' / 'case study' / 'project description'` | 4 | Portfolio.pdf, NY Housing Studio, Harvard Square, Woodward Streetscape, May Co Staging |
| `title contains 'vol' / 'color' / 'scheme' / 'web_dev'` | 2 | web_dev_llm_template, color pop.JPG |
| `fullText contains 'oone'` | 4 | OONE website content, web_dev_llm_template, Portfolio.pdf, Woodward Streetscape.pdf |
| `title contains 'messaging' / 'playbook' / 'proposal'` | 0 | — |
| `title contains 'logo' / 'wordmark' / 'palette' / 'typography' / 'font'` | 0 | — |
| `title contains 'cv' / 'resume' / 'bio' / 'about'` | 0 | — |
| `mimeType = image/png` or `image/jpeg` | 20+ | FILM folder, color pop.JPG, corridor.JPG, frame.JPG, land and sea.JPG, 12 unlabeled IMG_3xxx screenshots |
| Recent files | top result | web_dev_llm_template (modified 2026-05-01) |

---

## 2. Brand Documents Found

| Title | Path | Type | Relevance | Summary |
|---|---|---|---|---|
| **01-BRAND-VOICE.md** | local `docs/design-refresh-2026/` | Markdown spec | **HIGH** | Canonical voice guide: attributes, tone-by-context, vocab, sentence patterns, capitalization, before/after examples |
| **00-DIRECTION.md** | local `docs/design-refresh-2026/` | Markdown brief | **HIGH** | 2026 design direction: SOAP/GLASS/FILM material language, type hierarchy, seasonal color, motion, bubble spec, viz refresh |
| **02-TOKENS.css** | local `docs/design-refresh-2026/` | CSS | **HIGH** | Drop-in `:root` block: OKLCH ladder, fonts, spacing, motion, glass surfaces, per-scheme overrides |
| **02-TOKENS.md** | local `docs/design-refresh-2026/` | Markdown | **HIGH** | Token annotation: 3-layer architecture (PRIMITIVE / SEMANTIC / COMPONENT), preserved JS-facing variables |
| **CLAUDE.md** | local repo root | Markdown | **HIGH** | Project source-of-truth: data schema (`ideas/artifacts/sensations`, `itself/orbit`), 5 projects, theming |
| **oone.html** | local repo root | HTML/CSS/JS | **HIGH** | Live site — OG tags, animation classes, font imports, scheme colors, logo CSS, drawer/bubble/nav language |
| **web_dev_llm_template** | Drive `1jValob5H4QWRN3s1_1loxWSH5507s4Kx5OnVe2_WVz8` | Google Doc 110 MB | **HIGH** (tab 2) | Tab 2 defines 4 UX/UI scheme directions: OONE, Light room, Wine bar, Queer space |
| **OONE website content** | Drive `1di5ohGSY3IC6BZ4ez5RkkXN8jenyEwuDNKn28f0oHN4` | Google Doc 7 KB | **MED** | 18-section content intake template — structural schema, all content fields empty. Tagline: "in itself, in orbit" |
| **Portfolio.pdf** | Drive `1NAm1VpZ2AnOlQsDb76uDjaUjdBwCsqgv` | PDF 13.9 MB | **MED** | 2017–2026 work samples, "interior systems & the heart" subtitle. Cellar spa (Wesley Moon) + Stargazer compound (Big Sky) |
| **FILM/** (17 JPGs) | Drive `1NJW6PNBchXHQudMpX9c-j3o_W8BYC-Z0` | JPEG | **CONTEXT** | Personal photography. Sensory, architectural, film-grain aesthetic |
| **IMG_3xxx mood screenshots** (12 imgs) | Drive root | JPEG/PNG | **CONTEXT** | Harper's Magazine, vintage spa ads, Boot Boyz Biz zine, Jack White, choral LP, German physics diagram, fungi zine, festival poster — all typographically considered, print-culture refs |
| **NY Housing Studio.pdf** | Drive Practice/ | PDF | **STALE** | Academic project; predates oone brand direction |

---

## 3. Brand Elements Extracted

### Voice Attributes

| Attribute | Description | Confidence |
|---|---|---|
| **Spare** | One precise word over three | High |
| **Sensory** | Edges, thresholds, light, weight, breath | High |
| **Lowercase-confident** | Quiet authority; UI lowercase, labels TRACKED UPPERCASE | High |
| **Architectural** | Composition, scale, attention; no agency jargon | High |
| **Receptive** | Observation before assertion; open questions | High |
| **Night-first** | Dark ground, scarce light | High |

**Verbatim phrases:**
1. *"I care about edges, thresholds, and the moment a room becomes a feeling."* — 01-BRAND-VOICE.md
2. *"surface tension. iridescence. one second of weather."* — 01-BRAND-VOICE.md
3. *"nothing logged yet."* — empty-state pattern
4. *"Before we begin. Choose a palette."* — tutorial language
5. *"in itself, in orbit"* — OONE website content (tagline)
6. *"interior systems & the heart"* — Portfolio.pdf subtitle

### Palette (5 schemes, night-first)

| Scheme | Name | `--bg` | `--ink` | `--acc` |
|---|---|---|---|---|
| `s-fal` | FERRO | `#1A0C06` | `#FAF0E8` | `#E4441C` |
| `s-win` | COBALT | `#090B1C` | `#E8F0FF` | `#3A66FC` |
| `s-spr` | PATINA | `#081412` | `#E8F8F2` | `#20C694` |
| `s-sum` | SUMMER | `#180E04` | `#FFF6E8` | `#FF6634` |
| `s-stn` | STONE | `#14120F` | `#EEE6D6` | `#C6A880` |

Plus `--film-warm` / `--film-cool` per scheme (iridescence shifts), `--caustic`, `--fresnel`.

### Typography

| Role | Font | Treatment |
|---|---|---|
| Display / editorial | Cormorant Garamond, italic | wet-serif shimmer on display only |
| Labels / nav / meta | Space Mono | UPPERCASE, `ooneMonoDrift` letter-spacing animation |
| Structural / CV data | IBM Plex Mono | neutral |

### Logo Mark
CSS-only inline in `oone.html`: two overlapping italic Cormorant Garamond "o" — one solid, one reversed/outlined/scaled-down. No standalone asset file.

### UI / UX Direction
Current site implements scheme 1 (OONE: *"infrared, physical meets digital, photorealistic, editorial"*). Schemes 2–4 (Light room, Wine bar, Queer space) are exploratory; pilots scaffolded in `schemes/`.

### Vocabulary (load-bearing — do not rename)
- Categories: `ideas / artifacts / sensations`
- Modes: `itself / orbit`
- UI: `log`, `drawer`, `bubble`, `field`, `scheme`, `variation`
- Nav: ABOUT · SERVICES · LOG · THEME

---

## 4. Conflicts (resolutions adopted)

| # | Conflict | Resolution |
|---|---|---|
| 1 | FERRO bg: live `#1C1412` vs tokens `#1A0C06` | **Adopt tokens value `#1A0C06`** (applied to oone.html) |
| 2 | Drive intake doc lists "Space Grotesk" — not in any other source | **Disregard** — placeholder template artifact |
| 3 | Drive intake doc lists 5–6 nav bubbles vs live 4 | **Live count is canonical** — 4 bubbles (ABOUT, SERVICES, LOG, THEME) |

---

## 5. Open Questions

### High priority (blocks content)
1. **About copy entirely empty** — apply 01-BRAND-VOICE.md sensory triplet + em-dash patterns
2. **Services descriptions empty** — use catalog cadence; pull evidence from Portfolio.pdf
3. **Domain / canonical URL / OG description** — replace `YOUR_PUBLIC_PAGE_URL`; replace "spatial work" with "edges and thresholds"
4. **Log password not set** — `[password]` placeholder

### Medium
5. Contact form placeholder copy not yet checked against voice guide
6. Light room / Wine bar / Queer space schemes — roadmap or archive? (pilots scaffolded; status TBD)
7. **WTTO.pdf** (Drive `1mUfdAH5bx4zVyLeIWgtWT-Dr5YoVV7CU`, 96 MB) — opaque title; **MCP read returned empty (file too large)**. Resolution paths: (a) `gdown 1mUfdAH5bx4zVyLeIWgtWT-Dr5YoVV7CU -O ~/Desktop/WTTO.pdf` then re-probe locally; (b) open in Drive viewer to identify project; (c) split/extract pages via `pdftk` and re-upload a slimmer version

### Low
8. No exportable wordmark/logo SVG — derive from CSS rendering before launch
9. FILM folder photos not tagged against gallery taxonomy (`architecture / interiors / urban design / print+digital / photography`)

---

## 6. Confidence Note

**Single-platform caveat:** Google Drive + local only. Gmail disabled. Slack/Notion/Figma/etc. not connected. Brand decisions made in those venues are invisible to this report.

| Element | Confidence |
|---|---|
| Voice attributes & vocabulary | High |
| Color tokens (5 schemes) | High |
| Typography stack | High |
| Logo mark | Medium (CSS-only, no asset) |
| Services language | Medium |
| About / bio copy | **Low** (no content found anywhere) |
| Project descriptions on site | Medium |
| Contact / email | Low |

**Aggregate: Medium-High** for design system & voice; **Low** for live copy content.

---

## Recommended Next Steps

1. Populate About copy using voice guide patterns
2. Populate Services in catalog cadence (evidence from Portfolio.pdf)
3. Update OG description per voice guide
4. Set domain / canonical URL / log password before launch
5. ✅ Resolve FERRO bg → tokens value (applied)
6. Probe WTTO.pdf manually (scheduled)
7. Export logo SVG from CSS rendering
8. Confirm scheme direction status (Light room / Wine bar / Queer space — keep or archive)
