import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

/* ─── data ──────────────────────────────────────────────────────── */

type PlayMedia =
  | { kind: "image"; src: string; aspect: string }
  | { kind: "video"; src: string; aspect: string }
  | { kind: "grid3"; srcs: [string, string, string]; aspect: string };

interface PlayItem {
  id: string;
  title: string;
  description: string;
  /** grid placement used only at the md+ breakpoint (see .play-grid-item in globals.css) */
  desktopColumn: 1 | 2;
  desktopRow: number;
  media: PlayMedia;
  overlayPlayIcon?: boolean;
}

// Order here = mobile (single-column) reading order. Desktop placement comes
// from desktopColumn/desktopRow so the grid can reflow without re-rendering
// (re-rendering would re-mount <video> elements and double-load them).
const PLAY_ITEMS: PlayItem[] = [
  {
    id: "glowing-fluffy-flowers",
    title: "glowing fluffy flowers",
    description: "playing around with Figma gradients & shadows",
    desktopColumn: 2,
    desktopRow: 1,
    media: { kind: "image", src: "/images/Play/fluffy-flower.png", aspect: "727 / 649" },
  },
  {
    id: "can-you-see-me",
    title: "can you see me?",
    description: "created in AfterEffects",
    desktopColumn: 1,
    desktopRow: 1,
    media: { kind: "video", src: "/videos/can_you_see_me.mp4", aspect: "1920 / 1080" },
  },
  {
    id: "glowing-orb",
    title: "glowing orb",
    description: "Created in AfterEffects",
    desktopColumn: 1,
    desktopRow: 2,
    media: { kind: "video", src: "/videos/glowing_orb.mp4", aspect: "1920 / 1920" },
  },
  {
    id: "still-art",
    title: "still art & light study",
    description: "created in Procreate",
    desktopColumn: 2,
    desktopRow: 3,
    media: { kind: "image", src: "/images/Play/still-art.png", aspect: "346 / 448" },
  },
  {
    id: "rough",
    title: "“rough”",
    description: "created in Illustrator with texture effects",
    desktopColumn: 2,
    desktopRow: 2,
    media: { kind: "image", src: "/images/Play/rough-sketch.png", aspect: "2550 / 3300" },
  },
  {
    id: "smiski-cafe-popup",
    title: "smiski-themed cafe pop-up poster design",
    description: "created Instagram / poster design for cafe fundraiser for design fraternity, using Illustrator.",
    desktopColumn: 2,
    desktopRow: 4,
    media: {
      kind: "grid3",
      srcs: [
        "/images/Play/atd-cafe-post-1.png",
        "/images/Play/atd-cafe-post-2-photobooth.png",
        "/images/Play/atd-cafe-post-3-menu.png",
      ],
      aspect: "1081 / 1350",
    },
  },
  {
    id: "charged-up-tshirt",
    title: "Charged Up! T-Shirt 2022-2023 Design",
    description: "robotics team merchandise for mario kart-themed FRC competition.",
    desktopColumn: 1,
    desktopRow: 4,
    media: { kind: "image", src: "/images/Play/charged-up-tshirt.png", aspect: "400 / 754.27" },
  },
  {
    id: "informatics-tshirt",
    title: "informatics t-shirt design",
    description: "created for the Informatics Undergraduate Association (IUGA).",
    desktopColumn: 1,
    desktopRow: 3,
    media: { kind: "image", src: "/images/Play/iuga-tshirt.png", aspect: "3414 / 4096" },
  },
  {
    id: "and-or",
    title: "and/or",
    description: "intro animation for student film around cultural, intergenerational love languages, using procreate",
    desktopColumn: 2,
    desktopRow: 5,
    media: { kind: "video", src: "/videos/and_or.mp4", aspect: "2368 / 1644" },
  },
  {
    id: "abyss",
    title: "abyss",
    description: "conceptual art. whale maybe?",
    desktopColumn: 1,
    desktopRow: 5,
    media: { kind: "image", src: "/images/Play/abyss.png", aspect: "400 / 398.41" },
  },
  {
    id: "team8-logo-animation",
    title: "Team 8 Logo Animation",
    description: "Created custom animation for Paly Robotics Team 8 Logo using Adobe Illustrator, AfterEffects, and Premiere Pro.\nSound up!",
    desktopColumn: 2,
    desktopRow: 6,
    media: { kind: "image", src: "/images/Play/team8-logo-animation-poster.jpg", aspect: "1388 / 780" },
  },
  {
    id: "digital-animation",
    title: "Digital Animation 2023 for Paly Robotics",
    description: "using Blender, AfterEffects, and Premiere Pro.",
    desktopColumn: 1,
    desktopRow: 8,
    media: { kind: "image", src: "/images/Play/digital-animation-thumb.png", aspect: "459.33 / 343.54" },
    overlayPlayIcon: true,
  },
  {
    id: "alvaldi-tshirt",
    title: "Alvaldi T-Shirt 2022-2023 Design",
    description: "Traced design using pen tool of CAD of Team 8\nrobot: 'Alvaldi' using Adobe Illustrator for FRC.",
    desktopColumn: 1,
    desktopRow: 6,
    media: { kind: "image", src: "/images/Play/alvaldi-tshirt.png", aspect: "400 / 572.8" },
  },
  {
    id: "interact-hippos-tshirt",
    title: "Interact 5170 Area 13 Hippity Hoppity Hippos T-Shirt 2022-2023 \nDesign",
    description: "t-shirt design created for international community service organization.",
    desktopColumn: 1,
    desktopRow: 7,
    media: { kind: "image", src: "/images/Play/interact-hippos-tshirt.png", aspect: "462 / 630" },
  },
];

