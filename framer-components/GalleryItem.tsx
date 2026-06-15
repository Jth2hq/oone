import React from "react";
import "./oone-global.css";

export type GalleryColorMode = "multi" | "mono" | "duo";

export type GalleryItemProps = {
  imageSrc: string;
  label: string;
  projectOpen?: boolean;
  onClick?: () => void;
};

/** Masonry gallery cell (`.gal-item`). Parent `.gal-grid` should set `gal-mode-*`. */
export default function GalleryItem({
  imageSrc,
  label,
  projectOpen,
  onClick,
}: GalleryItemProps) {
  const openClass = projectOpen ? " proj-open" : "";
  return (
    <div
      className={`gal-item${openClass}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <img src={imageSrc} alt="" />
      <div className="gal-label">{label}</div>
    </div>
  );
}
