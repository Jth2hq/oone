import React from "react";
import GalleryItem from "./GalleryItem";
import type { GalleryColorMode } from "./GalleryItem";
import "./oone-global.css";

export type GalleryGridItem = {
  id: string;
  imageSrc: string;
  label: string;
  projectOpen?: boolean;
};

export type GalleryGridProps = {
  items: GalleryGridItem[];
  colorMode?: GalleryColorMode;
  onItemClick?: (item: GalleryGridItem) => void;
};

export default function GalleryGrid({
  items,
  colorMode = "multi",
  onItemClick,
}: GalleryGridProps) {
  return (
    <div className={`gal-grid gal-mode-${colorMode}`}>
      {items.map((it) => (
        <GalleryItem
          key={it.id}
          imageSrc={it.imageSrc}
          label={it.label}
          projectOpen={it.projectOpen}
          onClick={() => onItemClick?.(it)}
        />
      ))}
    </div>
  );
}
