"use client";

import { useRef } from "react";
import { gsap, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";

/**
 * Scramble-reveal for the bio detail line. Starts at INTRO_REVEAL_DELAY so
 * it lands in sync with HeroTitleReveal's "ariana cao." reveal.
 */
export default function ScrambleBioText({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!textRef.current) return;

      const tween = gsap.to(textRef.current, {
        duration: 1,
        delay: INTRO_REVEAL_DELAY,
        scrambleText: {
          text,
          chars: "upperAndLowerCase",
          revealDelay: 0.7,
          speed: 0.4,
        },
      });

      return () => tween.kill();
    },
    { scope: textRef }
  );

  return (
    <p
      ref={textRef}
      data-cursor="text-regular"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-md)",
        color: "rgba(0,0,0,0.7)",
        lineHeight: "normal",
        margin: 0,
        fontStyle: "normal",
      }}
    >
      {text}
    </p>
  );
}
