"use client";

import { useEffect, useRef, useState } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap, useGSAP, OVERLAY_FADE_START, OVERLAY_FADE_DURATION } from "@/lib/gsap";

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

export default function IntroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        STICKERS.forEach(({ key }) => {
          gsap.set(stickerRefs.current[key], { rotation: 0, scale: 2 });
        });
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
        gsap.set(el, { rotation: rotateFrom, scale: 1, transformOrigin: "50% 50%" });
        tl.to(el, { rotation: 0, duration: SETTLE_DURATION, ease: "introRotate" }, start);
        tl.to(el, { scale: 2, duration: SETTLE_DURATION, ease: springBounce }, start);
      });

      tl.to(
        containerRef.current,
        { opacity: 0, pointerEvents: "none", duration: OVERLAY_FADE_DURATION, ease: "power1.in" },
        OVERLAY_FADE_START
      );
    },
    { scope: containerRef }
  );

  if (done) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 200, background: "var(--color-intro-overlay-bg)" }}
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
          }}
        >
          <img src={src} alt="" className="w-full h-full" draggable={false} />
        </div>
      ))}
    </div>
  );
}
