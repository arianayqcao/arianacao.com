"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IntroOverlay from "@/components/IntroOverlay";
import AppleInteractive from "@/components/AppleInteractive";
import HeroTitleReveal from "@/components/HeroTitleReveal";
import ScrambleBioText from "@/components/ScrambleBioText";
import BioHeadlineReveal from "@/components/BioHeadlineReveal";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* ─── featured case studies (spur / cura / dubcoin / dubhacks 2026) ── */

interface FeaturedCard {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cursor: string;
  bg: string;
  textDark?: boolean;
  gradient: string;
  aspectRatio?: string;
  heightPx?: number;
  textClearancePx?: number;
  order: number;
  showHoverOverlay?: boolean;
  disableHoverTextChange?: boolean;
}

function FeaturedCoverCard({
  card,
  gridClassName,
  children,
}: {
  card: FeaturedCard;
  gridClassName: string;
  children: React.ReactNode;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const comingSoon = card.cursor === "coming-soon";

  const className = `group relative block overflow-hidden rounded w-full ${
    card.heightPx ? "" : "case-study-card"
  } ${gridClassName}`;
  const style = {
    background: card.bg,
    height: card.heightPx,
    order: card.order,
    ...(card.heightPx ? {} : { "--card-aspect-desktop": card.aspectRatio }),
  } as React.CSSProperties;

  const eyebrowColor =
    !card.disableHoverTextChange && isHovering && card.textDark
      ? "rgba(255,255,255,0.5)"
      : card.textDark
      ? "rgba(0,0,0,0.5)"
      : "rgba(255,255,255,0.5)";
  const titleColor =
    !card.disableHoverTextChange && isHovering && card.textDark
      ? "#fff"
      : card.textDark
      ? "#000"
      : "#fff";
  const descriptionColor =
    !card.disableHoverTextChange && isHovering && card.textDark
      ? "rgba(255,255,255,0.7)"
      : card.textDark
      ? "rgba(0,0,0,0.5)"
      : "rgba(255,255,255,0.7)";

  const content = (
    <>
      {children}

      {/* hover darken overlay */}
      {card.showHoverOverlay !== false && (
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none" />
      )}

      <div
        className="absolute bottom-0 left-0 w-full flex flex-col"
        style={{ padding: 16, gap: 4, background: card.gradient }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xxs)",
            color: eyebrowColor,
            textTransform: "uppercase",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {card.eyebrow}
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-xl)",
            color: titleColor,
            lineHeight: "normal",
          }}
        >
          {card.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-md)",
            color: descriptionColor,
            lineHeight: "var(--leading-body)",
          }}
        >
          {card.description}
        </span>
      </div>
    </>
  );

  if (comingSoon) {
    return (
      <div
        data-cursor={card.cursor}
        className={className}
        style={style}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={card.href}
      data-cursor={card.cursor}
      className={className}
      style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {content}
    </Link>
  );
}

const DARK_GRADIENT =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)";
const LIGHT_GRADIENT =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 100%)";

const SPUR_CARD: FeaturedCard = {
  eyebrow: "Design for America · 2026",
  title: "Spur",
  description:
    "Creative inspiration is often saved impulsively, quickly forgotten, and turns into digital clutter. Won DFA Best Research-Driven Impact Award.",
  href: "/work/spur",
  cursor: "view-case-study",
  bg: "var(--primitive-black)",
  gradient: DARK_GRADIENT,
  aspectRatio: "1 / 1",
  textClearancePx: 190,
  order: 1,
  showHoverOverlay: true,
};

const DUBCOIN_CARD: FeaturedCard = {
  eyebrow: "DubHacks · 2026",
  title: "DubCoin Reward System",
  description:
    "Redesigning the DubCoin experience and DubCoin distribution system.",
  href: "/work/dubcoin-system",
  cursor: "view-case-study",
  bg: "var(--primitive-hot-pink)",
  gradient: DARK_GRADIENT,
  aspectRatio: "1 / 1",
  order: 3,
  showHoverOverlay: true,
};

