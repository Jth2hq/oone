import React from "react";
import "./oone-global.css";

export type StatBlockProps = {
  value: string;
  label: string;
  accentColor?: string;
};

export default function StatBlock({ value, label, accentColor }: StatBlockProps) {
  return (
    <>
      <div className="stat-n" style={accentColor ? { color: accentColor } : undefined}>
        {value}
      </div>
      <div className="stat-l">{label}</div>
    </>
  );
}
