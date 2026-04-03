import React from "react";
import type { LogCategory } from "./types";
import "./oone-global.css";

export type RecentEntryRowProps = {
  category: LogCategory;
  categoryColor?: string;
  title: string;
  subtitle?: string;
  timeLabel: string;
  thumbnailSrc?: string;
  onClick?: () => void;
};

/** Row with optional thumb (`.re` + `.re-thumb`). */
export default function RecentEntryRow({
  category,
  categoryColor = "rgb(192,38,26)",
  title,
  subtitle,
  timeLabel,
  thumbnailSrc,
  onClick,
}: RecentEntryRowProps) {
  return (
    <div
      className="re"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {thumbnailSrc ? (
        <div className="re-thumb">
          <img src={thumbnailSrc} alt="" />
        </div>
      ) : null}
      <div className="re-body">
        <div className="re-meta">
          <span className="re-c" style={{ color: categoryColor }}>
            {category}
          </span>
          <span className="re-a">{timeLabel}</span>
        </div>
        <div className="re-t">
          {title}
          {subtitle ? ` — ${subtitle}` : ""}
        </div>
      </div>
    </div>
  );
}
