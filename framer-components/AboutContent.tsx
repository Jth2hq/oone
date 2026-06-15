import React, { useState } from "react";
import OoWord from "./OoWord";
import CvRoleBlock from "./CvRoleBlock";
import DwFactList from "./DwFactList";
import StatBlock from "./StatBlock";
import type { CvRole, DwFact } from "./types";
import "./oone-global.css";

export type AboutContentProps = {
  name?: string;
  bioParagraphs?: string[];
  experience?: CvRole[];
  education?: CvRole[];
  tools?: string[];
  brandParagraphs?: string[];
  facts?: DwFact[];
  stats?: { value: string; label: string }[];
  accentColor?: string;
};

/** About drawer body (`.about-wrap`). */
export default function AboutContent({
  name = "Josh Harrison",
  bioParagraphs = [
    "<strong>Designer at Wesley Moon Inc.</strong> Based in Brooklyn. I care about edges, thresholds, and the moment a room becomes a feeling.",
    "My work moves between scales — development strategy down to mosaic detailing — but the question is always the same: how does this shape attention?",
  ],
  experience = [
    {
      title: "Designer",
      date: "2024–present",
      org: "Wesley Moon Inc. · New York, NY",
      desc: "100% DD for ski compound interiors, cellar floor spa, Upper East Side. Custom millwork and mosaic detailing.",
    },
    {
      title: "Designer",
      date: "2022–2024",
      org: "Hart Howerton · New York, NY",
      desc: "High-end residential and hospitality as Design Architect and AOR.",
    },
    {
      title: "Architecture Coordinator",
      date: "2017–2020",
      org: "Bedrock · Detroit, MI",
    },
    {
      title: "Fellowship",
      date: "2017–2019",
      org: "Venture for America",
    },
  ],
  education = [
    {
      title: "Master of Architecture",
      date: "2020–2022",
      org: "University of Virginia",
    },
    {
      title: "B.S. Architecture + B.A. American Studies",
      date: "2013–2017",
      org: "University of Virginia",
    },
  ],
  tools = [
    "AutoCAD",
    "Rhino",
    "Revit",
    "SketchUp",
    "Adobe CS",
    "Bluebeam",
    "VRay",
    "Grasshopper",
  ],
  brandParagraphs = [
    "<em>In itself, in orbit.</em>",
    "<em>Itself</em> is work I'm putting into the world — built, proposed, projected. A solid dot marks it.",
    "<em>Orbit</em> is work that inspires — books half-read, rooms half-remembered, songs that keep coming back. A target ring marks them.",
  ],
  facts = [
    { label: "current", value: "Wesley Moon Inc." },
    { label: "previous", value: "Hart Howerton · Bedrock" },
    { label: "education", value: "M.Arch, UVA" },
    { label: "based", value: "Brooklyn, NY" },
    { label: "email", value: "harrisonjt95@gmail.com" },
  ],
  stats = [
    { value: "05", label: "built works 2017–present" },
    { value: "04", label: "cities of practice" },
  ],
  accentColor,
}: AboutContentProps) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <div className="about-wrap">
      <div>
        <div className="about-name">{name}</div>
        {bioParagraphs.map((html, i) => (
          <p
            key={i}
            className="about-bio"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
        <button
          type="button"
          className="cv-toggle"
          onClick={() => setCvOpen((o) => !o)}
        >
          {cvOpen ? "collapse cv" : "see full cv"}
        </button>
        <div className={`cv-panel${cvOpen ? " open" : ""}`}>
          <div style={{ paddingTop: 14 }}>
            <div className="cv-sec-title">experience</div>
            {experience.map((r, i) => (
              <CvRoleBlock key={i} role={r} />
            ))}
            <div className="cv-sec-title">education</div>
            {education.map((r, i) => (
              <CvRoleBlock key={i} role={r} />
            ))}
            <div className="cv-sec-title">tools</div>
            <div className="skills">
              {tools.map((t) => (
                <span key={t} className="skill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr className="dw-divider" />
        <div>
          <div className="brand-lbl">about this site</div>
          <div className="brand-name">
            <OoWord
              suffix="ne"
              fontSize="inherit"
              color="inherit"
            />
          </div>
          {brandParagraphs.map((html, i) => (
            <p
              key={i}
              className="brand-p"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      </div>
      <div>
        {stats.map((s, i) => (
          <StatBlock
            key={i}
            value={s.value}
            label={s.label}
            accentColor={accentColor}
          />
        ))}
        <div style={{ marginTop: 16 }}>
          <DwFactList facts={facts} />
        </div>
      </div>
    </div>
  );
}
