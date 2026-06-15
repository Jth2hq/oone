import React from "react";
import "./oone-global.css";

export type TimeSpaceToggleProps = {
  /** When true, toggle shows “on” (time layout); false = space layout — matches oone.html. */
  timeMode?: boolean;
  onToggle?: () => void;
};

/** Time ↔ space row with pill (`.pk-toggle`). Class `on` = time mode. */
export default function TimeSpaceToggle({
  timeMode = true,
  onToggle,
}: TimeSpaceToggleProps) {
  return (
    <div className="pk-row" style={{ marginTop: 6, gap: 8 }}>
      <span className="pk-lbl" style={{ fontSize: "var(--fs-xs)", opacity: 0.5 }}>
        time
      </span>
      <div
        className={`pk-toggle${timeMode ? " on" : ""}`}
        onClick={onToggle}
        role="switch"
        aria-checked={timeMode}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle?.()}
      />
      <span className="pk-lbl" style={{ fontSize: "var(--fs-xs)", opacity: 0.5 }}>
        space
      </span>
    </div>
  );
}
