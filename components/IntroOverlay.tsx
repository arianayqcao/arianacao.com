"use client";

import { useEffect, useState } from "react";

/* ─── sticker layout ──────────────────────────────────────────────
   Percentages lifted directly from the Figma "Overlay" component
   (node 388:1046) — Property 1=Variant2 is the oversized entrance
   state, Property 1=Default is the resting position the stickers
   settle into before the overlay fades away.
   ──────────────────────────────────────────────────────────────────── */

type Inset = { top: number; right: number; bottom: number; left: number };

const STICKERS: { key: string; src: string; rotate: number; big: Inset; small: Inset }[] = [
  {
    key: "cao",
    src: "/svg/cao%20sticker.svg",
    rotate: -10,
    big: { top: -2.28, right: 60.02, bottom: 39.78, left: -4.46 },
    small: { top: 10.87, right: 69.37, bottom: 52.93, left: 4.89 },
  },
  {
    key: "yu",
    src: "/svg/yu%20sticker.svg",
    rotate: 10,
    big: { top: 47.52, right: 31.3, bottom: -10.02, left: 24.25 },
    small: { top: 60.67, right: 40.65, bottom: 3.13, left: 33.6 },
  },
  {
    key: "qi",
    src: "/svg/qi%20sticker.svg",
    rotate: -10,
    big: { top: -8.49, right: 2.6, bottom: 45.99, left: 52.96 },
    small: { top: 4.66, right: 11.95, bottom: 59.14, left: 62.31 },
  },
];

type Phase = "enter" | "settle" | "exit" | "done";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const toSettle = requestAnimationFrame(() => setPhase("settle"));
    const toExit = setTimeout(() => setPhase("exit"), 1300);
    const toDone = setTimeout(() => setPhase("done"), 1900);

    return () => {
      cancelAnimationFrame(toSettle);
      clearTimeout(toExit);
      clearTimeout(toDone);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const isSettled = phase === "settle" || phase === "exit";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: 200,
        background: "#F60000",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 600ms ease-in",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {STICKERS.map(({ key, src, rotate, big, small }) => {
        const inset = isSettled ? small : big;
        return (
          <div
            key={key}
            className="absolute"
            style={{
              top: `${inset.top}%`,
              right: `${inset.right}%`,
              bottom: `${inset.bottom}%`,
              left: `${inset.left}%`,
              transform: `rotate(${rotate}deg)`,
              transition: "top 900ms cubic-bezier(0.16,1,0.3,1), right 900ms cubic-bezier(0.16,1,0.3,1), bottom 900ms cubic-bezier(0.16,1,0.3,1), left 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <img src={src} alt="" className="w-full h-full" draggable={false} />
          </div>
        );
      })}
    </div>
  );
}
