import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* ─── data ──────────────────────────────────────────────────────── */

type PlayMedia =
  | { kind: "image"; src: string; aspect: string }
  | { kind: "video"; src: string; aspect: string; videoType?: "youtube" | "self-hosted" }
  | { kind: "grid3"; src: [string, string, string]; aspect: string };

interface PlayItem {
  id: string;
  title: string;
  description: string;
  media: PlayMedia;
  overlayPlayIcon?: boolean;
  url?: string;
}

// Card content stays in one list; the column order below controls placement
// while keeping each video mounted only once.
const PLAY_ITEMS: PlayItem[] = [
  {
    id: "gradient-map",
    title: "cold. icy.",
    description: "A cool-toned study made with Figma shaders and a gradient map.",
    media: { kind: "image", src: "/images/Play/Gradient Map.png", aspect: "1080 / 1350" },
  },
  {
    id: "liquid-chrome-shader",
    title: "liquid chrome",
    description: "Sculptural chrome forms made with Figma shaders.",
    media: { kind: "image", src: "/images/Play/liquid-chrome-shader-experiment.png", aspect: "1200 / 1200" },
  },
  {
    id: "shader-slice",
    title: "shader slices",
    description: "A warm light study exploring sliced gradients with Figma shaders.",
    media: { kind: "image", src: "/images/Play/shader-slice-experiment.png", aspect: "1350 / 900" },
  },
  {
    id: "topographic-map",
    title: "topographic map",
    description: "A flowing contour-line study made with Figma shaders.",
    media: { kind: "image", src: "/images/Play/Topographic Map.png", aspect: "1080 / 1350" },
  },
  {
    id: "glowing-fluffy-flowers",
    title: "glowing fluffy flowers",
    description: "playing around with Figma gradients & shadows",
    media: { kind: "image", src: "/images/Play/fluffy-flower.jpg", aspect: "727 / 649" },
  },
  {
    id: "can-you-see-me",
    title: "can you see me?",
    description: "created in AfterEffects",
    media: { kind: "video", src: "/videos/can_you_see_me.mp4", aspect: "1920 / 1080" },
  },
  {
    id: "charged-up-tshirt",
    title: "Charged Up! T-Shirt 2022-2023 Design",
    description: "robotics team merchandise for mario kart-themed FRC competition.",
    media: { kind: "image", src: "/images/Play/charged-up-tshirt.png", aspect: "696 / 900" },
  },
  {
    id: "glowing-orb",
    title: "glowing orb",
    description: "Created in AfterEffects",
    media: { kind: "video", src: "/videos/glowing_orb.mp4", aspect: "1920 / 1920" },
  },
  {
    id: "rough",
    title: "“rough”",
    description: "created in Illustrator with texture effects",
    media: { kind: "image", src: "/images/Play/rough-design.png", aspect: "2550 / 3300" },
  },
  {
    id: "digital-animation",
    title: "Digital Animation 2023 for Paly Robotics",
    description: "using Blender, AfterEffects, and Premiere Pro.",
    media: { kind: "video", videoType: "youtube", src: "https://www.youtube.com/embed/SGmWCeR20CE?si=fFpQk1PLK6O1RiBf", aspect: "16 / 9" },
    overlayPlayIcon: false,
  },
  {
    id: "still-art",
    title: "still art & light study",
    description: "created in Procreate",
    media: { kind: "image", src: "/images/Play/still-art-light-study.jpg", aspect: "346 / 448" },
  },
  {
    id: "informatics-tshirt",
    title: "informatics t-shirt design",
    description: "created for the Informatics Undergraduate Association (IUGA).",
    media: { kind: "image", src: "/images/Play/iuga-tshirt.png", aspect: "3414 / 4096" },
  },
  {
    id: "and-or",
    title: "and/or",
    description: "animation for student film around cultural, intergenerational love languages, using procreate. click to view full video.",
    media: { kind: "video", src: "/videos/and_or.mp4", aspect: "2368 / 1644" },
    url: "https://drive.google.com/file/d/1QINSH5ljeVVBQkROGAZ4oOWu3Y20yA6S/view?usp=sharing",
  },
  {
    id: "abyss",
    title: "abyss",
    description: "conceptual art. whale maybe?",
    media: { kind: "image", src: "/images/Play/abyss.png", aspect: "400 / 398.41" },
  },
  {
    id: "did-you-play-today-poster",
    title: "did you play today? conceptual poster",
    description: "played around with Figma shaders and shader fills: lens distortion, warp, and water caustic.",
    media: { kind: "image", src: "/images/Play/did-you-play-today.png", aspect: "820 / 1210" },
  },
  {
    id: "team8-logo-animation",
    title: "Team 8 Logo Animation",
    description: "Custom animation for Paly Robotics Team 8 using Adobe Illustrator, AfterEffects, and Premiere Pro. Sound up!",
    media: { kind: "video", src: "/videos/team-8-logo-animation.mp4", aspect: "1388 / 780" },
  },
  {
    id: "smiski-cafe-popup",
    title: "smiski-themed cafe pop-up poster design",
    description: "Instagram grid design for cafe fundraiser using Illustrator.",
    media: {
      kind: "grid3",
      src: [
        "/images/Play/atd-cafe-post-3-menu.png",
        "/images/Play/atd-cafe-post-2-photobooth.png",
        "/images/Play/atd-cafe-post-1.png",
      ],
      aspect: "1081 / 1350",
    },
  },
  {
    id: "alvaldi-tshirt",
    title: "Alvaldi T-Shirt 2022-2023 Design",
    description: "Traced design using pen tool of CAD of Team 8\nrobot: 'Alvaldi' using Adobe Illustrator for FRC.",
    media: { kind: "image", src: "/images/Play/Alvaldi-CAD-Shirt.png", aspect: "1083 / 1082" },
  },
  {
    id: "interact-hippos-tshirt",
    title: "Interact 5170 Area 13 Hippity Hoppity Hippos T-Shirt 2022-2023 \nDesign",
    description: "t-shirt design created for international community service organization.",
    media: { kind: "image", src: "/images/Play/interact-hippos-tshirt.png", aspect: "462 / 630" },
  },
];

