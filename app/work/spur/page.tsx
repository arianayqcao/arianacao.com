import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* ─── jump nav ──────────────────────────────────────────────────── */

const JUMP_LINKS = [
  { href: "#context", label: "context" },
  { href: "#goals", label: "goals" },
  { href: "#process", label: "process" },
  { href: "#final-design", label: "final design" },
  { href: "#impact", label: "impact" },
  { href: "#next-steps", label: "next steps" },
];

/* ─── shared section intro (eyebrow + heading + description) ──────── */

function SectionIntro({
  eyebrow,
  heading,
  headingSize = "sm",
  description,
  dark = false,
  children,
}: {
  eyebrow: string;
  heading: string;
  headingSize?: "sm" | "lg";
  description?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xxs)",
          color: "var(--color-accent-rose)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {eyebrow}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-primary)",
          fontWeight: headingSize === "lg" ? "var(--weight-bold)" : "var(--weight-semibold)",
          fontSize: headingSize === "lg" ? "var(--text-2xl)" : "24px",
          letterSpacing: headingSize === "lg" ? "-0.64px" : "-0.24px",
          lineHeight: headingSize === "lg" ? "41.6px" : "31.2px",
          color: dark ? "#fff" : "#000",
          margin: 0,
        }}
      >
        {heading}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-md)",
            color: dark ? "rgba(255,255,255,0.8)" : "var(--color-text-subtle)",
            lineHeight: "var(--leading-body)",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ─── feature row (text + screenshot or video) ─────────────────── */

interface Feature {
  title: string;
  description: string;
  image?: string;
  video?: string;
  aspect: string;
  dark?: boolean;
}

