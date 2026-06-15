import React, { useRef, useEffect, useState } from "react";
import NavLink from "./NavLink";
import "./oone-global.css";

export type NavDropdownItem = { label: string; onSelect: () => void };

export type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  triggerActive?: boolean;
};

/** “View” dropdown (`.nav-drop`). */
export default function NavDropdown({
  label,
  items,
  triggerActive,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div
      ref={root}
      className={`nav-drop${open ? " open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <NavLink
        active={triggerActive}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </NavLink>
      <div className="nav-drop-menu" role="menu">
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            className="nav-drop-item"
            role="menuitem"
            onClick={() => {
              it.onSelect();
              setOpen(false);
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
