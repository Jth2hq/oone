import React, { useState } from "react";
import LogTabBar from "./LogTabBar";
import type { LogTabId } from "./LogTabBar";
import LogEntriesPanel from "./LogEntriesPanel";
import GalleryCategoryChips from "./GalleryCategoryChips";
import GalleryGrid from "./GalleryGrid";
import FeedCardGrid from "./FeedCardGrid";
import ArenaCard from "./ArenaCard";
import type { LogEntry, FeedBlock } from "./types";
import type { GalleryGridItem } from "./GalleryGrid";
import "./oone-global.css";

export type LogDrawerTabsProps = {
  initialTab?: LogTabId;
  entries?: LogEntry[];
  onAddEntry?: (
    e: Omit<LogEntry, "t"> & { t?: number }
  ) => void;
  galleryItems?: GalleryGridItem[];
  galleryColorMode?: "multi" | "mono" | "duo";
  feedBlocks?: FeedBlock[];
  arenaImages?: { src: string; caption?: string }[];
  onGalleryItemClick?: (item: GalleryGridItem) => void;
};

/** Full log drawer: tabs + three panels (from `makeLogTabs`). */
export default function LogDrawerTabs({
  initialTab = "entries",
  entries = [],
  onAddEntry,
  galleryItems = [],
  galleryColorMode = "multi",
  feedBlocks = [],
  arenaImages = [],
  onGalleryItemClick,
}: LogDrawerTabsProps) {
  const [tab, setTab] = useState<LogTabId>(initialTab);

  return (
    <>
      <LogTabBar active={tab} onChange={setTab} />
      <div className={`log-panel${tab === "entries" ? " on" : ""}`}>
        <LogEntriesPanel entries={entries} onAddEntry={onAddEntry} />
      </div>
      <div className={`log-panel${tab === "gallery" ? " on" : ""}`}>
        <GalleryCategoryChips />
        <GalleryGrid
          items={galleryItems}
          colorMode={galleryColorMode}
          onItemClick={onGalleryItemClick}
        />
      </div>
      <div className={`log-panel${tab === "feed" ? " on" : ""}`}>
        <GalleryCategoryChips chipClass="lcbt" />
        <div className="arena-grid-wrap cosmos-feed">
          {arenaImages.length > 0 ? (
            <div className="arena-grid">
              {arenaImages.map((a, i) => (
                <ArenaCard key={i} imageSrc={a.src} caption={a.caption} />
              ))}
            </div>
          ) : (
            <FeedCardGrid blocks={feedBlocks} />
          )}
        </div>
      </div>
    </>
  );
}
