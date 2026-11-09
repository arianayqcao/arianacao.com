import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const sections = [
  ["overview", "Overview"],
  ["context", "Context"],
  ["insights", "Insights"],
  ["version-one", "Version 1"],
  ["learnings", "What we learned"],
  ["final-solution", "Final Solution"],
  ["outcome", "Outcome"],
  ["reflection", "Reflection"],
  ["next-steps", "Next steps"],
] as const;

const impact = [
  {
    value: "78%",
    label: "adoption of the hacker profile",
  },
  {
    value: "3 hrs to 1 hr",
    label: "reduction in prize redemption time",
  },
  {
    value: "~1,000",
    label: "users, including participants and staff",
  },
];

const stats = [
  {
    value: "~3 hrs",
    label: "spent on prize redemption in 2024—more than 8% of the 36-hour hackathon",
  },
  {
    value: "5–7",
    label: "staff members editing the same Excel sheet at once",
  },
  {
    value: "17%",
    label: "of 2025 hackers added a bio, LinkedIn, or GitHub",
  },
];

type Decision = {
  title: string;
  body: string;
  media: { src: string; alt: string }[];
};

const GIF_DIR = "/images/DubCoin/final-solution-gifs";

const DECISIONS: Decision[] = [
  {
    title: "Home is about information, not identity.",
    body: "A live countdown, event schedule, DubCoin balance, and links to DevPost and the guide bring the day’s essentials forward. Before the event, Get Started guides hackers through the setup steps.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-home-page.gif`,
        alt: "Redesigned home page with countdown, schedule, and DubCoin balance",
      },
    ],
  },
  {
    title: "A sidebar makes the hub feel like a tool.",
    body: "The top navigation became a left sidebar, a familiar pattern for a dashboard. Connect remains available for hackers who want to browse profiles or find teammates.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-sidebar.gif`,
        alt: "Left sidebar navigation in the dashboard",
      },
    ],
  },
  {
    title: "Hackers can show a QR code or a username.",
    body: "The mobile redeem screen offers a full-screen QR code for fast scanning, and the required Discord username in large monospaced type as a backup. Staff can read it across the table when a scan isn’t practical.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-mobile-full-screen-qr.gif`,
        alt: "Full-screen QR code on the hacker’s phone",
      },
      {
        src: `${GIF_DIR}/rough-final-solution-scroll-mobile.gif`,
        alt: "Scrolling through the mobile redeem screen",
      },
    ],
  },
  {
    title: "Staff can scan the code or type the name.",
    body: "Scanning a hacker’s QR code pulls up their account in one step. When a scan isn’t possible, staff can type the username instead. Both paths lead to the same confirmation, so redemption works the same way either way.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-mobile-scan-qr-code.gif`,
        alt: "Staff scanning a hacker’s QR code on mobile",
      },
    ],
  },
  {
    title: "Search helps staff recognize the right person.",
    body: "Fuzzy search results include username, real name, team, and balance, so a typo or half-remembered name still finds the right hacker. A slash shortcut opens search so staff can get to a person quickly.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-hacker-fuzzy-search-staff.gif`,
        alt: "Staff fuzzy-searching for a hacker by username",
      },
    ],
  },
  {
    title: "A cart makes the transaction clear.",
    body: "Balance, cart total, and remaining balance stay visible together. Unaffordable and out-of-stock prizes are clearly marked, and filter chips narrow the list to what can actually be redeemed.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-filter-chips-dubcoin-prizes.gif`,
        alt: "Filter chips narrowing the DubCoin prize list",
      },
    ],
  },
  {
    title: "Mistakes can be undone at the table.",
    body: "“Recent at this table” lists the latest transactions so staff can reverse a mistake without leaving the screen.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-undo-transaction.gif`,
        alt: "Undoing a recent DubCoin transaction",
      },
    ],
  },
  {
    title: "Dark mode for a long event.",
    body: "The dashboard supports a dark theme built from the same system, so it stays readable for hackers and staff in a dim venue.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-dark-mode.gif`,
        alt: "Dashboard switching to dark mode",
      },
    ],
  },
  {
    title: "A design system built with AI, directed by me.",
    body: "Figr helped generate a starting system. I directed its colors, neutral surfaces, Work Sans typography, spacing, and components. Everyday buttons use near-black because white on brand pink reaches only 3.6:1 contrast; pink is reserved for emphasis.",
    media: [
      {
        src: `${GIF_DIR}/rough-final-solution-design-system-foundations.gif`,
        alt: "Design system foundations: color, type, and spacing",
      },
      {
        src: `${GIF_DIR}/rough-final-solution-design-system-components.gif`,
        alt: "Design system components",
      },
    ],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-dubcoin-eyebrow">{children}</p>;
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
  children: React.ReactNode;
}) {
  return (
    <section className="dubcoin-section" id={id}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="text-dubcoin-section-title">{title}</h2>
      <div className="dubcoin-prose text-dubcoin-body">{children}</div>
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
    <figure className={`dubcoin-media ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 920px"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function DubcoinSystemPage() {
  return (
    <>
      <SiteHeader />
      <div className="dubcoin-page dubcoin-layout">
        {/* ---------- Sidebar ---------- */}
        <aside className="dubcoin-sidebar" aria-label="Case study sections">
          <nav>
            <a className="dubcoin-homeLink" href="#top">
              ⌂ <span>HOME</span>
            </a>
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a className="dubcoin-backTop" href="#top">
            ↑ <span>BACK TO TOP</span>
          </a>
        </aside>

        <main className="dubcoin-main" id="top">
          {/* ---------- Cover ---------- */}
          <div className="dubcoin-cover">
            <picture>
              <source
                media="(min-width: 1600px)"
                srcSet="/images/DubCoin/dubcoins-case-study-hero-XL.png"
              />
              <Image
                src="/images/DubCoin/dubcoins-case-study-hero.webp"
                alt="DubCoin hacker profile and prize redemption experience"
                fill
                priority
                sizes="(max-width: 760px) 100vw, calc(100vw - 200px)"
              />
            </picture>
          </div>

          <article className="dubcoin-article">
            {/* ---------- Intro ---------- */}
            <header className="dubcoin-intro">
              <p className="dubcoin-kicker">DUBHACKS · PRODUCT DESIGN · 2025—2026</p>
              <h1 className="text-dubcoin-page-title">
                From a 3-hour Excel line to a DubCoin system
              </h1>
              <p className="dubcoin-dek">
                A two-part case study: a hacker profile that shipped in 2025, and a
                data-informed redesign for 2026.
              </p>

              <div className="dubcoin-meta">
                <div>
                  <Eyebrow>Timeline</Eyebrow>
                  <p>
                    v1 · Jul–Sep 2025
                    <br />
                    v2 · Jul–Oct 2026
                  </p>
                </div>
                <div>
                  <Eyebrow>Role</Eyebrow>
                  <p>
                    Product Designer (v1)
                    <br />
                    UX Design Lead (v2)
                  </p>
                </div>
                <div>
                  <Eyebrow>Team</Eyebrow>
                  <p>
                    Ariana Cao, Annie Chang,
                    <br />
                    Medha Rawat · Audrey Wu (v2)
                  </p>
                </div>
                <div>
                  <Eyebrow>Tools</Eyebrow>
                  <p>
                    Figma, Figr, Lovable,
                    <br />
                    Codex, Tailwind CSS
                  </p>
                </div>
              </div>
            </header>

            {/* ---------- Stats ---------- */}
            <section className="dubcoin-stats" aria-label="Project data">
              {impact.map((stat) => (
                <div key={stat.value}>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </div>
              ))}
            </section>

            {/* ---------- Overview ---------- */}
            <Section
              id="overview"
              label="Overview"
              title="DubHacks rewards hackers with coins. Spending them used to take hours."
            >
              <p>
                DubCoins are DubHacks’ currency. Hackers earn them by
                attending workshops and activities, then redeem them for prizes at
                the end of the weekend.
              </p>
              <p>
                I designed the experience in two rounds.{" "}
                Version 1 (2025) shipped, giving us real usage data.{" "}
                Version 2 (2026) is designed but not yet built with backend support;
                and it&apos;s based on what we observed during the event.
              </p>
              <a className="dubcoin-textLink" href="#final-solution">
                Jump to Final Solution <span>▼</span>
              </a>
            </Section>

            {/* ---------- Context ---------- */}
            <Section
              id="context"
              label="Context"
              title="Redemption took two hours longer than scheduled."
            >
              <p>
                Redemption was scheduled for one hour on Sunday. It took about
                three. Five tired staff shared one Excel sheet to look up 
                hackers, update balances, track inventory, and hand prizes out.
              </p>

              <Media
                width={1715}
                height={1146}
                src="/images/DubCoin/dubcoin-spreadsheet.webp"
                alt="Spreadsheet used to track prize redemption"
                caption="The 2024 redemption flow depended on staff updating a shared spreadsheet."
              />
              <p>
                Lines wrapped around room, and some prizes ran out before people reached the table. 
                According to directors, it was the biggest pain point of 2024.
              </p>
              <Media
                width={1715}
                height={850}
                src="/images/DubCoin/line-of-hackers.png"
                alt="Line of hackers waiting for prize redemption from 2024"
                caption="Hackers waited in long lines for prize redemption."
              />

            </Section>

            <Section
              id="brief"
              label="Brief"
              title="Build a personalized hub."
            >
              <p>
                The brief came in early July, with design due at the end of August. Tech had a skeleton UI, workshop QR codes, and a database. Design defined the experience and what the backend needed.
              </p>

              <div className="dubcoin-callout">
                <Eyebrow>The brief</Eyebrow>
                <p>
                  Build a personalized hacker hub that centralizes information,
                  cuts day-of questions, and shows each hacker a clear view of
                  their experience.
                </p>
              </div>

              <Media
                width={1715}
                height={1110}
                src="/images/DubCoin/project-timeline-dark.png"
                alt="Timeline"
                caption="Early July brief → end of Aug design deadline → Sept ship → Oct hackathon."
              />
            </Section>

            {/* ---------- Insights ---------- */}
            <Section
              id="insights"
              label="Insights"
              title="Staff were acting as the database."
            >
              <p>
                We mapped the 2024 flow with context from co-directors Erika and
                Nolan, and design advisor Meiyao. 
              </p>
                  <section className="dubcoin-stats" aria-label="Project data">
                    {stats.map((stat) => (
                      <div key={stat.value}>
                        <strong>{stat.value}</strong>
                        <p>{stat.label}</p>
                      </div>
                    ))}
                  </section>

              <Media
                width={1715}
                height={870}
                src="/images/DubCoin/hacker-journey-map.png"
                alt="User journey map for a first-time DubHacks hacker"
                caption="User journey map for a first-time DubHacks hacker, from the acceptance email through post-event follow-up."
              />

              <p>
                Three issues stood out:
              </p>

              <div className="dubcoin-threeCards">
                <div>
                  <b>Manual</b>
                  <p>Every transaction needed someone to edit a spreadsheet by hand.</p>
                </div>
                <div>
                  <b>Opaque</b>
                  <p>
                    Hackers couldn’t see their own balance. “How many DubCoins do I
                    have?”
                  </p>
                </div>
                <div>
                  <b>Disconnected</b>
                  <p>
                    Staff had to match a person’s balance to available prizes from
                    memory.
                  </p>
                </div>
              </div>

              <p>
                The system pushed memory and coordination onto people. The profile
                could make information visible, while redemption needed a flow staff
                could run quickly and reliably.
              </p>
            </Section>

            {/* ---------- Version 1 ---------- */}
            <Section
              id="version-one"
              label="Version 1 · 2025"
              title="We explored three models for DubCoin redemption."
            >
              <p>
                The hardest question was how hackers should redeem DubCoins. 
              </p>
              <p className="dubcoin-note">
                Before development, we used a Lovable prototype to help tech and
                directors react to the direction.
                Annie built the staff side, Medha
                led most screens and the design system, and I worked on Home logic,
                countdown, navigation, and judging.
              </p>
              <h3>Pick-up system (rejected).</h3>
              <p>
                Hackers redeem on their own device, then pick up at a table.
              </p>
              <ul>
                <li>• Items only appear if staff toggle visibility and the hacker has enough balance</li>
                <li>• Inventory updates the instant someone redeems, so 200 people can&apos;t claim 1 item</li>
                <li>• Hackers go up in waves; caps of 3-4 items; prizes unlock late to keep people for closing ceremony</li>
              </ul>
              <h3>Revamped manual typing.</h3>
              <p>
                Staff would still look hackers up by hand, but in a purpose-built 
                search tool instead of a shared Excel sheet.
              </p>
              <h3>QR redemption (shipped).</h3>
              <p>
                Every hacker gets a personal QR code, the same kind used for earning 
                at workshops. Staff scan it at the prize table, check redemption history, 
                and mark the item claimed.
              </p>

              <Media
                width={1024}
                height={768}
                src="/images/DubCoin/hacker-profile-screens.png"
                alt="Screens from the 2025 DubHacks hacker profile"
                caption="The first release combined a hacker profile, DubCoins, directory, and event information."
              />

            </Section>

            {/* ---------- Version 1 ---------- */}
            <Section
              id="version-one"
              label="Version 1 · 2025"
              title="We explored three models for DubCoin redemption."
            >
              <p>
                Each hacker had a personal QR code;
                staff scanned it at the prize table, checked the redemption history,
                and marked items claimed. Staff were a resource we already had, and
                the pattern reused workshop QR codes.
              </p>

              <Media
                width={1024}
                height={768}
                src="/images/DubCoin/hacker-profile-screens.png"
                alt="Screens from the 2025 DubHacks hacker profile"
                caption="The first release combined a hacker profile, DubCoins, directory, and event information."
              />

            </Section>

            {/* ---------- What we learned ---------- */}
            <Section
              id="learnings"
              label="What we learned"
              title="The hackathon taught us what the prototype couldn’t."
            >
              <p>
                After launch, I asked the tech lead for the usage data and compared
                our assumptions with how hackers actually used the profile.
              </p>

              <div className="dubcoin-dataGrid">
                <div>
                  <strong>1,030</strong>
                  <span>registered hackers</span>
                </div>
                <div>
                  <strong>331</strong>
                  <span>completed the pre-event quiz</span>
                </div>
                <div>
                  <strong>243</strong>
                  <span>attended workshops</span>
                </div>
                <div>
                  <strong>148</strong>
                  <span>redeemed 237 prizes</span>
                </div>
              </div>

              <ul>
                <li>
                  <strong>Some experienced slow scanning with QR codes.</strong> Camera focus, lighting,
                  and Wi-Fi introduced an estimated 1-4 seconds per scan.
                </li>
                <li>
                  <strong>Most hackers skipped the social profile.</strong> About 17%
                  filled in a bio, LinkedIn, or GitHub.
                </li>
                <li>
                  <strong>Device of choice was 50/50 between laptops and phones.</strong> Laptops came out while hackers were sitting, phones came out most
                  often at the prize table and at workshops.
                </li>
              </ul>

              <Media
                width={1715}
                height={870}
                src="/images/DubCoin/dh26-day-of-dubcoin-redemption.gif"
                alt="Staff redeeming prizes at the 2025 DubHacks hackathon"
                caption="Real life staff flow redeeming DubCoins from line of hackers."
              />
              <h3>Two takeaways</h3>

              <p>
                1. The profile should shrink the social side 
                and lead with information and DubCoins.
              </p>
              <p>
                2. The redemption flow should support both QR scanning and manual search, 
                so staff can use whichever fits their device.
              </p>
            </Section>

            {/* ---------- Final Solution ---------- */}
            <Section
              id="final-solution"
              label="Final Solution · 2026 redesign"
              title="Same problem, simpler bet: hackers show a code or username; staff scan or search."
            >
              <p>
                The redesigned dashboard is planned for user testing during the 2026
                hackathon. Here are the decisions that carry the research forward.
              </p>

              {DECISIONS.map((d, i) => (
                <div className="dubcoin-decision" key={d.title}>
                  <div className="dubcoin-decision-media">
                    {d.media.map((m) => (
                      <img key={m.src} src={m.src} alt={m.alt} loading="lazy" />
                    ))}
                  </div>
                  <div className="dubcoin-decision-text">
                    <span className="dubcoin-decision-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{d.title}</h3>
                    <p>{d.body}</p>
                  </div>
                </div>
              ))}

              <div className="dubcoin-status">
                <Eyebrow>Build status</Eyebrow>
                <p>
                  Version 2 is designed and entering user testing, but it has not
                  shipped. The tech team is focused on the judging algorithm; the
                  profile is planned for release next year.
                </p>
              </div>
            </Section>

            {/* ---------- Outcome ---------- */}
            <Section
              id="outcome"
              label="Outcome"
              title="V1 shipped. V2 is designed, and not live yet."
            >
              <p>
                The first profile served 1,030 hackers in 2025 and gave us evidence
                to shape the next iteration. Version 2 has a complete design
                direction and system ready for testing and a future build.
              </p>
              <p>
                At the 2026 hackathon, I plan to test with available hackers and
                prize-table staff. Tasks include checking a balance, finding an
                affordable prize, showing a username, searching for a hacker,
                redeeming, and reversing a transaction. I’ll track time to
                item-in-hand, errors, and requests for help.
              </p>
            </Section>

            {/* ---------- Reflection ---------- */}
            <Section
              id="reflection"
              label="Reflection"
              title="What I’d tell my past self."
            >
              <ul>
                <li>
                  <strong>Test in the real room.</strong> Lighting, lines, and
                  crowded Wi-Fi mattered more than the QR flow’s neat prototype.
                </li>
                <li>
                  <strong>A failed bet is still useful data.</strong> Watching QR slow
                  people down gave us a clear reason to change course.
                </li>
                <li>
                  <strong>People are a resource too.</strong> Staff made a simpler
                  flow viable while the backend matured.
                </li>
                <li>
                  <strong>Ask for the data.</strong> Usage files changed the
                  direction of the redesign.
                </li>
              </ul>
            </Section>

            {/* ---------- Next steps ---------- */}
            <Section
              id="next-steps"
              label="Next steps"
              title="Where it goes from here."
            >
              <ol className="dubcoin-nextSteps">
                <li>
                  <span>01</span>
                  <p>User-test the v2 hacker and staff flows during the event. Done actually! Updates incoming</p>
                </li>
                <li>
                  <span>02</span>
                  <p>
                    Design for 5–9 staff working at once, including stock holds,
                    transaction locking, and clear conflict recovery.
                  </p>
                </li>
                <li>
                  <span>03</span>
                  <p>
                    Improve the mobile username/QR code view with an
                    auto-brightness request for tech.
                  </p>
                </li>
                <li>
                  <span>05</span>
                  <p>Work with tech on admin controls for prize visibility and overrides.</p>
                </li>
                <li>
                  <span>04</span>
                  <p>Actually ship the redesigned flows!!!</p>
                </li>
              </ol>
            </Section>

            <div className="dubcoin-endnav">
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