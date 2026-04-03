import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import type { ServiceItem } from "./types";
import "./oone-global.css";

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name: "Architecture",
    description:
      "Schematic design, massing studies, space planning, and design development for residential and hospitality projects.",
    rate: "Pricing available on request",
    example: "e.g. Stargazer Compound · Troubadour Club",
  },
  {
    name: "Interiors",
    description:
      "Full-scope interior design from concept through construction documentation. Material palettes, custom millwork, finish integration.",
    rate: "Pricing available on request",
    example: "e.g. Cellar Spa · Covert Ranch",
  },
  {
    name: "Urban Design",
    description:
      "Development strategy, entitlement support, consultant coordination, and owner's representation at the district scale.",
    rate: "Pricing available on request",
    example: "e.g. Bedrock Detroit · Housing Dual Neighbors",
  },
  {
    name: "Print + Digital Media",
    description:
      "Design identity, spatial storytelling, creative direction, and visual communication across print and digital formats.",
    rate: "Pricing available on request",
  },
  {
    name: "Photography",
    description:
      "Architectural, spatial, and documentary photography. Film and digital.",
    rate: "Pricing available on request",
  },
];

export type ServicesContentProps = {
  services?: ServiceItem[];
  mailto?: string;
};

/** Services grid + contact form (from `openServices`). */
export default function ServicesContent({
  services = DEFAULT_SERVICES,
  mailto = "harrisonjt95@gmail.com",
}: ServicesContentProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendLabel, setSendLabel] = useState("send");

  const submit = () => {
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();
    if (!n || !e || !m) {
      setSendLabel("fill all fields");
      setTimeout(() => setSendLabel("send"), 1500);
      return;
    }
    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(
      `Inquiry from ${n}`
    )}&body=${encodeURIComponent(`${m}\n\n— ${n}\n${e}`)}`;
  };

  return (
    <>
      <div className="svc-grid">
        {services.map((s) => (
          <ServiceCard key={s.name} service={s} />
        ))}
      </div>
      <div className="contact">
        <div className="contact-title">Get in touch</div>
        <input
          className="dw-input"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="dw-input"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="dw-textarea"
          placeholder="tell me about your project"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" className="dw-send" onClick={submit}>
          {sendLabel}
        </button>
      </div>
    </>
  );
}
