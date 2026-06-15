import React from "react";
import "./oone-global.css";

export type EntryDetailProps = {
  title: string;
  subtitle?: string;
  meta: string;
};

/** Simple entry drawer (`openEntryDrawer` body). */
export default function EntryDetail({
  title,
  subtitle,
  meta,
}: EntryDetailProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: "Cormorant, serif",
          fontStyle: "italic",
          fontSize: "var(--fs-xl)",
          color: "rgba(255,255,255,.85)",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: "Cormorant, serif",
            fontSize: "var(--fs-md)",
            color: "rgba(255,255,255,.38)",
            marginBottom: 10,
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "var(--fs-xs)",
          color: "rgba(255,255,255,.20)",
        }}
      >
        {meta}
      </div>
    </div>
  );
}
