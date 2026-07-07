"use client";

import { useRef } from "react";
import { gsap, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      let tween: gsap.core.Tween | null = null;

      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 85%",
        once: true,   // only trigger once, like intro reveal
        onEnter: () => {
          tween = gsap.to(textRef.current, {
            duration: 1.5,
            delay: INTRO_REVEAL_DELAY,
            scrambleText: {
              text,
              chars: "upperAndLowerCase",
              revealDelay: 0.2,   // 0 = start revealing immediately
              speed: 0.9,         // lower = slower
              delimiter: "",      // char by char, not word for word
            },
            ease: "none",
          });
        },
      });

      return () => {
        tween?.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { scope: textRef, dependencies: [text] }
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
