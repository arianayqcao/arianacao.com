import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import AppleInteractive from "@/components/AppleInteractive";
import HeroTitleReveal from "@/components/HeroTitleReveal";
import ScrambleBioText from "@/components/ScrambleBioText";
import BioHeadlineReveal from "@/components/BioHeadlineReveal";
import SiteHeader, { NAV_LINKS } from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* ─── case studies ─────────────────────────────────────────────── */

interface CaseStudy {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  coverStyle: React.CSSProperties;
  coverContent?: React.ReactNode;
  cursor?: string;
}

const CASE_STUDIES: CaseStudy[][] = [
  [
    {
      eyebrow: "Lily's Salvadorean · 2025",
      title: "Lily's Salvadorean",
      description: "Redesigned local family business's restaurant website.",
      href: "/work/lilys",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/Lily\'s Salvadorean - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "coming-soon"
    },
    {
      eyebrow: "DubHacks · 2025",
      title: "DubHacks 2025",
      description:
        "Led website design and prototyping for DubHacks 2025, supporting 1,100+ participants.",
      href: "/work/dubhacks-2025",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/DubHacks 2025 - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "coming-soon"
    },
  ],
];

function CaseStudyCard({ study, isSpecialCard = false }: { study: CaseStudy; isSpecialCard?: boolean }) {
  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-clip" style={{ gap: 16 }}>
      <Link
        href={study.href}
        data-cursor={study.cursor ?? "default"}
        className="flex flex-col overflow-clip rounded shrink-0 w-full"
        style={{
          height: 450,
          border: isSpecialCard ? "1px solid rgba(0,0,0,0.1)" : undefined,
        }}
      >
        <div
          className="flex-1 relative w-full"
          style={study.coverStyle}
        >
          {study.coverContent}
        </div>
      </Link>

      {/* description */}
      <div className="flex flex-col shrink-0 w-full" data-cursor="text-regular" style={{ gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xxs)",
            color: "rgba(0,0,0,0.5)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {study.eyebrow}
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-xl)",
            color: "#000",
            lineHeight: "normal",
          }}
        >
          {study.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-md)",
            color: "rgba(0,0,0,0.5)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {study.description}
        </span>
      </div>
    </div>
  );
}

/* ─── featured case studies (spur / cura / dubcoin / dubhacks 2026) ── */

const BEZELS = {
  iphone17: {
    src: "/images/bezels/iphone-17-black.png",
    naturalRatio: 600 / 1227,
    inset: { top: 7.99, right: 5.33, bottom: 2.53, left: 5.33 },
  },
  iphone17pro: {
    src: "/images/bezels/iphone-17-pro-silver.png",
    naturalRatio: 900 / 1840,
    inset: { top: 7.99, right: 5.33, bottom: 2.5, left: 5.33 },
  },
} as const;

