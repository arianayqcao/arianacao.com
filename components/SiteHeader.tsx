"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenuOverlay from "@/components/MobileMenuOverlay";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      // nav fades out smoothly (scrubbed to scroll position) as the page
      // scrolls up over it, instead of staying pinned on top of content
      const trigger = ScrollTrigger.create({
        start: 0,
        end: "+=200",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(headerRef.current, {
            opacity: 1 - self.progress,
            pointerEvents: self.progress > 0.9 ? "none" : "auto",
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
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
      <nav
        className="flex items-center justify-between"
        style={{ padding: 16 }}
      >
        {/* logo */}
        <Link href="/" className="flex items-center" style={{ paddingRight: 16, paddingBlock: 0 }}>
          <Image src="/apple_logo.svg" alt="Apple Logo" width={16} height={16} />
        </Link>

        {/* centre links */}
        <div className="hidden md:flex flex-1 justify-center" style={{ paddingBlock: 0 }}>
          <div className="flex" style={{ gap: 32 }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "#000",
                  textTransform: "uppercase",
                  padding: "0px 4px",
                  lineHeight: "16px",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* resume */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "#000",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: "16px",
          }}
        >
          Resume
        </a>

        {/* mobile menu */}
        <MobileMenuOverlay />
      </nav>
    </header>
    </>
  );
}
