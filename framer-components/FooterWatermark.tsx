import React from "react";
import OoWord from "./OoWord";
import "./oone-global.css";

/** Fixed bottom-right subtle mark. */
export default function FooterWatermark() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 20,
        zIndex: 150,
        pointerEvents: "none",
      }}
    >
      <OoWord fontSize={14} color="rgba(255,255,255,.10)" />
    </div>
  );
}
