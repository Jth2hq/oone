import React from "react";
import "./oone-global.css";

export type GalleryViewChromeProps = {
  open?: boolean;
  title?: string;
  onLog?: () => void;
  children?: React.ReactNode;
  colorMode?: "multi" | "mono" | "duo";
};

/** Full-screen gallery shell (`#image-view` + `.iv-head`). */
export default function GalleryViewChrome({
  open,
  title = "gallery",
  onLog,
  children,
  colorMode = "multi",
}: GalleryViewChromeProps) {
  return (
    <div
      id="image-view"
      className={[open ? "on" : "", `gal-mode-${colorMode}`].filter(Boolean).join(" ")}
    >
      <div className="iv-head">
        <span className="iv-title">{title}</span>
        <button type="button" className="iv-log-bub" onClick={onLog}>
          LOG
        </button>
      </div>
      {children}
    </div>
  );
}
