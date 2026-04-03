import React from "react";
import OoMark from "./OoMark";
import "./oone-global.css";

export type OoWordProps = {
  suffix?: string;
  fontSize?: number | string;
  color?: string;
  className?: string;
};

/** “oone” wordmark: OoMark + suffix (default `ne`). */
export default function OoWord({
  suffix = "ne",
  fontSize = 20,
  color = "rgba(255,255,255,.30)",
  className = "",
}: OoWordProps) {
  return (
    <span
      className={`oo-word ${className}`.trim()}
      style={{ fontSize, color }}
    >
      <OoMark />
      {suffix}
    </span>
  );
}