const PLAY_COLUMN_IDS = [
  ["shader-slice", "liquid-chrome-shader", "gradient-map", "rough", "team8-logo-animation", "interact-hippos-tshirt"],
  ["still-art", "glowing-fluffy-flowers", "charged-up-tshirt", "and-or", "digital-animation", "informatics-tshirt"],
  ["glowing-orb", "can-you-see-me", "did-you-play-today-poster", "abyss", "alvaldi-tshirt", "smiski-cafe-popup"],
];

const PLAY_COLUMNS: PlayItem[][] = PLAY_COLUMN_IDS.map((columnIds) =>
  columnIds.map((id) => {
    const item = PLAY_ITEMS.find((playItem) => playItem.id === id);
    if (!item) throw new Error(`Missing Play item: ${id}`);
    return item;
  }),
);

/* ─── card ──────────────────────────────────────────────────────── */

function PlayCardMedia({ title, media, overlayPlayIcon }: { title: string; media: PlayMedia; overlayPlayIcon?: boolean }) {
  if (media.kind === "grid3") {
    return (
      <div className="flex w-full overflow-hidden rounded-sm">
        {media.src.map((src, i) => (
          <div key={src} className="relative w-1/3 shrink-0" style={{ aspectRatio: media.aspect }}>
            <Image src={src} alt={`${title} — photo ${i + 1} of ${media.src.length}`} fill sizes="(max-width: 768px) 33vw, 11vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: media.aspect }}>
      {media.kind === "video" && media.videoType === "youtube" ? (
        <iframe
          src={media.src}
          title={title}
          frameBorder="0"
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : media.kind === "video" ? (
        <video
          src={media.src}
          aria-label={title}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <Image src={media.src} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
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
  const card = (
    <div className="play-card flex flex-col w-full pb-4" style={{ gap: 8 }}>
      <PlayCardMedia title={item.title} media={item.media} overlayPlayIcon={item.overlayPlayIcon} />
      <div className="flex flex-col w-full" style={{ gap: 0 }}>
    <span
      style={{
        fontFamily: "var(--font-primary)",
        fontWeight: "var(--weight-semibold)",
        fontSize: "var(--text-sm)",
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
        color: "rgba(0,0,0,0.5)",
        lineHeight: "normal",
        whiteSpace: "pre-line",
      }}
    >
      {item.description}
    </span>
      </div>
    </div>
  );

  if (item.url) {
    return <Link href={item.url} target="_blank" rel="noopener noreferrer">
      {card}
    </Link>;
  }

  return card;
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

        {/* Three stacked columns on desktop; the same columns stack on mobile. */}
        <section className="play-columns w-full" style={{ padding: 16 }}>
          {PLAY_COLUMNS.map((column, columnIndex) => (
            <div className="play-column" key={columnIndex}>
              {column.map((item) => (
                <PlayCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

