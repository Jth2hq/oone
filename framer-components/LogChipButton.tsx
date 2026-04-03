import React from "react";
import "./oone-global.css";

export type LogChipButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Lowercase chip (`.lcbt` / `.feed-src-btn` / `.arena-src-btn`). */
export default function LogChipButton({
  children,
  active,
  onClick,
  className = "lcbt",
}: LogChipButtonProps) {
  return (
    <button
      type="button"
      className={`${className}${active ? " on" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
