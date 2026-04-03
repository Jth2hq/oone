import React from "react";
import "./oone-global.css";

export type ThemePickerButtonProps = {
  label: string;
  accentColor?: string;
  onClick?: () => void;
};

/** Top-right theme chip (`#tp-dot` + label). */
export default function ThemePickerButton({
  label,
  accentColor = "#C8944A",
  onClick,
}: ThemePickerButtonProps) {
  return (
    <button type="button" className="tp-btn" onClick={onClick}>
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: accentColor,
          flexShrink: 0,
        }}
      />
      <span>{label}</span>
    </button>
  );
}
