"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";

/**
 * Character-reveal heading for the work-page hero. Starts at 1.6s so it
 * lands as IntroOverlay (components/IntroOverlay.tsx) finishes fading out,
 * rather than running invisibly underneath it.
 */
export default function HeroTitleReveal({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!headingRef.current) return;

      const split = SplitText.create(headingRef.current, {
        type: "chars",
        mask: "chars",
      });

      gsap.from(split.chars, {
        y: 80,
        duration: 0.6,
        ease: "circ.out",
        stagger: 0.02,
        delay: INTRO_REVEAL_DELAY,
      });

      return () => split.revert();
    },
    { scope: headingRef }
  );

  return (
    <h1
      ref={headingRef}
      className="text-[96px] leading-[64px] md:text-[length:var(--text-4xl)] md:leading-[var(--leading-tight)]"
      style={{
        fontFamily: "var(--font-primary)",
        fontWeight: "var(--weight-black)",
        color: "var(--color-heading)",
        width: "100%",
        textAlign: "center",
      }}
      data-cursor="text-large"
    >
      {text}
    </h1>
  );
}
