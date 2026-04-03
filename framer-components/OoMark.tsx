import React from "react";
import "./oone-global.css";

export type OoMarkProps = {
  className?: string;
  style?: React.CSSProperties;
};

/** Stylized “OO” ligature from oone.html (`.oo-mark`). */
export default function OoMark({ className = "", style }: OoMarkProps) {
  return (
    <span className={`oo-mark ${className}`.trim()} style={style}>
      <span className="o1">O</span>
      <span className="o2">O</span>
    </span>
  );
}
