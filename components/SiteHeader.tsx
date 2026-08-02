"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenuOverlay from "@/components/MobileMenuOverlay";
import NavLink from "./NavLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_LINK_STYLE = {
  fontSize: "var(--text-sm)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "16px",
  fontWeight: "var(--weight-regular)", // or regular/bold/black
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/play", label: "play" },
  { href: "/about", label: "about" },
];

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!headerRef.current) return;

      // hide the nav while scrolling down, reveal it on any upward scroll
      // (end is a fixed large number, not "max", so the trigger doesn't go
      // stale when SplitText/reveal animations change the document height
      // after mount)
      let hidden = false;
      const trigger = ScrollTrigger.create({
        start: 0,
        end: 99999,
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 0;
          // only (re)start the tween when the hide/show state actually
          // flips — starting it on every scroll tick restarts the ease
          // each time, so it never reaches its target until scrolling stops
          if (hide === hidden) return;
          hidden = hide;
          gsap.to(headerRef.current, {
            yPercent: hide ? -100 : 0,
            opacity: hide ? 0 : 1,
            // pointerEvents: hide ? "none" : "auto",
            duration: 0.35,
            ease: "power2.inOut",
            overwrite: true,
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: headerRef }
  );

  return (
    <>
      {/* spacer so fixed header doesn't overlap page content */}
      <div aria-hidden="true" className="h-[var(--nav-height)]" />
    <header
      ref={headerRef}
      data-cursor="default"
      className="fixed top-0 left-0 right-0 z-[100] w-full bg-white"
    >
      <nav
        className="flex items-center justify-between"
        style={{ padding: "var(--space-4)" }}
      >
        {/* logo */}
        <Link href="/" 
              className="flex items-center" 
              style={{ paddingRight: "var(--space-4)", paddingBlock: 0 }}>
          <Image 
            src="/apple_logo.svg" alt="Apple Logo" width={24} height={24}
            className="hover:scale-110 hover:-rotate-8 transition-all"
          />
        </Link>

        {/* centre links */}
        <div className="hidden md:flex flex-1 justify-center" style={{ paddingBlock: 0 }}>
          <div className="flex" style={{ gap: "var(--space-8)" }}>
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                style={HEADER_LINK_STYLE}
              />
            ))}
          </div>
        </div>

        {/* resume */}
        <NavLink
          href="/resume"
          label="resume"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline"
          style={HEADER_LINK_STYLE}
        />

        {/* mobile menu */}
        <MobileMenuOverlay />
      </nav>
    </header>
    </>
  );
}
