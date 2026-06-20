import Link from "next/link";
import AppleInteractive from "@/components/AppleInteractive";
import SnakeGame from "@/components/SnakeGame";

/* ─── nav ──────────────────────────────────────────────────────── */

function NavApple() {
  return (
    <svg width="35" height="32" viewBox="310 665 1090 1015" aria-hidden="true">
      <path
        d="M364.579 976.437L358.579 1191.15L364.466 1303.88L530.797 1514.49
           L690.436 1618.69L809.079 1592.84L809.63 1585.59L917.214 1603.95
           L1192.93 1544.02L1287.04 1379.23L1384.96 1072.96L1266.79 788.341
           L1002.06 698.475L862.248 766.717L775.697 798.341L610.917 790.019Z"
        fill="#F60000"
      />
      <path
        d="M885.567 842.85L802.553 756.906L814.073 757.521L828.922 743.233
           L915.843 689.518L1083.83 743.233L1165.86 796.948L1225.44 814.527
           L1119.96 883.869H967.605Z"
        fill="#93F200"
      />
      <path
        d="M730.353 726.907L759.802 710.876L802.553 789.406L773.104 805.438L732.073 750.225Z"
        fill="#341208"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/play", label: "play" },
  { href: "/about", label: "about" },
];

/* ─── case studies ─────────────────────────────────────────────── */

interface CaseStudy {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  coverStyle: React.CSSProperties;
  coverContent?: React.ReactNode;
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
        backgroundImage: 'url("/public/Case Study Cover Images/Spur - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    {
      eyebrow: "WINFO Hackathon · 2025",
      title: "DubHacks 2026",
      description:
        "Designing cooking-themed annual website for largest hackathon in the Pacific Northwest.",
      href: "/work/dubhacks-2026",
      coverStyle: {
        backgroundImage: 'url("/public/Case Study Cover Images/DubHacks 2026 - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
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
        backgroundImage: 'url("/public/Case Study Cover Images/Cura - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    {
      eyebrow: "DubHacks · 2026",
      title: "DubCoin Reward System",
      description:
        "Redesigning the DubCoin experience and DubCoin distribution system.",
      href: "/work/dubcoin-system",
      coverStyle: {
        backgroundImage: 'url("/public/Case Study Cover Images/DubCoin Reward System - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  ],
  [
    {
      eyebrow: "Lily's Salvadorean · 2025",
      title: "Lily's Salvadorean",
      description: "Redesigned local family business's restaurant website.",
      href: "/work/lilys",
      coverStyle: {
        backgroundImage: 'url("/public/Case Study Cover Images/Lily\'s Salvadorean - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    {
      eyebrow: "DubHacks · 2025",
      title: "DubHacks 2025",
      description:
        "Led website design and prototyping for DubHacks 2025, supporting 1,100+ participants.",
      href: "/work/dubhacks-2025",
      coverStyle: {
        backgroundImage: 'url("/public/Case Study Cover Images/DubHacks 2025 - Cover Image - Case Study.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
  ],
];

function CaseStudyCard({ study, isSpecialCard = false }: { study: CaseStudy; isSpecialCard?: boolean }) {
  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-clip" style={{ gap: 16 }}>
      <Link
        href={study.href}
        className="flex flex-col overflow-clip rounded-lg shrink-0 w-full"
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
      <div className="flex flex-col shrink-0 w-full" style={{ gap: 4 }}>
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
  { name: "Notion", src: "/logos/logoblack.svg" },
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
      <header className="sticky top-0 z-50 w-full bg-white">
        <nav
          className="flex items-center justify-between"
          style={{ padding: 16 }}
        >
          {/* logo */}
          <Link href="/" className="flex items-center" style={{ paddingRight: 16, paddingBlock: 8 }}>
            <NavApple />
          </Link>

          {/* centre links */}
          <div className="flex-1 flex justify-center" style={{ paddingBlock: 8 }}>
            <div className="flex" style={{ gap: 32 }}>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "#000",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    lineHeight: "16px",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14.1,
              color: "#000",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "21.12px",
            }}
          >
            Resume
          </a>
        </nav>
      </header>

      {/* ══ MAIN ══════════════════════════════════════════════════ */}
      <main
        className="flex flex-col items-center w-full"
        style={{ gap: "var(--space-40)" }}
      >

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="flex items-center justify-center w-full"
          style={{ padding: "32px 16px" }}
        >
          <div
            className="flex flex-col items-center"
            style={{ width: 649, maxWidth: "100%", gap: 24 }}
          >
            <h1
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-4xl)",
                fontWeight: "var(--weight-black)",
                color: "var(--color-heading)",
                lineHeight: "var(--leading-tight)",
                width: "100%",
              }}
            >
              ariana cao.
            </h1>
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
            className="flex flex-col"
            style={{ width: 695, maxWidth: "100%", gap: 24 }}
          >
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-2xl)",
                color: "#000",
                lineHeight: "normal",
                margin: 0,
              }}
            >
              Ariana is a product designer with a passion for crafting magical
              experiences that feel{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#7bc100",
                  textDecorationThickness: "12%",
                  textDecorationSkipInk: "none",
                }}
              >
                intuitive
              </span>
              ,{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#93f200",
                  textDecorationThickness: "12%",
                  textDecorationSkipInk: "none",
                }}
              >
                inclusive
              </span>
              , and{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "red",
                  textDecorationThickness: "12%",
                  textDecorationSkipInk: "none",
                }}
              >
                quietly delightful
              </span>
              .
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-md)",
                color: "rgba(0,0,0,0.7)",
                lineHeight: "normal",
                margin: 0,
                fontStyle: "normal",
              }}
            >
              Based in Seattle, WA.{"\n"}
              Constantly collecting free magazines, making tea.
            </p>
          </div>
        </section>

        {/* ── CASE STUDIES ─────────────────────────────────────── */}
        <section
          className="flex items-start justify-center w-full"
          style={{ padding: 16 }}
        >
          <div className="flex flex-col flex-1 min-w-0" style={{ gap: 16 }}>
            {CASE_STUDIES.map((row, ri) => (
              <div key={ri} className="flex w-full" style={{ gap: 16 }}>
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
          <div className="flex items-start w-full" style={{ gap: 16 }}>
            {/* text */}
            <div
              className="flex flex-col flex-1 min-w-0 self-stretch"
              style={{ gap: 16 }}
            >
              <h2
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
            <div className="self-stretch shrink-0 bg-white" style={{ width: 223 }} />

            {/* photo */}
            <div
              className="flex-1 min-w-0 relative rounded-lg overflow-hidden"
              style={{ aspectRatio: "346 / 448" }}
            >
              {<Image src="public\image of ariana holding flowers.png" alt="Ariana Cao holding flowers" fill className="object-cover" />}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, #d4e8c2 0%, #8cb878 40%, #4a7c3f 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Photo
                </span>
              </div>
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
                    opacity: 0.5,
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
          <div className="flex items-start w-full" style={{ gap: 64 }}>
            {/* left: grid + loves */}
            <div className="flex flex-1 min-w-0" style={{ gap: 32 }}>
              {/* practices / toolkit grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  columnGap: 32,
                  rowGap: 16,
                  width: 299,
                  flexShrink: 0,
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
                  <>
                    <span
                      key={label + "-label"}
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
                      key={label + "-tools"}
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
                  </>
                ))}
              </div>

              {/* loves */}
              <div className="flex flex-col shrink-0" style={{ gap: 16, width: 145 }}>
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
              className="relative rounded-lg overflow-hidden shrink-0"
              style={{ width: 411, height: 546 }}
            >
              {/* Replace with: <Image src="/images/portrait.jpg" alt="Portrait" fill className="object-cover" /> */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, #f5e6c8 0%, #e8c68a 50%, #c4a265 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "rgba(0,0,0,0.3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Photo
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer
        className="relative flex flex-col items-center justify-center overflow-hidden w-full"
        style={{
          background: "#191918",
          paddingTop: 64,
          paddingBottom: 16,
          paddingInline: 16,
          gap: 128,
        }}
      >
        {/* ── CTA + nav links ──────────────────────────────────── */}
        <div className="flex items-start justify-between w-full shrink-0">
          {/* left: heading + tagline */}
          <div className="flex flex-col shrink-0" style={{ width: 340, gap: 19 }}>
            <h2
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-3xl)",
                color: "white",
                lineHeight: "normal",
                margin: 0,
              }}
            >
              Hey, have you played yet today?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-md)",
                color: "white",
                lineHeight: "var(--leading-body)",
                margin: 0,
                fontStyle: "normal",
              }}
            >
              MADE WITH &lt;3 AND LOTS OF PLAY.
            </p>
          </div>

          {/* right: link columns */}
          <div className="flex items-center shrink-0" style={{ gap: 32 }}>
            {/* say hi */}
            <div className="flex flex-col" style={{ gap: 8, width: 145 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xxs)",
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wider)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                Say hi
              </span>
              {[
                { label: "linkedin", href: "https://linkedin.com/in/arianacaoyu" },
                { label: "resume", href: "/resume.pdf" },
                { label: "email", href: "mailto:ariana.yq.cao@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-md)",
                    color: "#6b6b6b",
                    lineHeight: "var(--leading-body)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* page */}
            <div className="flex flex-col" style={{ gap: 8, width: 145 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xxs)",
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wider)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                Page
              </span>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-md)",
                    color: "#6b6b6b",
                    lineHeight: "var(--leading-body)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── snake game ───────────────────────────────────────── */}
        <div className="shrink-0">
          <SnakeGame />
        </div>

        {/* ── bottom bar ───────────────────────────────────────── */}
        <div
          className="flex items-center justify-between w-full shrink-0"
          style={{ opacity: 0.898 }}
        >
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-regular)",
                fontSize: "var(--text-md)",
                color: "#6b6b6b",
                lineHeight: "var(--leading-body)",
              }}
            >
              © Built by Ariana Cao
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-md)",
                color: "#6b6b6b",
                lineHeight: "var(--leading-body)",
                fontStyle: "normal",
              }}
            >
              LAST PUSH: JUNE 17, 2026.
            </span>
          </div>

          <div className="flex items-center" style={{ gap: 32 }}>
            <a
              href="https://github.com/arianacaoyu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "#6b6b6b", lineHeight: 0 }}
            >
              <svg
                width="20" height="20" viewBox="0 0 20 20"
                fill="currentColor" aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                     0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                     -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                     .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951
                     0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65
                     0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337
                     1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651
                     .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
                     .359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
                     0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/arianacaoyu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "#6b6b6b", lineHeight: 0 }}
            >
              <svg
                width="20" height="20" viewBox="0 0 20 20"
                fill="currentColor" aria-hidden="true"
              >
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39
                         0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037
                         c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711z
                         M5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337
                         9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1
                         2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582
                         1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
