import React from "react";
import "./oone-global.css";

export type LogTabId = "entries" | "gallery" | "feed";

export type LogTabBarProps = {
  active: LogTabId;
  onChange: (tab: LogTabId) => void;
};

export default function LogTabBar({ active, onChange }: LogTabBarProps) {
  const tabs: { id: LogTabId; label: string }[] = [
    { id: "entries", label: "entries" },
    { id: "gallery", label: "gallery" },
    { id: "feed", label: "feed" },
  ];
  return (
    <div className="log-tabs">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`log-tab${active === t.id ? " on" : ""}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
