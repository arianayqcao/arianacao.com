"use client";

import { useEffect, useRef, useState } from "react";
import { CustomEase } from "gsap/CustomEase";
import {
  gsap,
  useGSAP,
  OVERLAY_FADE_START,
  OVERLAY_FADE_DURATION,
  STICKERS_SETTLE_END,
  WORDMARK_PHASE_DURATION,
} from "@/lib/gsap";

gsap.registerPlugin(CustomEase);

/* Figma "cubic-bezier(0.5,0,0.5,1)" translated 1:1 to an SVG cubic path
   (CSS cubic-bezier(x1,y1,x2,y2) === "M0,0 C x1,y1 x2,y2 1,1"). */
CustomEase.create("introRotate", "M0,0,C0.5,0,0.5,1,1,1");

/* Damped-oscillator "spring punch" lifted from the Figma Motion export —
   overshoots past ~1.36 around t=0.4 before settling to 1. GSAP accepts a
   plain progress->progress function as an ease directly, no plugin needed. */
const springBounce = (t: number) =>
  1 - Math.exp(-t * 7.1866) * (Math.cos(t * 22.3441) + 0.3216 * Math.sin(t * 22.3441));

const SETTLE_DURATION = 0.8;

/* Figma "cubic-bezier(0.42,0,1,1)" (= CSS ease-in), same conversion as
   introRotate — drives the phase-2 background color ease. */
CustomEase.create("introColorEaseIn", "M0,0,C0.42,0,1,1,1,1");

/* Damped-oscillator "spring punch" lifted from the Figma Motion export —
   drives the "cao" wordmark's slide-in (node 388:1253). */
const wordmarkEaseCao = (t: number) =>
  1 - Math.exp(-t * 7.4674) * (Math.cos(t * 9.9565) + 0.75 * Math.sin(t * 9.9565));

/* Same provenance, drives the "ariana" wordmark's slide-in (node 388:1246). */
const wordmarkEaseAriana = (t: number) =>
  1 - Math.exp(-t * 7.3635) * (Math.cos(t * 12.754) + 0.5774 * Math.sin(t * 12.754));

/* Figma keyframe fractions of the phase-2 2s cycle (388:1245/1246/1253),
   converted to seconds relative to the start of phase 2. */
const WORDMARK_HOLD_END = 0.66378; // 33.189% — cao starts sliding, bg starts easing
const WORDMARK_COLOR_EASE_END = 0.86386; // 43.193% — bg reaches lime; ariana jumps + starts sliding

/* ─── sticker layout ──────────────────────────────────────────────
   Resting insets lifted directly from the Figma "overlay-start"
   component (node 470:1177) — stickers stay at this position the
   entire time; only rotation + scale animate. `start` is each
   sticker's timeline offset in seconds, derived from Figma's keyframe
   times (fractions of a 2s preview loop — the loop itself is just a
   Figma preview artifact and isn't carried over here).
   ──────────────────────────────────────────────────────────────────── */

type Inset = { top: number; right: number; bottom: number; left: number };

const STICKERS: { key: string; src: string; rotateFrom: number; start: number; inset: Inset }[] = [
  {
    key: "cao",
    src: "/svg/cao%20sticker.svg",
    rotateFrom: -10,
    start: 0.186,
    inset: { top: 10.87, right: 69.37, bottom: 52.93, left: 4.89 },
  },
  {
    key: "yu",
    src: "/svg/yu%20sticker.svg",
    rotateFrom: 10,
    start: 0.289,
    inset: { top: 60.67, right: 40.65, bottom: 3.13, left: 33.6 },
  },
  {
    key: "qi",
    src: "/svg/qi%20sticker.svg",
    rotateFrom: -10,
    start: 0.37,
    inset: { top: 4.66, right: 11.95, bottom: 59.14, left: 62.31 },
  },
];

/* ─── wordmark layout ─────────────────────────────────────────────
   Phase 2 (Figma "Overlay/Default", node 388:1245) plays right after the
   stickers settle: background hard-cuts red -> green, eases to lime, and
   these two wordmark images slide into their resting positions. Sizing
   (height/width, see WordmarkLayout below) is viewport-height relative
   so each word reads as "about half the screen tall" regardless of the
   window's aspect ratio; translateX is expressed as xPercent (of the
   element's own box) so the slide distance scales with that same size.
   `ariana`'s xJump is a literal instant cut in the Figma export (not a
   loop artifact) — cao leads the slide, ariana pops in partway through
   and catches up, both settle at the same time.
   ──────────────────────────────────────────────────────────────────── */

/* height/width are vh (viewport-height relative, preserving each SVG's
   intrinsic aspect ratio) so word size tracks "how much of the screen"
   rather than viewport width — left/right stay a % of container width. */
type WordmarkLayout = { top?: number; bottom?: number; height: number; width: number; left?: number; right?: number };

type Wordmark = {
  key: string;
  src: string;
  layout: WordmarkLayout;
  xStart: number;
  xJump?: { at: number; to: number };
  slideStart: number;
  xEnd: number;
  ease: (t: number) => number;
};