function PhoneMockup({
  bezel,
  maxWidthPx,
  textClearancePx,
  children,
}: {
  bezel: (typeof BEZELS)[keyof typeof BEZELS];
  maxWidthPx: number;
  /** vertical space to always leave clear at the bottom of the card for the eyebrow/title/description overlay */
  textClearancePx: number;
  children: React.ReactNode;
}) {
  // Height-driven sizing: fills up to 90% of the space above the reserved text
  // area, but never taller than what would make the phone wider than
  // maxWidthPx — this is what keeps the phone from ever overlapping the
  // bottom text overlay, at any card width (mobile included).
  const capHeightPx = maxWidthPx / bezel.naturalRatio;

  // The screen cutout is much taller than it is wide, so a single "X%"
  // border-radius (X% of width horizontally, X% of height vertically) draws
  // an oval instead of matching the bezel's circular corner. Compensate by
  // scaling the vertical radius by the screen's own aspect ratio so both
  // resolve to the same pixel radius.
  const screenWidthPct = 100 - bezel.inset.left - bezel.inset.right;
  const screenHeightPct = 100 - bezel.inset.top - bezel.inset.bottom;
  const screenAspect = (screenWidthPct / screenHeightPct) * bezel.naturalRatio;
  const cornerRadiusPctX = 14;
  const cornerRadiusPctY = cornerRadiusPctX * screenAspect;

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ top: 0, left: 0, right: 0, bottom: textClearancePx }}
    >
      <div
        className="relative"
        style={{
          height: `min(90%, ${capHeightPx}px)`,
          aspectRatio: bezel.naturalRatio,
        }}
      >
        <Image src={bezel.src} alt="" fill sizes="(max-width: 768px) 60vw, 420px" style={{ objectFit: "fill" }} />
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${bezel.inset.top}%`,
            left: `${bezel.inset.left}%`,
            right: `${bezel.inset.right}%`,
            bottom: `${bezel.inset.bottom}%`,
            borderRadius: `${cornerRadiusPctX}% / ${cornerRadiusPctY}%`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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
  return (
    <Link
      href={card.href}
      data-cursor={card.cursor}
      className={`relative block overflow-hidden rounded w-full ${gridClassName}`}
      style={{
        background: card.bg,
        aspectRatio: card.heightPx ? undefined : card.aspectRatio,
        height: card.heightPx,
        order: card.order,
      }}
    >
      {children}
      <div
        className="absolute bottom-0 left-0 w-full flex flex-col"
        style={{ padding: 32, gap: 4, background: card.gradient }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xxs)",
            color: card.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
            letterSpacing: "var(--tracking-wider)",
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
            color: card.textDark ? "#000" : "#fff",
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
            color: card.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {card.description}
        </span>
      </div>
    </Link>
  );
}

const DARK_GRADIENT = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.75) 100%)";
const LIGHT_GRADIENT = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 100%)";

const SPUR_CARD: FeaturedCard = {
  eyebrow: "Design for America · 2026",
  title: "Spur",
  description: "Creative inspiration is often saved impulsively and forgotten quickly, turning meaningful content into digital clutter.",
  href: "/work/spur",
  cursor: "view-case-study",
  bg: "var(--primitive-spur-black)",
  gradient: DARK_GRADIENT,
  aspectRatio: "696 / 900",
  order: 1,
};

const CURA_CARD: FeaturedCard = {
  eyebrow: "WINFO Hackathon · 2025",
  title: "Cura",
  description: "Empowering families to manage caregiving with accessible, user-friendly tools and resources.",
  href: "/work/cura",
  cursor: "view-case-study",
  bg: "rgba(0,0,0,0.05)",
  textDark: true,
  gradient: LIGHT_GRADIENT,
  aspectRatio: "696 / 1226",
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
  aspectRatio: "696 / 845",
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
  heightPx: 460,
  order: 4,
};

/* ─── logo strip ────────────────────────────────────────────────── */

const LOGOS = [
  { name: "Figma", src: "/logos/Figma-logo-lockup.jpg" },
  { name: "Adobe CC", src: "/logos/Adobe_Creative_Cloud_rainbow_icon.svg" },
  { name: "Blender", src: "/logos/Logo_Blender.svg" },
  { name: "React", src: "/logos/reactjs_logo_icon_170805.svg" },
  { name: "Tailwind CSS", src: "/logos/Tailwind_CSS_logo_with_dark_text.svg" },
  { name: "Jitter", src: "/logos/Jitter_logo.png" },
  { name: "Lovable", src: "/logos/lovable-dark-png.png" },
  { name: "GSAP", src: "/logos/GSAP_logo.jpeg" },
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

export default function WorkPage() {
  return (
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
            className="flex flex-col w-1/2 md:w-full"
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
          style={{ padding: 16 }}
        >
          <div 
            className="flex flex-col flex-1 min-w-0" 
            style={{ gap: 16, maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
            >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full" style={{ gap: 16 }}>
              <FeaturedCoverCard card={SPUR_CARD} gridClassName="order-1 md:order-none md:col-start-1 md:row-start-1">
                <PhoneMockup bezel={BEZELS.iphone17} maxWidthPx={300} textClearancePx={170}>
                  <video
                    src="/videos/spur/spur-adding-content.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 size-full object-cover"
                  />
                </PhoneMockup>
              </FeaturedCoverCard>

              <FeaturedCoverCard card={CURA_CARD} gridClassName="order-2 md:order-none md:col-start-2 md:row-start-1">
                <PhoneMockup bezel={BEZELS.iphone17pro} maxWidthPx={402} textClearancePx={190}>
                  <Image
                    src="/images/cura-home.png"
                    alt="Cura app home screen showing today's caregiving schedule"
                    fill
                    sizes="(max-width: 768px) 60vw, 420px"
                    className="object-cover"
                  />
                </PhoneMockup>
              </FeaturedCoverCard>

              <FeaturedCoverCard card={DUBCOIN_CARD} gridClassName="order-3 md:order-none md:col-start-1 md:row-start-2">
                <PhoneMockup bezel={BEZELS.iphone17} maxWidthPx={320} textClearancePx={170}>
                  <Image
                    src="/images/Case Study Cover Images/DubCoin Prizes.png"
                    alt="DubCoin prizes screen showing a QR code to redeem coins"
                    fill
                    sizes="(max-width: 768px) 60vw, 420px"
                    className="object-cover"
                  />
                </PhoneMockup>
              </FeaturedCoverCard>

              <FeaturedCoverCard card={DUBHACKS_2026_CARD} gridClassName="order-4 md:order-none md:col-start-2 md:row-start-2">
                <video
                  src="/videos/Sponsor-Us-Button-Animation-DH26-Jitter.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute object-cover"
                  style={{ left: 83.5, top: 16.5, width: 673.5, height: 435.8 }}
                />
              </FeaturedCoverCard>
            </div>

            {CASE_STUDIES.map((row, ri) => (
              <div key={ri} className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {row.map((study, ci) => (
                  <CaseStudyCard
                    key={study.title}
                    study={study}
                    isSpecialCard={ri === 0 && ci === 0}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section
          className="flex flex-col items-start w-full"
          style={{ padding: 16 }}
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
                  fontSize: "var(--text-3xl)",
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
              className="w-full md:flex-1 md:min-w-0 relative rounded-lg overflow-hidden"
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
                height: 32,
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
                    height: 28,
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
          style={{ paddingInline: 16, paddingTop: 16, paddingBottom: 32 }}
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
              className="relative rounded-lg overflow-hidden shrink-0 w-full md:w-[411px]"
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
  );
}
