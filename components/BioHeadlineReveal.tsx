"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";

/**
 * Line-reveal for the "Ariana is a product designer..." bio headline.
 * Splits to lines only (not chars): this paragraph's "intuitive" / "inclusive"
 * / "quietly delightful" spans carry a colored text-decoration underline,
 * and char-splitting wraps each letter in its own inline-block — per the CSS
 * spec, text-decoration doesn't paint through atomic inline-block descendants,
 * so the underlines would silently disappear. Splitting to lines only leaves
 * those spans untouched. Starts at the same INTRO_REVEAL_DELAY as the other
 * intro reveals.
 */
export default function BioHeadlineReveal() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!paragraphRef.current) return;

      const split = SplitText.create(paragraphRef.current, {
        type: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.lines, {
            y: 40,
            duration: 0.6,
            ease: "circ.out",
            stagger: 0.1,
            delay: INTRO_REVEAL_DELAY,
          });
        },
      });

      return () => split.revert();
    },
    { scope: paragraphRef }
  );

  return (
    <p
      ref={paragraphRef}
      className="text-[28px] md:text-[30px]"
      data-cursor="text-medium"
      style={{
        fontFamily: "var(--font-primary)",
        fontWeight: "var(--weight-bold)",
        color: "#000",
        lineHeight: "normal",
        margin: 0,
      }}
    >
      Ariana is a product designer with a passion for crafting playful
      experiences that feel{" "}
      <span className="block md:hidden" aria-hidden="true" />
      <span
        style={{
          textDecoration: "underline",
          textDecorationColor: "#7bc100",
          textDecorationThickness: "12%",
          textDecorationSkipInk: "none",
        }}
      >
        intuitive
      </span>
      ,{" "}
      <span className="block md:hidden" aria-hidden="true" />
      <span
        style={{
          textDecoration: "underline",
          textDecorationColor: "#93f200",
          textDecorationThickness: "12%",
          textDecorationSkipInk: "none",
        }}
      >
        inclusive
      </span>
      ,&nbsp;
      <span className="block md:hidden" aria-hidden="true" />
      and{" "}
      <span
        style={{
          textDecoration: "underline",
          textDecorationColor: "red",
          textDecorationThickness: "12%",
          textDecorationSkipInk: "none",
        }}
      >
        quietly delightful
      </span>
      .
    </p>
  );
}
