import React from "react";
import type { CursorVariant } from "@/components/CustomCursor";

/* ─────────────────────────────────────────────────────────────────
   Variant → CSS class (from tokens.css)
   Variant → cursor (from CustomCursor.tsx CursorVariant)
   Variant → default HTML tag
   ───────────────────────────────────────────────────────────────── */

type Variant =
  | "display"     // --text-4xl  128px  black    → h1
  | "h2"          // --text-3xl   36px  bold     → h2
  | "h3"          // --text-2xl   32px  bold     → h3
  | "card-title"  // --text-xl    20px  bold     → span
  | "body"        // --text-md    16px  regular  → p
  | "nav"         // --text-sm    14px  mono     → span
  | "label"       // --text-xxs   11px  mono UC  → span
  | "meta";       // --text-xs    12px  mono     → span

const variantClass: Record<Variant, string> = {
  display:      "text-display",
  h2:           "text-h2",
  h3:           "text-h3",
  "card-title": "text-card-title",
  body:         "text-body",
  nav:          "text-nav",
  label:        "text-label",
  meta:         "text-meta",
};

const variantCursor: Record<Variant, CursorVariant> = {
  display:      "text-large",    // 128px
  h2:           "text-large",    //  36px
  h3:           "text-medium",   //  32px
  "card-title": "text-medium",   //  20px
  body:         "text-regular",  //  16px
  nav:          "text-regular",  //  14px
  label:        "text-small",    //  11px
  meta:         "text-small",    //  12px
};

const variantTag: Record<Variant, React.ElementType> = {
  display:      "h1",
  h2:           "h2",
  h3:           "h3",
  "card-title": "span",
  body:         "p",
  nav:          "span",
  label:        "span",
  meta:         "span",
};

/* ─── component ─────────────────────────────────────────────────── */

interface TextProps {
  variant?: Variant;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** Override the auto-derived cursor variant if needed */
  cursor?: CursorVariant;
}

export function Text({
  variant = "body",
  as,
  className = "",
  style,
  children,
  cursor,
}: TextProps) {
  const Tag = as ?? variantTag[variant];

  return (
    <Tag
      className={`${variantClass[variant]} ${className}`.trim()}
      data-cursor={cursor ?? variantCursor[variant]}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ─── named aliases ─────────────────────────────────────────────── */

type AliasProps = Omit<TextProps, "variant">;

export const Display   = (p: AliasProps) => <Text variant="display"    {...p} />;
export const H2        = (p: AliasProps) => <Text variant="h2"         {...p} />;
export const H3        = (p: AliasProps) => <Text variant="h3"         {...p} />;
export const CardTitle = (p: AliasProps) => <Text variant="card-title" {...p} />;
export const Body      = (p: AliasProps) => <Text variant="body"       {...p} />;
export const Nav       = (p: AliasProps) => <Text variant="nav"        {...p} />;
export const Label     = (p: AliasProps) => <Text variant="label"      {...p} />;
export const Meta      = (p: AliasProps) => <Text variant="meta"       {...p} />;
