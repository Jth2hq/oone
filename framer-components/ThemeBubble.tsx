import React from "react";
import "./oone-global.css";

export type ThemeBubbleProps = {
  rgb: [number, number, number];
  selected?: boolean;
  onClick?: () => void;
};

/** Scheme swatch (`.tc-bub`). */
export default function ThemeBubble({
  rgb,
  selected,
  onClick,
}: ThemeBubbleProps) {
  return (
    <button
      type="button"
      className={`tc-bub${selected ? " sel" : ""}`}
      style={{ background: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` }}
      onClick={onClick}
      aria-pressed={selected}
    />
  );
}
