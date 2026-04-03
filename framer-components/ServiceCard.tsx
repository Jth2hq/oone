import React from "react";
import type { ServiceItem } from "./types";
import "./oone-global.css";

export type ServiceCardProps = { service: ServiceItem };

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="svc">
      <div className="svc-name">{service.name}</div>
      <div className="svc-desc">{service.description}</div>
      {service.rate ? <div className="svc-rate">{service.rate}</div> : null}
      {service.example ? <div className="svc-ex">{service.example}</div> : null}
    </div>
  );
}
