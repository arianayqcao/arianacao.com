import Link from "next/link";
import Image from "next/image";
import MobileMenuOverlay from "@/components/MobileMenuOverlay";

export const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/play", label: "play" },
  { href: "/about", label: "about" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav
        className="flex items-center justify-between"
        style={{ padding: 16 }}
      >
        {/* logo */}
        <Link href="/" className="flex items-center" style={{ paddingRight: 16, paddingBlock: 8 }}>
          <Image src="/apple_logo.svg" alt="Apple Logo" width={40} height={40} />
        </Link>

        {/* centre links */}
        <div className="hidden md:flex flex-1 justify-center" style={{ paddingBlock: 8 }}>
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
          className="hidden md:inline"
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

        {/* mobile menu */}
        <MobileMenuOverlay />
      </nav>
    </header>
  );
}
