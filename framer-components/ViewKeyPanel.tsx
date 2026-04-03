import React from "react";
import KeyPanelRow from "./KeyPanelRow";
import TimeSpaceToggle from "./TimeSpaceToggle";
import "./oone-global.css";

export type MainView = "log" | "gallery" | "feed";

export type ViewKeyPanelProps = {
  mainView?: MainView;
  onMainView?: (v: MainView) => void;
  practiceOn?: boolean;
  playOn?: boolean;
  onTogglePractice?: () => void;
  onTogglePlay?: () => void;
  timeMode?: boolean;
  onToggleTimeSpace?: () => void;
};

/** Bottom-left “view / show” panel (`#panel-key`). */
export default function ViewKeyPanel({
  mainView = "log",
  onMainView,
  practiceOn = true,
  playOn = true,
  onTogglePractice,
  onTogglePlay,
  timeMode = true,
  onToggleTimeSpace,
}: ViewKeyPanelProps) {
  return (
    <div id="panel-key">
      <div className="pk-head">view</div>
      <KeyPanelRow
        label="log"
        active={mainView === "log"}
        dotColor="rgba(255,255,255,.50)"
        onClick={() => onMainView?.("log")}
      />
      <KeyPanelRow
        label="gallery"
        active={mainView === "gallery"}
        dotColor="rgba(255,255,255,.30)"
        onClick={() => onMainView?.("gallery")}
      />
      <KeyPanelRow
        label="feed"
        active={mainView === "feed"}
        dotColor="rgba(255,255,255,.20)"
        onClick={() => onMainView?.("feed")}
      />
      <div className="pk-head" style={{ marginTop: 8 }}>
        show
      </div>
      <KeyPanelRow
        label="practice"
        variant="circle"
        active={practiceOn}
        circleFilled={practiceOn}
        onClick={onTogglePractice}
      />
      <KeyPanelRow
        label="play"
        variant="circle"
        active={playOn}
        circleFilled={playOn}
        onClick={onTogglePlay}
      />
      <TimeSpaceToggle timeMode={timeMode} onToggle={onToggleTimeSpace} />
    </div>
  );
}