const WORDMARKS: Wordmark[] = [
  {
    key: "cao",
    // "cao" has no ascenders, so its viewBox height is already its x-height —
    // no resize needed to match ariana's x-height. `right` (not `left`) is
    // tuned so its settled (xEnd) position lands flush with the screen's
    // right edge, at a 1440x900-ish desktop viewport.
    src: "/svg/cao%20wordmark.svg",
    layout: { bottom: 5, height: 45, width: 167.045, right: 27.16 },
    xStart: -78.0387,
    slideStart: WORDMARK_HOLD_END,
    xEnd: 25.2585,
    ease: wordmarkEaseCao,
  },
  {
    key: "ariana",
    // ariana's viewBox includes the "i" ascender/dot above the x-height
    // band (x-height is the bottom 494.4 of the 679.68-tall viewBox) — the
    // whole box is scaled up so that x-height band alone is 56vh (matching
    // cao's), and `top` is pulled up so the x-height band (not the dot)
    // overflows the screen top by the same "a little bit" as before.
    src: "/svg/ariana%20wordmark.svg",
    layout: { top: -15, height: 67, width: 289.93, left: 19.87 },
    xStart: -9.5107,
    xJump: { at: WORDMARK_COLOR_EASE_END, to: -53.1054 },
    slideStart: WORDMARK_COLOR_EASE_END,
    xEnd: -57.6954,
    ease: wordmarkEaseAriana,
  },
];

export default function IntroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const wordmarkRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const handleDone = () => {
        document.body.style.overflow = "";
        setDone(true);
      };

      const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const introBgPhase2 = cssVar("--color-intro-overlay-bg-2");
      const introBgPhase2End = cssVar("--color-intro-overlay-bg-2-end");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        STICKERS.forEach(({ key }) => {
          gsap.set(stickerRefs.current[key], { rotation: 0, scale: 2, opacity: 0 });
        });
        WORDMARKS.forEach(({ key, xEnd }) => {
          gsap.set(wordmarkRefs.current[key], { xPercent: xEnd, opacity: 1 });
        });
        gsap.set(containerRef.current, { backgroundColor: introBgPhase2End });
        gsap.to(containerRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.25,
          delay: 0.1,
          ease: "power1.in",
          onComplete: handleDone,
        });
        return;
      }

      const tl = gsap.timeline({ onComplete: handleDone });

      STICKERS.forEach(({ key, rotateFrom, start }) => {
        const el = stickerRefs.current[key];
        gsap.set(el, { rotation: rotateFrom, scale: 1, opacity: 1, transformOrigin: "50% 50%" });
        tl.to(el, { rotation: 0, duration: SETTLE_DURATION, ease: "introRotate" }, start);
        tl.to(el, { scale: 2, duration: SETTLE_DURATION, ease: springBounce }, start);
      });

      WORDMARKS.forEach(({ key, xStart }) => {
        gsap.set(wordmarkRefs.current[key], { xPercent: xStart, opacity: 0 });
      });

      // // hard-cut seam: stickers out, wordmarks in, bg red -> green — all instant, same beat
      // tl.set(Object.values(stickerRefs.current), { opacity: 0 }, STICKERS_SETTLE_END);
      // tl.set(Object.values(wordmarkRefs.current), { opacity: 1 }, STICKERS_SETTLE_END);
      // tl.set(containerRef.current, { backgroundColor: introBgPhase2 }, STICKERS_SETTLE_END);

      // tl.to(
      //   containerRef.current,
      //   { backgroundColor: introBgPhase2End, duration: WORDMARK_COLOR_EASE_END - WORDMARK_HOLD_END, ease: "introColorEaseIn" },
      //   STICKERS_SETTLE_END + WORDMARK_HOLD_END
      // );

      WORDMARKS.forEach(({ key, xJump, slideStart, xEnd, ease }) => {
        const el = wordmarkRefs.current[key];
        // if (xJump) {
        //   tl.set(el, { xPercent: xJump.to }, STICKERS_SETTLE_END + xJump.at);
        // }
        // tl.to(
        //   el,
        //   { xPercent: xEnd, duration: WORDMARK_PHASE_DURATION - slideStart, ease },
        //   STICKERS_SETTLE_END + slideStart
        // );
      });

      tl.to(
        containerRef.current,
        { opacity: 0, pointerEvents: "none", duration: OVERLAY_FADE_DURATION, ease: "power1.in" },
        STICKERS_SETTLE_END + WORDMARK_PHASE_DURATION
      );

      tl.to(
        containerRef.current,
        { opacity: 0, pointerEvents: "none", duration: OVERLAY_FADE_DURATION, ease: "power1.in" },
        OVERLAY_FADE_START
      );

    tl.seek(0.1);

    },
    { scope: containerRef }
  );

  if (done) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 200, backgroundColor: "var(--color-intro-overlay-bg)" }}
    >
      {STICKERS.map(({ key, src, inset }) => (
        <div
          key={key}
          ref={(el) => {
            stickerRefs.current[key] = el;
          }}
          className="absolute"
          style={{
            top: `${inset.top}%`,
            right: `${inset.right}%`,
            bottom: `${inset.bottom}%`,
            left: `${inset.left}%`,
            opacity: 0,
          }}
        >
          <img src={src} alt="" className="w-full h-full" draggable={false} />
        </div>
      ))}
      {/* {WORDMARKS.map(({ key, src, layout }) => (
        <div
          key={key}
          ref={(el) => {
            wordmarkRefs.current[key] = el;
          }}
          className="absolute"
          style={{
            top: layout.top !== undefined ? `${layout.top}vh` : undefined,
            bottom: layout.bottom !== undefined ? `${layout.bottom}vh` : undefined,
            height: `${layout.height}vh`,
            width: `${layout.width}vh`,
            left: layout.left !== undefined ? `${layout.left}%` : undefined,
            right: layout.right !== undefined ? `${layout.right}%` : undefined,
            opacity: 0,
          }}
        >
          <img src={src} alt="" className="w-full h-full" draggable={false} />
        </div>
      ))} */}
    </div>
  );
}
