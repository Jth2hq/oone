import React from "react";
import "./oone-global.css";

export type DrawerShellProps = {
  open?: boolean;
  expanded?: boolean;
  categoryLabel?: string;
  expandLabel?: string;
  onExpand?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
};

/** Bottom sheet drawer (`#drawer`). */
export default function DrawerShell({
  open,
  expanded,
  categoryLabel = "",
  expandLabel = "expand",
  onExpand,
  onClose,
  children,
}: DrawerShellProps) {
  return (
    <div
      id="drawer"
      className={[open ? "open" : "", expanded ? "expanded" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dw-head">
        <span className="dw-cat">{categoryLabel}</span>
        <div className="dw-acts">
          <button type="button" className="dw-btn" onClick={onExpand}>
            {expandLabel}
          </button>
          <button type="button" className="dw-btn" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
      <div className="dw-body">{children}</div>
    </div>
  );
}
