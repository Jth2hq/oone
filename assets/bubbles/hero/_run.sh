#!/usr/bin/env bash
# _run.sh — generate 8 hero soap-bubble PNGs, rename to scheme slots
set -e
cd "$(dirname "$0")"
SCRIPT="/Users/jth2hq/.claude/skills/banana/scripts/generate.py"
OUTDIR="$HOME/Documents/nanobanana_generated"
export GOOGLE_AI_API_KEY="$(python3 -c "import json;print(json.load(open('/Users/jth2hq/.claude/settings.json'))['mcpServers']['nanobanana-mcp']['env']['GOOGLE_AI_API_KEY'])")"

BASE='Macro photograph of a single soap bubble, centered, filling 80 percent of frame, on pure black background. Thin-film iridescence in delicate Newton rings. Sharp Fresnel rim brighter at glancing angle. One dominant caustic specular highlight, soft-edged white. Faint secondary caustic on opposing rim. Faint ground-light patch implied beneath. Hollow interior with only the skin visible, transparent through the center. Captured with Canon EOS R5, 100mm macro lens at f/8, single softbox key. In the style of Kym Cox and Fabian Oefner soap-film macro photography. Quiet, filmic, archival, not CGI, not rainbow oil-slick. Editorial reference: Wallpaper magazine material study.'

declare -a V=(
 "about-idle|Pink-cream dominant hemisphere fading to soft cyan, single caustic upper-left, calm steady film."
 "about-hover|Iridescence blooming pink-to-violet, caustic sweeping right of center, surface tension shimmering."
 "services-idle|Cyan-dominant hemisphere with lemon pinch near rim, single caustic upper-left."
 "services-hover|Violet bloom across the dome, dominant caustic at top center, second caustic lower-right."
 "log-idle|Amber-cream dominant film, small tight caustic upper-left, warm and quiet."
 "log-hover|Full Newton-ring spectrum bloom, double caustic upper-left and lower-right."
 "theme-idle|Monochrome stone variant, subtle grey-silver film iridescence only, near-neutral, single soft caustic."
 "hero-beauty|Marquee render, slightly larger bubble, dramatic side-light, full pink-cyan-lemon film, dominant upper-left caustic with long specular tail."
)

for entry in "${V[@]}"; do
  name="${entry%%|*}"; mod="${entry##*|}"
  echo ""
  echo "════ $name ════"
  before=$(ls -t "$OUTDIR"/banana_*.png 2>/dev/null | head -1 || echo "")
  python3 "$SCRIPT" --prompt "$BASE Variant: $mod" --aspect-ratio 1:1 --resolution 1K --model gemini-2.5-flash-image 2>&1 | tail -3
  sleep 8   # respect 5-15 RPM free-tier limit
  # find newest file produced
  after=$(ls -t "$OUTDIR"/banana_*.png 2>/dev/null | head -1)
  if [ -n "$after" ] && [ "$after" != "$before" ]; then
    cp "$after" "./${name}.png"
    echo "  → ${name}.png"
  else
    echo "  ✗ no new file"
  fi
done

echo ""
echo "── done. files in $(pwd):"
ls -la *.png 2>/dev/null
