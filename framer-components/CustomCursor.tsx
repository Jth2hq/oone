import React, { useEffect, useState } from "react";
import "./oone-global.css";

export type CustomCursorProps = {
  dotColor?: string;
  ringColor?: string;
  enabled?: boolean;
};

/** Fine-pointer custom cursor (`#cur` + SVG). */
export default function CustomCursor({
  dotColor = "#C8944A",
  ringColor = "rgba(240,232,216,.30)",
  enabled = true,
}: CustomCursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("mousemove", move);
    };
  }, [enabled]);

  if (!enabled || !fine) return null;

  return (
    <div
      id="cur"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <circle
          cx="7"
          cy="7"
          r="5.5"
          fill="none"
          stroke={ringColor}
          strokeWidth=".5"
        />
        <circle cx="7" cy="7" r="1.1" fill={dotColor} />
      </svg>
    </div>
  );
}
