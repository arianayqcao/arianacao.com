"use client";

import { Fragment, useState } from "react";
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

  const className = `group relative block overflow-hidden rounded w-full ${card.heightPx ? "" : "case-study-card"} ${gridClassName}`;
  const style = {
    background: card.bg,
    height: card.heightPx,
    order: card.order,
    ...(card.heightPx ? {} : { "--card-aspect-desktop": card.aspectRatio }),
  } as React.CSSProperties;

  const eyebrowColor = isHovering && card.textDark ? "rgba(255,255,255,0.5)" : card.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
  const titleColor = isHovering && card.textDark ? "#fff" : card.textDark ? "#000" : "#fff";
  const descriptionColor = isHovering && card.textDark ? "rgba(255,255,255,0.7)" : card.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)";

  const content = (
    <>
      {children}

      {/* hover darken overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none" />

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
        data-cursor={card.cursor} className={className} style={style}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <Link 
      href={card.href} data-cursor={card.cursor} className={className} style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {content}
    </Link>
  );
}

const DARK_GRADIENT = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)";
const LIGHT_GRADIENT = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 100%)";

const SPUR_CARD: FeaturedCard = {
  eyebrow: "Design for America · 2026",
  title: "Spur",
  description: "Creative inspiration is often saved impulsively, quickly forgotten, and turns into digital clutter.",
  href: "/work/spur",
  cursor: "view-case-study",
  bg: "var(--primitive-black)",
  gradient: DARK_GRADIENT,
  aspectRatio: "1 / 1",
  textClearancePx: 190,
  order: 1,
};

const CURA_CARD: FeaturedCard = {
  eyebrow: "WINFO Hackathon · 2025",
  title: "Cura",
  description: "Empowering families to manage caregiving with accessible, user-friendly tools and resources.",
  href: "/work/cura",
  cursor: "coming-soon",
  bg: "#EAEAF0",
  textDark: true,
  gradient: LIGHT_GRADIENT,
  aspectRatio: "1 / 1",
  order: 2,
};

const DUBCOIN_CARD: FeaturedCard = {
  eyebrow: "DubHacks · 2025",
  title: "DubCoin Reward System",
  description: "Redesigning the DubCoin experience and DubCoin distribution system.",
  href: "/work/dubcoin-system",
  cursor: "view-case-study",
  bg: "var(--primitive-hot-pink)",
  gradient: DARK_GRADIENT,
  aspectRatio: "1 / 1",
  order: 3,
};

const DUBHACKS_2026_CARD: FeaturedCard = {
  eyebrow: "DubHacks · 2026",
  title: "DubHacks 2026",
  description: "Designing cooking-themed annual website for largest hackathon in the Pacific Northwest.",
  href: "/work/dubhacks-2026",
  cursor: "coming-soon",
  bg: "var(--primitive-dubhacks-blue)",
  gradient: DARK_GRADIENT,
  aspectRatio: "1 / 1",
  order: 4,
};

/* ─── logo strip ────────────────────────────────────────────────── */

const LOGOS = [
  { name: "Figma", src: "/logos/figma-logo-lockup-trimmed.jpg" },
  { name: "Adobe CC", src: "/logos/Adobe_Creative_Cloud_rainbow_icon.svg" },
  { name: "Blender", src: "/logos/Logo_Blender.svg" },
  { name: "React", src: "/logos/reactjs_logo_icon_cropped.svg" },
  { name: "Tailwind CSS", src: "/logos/Tailwind_CSS_logo_with_dark_text.svg" },
  { name: "Jitter", src: "/logos/Jitter_logo-cropped.PNG" },
  { name: "Lovable", src: "/logos/lovable-dark-png.png" },
  { name: "GSAP", src: "/logos/gsap-logo-trimmed.jpeg" },
];

/* ─── skills data ───────────────────────────────────────────────── */

const PRACTICES = [
  { label: "UI / UX Design",          tools: ["Figma", "Lovable", "Claude Design"] },
  { label: "Graphic Design",          tools: ["Photoshop", "Illustrator"] },
  { label: "Front End Development",   tools: ["Claude Code", "GSAP", "React", "Tailwind CSS"] },
  { label: "2D / 3D Animation",       tools: ["After Effects", "Jitter", "Blender", "Maya"] },
];

const LOVES = [
  "Stardew Valley", "coloring books", "Minato",
  "Paint the Town", "lilies", "live theatre",
  "Terraria", "audiobooks", "candid photos",
];

/* ─── page ──────────────────────────────────────────────────────── */

export default function Home() {
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
              style={{ maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
            >
              <HeroTitleReveal text="ariana cao." />
              <div
                className="mt-6 md:mt-[-40px]"
                style={{ width: 575, maxWidth: "100%", height: 510, marginBottom: -80, marginInline: "auto" }}
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
              style={{ maxWidth: "var(--max-width-content)", gap: 24, margin: "0 auto" }}
            >
              <BioHeadlineReveal />

              <ScrambleBioText
                text={"Based in Seattle, WA.\nConstantly collecting free magazines, making tea."}
              />
            </div>
          </section>

          {/* ── CASE STUDIES ─────────────────────────────────────── */}
          <section
            className="flex items-start justify-center w-full"
            style={{ paddingInline: 16, paddingTop: 16, paddingBottom: 200 }}
          >
            <div 
              className="flex flex-col flex-1 min-w-0" 
              style={{ gap: 16, maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
              >
              <div className="grid grid-cols-1 md:grid-cols-2 w-full" style={{ gap: 16 }}>
                <FeaturedCoverCard card={SPUR_CARD} gridClassName="order-1 md:order-none md:col-start-1 md:row-start-1">
                  <div
                    className="absolute flex items-center justify-center"
                    style={{ top: 0, left: 0, right: 0, bottom: SPUR_CARD.textClearancePx }}
                  >
                    <video
                      src="/videos/spur/spur-adding-content.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-auto object-contain"
                      style={{ height: "90%"}}
                    />
                  </div>
                </FeaturedCoverCard>

                <FeaturedCoverCard card={CURA_CARD} gridClassName="order-2 md:order-none md:col-start-2 md:row-start-1">
                  <Image
                    src="/images/Case Study Cover Images/Updated-Cura-Cover-Image-4k-1-1-ratio.png"
                    alt="Cura app home screen showing today's caregiving schedule"
                    fill
                    sizes="(max-width: 768px) 100vw, 696px"
                    className="object-cover"
                  />
                </FeaturedCoverCard>
                
                <FeaturedCoverCard card={DUBCOIN_CARD} gridClassName="order-3 md:order-none md:col-start-1 md:row-start-2">
                  <Image
                    src="/images/Case Study Cover Images/4k-1-1-ratio-Redeem-DubCoins.png"
                    alt="DubCoin prizes screen showing a QR code to redeem coins"
                    fill
                    sizes="(max-width: 768px) 100vw, 1000px"
                    className="object-cover"
                  />
                </FeaturedCoverCard>

                <FeaturedCoverCard card={DUBHACKS_2026_CARD} gridClassName="order-4 md:order-none md:col-start-2 md:row-start-2">
                  <video
                    src="/videos/Sponsor-Us-Button-Animation-DH26-Jitter.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute object-cover"
                    style={{ left: 83.5, top: 0, width: 673.5, height: 435.8 }}
                  />
                </FeaturedCoverCard>
              </div>
            </div>
          </section>

          {/* ── ABOUT ────────────────────────────────────────────── */}
          <section
            className="flex flex-col items-start w-full"
            style={{ padding: 16, paddingBottom: 200 }}
          >
            <div 
              className="flex flex-col md:flex-row items-start w-full" 
              style={{ gap: 16, maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
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
                    I&apos;m a 3rd-year undergrad student pursuing Informatics at the
                    University of Washington in Seattle.
                  </p>
                  <p style={{ margin: 0 }}>
                    I&apos;m driven by a desire to make technology more accessible and more
                    magical ✨, especially through women-centered tech initiatives.
                  </p>
                </div>
              </div>

              {/* 1/3 spacer */}
              <div className="hidden md:block self-stretch shrink-0 bg-white" style={{ width: 223 }} />

              {/* photo */}
              <div
                className="w-1/2 md:flex-1 md:min-w-0 relative rounded-sm overflow-hidden"
                style={{ aspectRatio: "346 / 448" }}
              >
                <Image src="/images/ariana-holding-flowers.png" alt="Ariana Cao holding flowers" fill className="object-cover" />
              </div>
            </div>
          </section>

          {/* ── LOGO STRIP ───────────────────────────────────────── */}
          <section
            className="flex flex-col items-start w-full overflow-hidden"
            style={{ padding: 16 }}
          >
            <div className="overflow-hidden w-full">
              <div
                className="flex items-center shrink-0"
                style={{
                  gap: 128,
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
              style={{ maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
            >
              {/* left: grid + loves */}
              <div className="flex flex-col md:flex-row flex-1 min-w-0 w-full" style={{ gap: 32 }}>
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
                  style={{ gap: 16 }}>
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
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* portrait */}
              <div
                className="relative rounded-sm overflow-hidden shrink-0 w-full md:w-[411px]"
                style={{ aspectRatio: "411 / 546" }}
              >
                <Image src="/images/lilies.png" alt="Lilies" fill className="object-cover" />
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
