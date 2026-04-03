import React from "react";
import "./oone-global.css";

export type FeedOverlayTickerProps = {
  open?: boolean;
  imageUrls: string[];
  durationSec?: number;
  onImageClick?: (url: string, index: number) => void;
};

/** Bottom feed filmstrip (`#feed-overlay` + `.feed-ticker`). */
export default function FeedOverlayTicker({
  open,
  imageUrls,
  durationSec = 80,
  onImageClick,
}: FeedOverlayTickerProps) {
  const doubled = [...imageUrls, ...imageUrls];
  return (
    <div id="feed-overlay" className={open ? "on" : ""}>
      <div className="feed-ticker-wrap">
        <div
          className="feed-ticker"
          style={{
            animation: `feedScroll ${durationSec}s linear infinite`,
          }}
        >
          {doubled.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading="lazy"
              onClick={() => onImageClick?.(src, i % imageUrls.length)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
