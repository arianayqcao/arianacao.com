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
      eyebrow: "Design for America · 2026",
      title: "Spur",
      description:
        "Designing civic action tools that mobilize student volunteers for community service.",
      href: "/work/spur",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/Spur - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "view-case-study"
    },
    {
      eyebrow: "DubHacks · 2026",
      title: "DubHacks 2026",
      description:
        "Designing cooking-themed annual website for largest hackathon in the Pacific Northwest.",
      href: "/work/dubhacks-2026",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/DubHacks 2026 - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "coming-soon"
    },
  ],
  [
    {
      eyebrow: "WINFO Hackathon · 2025",
      title: "Cura",
      description:
        "Empowering families to manage caregiving with accessible, user-friendly tools and resources.",
      href: "/work/cura",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/Cura - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "view-case-study"
    },
    {
      eyebrow: "DubHacks · 2026",
      title: "DubCoin Reward System",
      description:
        "Redesigning the DubCoin experience and DubCoin distribution system.",
      href: "/work/dubcoin-system",
      coverStyle: {
        backgroundImage: 'url("/images/Case Study Cover Images/DubCoin Reward System - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      cursor: "view-case-study"
    },
  ],
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
        style={{ gap: "var(--space-16)" }}
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
            <div style={{ width: 575, maxWidth: "100%", height: 510 }}>
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
            className="flex flex-col w-1/2"
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
            {CASE_STUDIES.map((row, ri) => (
              <div key={ri} className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {row.map((study, ci) => (
                  <CaseStudyCard
                    key={study.title}
                    study={study}
                    isSpecialCard={ri === 2 && ci === 0}
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
