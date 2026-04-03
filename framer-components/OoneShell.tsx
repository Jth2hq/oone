/**
 * Single Framer Code Component: full OONE chrome (nav, keys, drawer, theme).
 * Paste this file into Framer’s Code workspace together with the rest of
 * `framer-components/` so imports resolve, or copy the whole folder.
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { addPropertyControls, ControlType } from "framer";
import TopNav from "./TopNav";
import ViewKeyPanel from "./ViewKeyPanel";
import FilterPanel from "./FilterPanel";
import DrawerShell from "./DrawerShell";
import AboutContent from "./AboutContent";
import ServicesContent from "./ServicesContent";
import LogDrawerTabs from "./LogDrawerTabs";
import ThemeChooser from "./ThemeChooser";
import GalleryViewChrome from "./GalleryViewChrome";
import GalleryGrid from "./GalleryGrid";
import FeedOverlayTicker from "./FeedOverlayTicker";
import FooterWatermark from "./FooterWatermark";
import CanvasFieldPlaceholder from "./CanvasFieldPlaceholder";
import CustomCursor from "./CustomCursor";
import type { MainView } from "./ViewKeyPanel";
import type { LogEntry } from "./types";
import type { GalleryGridItem } from "./GalleryGrid";
import { SCHEMES, rgb } from "./data/schemes";
import "./oone-global.css";

export type OoneShellProps = {
  contactEmail?: string;
  showFooterWatermark?: boolean;
  showCanvasPlaceholder?: boolean;
  showCustomCursor?: boolean;
  showFilterPanel?: boolean;
  /** One image URL per line for feed ticker when view = feed */
  feedTickerUrls?: string;
  /** JSON array: [{"id":"1","imageSrc":"...","label":"..."}] */
  galleryItemsJson?: string;
};

type DrawerMode = "none" | "about" | "services" | "log";
type NavPage = "about" | "services" | "log" | "gallery" | "feed" | "";

function parseGalleryJson(raw: string): GalleryGridItem[] {
  try {
    const a = JSON.parse(raw || "[]");
    if (!Array.isArray(a)) return [];
    return a
      .filter(
        (x: unknown) =>
          x &&
          typeof x === "object" &&
          "id" in x &&
          "imageSrc" in x &&
          "label" in x
      )
      .map((x: GalleryGridItem) => ({
        id: String(x.id),
        imageSrc: String(x.imageSrc),
        label: String(x.label),
        projectOpen: x.projectOpen,
      }));
  } catch {
    return [];
  }
}

