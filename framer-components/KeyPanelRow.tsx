import React from "react";
import "./oone-global.css";

export type KeyPanelRowProps = {
  label: string;
  active?: boolean;
  dim?: boolean;
  onClick?: () => void;
  dotColor?: string;
  variant?: "dot" | "circle";
  circleFilled?: boolean;
};

/** Single row in the bottom-left key (`.pk-row`). */
export default function KeyPanelRow({
  label,
  active,
  dim,
  onClick,
  dotColor = "rgba(255,255,255,.45)",
  variant = "dot",
  circleFilled,
}: KeyPanelRowProps) {
  const cls = [
    "pk-row",
    active ? "on" : "",
    dim ? "dim" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>
      {variant === "dot" ? (
        <div className="pk-dot" style={{ background: dotColor }} />
      ) : (
        <div
          className="pk-circ"
          style={
            circleFilled
              ? {
                  background: "rgba(255,255,255,.45)",
                  borderColor: "rgba(255,255,255,.45)",
                }
              : undefined
          }
        />
      )}
      <span className="pk-lbl">{label}</span>
    </div>
  );
}
