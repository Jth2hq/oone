import React from "react";
import "./oone-global.css";

export type ArenaCardProps = {
  imageSrc: string;
  caption?: string;
  onClick?: () => void;
};

export default function ArenaCard({
  imageSrc,
  caption,
  onClick,
}: ArenaCardProps) {
  return (
    <div className="arena-card" onClick={onClick} role={onClick ? "button" : undefined}>
      <img src={imageSrc} alt="" loading="lazy" />
      {caption ? <div className="arena-cap">{caption}</div> : null}
    </div>
  );
}
