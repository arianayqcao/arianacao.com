import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const sections = [
  ["context", "Context"],
  ["define", "Define"],
  ["insights", "Insights"],
  ["ideation", "Ideation"],
  ["iteration", "Iteration"],
  ["solution", "Solution"],
  ["reflection", "Reflection"],
] as const;

const impact = [
  {
    value: "Won Best Research-Driven Design",
    label: "at the Design For America Expo 2026",
  },
];

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
    description:
      "Context beats chronology, and people are filers in intention but pilers in practice.",
  },
];

type Feature = {
  title: string;
  description: string;
  image?: string;
  video?: string;
  aspect: string;
  dark?: boolean;
  maxHeight?: number;
};

const FEATURES: Feature[] = [
  {
    title: "Search Intentionally",
    description:
      "Search intentionally reminds you what to look for, and encourages quick deep dives than long rabbit holes. All uploads will go directly to your active workspace.",
    video: "/videos/spur/Search-Intentionally.mp4",
    aspect: "1400 / 1086",
    dark: true,
  },
  {
    title: "Inspiration Feed",
    description:
      "Spur keeps a library of all your saved inspirations. Use search tools to find the inspirations you need, and resurface the ones you missed.",
    video: "/videos/spur/inspiration-feed.mp4",
    aspect: "700 / 700",
  },
  {
    title: "Insights",
    description:
      "Images will automatically upload with a brief description. Add your own descriptions to provide further context. Insights help you dive deeper into why you saved the image.",
    video: "/videos/spur/insights.mp4",
    aspect: "700 / 700",
  },
  {
    title: "Albums",
    description:
      "Organize your saved content into albums to make it easier to revisit inspiration and take creative action.",
    video: "/videos/spur/albums.mp4",
    aspect: "700 / 700",
    maxHeight: 300,
  },
  {
    title: "Creating Workspaces",
    description:
      "Workspaces provide sub-boards tailored to your initial intentions.",
    video: "/videos/spur/creating-workspace.mp4",
    aspect: "700 / 700",
    maxHeight: 300,
  },
  {
    title: "Workspace - Notes",
    description:
      "Take notes on-the-go using voice memos or the note tool to capture your immediate thoughts on your saved content and refer back to them later.",
    image: "/images/Spur/spur-notes.png",
    aspect: "510 / 518",
    maxHeight: 200,
  },
  {
    title: "Exporting",
    description: "Export your workspace as a PNG.",
    image: "/images/Spur/spur-exporting.png",
    aspect: "150 / 113",
    maxHeight: 200,
  },
  {
    title: "Figma Integration",
    description:
      "Spur's Figma plugin lets you easily import your workspaces as separate images.",
    image: "/images/Spur/figma-plugin.webp",
    aspect: "605.13 / 424.42",
  },
];

const REFLECTIONS = [
  {
    number: "01",
    title:
      'User testing for AI interactions requires a lot of "Wizard of Oz" prototyping',
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
    title:
      "How can we simplify our interactions further, and drive insights quicker?",
    description: "The system works. Now we make it feel as good as it functions.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-case-study-eyebrow">{children}</p>;
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="case-study-section" id={id}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="text-case-study-section-title">{title}</h2>
      {children && (
        <div className="case-study-prose text-case-study-body">{children}</div>
      )}
    </section>
  );
}

