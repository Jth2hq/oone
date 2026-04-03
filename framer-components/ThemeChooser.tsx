import React from "react";
import ThemeBubble from "./ThemeBubble";
import { SCHEMES } from "./data/schemes";
import type { Scheme } from "./data/schemes";
import "./oone-global.css";

export type ThemeChooserProps = {
  open?: boolean;
  selectedSchemeId?: string;
  selectedVariationIndex?: number;
  onClose?: () => void;
  onSelect?: (scheme: Scheme, variationIndex: number) => void;
};

/** Modal palette grid (`#theme-chooser`). */
export default function ThemeChooser({
  open,
  selectedSchemeId = "s-fal",
  selectedVariationIndex = 1,
  onClose,
  onSelect,
}: ThemeChooserProps) {
  return (
    <div
      id="theme-chooser"
      className={open ? "on" : ""}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      role="presentation"
    >
      <div className="tc-panel">
        <button type="button" className="tc-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="tc-grid">
          {SCHEMES.map((sch) => (
            <div key={sch.id} className="tc-row">
              {sch.vars.map((v, vi) => {
                const sel =
                  sch.id === selectedSchemeId && vi === selectedVariationIndex;
                return (
                  <ThemeBubble
                    key={v.v}
                    rgb={v.acc}
                    selected={sel}
                    onClick={() => onSelect?.(sch, vi)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
