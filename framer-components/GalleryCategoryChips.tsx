import React from "react";
import LogChipButton from "./LogChipButton";
import "./oone-global.css";

const DEFAULT_CATS = [
  "architecture",
  "interiors",
  "urban design",
  "print + digital",
  "photography",
];

export type GalleryCategoryChipsProps = {
  categories?: string[];
  active?: Record<string, boolean>;
  onToggle?: (cat: string, nextOn: boolean) => void;
  chipClass?: "lcbt" | "feed-src-btn" | "arena-src-btn";
};

/** `.gal-filters` row of chips. */
export default function GalleryCategoryChips({
  categories = DEFAULT_CATS,
  active = {},
  onToggle,
  chipClass = "lcbt",
}: GalleryCategoryChipsProps) {
  return (
    <div className="gal-filters">
      {categories.map((c) => {
        const on = active[c] !== false;
        return (
          <LogChipButton
            key={c}
            className={chipClass}
            active={on}
            onClick={() => onToggle?.(c, !on)}
          >
            {c}
          </LogChipButton>
        );
      })}
    </div>
  );
}
