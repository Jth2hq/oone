import React from "react";
import type { CvRole } from "./types";
import "./oone-global.css";

export type CvRoleBlockProps = { role: CvRole };

export default function CvRoleBlock({ role }: CvRoleBlockProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span className="cv-role-title">{role.title}</span>
      <span className="cv-role-date">{role.date}</span>
      <div className="cv-role-org">{role.org}</div>
      {role.desc ? <div className="cv-role-desc">{role.desc}</div> : null}
    </div>
  );
}
