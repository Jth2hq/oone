import React from "react";
import OoWord from "./OoWord";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import ThemePickerButton from "./ThemePickerButton";
import "./oone-global.css";

export type TopNavProps = {
  visible?: boolean;
  currentPage?: "about" | "services" | "log" | "gallery" | "feed" | "";
  themeLabel?: string;
  themeAccent?: string;
  onHome?: () => void;
  onAbout?: () => void;
  onServices?: () => void;
  onViewLog?: () => void;
  onViewGallery?: () => void;
  onViewFeed?: () => void;
  onTheme?: () => void;
};

/** Fixed top bar (`#nav`). */
export default function TopNav({
  visible = true,
  currentPage = "",
  themeLabel = "F.2",
  themeAccent = "#C8944A",
  onHome,
  onAbout,
  onServices,
  onViewLog,
  onViewGallery,
  onViewFeed,
  onTheme,
}: TopNavProps) {
  const viewActive =
    currentPage === "log" ||
    currentPage === "gallery" ||
    currentPage === "feed";

  return (
    <div id="nav" className={visible ? "vis" : ""}>
      <div className="nav-left">
        <span className="nav-brand" onClick={onHome} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onHome?.()}>
          <OoWord fontSize={20} color="rgba(255,255,255,.30)" />
        </span>
      </div>
      <div className="nav-links">
        <NavLink active={currentPage === "about"} onClick={onAbout}>
          About
        </NavLink>
        <NavLink active={currentPage === "services"} onClick={onServices}>
          Services
        </NavLink>
        <NavDropdown
          label="View"
          triggerActive={viewActive}
          items={[
            { label: "Log", onSelect: () => onViewLog?.() },
            { label: "Gallery", onSelect: () => onViewGallery?.() },
            { label: "Feed", onSelect: () => onViewFeed?.() },
          ]}
        />
      </div>
      <div className="nav-right">
        <ThemePickerButton
          label={themeLabel}
          accentColor={themeAccent}
          onClick={onTheme}
        />
      </div>
    </div>
  );
}
