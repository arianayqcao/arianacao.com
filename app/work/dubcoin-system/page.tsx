import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

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
  children,
}: {
  eyebrow: string;
  heading: string;
  headingSize?: "sm" | "lg";
  description?: string;
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
          lineHeight: headingSize === "lg" ? "41.6px" : "33.6px",
          color: "#000",
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
            color: "var(--color-text-subtle)",
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

/* ─── feature row (text + screenshot) ──────────────────────────── */

interface Feature {
  title: string;
  description: string;
  image: string;
  aspect: string;
  fit?: "contain" | "cover";
}

const FEATURES: Feature[] = [
  {
    title: "Personalized Welcome",
    description: "Greets each hacker by name with their live Dubcoin balance front and center.",
    image: "/images/DubCoin/feature-personalized-welcome.png",
    aspect: "498 / 446",
  },
  {
    title: "Toggle between views",
    description: "Switch from scanning to redeeming DubCoins.",
    image: "/images/DubCoin/feature-toggle-views.png",
    aspect: "498 / 84.02",
  },
  {
    title: "Scan QR codes",
    description: "Earn DubCoins by scanning QR codes at workshops.",
    image: "/images/DubCoin/feature-scan-qr.png",
    aspect: "498 / 498",
  },
  {
    title: "Personal QR code",
    description: "Every hacker gets one. Staff scan it at the prize table — no typing, no Excel.",
    image: "/images/DubCoin/feature-personal-qr-redeem.png",
    aspect: "498 / 436",
  },
  {
    title: "Live earn notifications",
    description: "Congrats, you just earned 15 Dubcoins from this workshop.",
    image: "/images/DubCoin/feature-live-earn.png",
    aspect: "498 / 380.23",
  },
  {
    title: "Activity feed",
    description: "A full log of every event attended and every coin earned.",
    image: "/images/DubCoin/feature-activity-feed.png",
    aspect: "498 / 261.44",
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
      <div className="relative w-full md:w-[498px] shrink-0" style={{ aspectRatio: feature.aspect }}>
        <Image
          src={feature.image}
          alt={`${feature.title} screen in the DubCoin app`}
          fill
          sizes="(max-width: 768px) 100vw, 498px"
          className={feature.fit === "cover" ? "object-cover" : "object-contain"}
        />
      </div>
    </div>
  );
}

/* ─── insight cards (3-up) ──────────────────────────────────────── */

interface InsightCard {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageAspect?: string;
  quote?: { author: string; text: string };
}

const INSIGHTS: InsightCard[] = [
  {
    title: "Manual",
    description: "Every transaction required a staff member to edit a spreadsheet by hand.",
    image: "/images/DubCoin/insight-manual.png",
    imageAlt: "Screenshot of the Google Sheet DubHacks staff used to manually track DubCoin prize redemptions",
    imageAspect: "268.53 / 264.36",
  },
  {
    title: "Opaque",
    description: "Hackers had to remember how many DubCoins they had.",
    quote: { author: "@hacker_anon · DubHacks Slack", text: '"How many Dubcoins do I have?"' },
  },
  {
    title: "Disconnected",
    description: "Staff had to match a hacker's balance to available prizes manually.",
    quote: {
      author: "@hacker_anon · DubHacks Slack",
      text: '"I showed up solo and spent the first 2 hours just walking around asking people what they knew. Felt like a job fair with no resumes."',
    },
  },
];

function InsightCardView({ card }: { card: InsightCard }) {
  return (
    <div className="flex flex-col flex-1 min-w-0 w-full" style={{ gap: 10 }}>
      <div className="flex flex-col w-full" style={{ gap: 9 }}>
        <h3
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-semibold)",
            fontSize: "24px",
            letterSpacing: "-0.24px",
            lineHeight: "33.6px",
            color: "#000",
            margin: 0,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-md)",
            color: "var(--color-text-subtle)",
            lineHeight: "var(--leading-body)",
            margin: 0,
          }}
        >
          {card.description}
        </p>
      </div>
      <div
        className="flex items-center justify-center w-full rounded-lg"
        style={{ background: "var(--primitive-black-10)", padding: 16, minHeight: 240 }}
      >
        {card.image ? (
          <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: card.imageAspect }}>
            <Image src={card.image} alt={card.imageAlt ?? ""} fill className="object-cover" />
          </div>
        ) : (
          <div
            className="flex flex-col w-full rounded-lg"
            style={{ background: "var(--primitive-grey-94)", opacity: 0.82, padding: 30, gap: 8 }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                color: "#666",
              }}
            >
              {card.quote!.author}
            </span>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-md)",
                color: "var(--color-text-subtle)",
                lineHeight: "var(--leading-body)",
              }}
            >
              {card.quote!.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── impact stat cards ────────────────────────────────────────── */

const IMPACT_STATS = [
  { stat: "300%", label: "Decrease in DubCoin Distribution Time." },
  { stat: "Zero", label: "Manual Excel edits required." },
  { stat: "Fewer questions", label: "From hackers, staff reported." },
];

/* ─── next steps ────────────────────────────────────────────────── */

const NEXT_STEPS = [
  {
    number: "01",
    title: "Collect feedback from hackers.",
    description:
      "We shipped it — now we need to hear from the people who used it. What worked, what was confusing, what they actually wanted.",
  },
  {
    number: "02",
    title: "Strengthen the staff-side experience.",
    description:
      "We focused heavily on the hacker side. The staff flow still needs work — specifically, there's no safeguard if a staff member accidentally taps a redemption. That needs an undo or a confirmation step before it goes any further.",
  },
  {
    number: "03",
    title: "Refine the visual design.",
    description: "The system works. Now we make it feel as good as it functions.",
  },
];

/* ─── page ──────────────────────────────────────────────────────── */

export default function DubcoinSystemPage() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <SiteHeader />

      <main className="flex flex-col items-center w-full">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start w-full" style={{ gap: 48 }}>
          <div className="relative w-full" style={{ aspectRatio: "1440 / 513" }}>
            <Image
              src="/images/DubCoin/hero-cover.png"
              alt="DubCoin distribution system cover"
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
                <span style={{ display: "block", color: "#000" }}>Automating the</span>
                <span style={{ display: "block", color: "var(--color-accent-rose)" }}>DubCoin distribution system</span>
              </h1>

              <div className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {[
                  { label: "ROLE", value: "Product Designer" },
                  { label: "TEAM", value: "annie chang\nAriana Cao\nMedha Rawat" },
                  { label: "TIMELINE", value: "3 months · 2025" },
                  { label: "OVERVIEW", value: "Student Hackathon Hub Platform" },
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
        <div className="flex flex-col items-center w-full" style={{ padding: 16 }}>
          <div className="flex flex-col items-start w-full" style={{ maxWidth: 922, gap: 96 }}>
            <section id="context" className="w-full">
              <SectionIntro
                eyebrow="overview"
                heading="DubHacks rewards hackers with coins for attending workshops."
                description="Dubcoins are DubHacks' incentive currency. Hackers earn them by attending workshops and redeem them for prizes."
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
            </section>

            <section id="goals" className="w-full">
              <SectionIntro
                eyebrow="problem"
                heading="The Dubcoin distribution system was the biggest pain point of 2024."
                description="Everything ran through a single Excel sheet. Staff manually looked up hackers, edited rows, and verified student IDs — in a packed ballroom, under pressure. Lines stretched around the room. What should've taken minutes took three hours. Staff were overwhelmed."
              />
            </section>

            <section id="process" className="w-full flex flex-col" style={{ gap: 32 }}>
              <SectionIntro
                eyebrow="insights"
                heading="Staff were being used as the system — instead of a system doing the work."
                description="We walked through last year's flow step by step: staff interviews, debrief notes, and every manual touchpoint."
              />
              <div className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {INSIGHTS.map((card) => (
                  <InsightCardView key={card.title} card={card} />
                ))}
              </div>
            </section>

            <section id="final-design" className="w-full flex flex-col" style={{ gap: 32 }}>
              <SectionIntro
                eyebrow="solution"
                headingSize="lg"
                heading="The Hacker Profile, in full."
                description="The Hacker Profile gives every hacker visibility — and gives staff a one-tap redemption flow."
              />
              <div className="relative w-full md:w-[768px]" style={{ aspectRatio: "768 / 576" }}>
                <Image
                  src="/images/DubCoin/hacker-profile-screens.png"
                  alt="Hacker profile screens"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col w-full" style={{ gap: 64 }}>
                {FEATURES.map((feature) => (
                  <FeatureRow key={feature.title} feature={feature} />
                ))}
              </div>
            </section>

            <section id="impact" className="w-full flex flex-col" style={{ gap: 32 }}>
              <SectionIntro
                eyebrow="IMPACT"
                headingSize="lg"
                heading="Staff could focus on hackers, not spreadsheets."
                description="The 2025 distribution ran without the chaos that defined 2024. What took three hours became a scan-and-tap flow."
              />
              <div className="flex flex-col md:flex-row w-full" style={{ gap: 16 }}>
                {IMPACT_STATS.map(({ stat, label }) => (
                  <div
                    key={label}
                    className="flex flex-1 flex-col items-start justify-end rounded-lg"
                    style={{ border: "1px solid var(--primitive-black-10)", padding: 30, minHeight: 240, gap: 8 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontWeight: "var(--weight-bold)",
                        fontSize: "var(--text-2xl)",
                        letterSpacing: "-0.64px",
                        lineHeight: "41.6px",
                        color: "var(--color-accent-rose)",
                      }}
                    >
                      {stat}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "#000",
                        letterSpacing: "1.2px",
                        lineHeight: "16.8px",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="w-full flex flex-col" style={{ gap: 32 }}>
              <SectionIntro
                eyebrow="reflection"
                headingSize="lg"
                heading="Our constraints shaped the design."
                description="We had a whole self-checkout idea that got cut because the tech wasn't there yet. But the thing we built instead — scan, tap, redeem — was cleaner. Sometimes the constraint does the design thinking for you."
              />
              <div className="relative w-full" style={{ aspectRatio: "922 / 519" }}>
                <Image
                  src="/images/DubCoin/reflection.png"
                  alt="Photo of two DubHacks staff members smiling together after the event"
                  fill
                  sizes="(max-width: 768px) 100vw, 922px"
                  className="object-cover rounded-lg"
                />
              </div>
            </section>

            <section id="next-steps" className="w-full flex flex-col" style={{ gap: 32 }}>
              <SectionIntro
                eyebrow="NEXT STEPS"
                headingSize="lg"
                heading="Where the DubCoin system goes from here."
              />
              <div className="flex flex-col w-full" style={{ gap: 32 }}>
                {NEXT_STEPS.map(({ number, title, description }) => (
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
            </section>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer
        className="w-full flex justify-center relative"
        style={{ background: "var(--primitive-grey-96)", borderTop: "1px solid var(--primitive-black-10)" }}
      >
        <div className="flex flex-col w-full" style={{ maxWidth: 1280, padding: 40, gap: 20 }}>
          <div className="flex items-end justify-between w-full">
            <Link
              href="/work"
              className="flex items-center"
              style={{ gap: 10, textDecoration: "none" }}
            >
              <span aria-hidden="true">←</span>
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-md)", color: "var(--color-text-subtle)" }}>
                Back to home
              </span>
            </Link>
            <Link
              href="/work/cura"
              className="flex flex-col items-end"
              style={{ gap: 2, textDecoration: "none" }}
            >
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-md)", color: "var(--color-text-subtle)" }}>
                Next project
              </span>
              <span className="flex items-center" style={{ gap: 10 }}>
                <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-md)", color: "var(--color-text-subtle)" }}>
                  Cura
                </span>
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>

          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between w-full"
            style={{ gap: 16, borderTop: "1px solid rgba(21,21,21,0.16)", paddingTop: 23, opacity: 0.86 }}
          >
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-md)", color: "var(--color-text-subtle)" }}>
              © Built by Ariana Cao
            </span>
            <div className="flex items-center" style={{ gap: 32 }}>
              <a
                href="https://www.linkedin.com/in/ariana-yq-cao/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                style={{ gap: 8, textDecoration: "none" }}
              >
                <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)", color: "#000" }}>
                  Linkedin
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39
                           0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037
                           c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711z
                           M5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337
                           9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1
                           2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582
                           1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
              </a>
              <a href="/resume" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-sm)", color: "#000" }}>
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
