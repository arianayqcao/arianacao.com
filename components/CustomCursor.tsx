"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ─── cursor states ─────────────────────────────────────────────────
   Figma: node 345-794 (states) / 345-793 (default).
   Other sections opt into a state by adding a `data-cursor="<variant>"`
   attribute to the hovered element — no context/provider needed.
   ──────────────────────────────────────────────────────────────────── */

export type CursorVariant =
  | "default"
  | "stop"
  | "view-case-study"
  | "coming-soon"
  | "text-large"
  | "text-medium"
  | "text-regular";

const CURSOR_VARIANTS: readonly CursorVariant[] = [
  "default",
  "stop",
  "view-case-study",
  "coming-soon",
  "text-large",
  "text-medium",
  "text-regular",
];

function isCursorVariant(value: string | null): value is CursorVariant {
  return !!value && (CURSOR_VARIANTS as readonly string[]).includes(value);
}

const PILL_LABEL: Partial<Record<CursorVariant, string>> = {
  "view-case-study": "view case study",
  "coming-soon": "coming soon",
};

const PILL_VARIANTS = new Set<CursorVariant>(["view-case-study", "coming-soon"]);
const BAR_SIZE: Partial<Record<CursorVariant, { width: number; height: number }>> = {
  "text-large": { width: 4, height: 128 },
  "text-medium": { width: 3, height: 64 },
  "text-regular": { width: 2, height: 32 },
};

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<CursorVariant>("default");
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
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
      const attr = target?.getAttribute("data-cursor") ?? null;
      const next = isCursorVariant(attr) ? attr : "default";

      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariant(next);
      }
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isPill = PILL_VARIANTS.has(variant);
  const barSize = BAR_SIZE[variant];
  const label = PILL_LABEL[variant];

  const background =
    variant === "stop"
      ? "var(--color-cursor-stop)"
      : variant === "coming-soon"
      ? "var(--color-cursor-disabled)"
      : "var(--color-cursor-default)";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] flex items-center justify-center pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        width: isPill ? "auto" : (barSize?.width ?? 16),
        height: isPill ? 24 : (barSize?.height ?? 16),
        padding: isPill ? "4px 12px" : 0,
        borderRadius: "var(--radius-full)",
        background,
        transition:
          "width var(--transition-fast), height var(--transition-fast), padding var(--transition-fast), background-color var(--transition-fast), opacity var(--transition-fast)",
        willChange: "transform",
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            lineHeight: "16px",
            color: "var(--primitive-black)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
