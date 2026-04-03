# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file static portfolio website for Josh Harrison, an architect based in Brooklyn. The entire application lives in `oone.html` — no build tools, no dependencies, no frameworks. Open the file in a browser to run it.

## Development Workflow

- **Run:** Open `oone.html` directly in a browser
- **Edit:** Modify `oone.html` directly; refresh browser to see changes
- No build step, no package manager, no linting or test infrastructure

## Architecture

The file is structured as one self-contained HTML document with embedded CSS and JavaScript, organized into logical sections:

### Data Layer
- `ARCH`: Runtime state — user entries loaded from/saved to `localStorage` (key: `oone_v27`)
- `PROJECTS`: Hard-coded portfolio items (5 projects: `spa`, `bigsky`, `troub`, `ranch`, `twins`)
- `GAL_IMGS`: Gallery images as base64 data URIs
- `SCHEMES` / `SVARS` / `RAMPS` / `SCHEME_CATS`: Theme definitions, CSS variable mappings, color ramps for thermal visualization
- State variables: `currentScheme`, `currentVariation`, `currentView`, `currentPage`, `activeLayers`, `activeRels`

### Theming
- 5 color schemes (FALL, WINTER, SPRING, SUMMER, STONE), 3 variations each
- CSS variables: `--bg`, `--ink`, `--ink2`, `--acc`, `--bar-bg`
- `applyScheme()` applies and persists theme to localStorage

### Canvas & Visualization
- `drawField()`: Main canvas render — thermal heatmap background, mouse trails, grain overlay
- `buildThermal()`: Heatmap of entry density/age using `RAMPS` color interpolation
- `drawBubble()` / `drawBubbles()`: Animated navigation bubbles (ABOUT, SERVICES, LOG)
- `tick()`: `requestAnimationFrame` loop driving all animation (time `T`, trail decay, particles)
- `entryPos()`: Positions entries either on a timeline or geographic map (`geoProject()`)

### Navigation & Views
- `setMainView()`: Switches between log (canvas) and gallery views
- `navTo()` / `openDrawer()`: Routes to about/services/log panel content
- `openProject()`, `openAbout()`, `openServices()`, `openLog()`: Panel renderers
- `toggleTimeSpace()`: Switches between temporal and spatial canvas layout

### Gallery
- `buildImageView()` / `fillImageGrid()`: Gallery with dithered images (`buildDither()`)
- Filtered by category: architecture, interiors, urban design, print+digital, photography

### Entry Data Schema
```js
{
  cat: 'ideas' | 'artifacts' | 'sensations',
  rel: 'itself' | 'orbit',
  title: string,
  sub: string,
  place: string,
  lat?: number,
  lng?: number,
  t: number,         // timestamp ms
  id?: string        // project reference
}
```
