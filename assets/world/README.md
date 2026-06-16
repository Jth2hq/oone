# World — the still-life stage

The World zone is **one full-bleed still-life photograph** of the things,
places and people in Josh's life. It dyes into the panel edges (reads as
wallpaper, concentrated in the center), pans horizontally, and is graded into
the zone's reds (tracks day/night via the live `--zglow` / `--zdeep` tokens).

Every object **on the table** is a clickable hotspot: by default everything is
"draped" in the red wrap; hover/focus haloes an object, brightens it to its
true look (lifts the wrap), and names it in one word; click unwraps it and
opens its destination.

## The file
- **`scene.jpg`** — the still life. Replace it to change the scene.
- Wider photos give more horizontal pan. Generic, *unbranded* objects are the
  goal (a Sonos-ish speaker body, a plain photo-album book — a *category*, not
  a specific product).

## Wiring the objects  (the part that still needs Josh's input)
Hotspots live in **`WORLD_HOTSPOTS`** in `oone.html` (search that name). Each
entry is:

```js
{ nx:.55, ny:.17, r:.06, label:'sound', href:'https://…', note:'a playlist' }
```

- `nx,ny` — object center as a fraction of the photo (0–1).
- `r` — radius as a fraction of the photo WIDTH.
- `label` — the one word shown on hover.
- `href` — where a click goes (`'#'` = not wired yet).

The current coordinates are **eyeballed placeholders** on this scene. To finish:
1. confirm/replace `scene.jpg`, then
2. give the object list — for each: the one-word label + its destination
   (e.g. speaker → a playlist that can also play in-site; book → a photo album).

`reference.png` was the original look target. The old per-object icon "pouch"
grid is retired (its SVG symbols + `renderWorldGrid()` remain unused in
`oone.html`).