function parseFeedUrls(raw: string): string[] {
  return (raw || "")
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function OoneShell({
  contactEmail = "harrisonjt95@gmail.com",
  showFooterWatermark = true,
  showCanvasPlaceholder = true,
  showCustomCursor = true,
  showFilterPanel = true,
  feedTickerUrls = "",
  galleryItemsJson = "[]",
}: OoneShellProps) {
  const [mainView, setMainView] = useState<MainView>("log");
  const [navPage, setNavPage] = useState<NavPage>("log");
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("none");
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [practiceOn, setPracticeOn] = useState(true);
  const [playOn, setPlayOn] = useState(true);
  const [timeMode, setTimeMode] = useState(true);
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const [schemeId, setSchemeId] = useState(SCHEMES[0].id);
  const [variationV, setVariationV] = useState<"v1" | "v2" | "v3">("v2");

  const scheme = useMemo(
    () => SCHEMES.find((s) => s.id === schemeId) ?? SCHEMES[0],
    [schemeId]
  );
  const currentVar = useMemo(
    () => scheme.vars.find((v) => v.v === variationV) ?? scheme.vars[1],
    [scheme, variationV]
  );

  const themeLabel = useMemo(() => {
    const i = ["v1", "v2", "v3"].indexOf(variationV);
    return `${scheme.num}.${i + 1}`;
  }, [scheme.num, variationV]);

  const themeAccent = rgb(currentVar.acc);

  const galleryItems = useMemo(
    () => parseGalleryJson(galleryItemsJson),
    [galleryItemsJson]
  );
  const feedUrls = useMemo(() => parseFeedUrls(feedTickerUrls), [feedTickerUrls]);

  const openDrawer = useCallback((mode: DrawerMode) => {
    setDrawerMode(mode);
    setDrawerExpanded(false);
    if (mode === "about") setNavPage("about");
    else if (mode === "services") setNavPage("services");
    else if (mode === "log") setNavPage("log");
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerMode("none");
    setDrawerExpanded(false);
    setNavPage(mainView === "gallery" ? "gallery" : mainView === "feed" ? "feed" : "log");
  }, [mainView]);

  const toggleExpand = useCallback(() => {
    if (drawerExpanded) {
      closeDrawer();
      return;
    }
    setDrawerExpanded(true);
  }, [drawerExpanded, closeDrawer]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", drawerMode !== "none");
    return () => document.body.classList.remove("drawer-open");
  }, [drawerMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (themeOpen) setThemeOpen(false);
        else if (drawerMode !== "none") closeDrawer();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [themeOpen, drawerMode, closeDrawer]);

  const filterRows = useMemo(() => {
    if (mainView === "gallery") {
      const cats = [
        "architecture",
        "interiors",
        "urban design",
        "print + digital",
        "photography",
      ];
      return cats.map((c) => ({
        id: c,
        label: c,
        active: true,
        onClick: () => {},
      }));
    }
    if (mainView === "feed") {
      const cats = [
        "architecture",
        "interiors",
        "urban design",
        "print + digital",
        "photography",
      ];
      return cats.map((c) => ({
        id: c,
        label: c,
        active: true,
        onClick: () => {},
      }));
    }
    return (["ideas", "artifacts", "sensations"] as const).map((c) => ({
      id: c,
      label: c,
      active: true,
      onClick: () => {},
    }));
  }, [mainView]);

  const filterTitle =
    mainView === "gallery" || mainView === "feed" ? "category" : "type";

  const rootStyle = useMemo(
    () =>
      ({
        "--bg": currentVar.bg,
        "--acc": themeAccent,
        "--ink": "#F9F0E8",
        "--ink2": "rgba(249,240,232,.35)",
        "--bar-bg": "rgba(7,6,5,.97)",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        background: "var(--bg)",
        color: "var(--ink)",
        overflow: "hidden",
      }) as React.CSSProperties,
    [currentVar.bg, themeAccent]
  );

  const onAddEntry = useCallback(
    (e: Omit<LogEntry, "t"> & { t?: number }) => {
      setEntries((prev) => [
        ...prev,
        { ...e, t: e.t ?? Date.now() } as LogEntry,
      ]);
    },
    []
  );

  const drawerLabel =
    drawerMode === "about"
      ? "about"
      : drawerMode === "services"
        ? "services"
        : drawerMode === "log"
          ? "log"
          : "";

  return (
    <div className="oone-framer-shell" style={rootStyle}>
      {showCanvasPlaceholder ? <CanvasFieldPlaceholder /> : null}
      {showCustomCursor ? (
        <CustomCursor dotColor={themeAccent} enabled />
      ) : null}

      <TopNav
        currentPage={navPage}
        themeLabel={themeLabel}
        themeAccent={themeAccent}
        onHome={() => {
          closeDrawer();
          setMainView("log");
          setNavPage("log");
        }}
        onAbout={() => openDrawer("about")}
        onServices={() => openDrawer("services")}
        onViewLog={() => {
          closeDrawer();
          setMainView("log");
          setNavPage("log");
        }}
        onViewGallery={() => {
          closeDrawer();
          setMainView("gallery");
          setNavPage("gallery");
        }}
        onViewFeed={() => {
          closeDrawer();
          setMainView("feed");
          setNavPage("feed");
        }}
        onTheme={() => setThemeOpen(true)}
      />

      <ViewKeyPanel
        mainView={mainView}
        onMainView={(v) => {
          setMainView(v);
          setNavPage(v);
          if (drawerMode !== "none") closeDrawer();
        }}
        practiceOn={practiceOn}
        playOn={playOn}
        onTogglePractice={() => setPracticeOn((x) => !x)}
        onTogglePlay={() => setPlayOn((x) => !x)}
        timeMode={timeMode}
        onToggleTimeSpace={() => setTimeMode((t) => !t)}
      />

      {showFilterPanel ? (
        <FilterPanel title={filterTitle} rows={filterRows} />
      ) : null}

      <GalleryViewChrome
        open={mainView === "gallery"}
        colorMode="multi"
        onLog={() => {
          setMainView("log");
          setNavPage("log");
        }}
      >
        <div style={{ paddingTop: 56 }}>
          <GalleryGrid items={galleryItems} colorMode="multi" />
        </div>
      </GalleryViewChrome>

      <FeedOverlayTicker
        open={mainView === "feed" && feedUrls.length > 0}
        imageUrls={feedUrls}
      />

      <DrawerShell
        open={drawerMode !== "none"}
        expanded={drawerExpanded}
        categoryLabel={drawerLabel}
        expandLabel={drawerExpanded ? "return" : "expand"}
        onExpand={toggleExpand}
        onClose={closeDrawer}
      >
        {drawerMode === "about" ? (
          <AboutContent accentColor={themeAccent} />
        ) : null}
        {drawerMode === "services" ? (
          <ServicesContent mailto={contactEmail} />
        ) : null}
        {drawerMode === "log" ? (
          <LogDrawerTabs
            entries={entries}
            onAddEntry={onAddEntry}
            galleryItems={galleryItems}
            galleryColorMode="multi"
          />
        ) : null}
      </DrawerShell>

      <ThemeChooser
        open={themeOpen}
        selectedSchemeId={schemeId}
        selectedVariationIndex={["v1", "v2", "v3"].indexOf(variationV)}
        onClose={() => setThemeOpen(false)}
        onSelect={(sch, vi) => {
          setSchemeId(sch.id);
          const v = sch.vars[vi]?.v;
          if (v === "v1" || v === "v2" || v === "v3") setVariationV(v);
        }}
      />

      {showFooterWatermark ? <FooterWatermark /> : null}
    </div>
  );
}

addPropertyControls(OoneShell, {
  contactEmail: {
    type: ControlType.String,
    title: "Contact email",
    defaultValue: "harrisonjt95@gmail.com",
    displayTextArea: false,
  },
  showFooterWatermark: {
    type: ControlType.Boolean,
    title: "Footer mark",
    defaultValue: true,
  },
  showCanvasPlaceholder: {
    type: ControlType.Boolean,
    title: "Canvas layer",
    defaultValue: true,
  },
  showCustomCursor: {
    type: ControlType.Boolean,
    title: "Custom cursor",
    defaultValue: true,
  },
  showFilterPanel: {
    type: ControlType.Boolean,
    title: "Filter panel",
    defaultValue: true,
  },
  feedTickerUrls: {
    type: ControlType.String,
    title: "Feed URLs",
    defaultValue: "",
    placeholder: "One image URL per line…",
    displayTextArea: true,
  },
  galleryItemsJson: {
    type: ControlType.String,
    title: "Gallery JSON",
    defaultValue: "[]",
    placeholder: '[{"id":"1","imageSrc":"…","label":"…"}]',
    displayTextArea: true,
  },
});