const FEATURES: Feature[] = [
  {
    title: "Search Intentionally",
    description:
      "Search intentionally reminds you what to look for, and encourages quick deep dives than long rabbit holes. All uploads will go directly to your active workspace.",
    video: "/videos/spur/Search-Intentionally.mp4",
    aspect: "605 / 622",
    dark: true,
  },
  {
    title: "Inspiration Feed",
    description:
      "Spur keeps a library of all your saved inspirations. Use search tools to find the inspirations you need, and resurface the ones you missed.",
    image: "/images/Spur/feature-screenshot.jpg",
    aspect: "605.13 / 759.23",
  },
  {
    title: "Insights",
    description:
      "Images will automatically upload with a brief description. Add your own descriptions to provide further context. Insights help you dive deeper into why you saved the image.",
    image: "/images/Spur/feature-screenshot.jpg",
    aspect: "605.13 / 759.23",
  },
  {
    title: "Workspace - Notes",
    description:
      "Take notes on-the-go using voice memos or the note tool to capture your immediate thoughts on your saved content and refer back to them later.",
    image: "/images/Spur/feature-screenshot.jpg",
    aspect: "605.13 / 759.23",
  },
  {
    title: "Figma Integration",
    description: "Spur's Figma plugin lets you easily import your workspaces as separate images.",
    image: "/images/Spur/feature-figma-integration.png",
    aspect: "605.13 / 424.42",
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center w-full" style={{ gap: 24 }}>
      <div className="flex flex-col shrink-0 w-full md:w-[276px]" style={{ gap: 9 }}>
        <h4
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-semibold)",
            fontSize: "var(--text-lg)",
            color: "#000",
            lineHeight: "25.31px",
            margin: 0,
          }}
        >
          {feature.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-md)",
            color: "#000",
            lineHeight: "var(--leading-body)",
            margin: 0,
          }}
        >
          {feature.description}
        </p>
      </div>
      <div
        className="relative w-full md:flex-1 shrink-0 overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: feature.aspect, background: feature.dark ? "#000" : undefined }}
      >
        {feature.video ? (
          <video
            src={feature.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-auto object-contain"
          />
        ) : (
          <Image
            src={feature.image!}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 605px"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

/* ─── "what we found" cards (3-up, black) ─────────────────────────── */

const FINDINGS = [
  {
    title: "Saves become a graveyard",
    description:
      "People save content with intention but rarely return to it. Context is stripped at save-time, making retrieval feel like archaeology.",
  },
  {
    title: "Inspiration requires action to stick",
    description:
      'Psychology sources show that inspiration without a "transmit or actualize" step just fades. Saving ≠ doing.',
  },
  {
    title: "How people re-find things matters cognitively",
    description: "Context beats chronology, and people are filers in intention but pilers in practice.",
  },
];

/* ─── reflection items ─────────────────────────────────────────── */

const REFLECTIONS = [
  {
    number: "01",
    title: 'User testing for AI interactions requires a lot of "Wizard of Oz" prototyping',
    description:
      "We shipped it — now we need to hear from the people who used it. What worked, what was confusing, what they actually wanted.",
  },
  {
    number: "02",
    title: "How feasible are our AI features, and where should we cut back?",
    description:
      "Auto-generated descriptions and insights were the most resource-intensive part of the prototype. We'd want to test which AI-assisted features people actually rely on before investing further effort into all of them.",
  },
  {
    number: "03",
    title: "How can we simplify our interactions further, and drive insights quicker?",
    description: "The system works. Now we make it feel as good as it functions.",
  },
];

/* ─── page ──────────────────────────────────────────────────────── */

export default function SpurPage() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <SiteHeader />

      <main className="flex flex-col items-center w-full">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start w-full" style={{ gap: 48 }}>
          <div className="relative w-full" style={{ aspectRatio: "1440 / 513" }}>
            <Image
              src="/images/Spur/hero-cover.jpg"
              alt="Spur app cover"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-center w-full" style={{ padding: "0 16px" }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, gap: 20 }}>
              <h1
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: "var(--weight-bold)",
                  fontSize: "52px",
                  letterSpacing: "-1.56px",
                  lineHeight: "57.2px",
                  margin: 0,
                }}
              >
                <span style={{ display: "block", color: "#000" }}>Turn cluttered saves into</span>
                <span style={{ display: "block", color: "var(--color-accent-rose)" }}>creative action</span>
              </h1>

              <div className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {[
                  { label: "ROLE", value: "product designer" },
                  {
                    label: "TEAM",
                    value: "sam lopez\njuna kim\nariana cao\ninara khan\nsabrina turnes\nhelen nguyen",
                  },
                  { label: "TIMELINE", value: "5 months · 2026" },
                  { label: "OVERVIEW", value: "mobile app for creative inspiration" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col shrink-0 md:w-[195px]" style={{ gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xxs)",
                        color: "var(--color-accent-rose)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--tracking-wider)",
                        lineHeight: "var(--leading-snug)",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-sm)",
                        color: "#000",
                        lineHeight: "21.12px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── JUMP NAV ─────────────────────────────────────────── */}
        <nav
          className="sticky z-40 bg-white w-full flex justify-center"
          style={{ top: 69, paddingTop: 16, paddingBottom: 16 }}
        >
          <div
            className="flex items-center overflow-x-auto w-full"
            style={{ maxWidth: 1200, gap: 32, paddingInline: 16 }}
          >
            {JUMP_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="shrink-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  lineHeight: "16.8px",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── CONTENT ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center w-full">
          <section id="context" className="w-full flex justify-center" style={{ padding: 16 }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922 }}>
              <SectionIntro
                eyebrow="overview"
                heading="Creative inspiration is often saved impulsively and forgotten quickly, turning meaningful content into digital clutter."
                description="We spend so much time scrolling for inspiration, but rarely return to what we saved."
              >
                <a
                  href="#final-design"
                  className="flex items-center"
                  style={{ gap: 10, marginTop: 8, textDecoration: "none" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-sm)",
                      color: "#000",
                      lineHeight: "21.12px",
                    }}
                  >
                    Jump to final design
                  </span>
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 26, height: 26, background: "var(--color-bg-subtle)" }}
                  >
                    →
                  </span>
                </a>
              </SectionIntro>
            </div>
          </section>

          <section id="goals" className="w-full flex justify-center" style={{ background: "#000", padding: "64px 16px" }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, paddingInline: 0 }}>
              <SectionIntro
                eyebrow="define"
                dark
                heading="How might we help people organize their saved content into actionable sources of creativity?"
              />
            </div>
          </section>

          <section id="process" className="w-full flex justify-center" style={{ padding: 16 }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, gap: 96 }}>
              <div className="flex flex-col items-start w-full" style={{ gap: 32 }}>
                <SectionIntro
                  eyebrow="insights"
                  heading="We surveyed, interviewed over 100 creatives."
                  description='Context beats chronology, and people are filers in intention but pilers in practice. Psychology sources show that inspiration without a "transmit or actualize" step just fades. Saving ≠ doing.'
                />
                <div className="w-full flex justify-center">
                  <div className="relative" style={{ width: 342, aspectRatio: "342 / 300.08" }}>
                    <Image src="/images/Spur/survey-collage.png" alt="" fill sizes="342px" className="object-contain" />
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: "var(--weight-semibold)",
                    fontSize: "24px",
                    letterSpacing: "-0.24px",
                    lineHeight: "31.2px",
                    color: "#000",
                    margin: 0,
                  }}
                >
                  What we found.
                </h3>
                <div className="flex flex-col md:flex-row w-full" style={{ gap: 10 }}>
                  {FINDINGS.map(({ title, description }) => (
                    <div
                      key={title}
                      className="flex flex-col flex-1 items-center justify-center text-center"
                      style={{ background: "#000", padding: 26, gap: 10, minHeight: 280 }}
                    >
                      <h4
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontWeight: "var(--weight-semibold)",
                          fontSize: "24px",
                          letterSpacing: "-0.24px",
                          lineHeight: "31.2px",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontSize: "var(--text-md)",
                          lineHeight: "var(--leading-body)",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <SectionIntro
                eyebrow="insights"
                heading="Existing solutions made users choose between exploration and action."
                description="We conducted competitive analyses on four different solutions: mymind, Milanote, Eagle, and Obsidian."
              >
                <div className="relative w-full mt-6" style={{ aspectRatio: "921.59 / 518.39" }}>
                  <Image src="/images/Spur/competitive-analysis.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 922px" className="object-cover" />
                </div>
              </SectionIntro>

              <SectionIntro
                eyebrow="ideation"
                heading="We drafted initial user flows."
                description="We sketched flows for saving, searching, and organizing inspiration—mapping how someone could move from a single save to a finished idea."
              >
                <div className="relative w-full mt-6" style={{ aspectRatio: "921.59 / 518.39" }}>
                  <Image src="/images/Spur/user-flows.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 922px" className="object-cover" />
                </div>
              </SectionIntro>

              <SectionIntro
                eyebrow="ideation"
                heading="We vibe coded a mid-fidelity prototype to better understand how users would upload content and create spaces."
                description="We discovered that users would find more value creating insights and actions in the workspace rather than purely in the inspiration feed."
              >
                <div className="w-full flex justify-center mt-6" style={{ background: "#bdbdbd", padding: 16 }}>
                  <div className="flex w-full" style={{ gap: 10 }}>
                    {[
                      { src: "/images/Spur/prototype-1.png", aspect: "214.89 / 419.33" },
                      { src: "/images/Spur/prototype-2.png", aspect: "214.91 / 434.52" },
                      { src: "/images/Spur/prototype-3.png", aspect: "214.89 / 431.33" },
                      { src: "/images/Spur/prototype-4.png", aspect: "214.91 / 438.53" },
                    ].map(({ src, aspect }) => (
                      <div key={src} className="relative flex-1" style={{ aspectRatio: aspect }}>
                        <Image src={src} alt="" fill sizes="(max-width: 768px) 25vw, 215px" className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </SectionIntro>

              <SectionIntro
                eyebrow="iteration"
                heading="Our current direction prioritized curation over action. How can we tailor Spur to exist closer in the space between image discovery and creation?"
              >
                <div className="relative w-full mt-6" style={{ aspectRatio: "921.59 / 331.67" }}>
                  <Image src="/images/Spur/pivot-visual.png" alt="" fill sizes="(max-width: 768px) 100vw, 922px" className="object-contain" />
                </div>
              </SectionIntro>
            </div>
          </section>

          <section id="final-design" className="w-full flex justify-center" style={{ padding: 16 }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, gap: 32 }}>
              <SectionIntro
                eyebrow="solution"
                headingSize="lg"
                heading="Spur, in full."
                description="Spur brings saving, searching, and creating into one workspace, so inspiration turns into action instead of disappearing into a folder."
              />
              <div className="relative w-full" style={{ aspectRatio: "921.59 / 655.36" }}>
                <Image
                  src="/images/Spur/final-design-cover.jpg"
                  alt="Spur app screens"
                  fill
                  sizes="(max-width: 768px) 100vw, 922px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col w-full" style={{ gap: 64 }}>
                {FEATURES.map((feature) => (
                  <FeatureRow key={feature.title} feature={feature} />
                ))}
              </div>
            </div>
          </section>

          <section id="next-steps" className="w-full flex justify-center" style={{ padding: 16 }}>
            <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, gap: 40 }}>
              <SectionIntro eyebrow="reflection" heading="What we learned, what we'd do differently:" />
              <div className="flex flex-col w-full" style={{ gap: 32 }}>
                {REFLECTIONS.map(({ number, title, description }) => (
                  <div key={number} className="flex items-start w-full" style={{ gap: 32 }}>
                    <span
                      className="shrink-0"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "24px",
                        lineHeight: "33.6px",
                        color: "var(--color-accent-rose)",
                        width: 27,
                      }}
                    >
                      {number}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0" style={{ gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontWeight: "var(--weight-bold)",
                          fontSize: "var(--text-md)",
                          color: "var(--color-accent-rose)",
                          lineHeight: "var(--leading-body)",
                        }}
                      >
                        {title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontSize: "var(--text-md)",
                          color: "#000",
                          lineHeight: "var(--leading-body)",
                        }}
                      >
                        {description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative w-full" style={{ aspectRatio: "921.59 / 515.75" }}>
                <Image src="/images/Spur/reflection.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 922px" className="object-cover rounded-lg" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
