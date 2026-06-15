import React from "react";
import "./oone-global.css";

export type EntryTooltipProps = {
  visible?: boolean;
  category: string;
  categoryColor?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  style?: React.CSSProperties;
};

/** Canvas hover card (`#tip`). */
export default function EntryTooltip({
  visible,
  category,
  categoryColor,
  title,
  subtitle,
  meta,
  style,
}: EntryTooltipProps) {
  return (
    <div id="tip" className={visible ? "on" : ""} style={style}>
      <div className="t-cat" style={categoryColor ? { color: categoryColor } : undefined}>
        {category}
      </div>
      <div className="t-title">{title}</div>
      {subtitle ? <div className="t-sub">{subtitle}</div> : null}
      {meta ? <div className="t-time">{meta}</div> : null}
    </div>
  );
}
