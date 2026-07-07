// components/NavLink.tsx
"use client";

import { AnchorHTMLAttributes } from "react";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

export default function NavLink({ href, label, className = "", style, ...rest }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`shrink-0 transition-opacity hover:opacity-[var(--opacity-hover)] ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "#000",
        textTransform: "uppercase",
        letterSpacing: "1.2px",
        lineHeight: "16.8px",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      {label}
    </a>
  );
}