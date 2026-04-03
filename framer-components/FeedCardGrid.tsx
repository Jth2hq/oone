import React from "react";
import FeedCard from "./FeedCard";
import type { FeedBlock } from "./types";
import "./oone-global.css";

export type FeedCardGridProps = {
  blocks: FeedBlock[];
  emptyMessage?: string;
};

export default function FeedCardGrid({
  blocks,
  emptyMessage = "no blocks found",
}: FeedCardGridProps) {
  if (!blocks.length) {
    return <div className="feed-empty">{emptyMessage}</div>;
  }
  return (
    <div className="feed-grid">
      {blocks.map((b, i) => (
        <FeedCard key={i} block={b} />
      ))}
    </div>
  );
}
