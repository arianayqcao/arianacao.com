import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const sections = [
  ["overview", "Overview"], ["context", "Context"], ["insights", "Insights"],
  ["version-one", "Version 1"], ["learnings", "What we learned"],
  ["version-two", "Version 2"], ["outcome", "Outcome"], ["reflection", "Reflection"], ["next-steps", "Next steps"],
] as const;

const stats = [
  { value: "~3 hrs", label: "spent on prize redemption in 2024—more than 8% of the 36-hour hackathon" },
  { value: "5–7", label: "staff members editing the same Excel sheet at once" },
  { value: "17%", label: "of 2025 hackers added a bio, LinkedIn, or GitHub" },
  { value: "148", label: "hackers redeemed at least one prize in 2025" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-dubcoin-eyebrow">{children}</p>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return <section className={"dubcoin-section"} id={id}><Eyebrow>{label}</Eyebrow><h2 className="text-dubcoin-section-title">{title}</h2><div className="dubcoin-prose text-dubcoin-body">{children}</div></section>;
}

function Media({ src, alt, caption, width, height, className = "" }: { src: string; alt: string; caption?: string; width: number; height: number; className?: string }) {
  return <figure className={"dubcoin-media" + " " + className}><Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 100vw, 920px"/><figcaption>{caption}</figcaption></figure>;
}

export default function DubcoinSystemPage() {
  return <><SiteHeader/><div className="dubcoin-page dubcoin-layout">
    <aside className={"dubcoin-sidebar"} aria-label="Case study sections">
      <nav><a className={"dubcoin-homeLink"} href="#top">⌂ <span>HOME</span></a>
        {sections.map(([id, label]) => <a key={id} href={"#" + id}>{label}</a>)}
      </nav>
      <a className={"dubcoin-backTop"} href="#top">↑ <span>BACK TO TOP</span></a>
    </aside>
    <main className={"dubcoin-main"} id="top">
      <div className={"dubcoin-cover"}><picture><source media="(min-width: 1600px)" srcSet="/images/DubCoin/dubcoins-case-study-hero-XL.png"/><Image src="/images/DubCoin/dubcoins-hero.png" alt="DubCoin hacker profile and prize redemption experience" fill priority sizes="(max-width: 760px) 100vw, calc(100vw - 200px)"/></picture></div>
      <article className={"dubcoin-article"}>
        <header className={"dubcoin-intro"}>
          <p className={"dubcoin-kicker"}>DUBHACKS · PRODUCT DESIGN · 2025—2026</p>
          <h1 className="text-dubcoin-page-title">From a 3-hour Excel line to a DubCoin system</h1>
          <p className={"dubcoin-dek"}>A two-part case study: a hacker profile that shipped in 2025, and a data-informed redesign for 2026.</p>
          <div className={"dubcoin-meta"}>
            <div><Eyebrow>Timeline</Eyebrow><p>v1 · Jul–Sep 2025<br/>v2 · Jul–Oct 2026</p></div>
            <div><Eyebrow>Role</Eyebrow><p>Product Designer (v1)<br/>UX Design Lead (v2)</p></div>
            <div><Eyebrow>Team</Eyebrow><p>Ariana Cao, Annie Chang,<br/>Medha Rawat · Audrey Wu (v2)</p></div>
            <div><Eyebrow>Tools</Eyebrow><p>Figma, Figr, Lovable,<br/>Tailwind CSS</p></div>
          </div>
        </header>

        <section className={"dubcoin-stats"} aria-label="Project data">
          {stats.map((stat) => <div key={stat.value}><strong>{stat.value}</strong><p>{stat.label}</p></div>)}
        </section>

        <Section id="overview" label="Overview" title="DubHacks rewards hackers with coins. Spending them used to take hours.">
          <p>DubCoins are DubHacks’ incentive currency. Hackers earn them by attending workshops and activities, then redeem them for prizes at the end of the weekend.</p>
          <p>I designed the experience in two rounds. <strong>Version 1 (2025) shipped</strong>, giving us real usage data. <strong>Version 2 (2026) is fully designed but not yet built</strong>; its direction comes from what we observed during the event.</p>
          <a className={"dubcoin-textLink"} href="#version-two">Jump to Version 2 <span>↘</span></a>
        </Section>

        <Section id="context" label="Context" title="Redemption was the biggest pain point of 2024.">
          <p>Prize redemption was scheduled for one hour on Sunday. It took about three. Five to seven staff members shared one Excel sheet while they looked up each hacker, verified their identity, changed balances, found prizes, and updated inventory.</p>
          <p>Staff were tired from overnight shifts. Hackers waited in long lines, and some prizes ran out before people reached the table. Meanwhile, staff estimated that answering questions took around 70% of their time, even though much of the information already existed in Notion.</p>
          <Media width={1715} height={1146} src="/images/DubCoin/dubcoin-spreadsheet.png" alt="Spreadsheet used to track prize redemption" caption="The 2024 redemption flow depended on staff updating a shared spreadsheet."/>
          <Media width={1715} height={850} src="/images/DubCoin/line-of-hackers.png" alt="Line of hackers waiting for prize redemption from 2024" caption="Hackers waited in long lines for prize redemption."/>
          <p>The brief arrived in early July, with design due by the end of August and a September ship date. Tech already had a Discord system, a skeleton UI, workshop QR codes, and MongoDB; design needed to define the experience and backend requirements.</p>
          <div className={"dubcoin-callout"}><Eyebrow>The brief</Eyebrow><p>Build a personalized hacker hub that centralizes information, reduces day-of questions, and gives each hacker a clear view of their experience.</p></div>
          <Media width={1715} height={1110} src="/images/DubCoin/project-timeline-dark.png" alt="Timeline" caption="Early July brief → end of Aug design deadline → Sept ship → Oct hackathon."/>
        </Section>

        <Section id="insights" label="Insights" title="Staff were acting as the database.">
          <p>We mapped the 2024 flow with context from co-directors Erika and Nolan, and design advisors Meiyao and Erika. Three issues shaped the first product:</p>
          <Media width={1715} height={870} src="/images/DubCoin/hacker-journey-map.png" alt="User journey map for a first-time DubHacks hacker" caption="User journey map for a first-time DubHacks hacker, from the acceptance email through post-event follow-up."/>
          <div className={"dubcoin-threeCards"}><div><b>Manual</b><p>Every transaction needed someone to edit a spreadsheet by hand.</p></div><div><b>Opaque</b><p>Hackers couldn’t see their own balance. “How many DubCoins do I have?”</p></div><div><b>Disconnected</b><p>Staff had to match a person’s balance to available prizes from memory.</p></div></div>
          <p>The system pushed memory and coordination onto people. The profile could make information visible, while redemption needed a flow staff could run quickly and reliably.</p>
        </Section>

        <Section id="version-one" label="Version 1 · 2025" title="Our first bet: a hacker profile, and QR codes for redemption.">
          <h3>Choosing a redemption model</h3>
          <p>We considered a self-serve pick-up flow and staff-led QR redemption. The pick-up model could update inventory immediately and reveal prizes only when a hacker had enough coins. But it introduced operational complexity and a risk of 1,000+ people hitting a system the tech team could not yet scale with confidence.</p>
          <p>We shipped QR redemption instead. Each hacker had a personal QR code; staff scanned it at the prize table, checked the redemption history, and marked items claimed. Staff were a resource we already had, and the pattern reused workshop QR codes.</p>
          <Media width={1024} height={768} src="/images/DubCoin/hacker-profile-screens.png" alt="Screens from the 2025 DubHacks hacker profile" caption="The first release combined a hacker profile, DubCoins, directory, and event information."/>
          <p>The profile included bio, skills, and interests; a Connect directory; a DubCoins page; and a Home screen with a schedule and countdown. Before development, we used a Lovable prototype to help tech and directors react to the direction.</p>
          <p className={"dubcoin-note"}>The 2025 design was collaborative: Annie built the staff side, Medha led most screens and the design system, and I worked on Home logic, countdown, and navigation.</p>
        </Section>

        <Section id="learnings" label="What we learned" title="The hackathon taught us what the prototype couldn’t.">
          <p>After launch, I asked the tech lead for the usage data and compared our assumptions with how hackers actually used the profile.</p>
          <div className={"dubcoin-dataGrid"}><div><strong>1,030</strong><span>registered hackers</span></div><div><strong>331</strong><span>completed the pre-event quiz</span></div><div><strong>243</strong><span>attended workshops</span></div><div><strong>148</strong><span>redeemed 237 prizes</span></div></div>
          <ul><li><strong>QR was slower than typing.</strong> Camera focus, lighting, and Wi-Fi introduced an estimated 4–7 seconds per scan.</li><li><strong>Most hackers skipped the social profile.</strong> About 17% filled in a bio, LinkedIn, or GitHub.</li><li><strong>Hackers mostly used laptops.</strong> Phones came out most often at the prize table.</li></ul>
          <p>So the next version would lead with useful event information and DubCoins, and let staff search by a username instead of scanning a code.</p>
        </Section>

        <Section id="version-two" label="Version 2 · 2026 redesign" title="Same problem, simpler bet: hackers show a username; staff type it.">
          <p>The redesigned dashboard is planned for user testing during the 2026 hackathon. Here are the decisions that carry the research forward.</p>
          <div className={"dubcoin-decision"}><span>01</span><div><h3>Home is about information, not identity.</h3><p>A live countdown, event schedule, DubCoin balance, and links to DevPost and the guide bring the day’s essentials forward. Before the event, Get Started guides hackers through the setup steps.</p></div></div>
          <div className={"dubcoin-decision"}><span>02</span><div><h3>A sidebar makes the hub feel like a tool.</h3><p>The top navigation became a left sidebar, a familiar pattern for a dashboard. Connect remains available for hackers who want to browse profiles or find teammates.</p></div></div>
          <div className={"dubcoin-decision"}><span>03</span><div><h3>Hackers show a Discord username. Staff type it.</h3><p>The mobile redeem screen puts the required Discord username in large monospaced type. Staff can read it across the table and search for the hacker directly.</p></div></div>
          <div className={"dubcoin-decision"}><span>04</span><div><h3>Search helps staff recognize the right person.</h3><p>Fuzzy search results include username, real name, team, and balance. A slash shortcut opens search so staff can get to a person quickly.</p></div></div>
          <div className={"dubcoin-decision"}><span>05</span><div><h3>A cart makes the transaction clear.</h3><p>Balance, cart total, and remaining balance stay visible together. Unaffordable and out-of-stock prizes are clear, with filters for what can be redeemed. “Recent at this table” supports reversing a mistake.</p></div></div>
          <div className={"dubcoin-decision"}><span>06</span><div><h3>A design system built with AI, directed by me.</h3><p>Figr helped generate a starting system. I directed its colors, neutral surfaces, Work Sans typography, spacing, and components. Everyday buttons use near-black because white on brand pink reaches only 3.6:1 contrast; pink is reserved for emphasis.</p></div></div>
          <div className={"dubcoin-status"}><Eyebrow>Build status</Eyebrow><p>Version 2 is designed and entering user testing, but it has not shipped. The tech team is focused on the judging algorithm; the profile is planned for release next year.</p></div>
        </Section>

        <Section id="outcome" label="Outcome" title="V1 shipped. V2 is designed, and not live yet.">
          <p>The first profile served 1,030 hackers in 2025 and gave us evidence to shape the next iteration. Version 2 has a complete design direction and system ready for testing and a future build.</p>
          <p>At the 2026 hackathon, I plan to test with available hackers and prize-table staff. Tasks include checking a balance, finding an affordable prize, showing a username, searching for a hacker, redeeming, and reversing a transaction. I’ll track time to item-in-hand, errors, and requests for help.</p>
        </Section>

        <Section id="reflection" label="Reflection" title="What I’d tell my past self.">
          <ul><li><strong>Test in the real room.</strong> Lighting, lines, and crowded Wi-Fi mattered more than the QR flow’s neat prototype.</li><li><strong>A failed bet is still useful data.</strong> Watching QR slow people down gave us a clear reason to change course.</li><li><strong>People are a resource too.</strong> Staff made a simpler flow viable while the backend matured.</li><li><strong>Ask for the data.</strong> Usage files changed the direction of the redesign.</li></ul>
        </Section>

        <Section id="next-steps" label="Next steps" title="Where it goes from here.">
          <ol className={"dubcoin-nextSteps"}><li><span>01</span><p>User-test the v2 hacker and staff flows during the event.</p></li><li><span>02</span><p>Design for 5–9 staff working at once, including stock holds, transaction locking, and clear conflict recovery.</p></li><li><span>03</span><p>Improve the mobile username view with a full-screen option and an auto-brightness request for tech.</p></li><li><span>04</span><p>Add UW NetID or email as backup search identifiers.</p></li><li><span>05</span><p>Work with tech on admin controls for prize visibility and overrides.</p></li></ol>
        </Section>
        <div className={"dubcoin-endnav"}><Link href="/work">← Back to work</Link><a href="#top">Back to top ↑</a></div>
      </article>
    </main>
  </div><Footer/></>;
}