function Media({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={`case-study-media ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 920px"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center w-full gap-6">
      <div className="flex flex-col shrink-0 w-full md:w-[276px] gap-2">
        <h4>{feature.title}</h4>
        <p>{feature.description}</p>
      </div>
      <div
        className="relative w-full md:flex-1 shrink-0 overflow-hidden flex items-center justify-center"
        style={{
          aspectRatio: feature.aspect,
          background: feature.dark ? "#000" : undefined,
        }}
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
            alt={`${feature.title} screen in the Spur app`}
            fill
            sizes="(max-width: 768px) 100vw, 605px"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function SpurPage() {
  return (
    <>
      <SiteHeader />
      <div className="case-study-page case-study-layout">
        {/* ---------- Sidebar ---------- */}
        <aside className="case-study-sidebar" aria-label="Case study sections">
          <nav>
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a className="case-study-backTop" href="#top">
            ↑ <span>BACK TO TOP</span>
          </a>
        </aside>

        <main className="case-study-main" id="top">
          {/* ---------- Cover ---------- */}
          <div className="case-study-cover">
            <Image
              src="/images/Spur/spur-hero.png"
              alt="Spur app cover"
              fill
              priority
              sizes="(max-width: 760px) 100vw, calc(100vw - 200px)"
            />
          </div>

          <article className="case-study-article">
            {/* ---------- Intro ---------- */}
            <header className="case-study-intro">
              <h1 className="text-case-study-page-title">
                Turn cluttered saves into creative action
              </h1>

              <div className="case-study-meta">
                <div>
                  <Eyebrow>Timeline</Eyebrow>
                  <p>5 months · 2026</p>
                </div>
                <div>
                  <Eyebrow>Role</Eyebrow>
                  <p>Product Designer</p>
                </div>
                <div>
                  <Eyebrow>Team</Eyebrow>
                  <p>
                    Sam Lopez
                    <br />
                    Juna Kim
                    <br />
                    Ariana Cao
                    <br />
                    Inara Khan
                    <br />
                    Sabrina Turnes
                    <br />
                    Helen Nguyen
                  </p>
                </div>
                <div>
                  <Eyebrow>Overview</Eyebrow>
                  <p>Mobile app for creative inspiration</p>
                </div>
              </div>
            </header>

            {/* ---------- Stats ---------- */}
            <section className="case-study-stats" aria-label="Project data">
              {impact.map((stat) => (
                <div key={stat.value}>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </div>
              ))}
            </section>

            {/* ---------- Context ---------- */}
            <Section
              id="context"
              label="Context"
              title="Creative inspiration is often saved impulsively and forgotten quickly, turning meaningful content into digital clutter."
            >
              <p>
                We spend so much time scrolling for inspiration, but rarely
                return to what we saved.
              </p>
              <p>
                <a href="#solution">Jump to final design →</a>
              </p>
            </Section>

            {/* ---------- Define ---------- */}
            <Section
              id="define"
              label="Define"
              title="How might we help people organize their saved content into actionable sources of creativity?"
            />

            {/* ---------- Insights ---------- */}
            <Section
              id="insights"
              label="Insights"
              title="We surveyed, interviewed over 100 creatives."
            >
              <p>
                Context beats chronology, and people are filers in intention but
                pilers in practice. Psychology sources show that inspiration
                without a &quot;transmit or actualize&quot; step just fades.
                Saving ≠ doing.
              </p>

              <Media
                width={342}
                height={300}
                src="/images/Spur/initial-research.webp"
                alt="Collage summarizing Spur's user research: over 100 survey responses, 8 recorded interviews, and 25 literature reviews"
              />

              <h3>What we found.</h3>

              <div className="case-study-threeCards">
                {FINDINGS.map(({ title, description }) => (
                  <div key={title}>
                    <b>{title}</b>
                    <p>{description}</p>
                  </div>
                ))}
              </div>

              <h3>
                Existing solutions made users choose between exploration and
                action.
              </h3>
              <p>
                We conducted competitive analyses on four different solutions:
                mymind, Milanote, Eagle, and Obsidian.
              </p>

              <Media
                width={1715}
                height={965}
                src="/images/Spur/competitive-analysis.webp"
                alt="Dock of competitor app icons analyzed for Spur: mymind, Milanote, Eagle, and Obsidian"
              />
            </Section>

            {/* ---------- Ideation ---------- */}
            <Section
              id="ideation"
              label="Ideation"
              title="We drafted initial user flows."
            >
              <p>
                We sketched flows for saving, searching, and organizing
                inspiration—mapping how someone could move from a single save to
                a finished idea.
              </p>

              <Media
                width={1715}
                height={965}
                src="/images/Spur/user-flows.webp"
                alt="Four sketched user flow diagrams for Spur: media search, importing inspiration, project creation, and onboarding"
              />

              <h3>
                We vibe coded a mid-fidelity prototype to better understand how
                users would upload content and create spaces.
              </h3>
              <p>
                We discovered that users would find more value creating insights
                and actions in the workspace rather than purely in the
                inspiration feed.
              </p>

              <Media
                width={1715}
                height={965}
                src="/images/Spur/user-testing.webp"
                alt="Mid-fidelity vibe coded Spur prototype used to test uploading content and creating spaces"
              />
            </Section>

            {/* ---------- Iteration ---------- */}
            <Section
              id="iteration"
              label="Iteration"
              title="Our current direction prioritized curation over action. How can we tailor Spur to exist closer in the space between image discovery and creation?"
            >
              <Media
                width={1715}
                height={617}
                src="/images/Spur/pivot.webp"
                alt="Dock of app icons illustrating Spur's pivot, positioned between discovery apps like Pinterest, Cosmos, and Are.na, and creation tools like Figma"
              />
            </Section>

            {/* ---------- Solution ---------- */}
            <Section id="solution" label="Solution" title="Spur, in full.">
              <p>
                Spur brings saving, searching, and creating into one workspace,
                so inspiration turns into action instead of disappearing into a
                folder.
              </p>

              <Media
                width={1715}
                height={1220}
                src="/images/Spur/spur-final-designs.webp"
                alt="Spur app screens"
              />

              <div className="flex flex-col w-full gap-16">
                {FEATURES.map((feature) => (
                  <FeatureRow key={feature.title} feature={feature} />
                ))}
              </div>
            </Section>

            {/* ---------- Reflection ---------- */}
            <Section
              id="reflection"
              label="Reflection"
              title="What we learned, what we'd do differently:"
            >
              <ol className="case-study-nextSteps">
                {REFLECTIONS.map(({ number, title, description }) => (
                  <li key={number}>
                    <span>{number}</span>
                    <p>
                      <strong>{title}</strong> {description}
                    </p>
                  </li>
                ))}
              </ol>

              <Media
                width={1715}
                height={960}
                src="/images/Spur/spur-gradient.webp"
                alt="Spur app splash screen with the tagline 'Turn your cluttered saves into creative action'"
              />
            </Section>

            <div className="case-study-endnav">
              <Link href="/work">← Back to work</Link>
              <a href="#top">Back to top ↑</a>
            </div>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
}