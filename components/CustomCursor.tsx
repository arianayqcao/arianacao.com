"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── cursor variants ───────────────────────────────────────────────
   Other elements opt in by adding data-cursor="<variant>" — no
   context/provider needed. Text.tsx imports CursorVariant to keep
   the two files in sync via the type system.
   ──────────────────────────────────────────────────────────────────── */

export type CursorVariant =
  | "default"           // 16×16 green circle
  | "red"              // 16×16 red circle
  | "view-case-study"   // pill — "view case study"
  | "coming-soon"       // pill — "coming soon" (lime/50)
  | "text-large"        // I-beam 4×128  (display, h2)
  | "text-medium"       // I-beam 3×64   (h3, card-title)
  | "text-regular"      // I-beam 2×32   (body, nav)
  | "text-small";       // I-beam 2×20   (label, meta, eyebrows)

const CURSOR_VARIANTS: readonly CursorVariant[] = [
  "default",
  "red",
  "view-case-study",
  "coming-soon",
  "text-large",
  "text-medium",
  "text-regular",
  "text-small",
];

function isCursorVariant(value: string | null): value is CursorVariant {
  return !!value && (CURSOR_VARIANTS as readonly string[]).includes(value);
}

/* ─── pill variants ─────────────────────────────────────────────── */

const PILL_LABEL: Partial<Record<CursorVariant, string>> = {
  "view-case-study": "view case study",
  "coming-soon":     "coming soon",
};

const PILL_VARIANTS = new Set<CursorVariant>([
  "view-case-study",
  "coming-soon",
]);

/* ─── I-beam sizes ──────────────────────────────────────────────── */

const BAR_SIZE: Partial<Record<CursorVariant, { width: number; height: number }>> = {
  "text-large":   { width: 3, height: 128 },
  "text-medium":  { width: 2, height: 48 },
  "text-regular": { width: 1, height: 28 },
  "text-small":   { width: .5, height: 18 },
};

/* ─── fine-pointer detection ────────────────────────────────────── */

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
const getFinePointerSnapshot       = () => window.matchMedia("(pointer: fine)").matches;
const getFinePointerServerSnapshot = () => false;

/* ─── component ─────────────────────────────────────────────────── */

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const variantRef = useRef<CursorVariant>("default");
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");

    function handlePointerMove(e: PointerEvent) {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") ?? null;
      const attr   = target?.getAttribute("data-cursor") ?? null;
      const next: CursorVariant = isCursorVariant(attr) ? attr : "default";

      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariant(next);
      }
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    document.addEventListener("pointermove",  handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("pointermove",  handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isPill   = PILL_VARIANTS.has(variant);
  const barSize  = BAR_SIZE[variant];
  const label    = PILL_LABEL[variant];

  const background =
    variant === "red"
      ? "var(--color-cursor-red)"
      : variant === "coming-soon"
      ? "var(--color-cursor-disabled)"
      : "var(--color-cursor-default)";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[999] flex items-center justify-center pointer-events-none"
      style={{
        opacity:      visible ? 1 : 0,
        width:        isPill ? "auto" : (barSize?.width  ?? 8),
        height:       isPill ? 24     : (barSize?.height ?? 8),
        padding:      isPill ? "4px 12px" : 0,
        borderRadius: "var(--radius-full)",
        background,
        transition: [
          "width var(--transition-fast)",
          "height var(--transition-fast)",
          "padding var(--transition-fast)",
          "background-color var(--transition-fast)",
          "opacity var(--transition-fast)",
        ].join(", "),
        willChange: "transform",
      }}
    >
      {label && (
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "var(--text-xs)",
            lineHeight:    "16px",
            color:         "var(--primitive-black)",
            textTransform: "uppercase",
            whiteSpace:    "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}