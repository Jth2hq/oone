import React from "react";
import type { DwFact } from "./types";
import "./oone-global.css";

export type DwFactListProps = {
  facts: DwFact[];
  className?: string;
};

export default function DwFactList({ facts, className = "dw-facts" }: DwFactListProps) {
  return (
    <div className={className}>
      {facts.map((f) => (
        <div key={f.label} className="dw-fact">
          <span className="dw-fk">{f.label}</span>
          <span className="dw-fv">{f.value}</span>
        </div>
      ))}
    </div>
  );
}
