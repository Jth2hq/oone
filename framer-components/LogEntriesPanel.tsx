import React, { useState } from "react";
import LogChipButton from "./LogChipButton";
import type { LogCategory, LogEntry } from "./types";
import "./oone-global.css";

const CATS: LogCategory[] = ["ideas", "artifacts", "sensations"];

const DEFAULT_COLORS: Record<LogCategory, string> = {
  ideas: "rgb(228, 68, 28)",
  artifacts: "rgb(58, 102, 252)",
  sensations: "rgb(32, 198, 148)",
};

export type LogEntriesPanelProps = {
  entries?: LogEntry[];
  onAddEntry?: (e: Omit<LogEntry, "t"> & { t?: number }) => void;
  catColors?: Partial<Record<LogCategory, string>>;
  onEntryClick?: (entry: LogEntry, index: number) => void;
};

function timeAgo(t: number): string {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

/** Entries tab: category chips, inputs, recent list. */
export default function LogEntriesPanel({
  entries = [],
  onAddEntry,
  catColors = {},
  onEntryClick,
}: LogEntriesPanelProps) {
  const colors = { ...DEFAULT_COLORS, ...catColors };
  const [cat, setCat] = useState<LogCategory>("ideas");
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");

  const sorted = [...entries].sort((a, b) => b.t - a.t).slice(0, 10);

  const add = () => {
    const v = title.trim();
    if (!v) return;
    onAddEntry?.({
      cat,
      rel: "itself",
      title: v,
      sub: sub.trim(),
      place: "",
      t: Date.now(),
    });
    setTitle("");
    setSub("");
  };

  return (
    <div className="log-inner">
      <div className="btn-row">
        {CATS.map((c) => (
          <LogChipButton
            key={c}
            active={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </LogChipButton>
        ))}
      </div>
      <input
        className="log-input"
        placeholder="what did you notice?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="log-sub">
        <input
          className="log-lis"
          placeholder="subtitle / source"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
        />
        <button type="button" className="log-go" onClick={add}>
          log
        </button>
      </div>
      <div className="recent">
        {sorted.map((e, i) => (
          <div
            key={`${e.t}-${i}`}
            className="re"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,.03)",
              cursor: onEntryClick ? "pointer" : "default",
            }}
            onClick={() => onEntryClick?.(e, i)}
            role={onEntryClick ? "button" : undefined}
          >
            <div className="re-body">
              <div className="re-meta">
                <span
                  className="re-c"
                  style={{ color: colors[e.cat] || "rgb(192,38,26)" }}
                >
                  {e.cat}
                </span>
                <span className="re-a">{timeAgo(e.t)}</span>
              </div>
              <div className="re-t">
                {e.title}
                {e.sub ? ` — ${e.sub}` : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
