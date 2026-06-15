import React, { useState } from "react";
import type { ProjectData } from "./types";
import "./oone-global.css";

export type ProjectLayoutProps = {
  project: ProjectData;
};

/** Project detail layout (`.proj-layout`). */
export default function ProjectLayout({ project }: ProjectLayoutProps) {
  const [extraOpen, setExtraOpen] = useState(false);
  const extras = project.extraImages ?? [];
  const moreCount = extras.length;

  return (
    <div>
      <div className="proj-layout">
        <div className="proj-img-col">
          {project.heroImage ? (
            <img src={project.heroImage} alt={project.title} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,.12)",
                fontFamily: "Space Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
              }}
            >
              NO IMAGE
            </div>
          )}
          {moreCount > 0 ? (
            <button
              type="button"
              className="proj-img-expand"
              onClick={() => setExtraOpen((o) => !o)}
            >
              {extraOpen ? "— collapse" : `+${moreCount} more`}
            </button>
          ) : null}
        </div>
        <div className="proj-info-col">
          <div className="proj-eyebrow">
            {project.eyebrow || ""}
          </div>
          <div className="proj-title">{project.title}</div>
          <div className="proj-tag">{project.tag}</div>
          <div className="proj-desc">{project.desc}</div>
          <div className="proj-facts">
            {project.facts.map(([k, v]) => (
              <div key={k} className="proj-fact">
                <span className="proj-fk">{k}</span>
                <span className="proj-fv">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {moreCount > 0 ? (
        <div className={`proj-extra-imgs${extraOpen ? " open" : ""}`}>
          {extras.map((src, i) => (
            <img key={i} className="proj-extra-img" src={src} alt="" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
