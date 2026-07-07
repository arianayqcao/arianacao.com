import Link from "next/link";
import SnakeGame from "@/components/SnakeGame"

export const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/play", label: "play" },
  { href: "/about", label: "about" },
];

export default function Footer() {
  return (
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

        {/* ── nav links + snake game ──────────────────────────────────── */}
        <div
          className="flex flex-col md:flex-row w-full shrink-0 gap-8"
          style={{ maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
        >
          {/* ── col 1: CTA + nav links ──────────────────────────────────── */}
          <div className="flex flex-col justify-between w-full md:w-1/3 gap-8 md:gap-0">
            {/* top: heading + tagline */}
            <div className="flex flex-col shrink-0 w-full md:w-[340px]" style={{ gap: 19 }}>
              <h2
                data-cursor="text-large"
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
                data-cursor="text-regular"
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

            {/* bottom: link columns */}
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
                  { label: "linkedin", href: "https://www.linkedin.com/in/ariana-yq-cao/" },
                  { label: "resume", href: "/resume" },
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

          {/* ── col 2: snake game ───────────────────────────────────────── */}
          <div className="shrink-0 w-full md:w-2/3" >
            <SnakeGame />
          </div>
        </div>

        {/* ── bottom bar ───────────────────────────────────────── */}
        <div
          className="flex items-center justify-between w-full shrink-0"
          style={{ opacity: 0.898, maxWidth: "var(--max-width-content)", width: "100%", margin: "0 auto" }}
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
              href="https://github.com/arianayqcao"
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
              href="https://www.linkedin.com/in/ariana-yq-cao/"
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
    );
}