/* ─── card ──────────────────────────────────────────────────────── */

function PlayCardMedia({ media, overlayPlayIcon }: { media: PlayMedia; overlayPlayIcon?: boolean }) {
  if (media.kind === "grid3") {
    return (
      <div className="flex w-full overflow-hidden rounded-lg">
        {media.srcs.map((src) => (
          <div key={src} className="relative w-1/3 shrink-0" style={{ aspectRatio: media.aspect }}>
            <Image src={src} alt="" fill sizes="(max-width: 768px) 33vw, 17vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: media.aspect }}>
      {media.kind === "video" ? (
        <video
          src={media.src}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <Image src={media.src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      )}
      {overlayPlayIcon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/Play/play-icon.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 68, height: 48 }}
        />
      )}
    </div>
  );
}

function PlayCard({ item }: { item: PlayItem }) {
  return (
    <div
      className="play-grid-item flex flex-col w-full"
      style={{ gap: 16, "--play-col": item.desktopColumn, "--play-row": item.desktopRow } as React.CSSProperties}
    >
      <PlayCardMedia media={item.media} overlayPlayIcon={item.overlayPlayIcon} />
      <div className="flex flex-col w-full" style={{ gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-semibold)",
            fontSize: "var(--text-md)",
            color: "#000",
            lineHeight: "normal",
            whiteSpace: "pre-line",
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--weight-regular)",
            fontSize: "var(--text-sm)",
            color: "#000",
            lineHeight: "normal",
            whiteSpace: "pre-line",
          }}
        >
          {item.description}
        </span>
      </div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────── */

export default function PlayPage() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <SiteHeader />

      <main className="flex flex-col items-center w-full">
        {/* ── title bar ──────────────────────────────────────────── */}
        <section className="flex items-center justify-between w-full" style={{ padding: 16 }}>
          <div className="flex flex-col items-start">
            <h1
              style={{
                fontFamily: "var(--font-primary)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-2xl)",
                color: "#000",
                letterSpacing: "-0.64px",
                lineHeight: "41.6px",
                margin: 0,
              }}
            >
              Play
            </h1>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "#000",
                letterSpacing: "1.2px",
                lineHeight: "16.8px",
              }}
            >
              Publication Art and Personal Artwork
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Play/play-header-icon.svg" alt="" aria-hidden="true" width={40} height={40} />
        </section>

        {/* single column on mobile; reflows into the Figma two-column
            layout at md+ via .play-grid-item (see globals.css) — items are
            rendered once so videos don't get mounted (and loaded) twice */}
        <section className="grid grid-cols-1 md:grid-cols-2 w-full" style={{ gap: 16, padding: 16 }}>
          {PLAY_ITEMS.map((item) => (
            <PlayCard key={item.id} item={item} />
          ))}
        </section>
      </main>
    </div>
  );
}