// const CURA_CARD: FeaturedCard = {
//   eyebrow: "WINFO Hackathon · 2025",
//   title: "Cura",
//   description: "Empowering families to manage caregiving with accessible, user-friendly tools and resources.",
//   href: "/work/cura",
//   cursor: "coming-soon",
//   bg: "#EAEAF0",
//   textDark: true,
//   gradient: LIGHT_GRADIENT,
//   aspectRatio: "1 / 1",
//   order: 2,
//   showHoverOverlay: false,
//   disableHoverTextChange: true,
// };

// const DUBHACKS_2026_CARD: FeaturedCard = {
//   eyebrow: "DubHacks · 2026",
//   title: "DubHacks 2026",
//   description: "Designing cooking-themed annual website for largest hackathon in the Pacific Northwest.",
//   href: "/work/dubhacks-2026",
//   cursor: "coming-soon",
//   bg: "var(--primitive-dubhacks-blue)",
//   gradient: DARK_GRADIENT,
//   aspectRatio: "1 / 1",
//   order: 4,
//   showHoverOverlay: false,
// };

/* ─── logo strip ────────────────────────────────────────────────── */

const LOGOS = [
  { name: "Figma", src: "/logos/figma-logo-lockup-trimmed.jpg" },
  { name: "Adobe", src: "/logos/Adobe_Corporate_wordmark.svg" },
  { name: "Blender", src: "/logos/Logo_Blender.svg" },
  { name: "React", src: "/logos/reactjs_logo_icon_cropped.svg" },
  { name: "Tailwind CSS", src: "/logos/Tailwind_CSS_logo_with_dark_text.svg" },
  { name: "Jitter", src: "/logos/Jitter_logo-cropped.PNG" },
  { name: "Lovable", src: "/logos/lovable-dark-png.png" },
  { name: "GSAP", src: "/logos/gsap-logo-trimmed.jpeg" },
];

/* ─── skills data ───────────────────────────────────────────────── */

const PRACTICES = [
  { label: "UI / UX Design", tools: ["Figma", "Lovable", "Claude Design"] },
  { label: "Graphic Design", tools: ["Photoshop", "Illustrator"] },
  {
    label: "Front End Development",
    tools: ["Claude Code", "GSAP", "React", "Tailwind CSS"],
  },
  {
    label: "2D / 3D Animation",
    tools: ["After Effects", "Jitter", "Blender", "Maya"],
  },
];

const LOVES = [
  "Stardew Valley",
  "coloring books",
  "Minato",
  "Paint the Town",
  "lilies",
  "live theatre",
  "Terraria",
  "audiobooks",
  "candid photos",
  "apples",
  "leaving google maps reviews",
  "collecting the Stranger Magazines",
  "photography",
  "the hungry caterpillar",
  "physical computing",
];

const LOVE_PHOTOS: Record<string, string[]> = {
  "Stardew Valley": ["stardew-valley.png"],
  "coloring books": [
    "blanket-coloring-book.jpg",
    "farmers-market-coloring-book.jpg",
  ],
  Minato: ["minato.jpg"],
  "Paint the Town": ["paint-the-town.gif"],
  "live theatre": ["anything-goes.jpg", "pnb-curtain.jpg"],
  "candid photos": [
    "jonny-xian.jpg",
    "meiyao-ballet-candid.jpg",
    "the-cut-candid.JPG",
  ],
  photography: [
    "anjelina-scarf-yellow.jpeg",
    "anjelina-telephone-booth.jpeg",
    "lauren-grad.JPG",
  ],
  "physical computing": ["hello-world-venmo-arduino.gif"],
};

