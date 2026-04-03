import React from "react";
import "./oone-global.css";

export type NavLinkProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function NavLink({
  children,
  active,
  onClick,
  type = "button",
}: NavLinkProps) {
  return (
    <button
      type={type}
      className={`nav-link${active ? " on" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
