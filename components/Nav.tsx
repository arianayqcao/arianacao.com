"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/works", label: "work" },
  { href: "/about", label: "about" },
  { href: "/play", label: "play" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm font-medium text-slate-900">
        <Link href="/works" className="inline-flex items-center gap-3 text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 text-[10px]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c-1 1.5-2 3-2 4.5s1 2.5 2 3c1-0.5 2-1.5 2-3S13 4.5 12 3z" />
              <path d="M12 7v8" />
              <path d="M8 18c1.5-1 3-1 4 0s2.5 1 4 0" />
            </svg>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 uppercase tracking-[0.25em] text-slate-700">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${isActive ? "underline underline-offset-8 decoration-slate-900 decoration-2 text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-6 text-[0.86rem] uppercase tracking-[0.2em] text-slate-700">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
            linkedin
          </a>
          <a href="/resume.pdf" className="hover:text-slate-900">
            resume
          </a>
        </div>
      </div>
    </header>
  );
}
