import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* ─── data ──────────────────────────────────────────────────────────── */

const EXPERIENCE = [
  { company: "Wick", role: "Product Design Intern", period: "Jun 2026 - Present" },
  { company: "DubHacks", role: "Design Lead", period: "Jan 2026 - Present" },
  { company: "Design For America", role: "Product Design", period: "Jan 2026 - May 2026" },
  { company: "DubHacks", role: "Design", period: "Jan 2025 - Jan 2026" },
  { company: "Lily's Salvadorean", role: "Website Lead", period: "Jan 2025 - Jan 2026" },
  { company: "KidsTeam UW", role: "AI Research", period: "May 2025" },
];

interface GalleryRow {
  heightClass: string;
  images: { src: string; flex: number; alt: string }[];
}

/* Desktop heights from Figma (250 | 400 px), mobile scaled ~0.254× (64 | 102 px). */
const GALLERY_ROWS: GalleryRow[] = [
  {
    heightClass: "h-[64px] md:h-[250px]",
    images: [
      { src: "/images/about/grid-01.png", flex: 395, alt: "Food Ariana cooked" },
      { src: "/images/about/grid-02.png", flex: 593, alt: "Travel photo" },
      { src: "/images/about/grid-03.png", flex: 395, alt: "Food Ariana cooked" },
    ],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [
      { src: "/images/about/grid-04.png", flex: 536, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-05.png", flex: 302, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-06.png", flex: 542, alt: "Photo from Ariana's life" },
    ],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [{ src: "/images/about/grid-07.png", flex: 1, alt: "Photo from Ariana's life" }],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [
      { src: "/images/about/grid-08.png", flex: 394, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-09.png", flex: 396, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-10.png", flex: 592, alt: "Photo from Ariana's life" },
    ],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [
      { src: "/images/about/grid-11.png", flex: 592, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-12.png", flex: 395, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-13.png", flex: 395, alt: "Photo from Ariana's life" },
    ],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [
      { src: "/images/about/grid-14.png", flex: 395, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-01.png", flex: 395, alt: "Photo from Ariana's life" },
      { src: "/images/about/grid-02.png", flex: 593, alt: "Photo from Ariana's life" },
    ],
  },
  {
    heightClass: "h-[102px] md:h-[400px]",
    images: [{ src: "/images/about/grid-15.png", flex: 1, alt: "Photo from Ariana's life" }],
  },
];

/* Spotify compact embeds (152 px).
   Replace each `trackId` with the real Spotify track ID from the track's share
   URL: open.spotify.com/track/<TRACK_ID> */
const SPOTIFY_ROWS = [
  [
    { trackId: "6UuVONmxXwTKN1ISepuAoQ", title: "Forget Her", artist: "Jeff Buckley" },
    { trackId: "6L2uVVPJA9WcDc7zCZ4DHN", title: "Love Me Like You", artist: "Little Mix" },
    { trackId: "451GvHwY99NKV4zdKPRWmv", title: "Banana Pancakes", artist: "Jack Johnson" },
  ],
  [
    { trackId: "6TBJkXHPhu3EsMk1bshwuI", title: "ONLY", artist: "LEEHI" },
    { trackId: "7t1lBIr3WIEtqQEOdZFMUf", title: "Look What You've Done", artist: "Drake" },
    { trackId: "184HGdGIscUiPbDuqbvHuN", title: "Defying Gravity", artist: "Wicked" },
  ],
];

/* ─── page ───────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ── Section 1: 100vh on desktop ──────────────────────────────── */}
        <section className="p-4 md:h-screen">
          <div className="flex flex-col md:flex-row gap-4 md:h-full">

            {/* ── mobile-only: hero portrait ── */}
            <div
              className="md:hidden relative w-full rounded-[8px] overflow-hidden shrink-0"
              style={{ aspectRatio: "346 / 448" }}
            >
              <Image
                src="/images/about/hero-portrait.png"
                alt="Ariana Cao"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* ── mobile-only: 2-up photos ── */}
            <div className="md:hidden flex gap-4 h-[238px] shrink-0">
              <div className="flex-1 relative rounded-[4px] overflow-hidden">
                <Image
                  src="/images/about/image-34.png"
                  alt="A place Ariana has been"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-[4px] overflow-hidden">
                <Image
                  src="/images/lilies.png"
                  alt="Lilies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* ── text + experience (always visible) ── */}
            <div className="flex-1 flex flex-col gap-8 pt-8 md:pt-0 md:pr-4 min-w-0">
              {/* bio */}
              <div className="flex flex-col gap-4">
                <h1
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: 700,
                    fontSize: 36,
                    lineHeight: "normal",
                    color: "black",
                  }}
                >
                  I&apos;m Ariana!
                </h1>
                <div
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "normal",
                    color: "black",
                  }}
                >
                  <p>Student at UW-Seattle, from the Bay Area.</p>
                  <br />
                  <p>
                    I&apos;m a 3rd-year undergrad student pursuing Informatics at the University of
                    Washington in Seattle.
                  </p>
                  <br />
                  <p>
                    I&apos;m driven by a desire to make technology more accessible and more magical ✨,
                    especially through women-centered tech initiatives.
                  </p>
                  <br />
                  <p>
                    Say hello at{" "}
                    <a
                      href="mailto:ariana.yq.cao@gmail.com"
                      className="underline"
                      style={{ color: "inherit" }}
                    >
                      ariana.yq.cao@gmail.com
                    </a>{" "}
                    or at{" "}
                    <a
                      href="https://www.linkedin.com/in/ariana-yq-cao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                      style={{ color: "inherit" }}
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* experience */}
              <div className="flex flex-col gap-4">
                <h2
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: "normal",
                    color: "black",
                  }}
                >
                  Experience
                </h2>
                <div className="flex flex-col gap-4 md:gap-2">
                  {EXPERIENCE.map((item) => (
                    <div
                      key={`${item.company}-${item.role}`}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: 16,
                        lineHeight: "normal",
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <span>{item.company}</span>
                        <span>/</span>
                        <span style={{ color: "rgba(0,0,0,0.7)" }}>{item.role}</span>
                      </div>
                      <span style={{ color: "rgba(0,0,0,0.7)", flexShrink: 0 }}>{item.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* education */}
              <div className="flex flex-col gap-4">
                <h2
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: "normal",
                    color: "black",
                  }}
                >
                  Education
                </h2>
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: 16,
                    lineHeight: "normal",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>University of Washington</span>
                    <span>/</span>
                    <span style={{ color: "rgba(0,0,0,0.7)" }}>BS in Informatics</span>
                  </div>
                  <span style={{ color: "rgba(0,0,0,0.7)", flexShrink: 0 }}>2023 - Present</span>
                </div>
              </div>
            </div>

            {/* ── desktop-only: center portrait ── */}
            <div className="hidden md:block flex-1 relative rounded-[4px] overflow-hidden self-stretch">
              <Image
                src="/images/ariana-holding-flowers.png"
                alt="Ariana holding flowers"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* ── desktop-only: right column (2 photos stacked) ── */}
            <div className="hidden md:flex flex-1 flex-col gap-4 self-stretch">
              <div className="flex-1 relative rounded-[4px] overflow-hidden">
                <Image
                  src="/images/about/image-34.png"
                  alt="A place Ariana has been"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-[4px] overflow-hidden">
                <Image
                  src="/images/lilies.png"
                  alt="Lilies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── Section 2: photo gallery ─────────────────────────────────── */}
        <section className="p-4" style={{ paddingTop: 100, paddingBottom: 32 }}>
          <div className="flex flex-col" style={{ gap: 16 }}>
            {/* heading */}
            <div className="flex flex-col gap-[10px]" style={{ marginBottom: 16 }}>
              <h2
                style={{
                  fontFamily: "var(--font-primary)",
                  fontWeight: 600,
                  fontSize: 32,
                  letterSpacing: "-0.24px",
                  lineHeight: "33.6px",
                  color: "black",
                }}
              >
                Littles from my life: things I&apos;ve cooked, places I&apos;ve been.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: 16,
                  lineHeight: "normal",
                  color: "#6b6b6b",
                }}
              >
                My alternative dream job would be a food reviewer.
              </p>
            </div>

            {/* grid rows */}
            <div className="flex flex-col gap-[3px] md:gap-3">
              {GALLERY_ROWS.map((row, rowIdx) => (
                <div key={rowIdx} className={`flex gap-[3px] md:gap-3 ${row.heightClass}`}>
                  {row.images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative rounded-[2px] md:rounded-[4px] overflow-hidden"
                      style={{ flex: img.flex }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 40vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: music ─────────────────────────────────────────── */}
        <section className="p-4 flex flex-col gap-[10px]" style={{ paddingTop: 100, paddingBottom: 32 }}>
          <h2
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: "-0.24px",
              lineHeight: "33.6px",
              color: "black",
            }}
          >
            What I&apos;ve been listening to lately
          </h2>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "25.6px",
              color: "#6b6b6b",
            }}
          >
            I describe my music taste as whiplash. You&apos;ll go from the most heart wrenching,
            melancholy song, to Little Mix.
          </p>

          {SPOTIFY_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-col md:flex-row gap-4">
              {row.map((track) => (
                <div key={track.title} className="flex-1 min-w-0">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${track.trackId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                    title={`${track.title} by ${track.artist} on Spotify`}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
