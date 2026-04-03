import React from "react";
import type { FeedBlock } from "./types";
import "./oone-global.css";

export type FeedCardProps = { block: FeedBlock };

export default function FeedCard({ block }: FeedCardProps) {
  const imgUrl = block.image?.display?.url;
  return (
    <div className="feed-card">
      {imgUrl ? (
        <img src={imgUrl} alt={block.title || ""} loading="lazy" />
      ) : null}
      <div className="feed-card-body">
        {block.title &&
        block.title !== block.source?.title &&
        block.title !== "" ? (
          <div className="feed-card-title">{block.title}</div>
        ) : null}
        {block.content_html && block.class === "Text" ? (
          <div
            className="feed-card-text"
            dangerouslySetInnerHTML={{
              __html: block.content_html.substring(0, 200),
            }}
          />
        ) : null}
        {block.source?.url ? (
          <a href={block.source.url} target="_blank" rel="noopener noreferrer">
            {block.source.title || "source"}
          </a>
        ) : null}
        {block._channel ? (
          <div className="feed-card-meta">{block._channel}</div>
        ) : null}
      </div>
    </div>
  );
}