const LOVE_PHOTO_DIMENSIONS: Record<string, [number, number]> = {
  "stardew-valley.png": [1500, 844],
  "blanket-coloring-book.jpg": [2268, 4032],
  "farmers-market-coloring-book.jpg": [2268, 2979],
  "minato.jpg": [2268, 4032],
  "paint-the-town.gif": [400, 711],
  "anything-goes.jpg": [2268, 4032],
  "pnb-curtain.jpg": [3072, 3599],
  "jonny-xian.jpg": [4032, 3024],
  "meiyao-ballet-candid.jpg": [3648, 2736],
  "the-cut-candid.JPG": [3872, 2592],
  "anjelina-scarf-yellow.jpeg": [806, 1208],
  "anjelina-telephone-booth.jpeg": [806, 538],
  "lauren-grad.JPG": [3648, 2736],
  "hello-world-venmo-arduino.gif": [400, 711],
};

/* ─── page ──────────────────────────────────────────────────────── */

export default function Home() {
  const [photoOffsets, setPhotoOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingPhoto, setDraggingPhoto] = useState<string | null>(null);
  const photoDrag = useRef<{ file: string; x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  return (
    <>
      <IntroOverlay />

      <div className="bg-white flex flex-col items-center min-h-screen">
        {/* ══ HEADER ════════════════════════════════════════════════ */}
        <SiteHeader />

        {/* ══ MAIN ══════════════════════════════════════════════════ */}
        <main
          className="flex flex-col items-center w-full"
          style={{ gap: "var(--space-0)" }}
        >
          {/* ── HERO ─────────────────────────────────────────────── */}
          <section
            className="flex items-start justify-center w-full max-h-[90dvh] md:min-h-0"
            style={{ padding: "0px" }}
          >
            <div
              className="flex flex-col items-center gap-0 md:gap-2"
              style={{
                maxWidth: "var(--max-width-content)",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <HeroTitleReveal text="ariana cao." />
              <div
                className="mt-6 md:mt-[-40px]"
                style={{
                  width: 575,
                  maxWidth: "100%",
                  height: 510,
                  marginBottom: -80,
                  marginInline: "auto",
                }}
              >
                <AppleInteractive />
              </div>
            </div>
          </section>

          {/* ── BIO ──────────────────────────────────────────────── */}

          <section
            className="flex flex-col items-center w-full"
            style={{ padding: 16 }}
          >
            <div
              className="flex flex-col w-full md:w-1/2"
              style={{
                maxWidth: "var(--max-width-content)",
                gap: 24,
                margin: "0 auto",
              }}
            >
              <BioHeadlineReveal />

              <ScrambleBioText
                text={
                  "Based in Seattle, WA.\nConstantly collecting free magazines, making tea."
                }
              />
            </div>
          </section>

          {/* ── CASE STUDIES ─────────────────────────────────────── */}
          <section
            className="flex items-start justify-center w-full pb-4 md:pb-32"
            style={{ paddingInline: 16, paddingTop: 16 }}
          >
            <div
              className="flex flex-col flex-1 min-w-0"
              style={{
                gap: 16,
                maxWidth: "var(--max-width-content)",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 w-full"
                style={{ gap: 16 }}
              >
                <FeaturedCoverCard
                  card={SPUR_CARD}
                  gridClassName="order-1 md:order-none md:col-start-1 md:row-start-1"
                >
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: SPUR_CARD.textClearancePx,
                    }}
                  >
                    <video
                      src="/videos/spur/spur-adding-content.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-auto object-contain"
                      style={{ height: "90%" }}
                    />
                  </div>
                </FeaturedCoverCard>

                <FeaturedCoverCard
                  card={DUBCOIN_CARD}
                  gridClassName="order-2 md:order-none md:col-start-2 md:row-start-1"
                >
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet="/images/Case Study Cover Images/dubcoins-cover-image-desktop.webp"
                    />
                    <Image
                      src="/images/Case Study Cover Images/dubcoins-cover-image-desktop.webp"
                      alt="DubCoin prizes screen showing a QR code to redeem coins"
                      fill
                      sizes="(max-width: 768px) 100vw, 1000px"
                      className="object-cover"
                    />
                  </picture>
                </FeaturedCoverCard>

                {/* <FeaturedCoverCard card={CURA_CARD} gridClassName="order-3 md:order-none md:col-start-1 md:row-start-2">
                  <Image
                    src="/images/Case Study Cover Images/Updated-Cura-Cover-Image-4k-1-1-ratio.png"
                    alt="Cura app home screen showing today's caregiving schedule"
                    fill
                    sizes="(max-width: 768px) 100vw, 696px"
                    className="object-cover"
                  />
                </FeaturedCoverCard> */}

                {/* <FeaturedCoverCard card={DUBHACKS_2026_CARD} gridClassName="order-4 md:order-none md:col-start-2 md:row-start-2">
                  <video
                    src="/videos/Sponsor-Us-Button-Animation-DH26-Jitter.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute object-cover md:h-[435.8px] h-[250px]"
                    style={{ left: 83.5, top: 0, width: 673.5, height: 435.8, objectPosition: "left" }}
                  />
                </FeaturedCoverCard> */}
              </div>
            </div>
          </section>

          {/* ── ABOUT ────────────────────────────────────────────── */}
          <section
            className="flex flex-col items-start w-full pb-4 md:pb-16"
            style={{ padding: 128 }}
          >
            <div
              className="flex flex-col md:flex-row items-start w-full"
              style={{
                gap: 16,
                maxWidth: "var(--max-width-content)",
                width: "100%",
                margin: "0 auto",
              }}
            >
              {/* text */}
              <div
                className="flex flex-col flex-1 min-w-0 self-stretch"
                style={{ gap: 16 }}
              >
                <h2
                  data-cursor="text-large"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: "var(--weight-bold)",
                    fontSize: "var(--text-2xl)",
                    color: "#000",
                    lineHeight: "40px",
                    margin: 0,
                  }}
                >
                  Student at UW-Seattle, from the Bay Area.
                </h2>
                <div
                  data-cursor="text-regular"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: "var(--weight-regular)",
                    fontSize: "var(--text-md)",
                    color: "#000",
                    lineHeight: "normal",
                    whiteSpace: "pre-wrap",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    I&apos;m a 4th-year undergrad student pursuing Informatics
                    at the University of Washington in Seattle.
                  </p>
                  <p style={{ margin: 0 }}>
                    I&apos;m driven by a desire to make technology more
                    accessible and more magical ✨, especially through
                    women-centered tech initiatives.
                  </p>
                </div>
              </div>

              {/* 1/3 spacer */}
              <div
                className="hidden md:block self-stretch shrink-0 bg-white"
                style={{ width: 223 }}
              />

              {/* photo */}
              <div
                className="w-1/2 md:flex-1 md:min-w-0 relative rounded-sm overflow-hidden max-h-[80vh]"
                style={{ aspectRatio: "3 / 2" }}
              >
                <Image src="/images/ariana-in-davis-pointing-at-cows.jpg" alt="Ariana Cao in Davis pointing at cows!" fill className="object-cover" />
              </div>
            </div>

          </section>

          {/* ── LOGO STRIP ───────────────────────────────────────── */}
          <section
            className="flex flex-col items-start w-full overflow-hidden"
            style={{ padding: 128 }}
          >
            <div className="overflow-visible w-full">
              <div
                className="flex items-center shrink-0"
                style={{
                  gap: 64,
                  height: 28,
                  animation: "marquee 30s linear infinite",
                  width: "max-content",
                }}
              >
                {[...LOGOS, ...LOGOS].map(({ name, src }, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={name}
                    style={{
                      height: 24,
                      width: "auto",
                      opacity: 1,
                      userSelect: "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ── SKILLS ───────────────────────────────────────────── */}
          <section
            className="flex flex-col items-start w-full"
            style={{ paddingInline: 16, paddingTop: 16, paddingBottom: 200 }}
          >
            <div
              className="flex flex-col md:flex-row items-start w-full gap-8 md:gap-16"
              style={{
                maxWidth: "var(--max-width-content)",
                width: "100%",
                margin: "0 auto",
              }}
            >
              {/* left: grid + loves */}
              <div
                className="flex flex-col md:flex-row flex-1 min-w-0 w-full"
                style={{ gap: 32 }}
              >
                {/* practices / toolkit grid */}
                <div
                  data-cursor="text-regular"
                  className="w-full md:w-[299px] shrink-0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    columnGap: 32,
                    rowGap: 16,
                  }}
                >
                  {/* headers */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xxs)",
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-wider)",
                      lineHeight: "var(--leading-snug)",
                    }}
                  >
                    Practices
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xxs)",
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-wider)",
                      lineHeight: "var(--leading-snug)",
                    }}
                  >
                    Toolkit
                  </span>

                  {/* rows */}
                  {PRACTICES.map(({ label, tools }) => (
                    <Fragment key={label}>
                      <span
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontWeight: "var(--weight-regular)",
                          fontSize: "var(--text-md)",
                          color: "#000",
                          lineHeight: "var(--leading-body)",
                        }}
                      >
                        {label}
                      </span>
                      <div
                        className="flex flex-col"
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontWeight: "var(--weight-regular)",
                          fontSize: "var(--text-md)",
                          color: "#000",
                          lineHeight: "var(--leading-body)",
                        }}
                      >
                        {tools.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </div>

                {/* loves */}
                <div
                  data-cursor="text-regular"
                  className="flex flex-col w-full md:w-[145px] shrink-0"
                  style={{ gap: 16 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xxs)",
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--tracking-wider)",
                      lineHeight: "var(--leading-snug)",
                    }}
                  >
                    Loves
                  </span>
                  <div
                    className="flex flex-col"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontWeight: "var(--weight-regular)",
                      fontSize: "var(--text-md)",
                      color: "#000",
                      lineHeight: "var(--leading-body)",
                    }}
                  >
                    {LOVES.map((item) => (
                      <span
                        key={item}
                        tabIndex={0}
                        className="cursor-pointer hover:text-lime-600 focus:text-lime-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* media carousel */}
              <div className="shrink-0 w-full md:flex-1 md:min-w-0">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {Object.entries(LOVE_PHOTOS).flatMap(([love, files]) =>
                    files.map((file) => {
                      const offset = photoOffsets[file] ?? { x: 0, y: 0 };

                      return (
                        <div
                          key={`${love}-${file}`}
                          className={`relative aspect-[4/3] overflow-hidden select-none ${draggingPhoto === file ? "z-20 cursor-grabbing" : "cursor-grab"}`}
                          style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, touchAction: "none" }}
                          onPointerDown={(event) => {
                            event.currentTarget.setPointerCapture(event.pointerId);
                            photoDrag.current = { file, x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y };
                            setDraggingPhoto(file);
                          }}
                          onPointerMove={(event) => {
                            const drag = photoDrag.current;
                            if (!drag || drag.file !== file) return;
                            setPhotoOffsets((current) => ({
                              ...current,
                              [file]: { x: drag.offsetX + event.clientX - drag.x, y: drag.offsetY + event.clientY - drag.y },
                            }));
                          }}
                          onPointerUp={() => {
                            photoDrag.current = null;
                            setDraggingPhoto(null);
                          }}
                          onPointerCancel={() => {
                            photoDrag.current = null;
                            setDraggingPhoto(null);
                          }}
                        >
                          <Image
                            src={`/for-portfolio-about/${file}`}
                            alt={file.replace(/[-.].*/, "").replaceAll("-", " ")}
                            width={LOVE_PHOTO_DIMENSIONS[file][0]}
                            height={LOVE_PHOTO_DIMENSIONS[file][1]}
                            draggable={false}
                            className="h-full w-full object-contain pointer-events-none"
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ══ FOOTER ════════════════════════════════════════════════ */}
        <Footer />
      </div>
    </>
  );
}
