import React from "react";
import KeyPanelRow from "./KeyPanelRow";
import "./oone-global.css";

export type FilterRow = {
  id: string;
  label: string;
  active?: boolean;
  dim?: boolean;
  rgb?: [number, number, number];
  onClick?: () => void;
};

export type FilterPanelProps = {
  title?: string;
  rows: FilterRow[];
};

/** Bottom-right filter stack (`#panel-filter`). */
export default function FilterPanel({ title = "log", rows }: FilterPanelProps) {
  return (
    <div id="panel-filter">
      <div className="pk-head">{title}</div>
      <div id="pf-rows">
        {rows.map((r) => (
          <KeyPanelRow
            key={r.id}
            label={r.label}
            active={r.active}
            dim={r.dim}
            variant="circle"
            onClick={r.onClick}
            circleFilled={r.active}
          />
        ))}
      </div>
    </div>
  );
}
