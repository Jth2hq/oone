import React from "react";
import "./oone-global.css";

/**
 * Stand-in for `#cv` — the original site draws a thermal field, trails, and
 * bubbles in raw canvas. Wire your own `<canvas>` or Framer layer here.
 */
export default function CanvasFieldPlaceholder() {
  return (
    <canvas
      id="cv"
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4,
        pointerEvents: "auto",
        background: "#1C1412",
      }}
      ref={(el) => {
        if (el && !el.width) {
          el.width = typeof window !== "undefined" ? window.innerWidth : 300;
          el.height = typeof window !== "undefined" ? window.innerHeight : 150;
        }
      }}
    />
  );
}
