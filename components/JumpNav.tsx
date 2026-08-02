"use client";

import NavLink from "./NavLink";

export type JumpLink = {
    href: string;
    label: string;
};

interface JumpNavProps {
    links: JumpLink[];
}

export default function JumpNav({ links }: JumpNavProps) {
    return (
        <nav
          className="sticky z-50 bg-white w-full flex justify-center"
          style={{ 
            top: 0, paddingTop: 16, paddingBottom: 16,
            background: "rgba(255, 255, 255, 0.8)", 
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="flex items-center overflow-x-auto w-full"
            style={{ maxWidth: 922, gap: 32, paddingInline: 16 }}
          >
            {links.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} />
            ))}
          </div>
        </nav>
    );
}