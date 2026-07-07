"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/play", label: "play" },
  { href: "/about", label: "about" },
];

function CaterpillarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="332 727 284 338" aria-hidden="true">
      <path d="M405.239 884.242L425.197 905.487L425.746 906.232L387.092 933.81L370.361 917.078L370.347 917.024L405.214 883.951Z" fill="#C8FF31" />
      <path d="M348.107 826.286L400.733 814.357V833.382L401.479 841.796L355.847 857.864Z" fill="#C8FF31" />
      <path d="M458.787 951.118L436.943 988.847L414.071 962.943L443.115 929.828Z" fill="#C8FF31" />
      <path d="M494.864 966.439L480.668 1010.73L454.353 998.169L484.055 962Z" fill="#C8FF31" />
      <path d="M519.835 985.318L551.972 992.459L526.042 1045.47L506.275 1030.21L518.693 984.446Z" fill="#C8FF31" />
      <path d="M584.675 1059.3L582.588 1060.2L562.159 1055L574.281 997.417L589.365 1000.77L590.575 1001.98Z" fill="#C8FF31" />

      <path d="M400.733 775.782L339.616 791.642L336.037 777.037L353.543 733.132L388.834 730.909L400.733 757.414Z" fill="#7BC100" />
      <path d="M339.616 791.642L400.733 775.782V814.357L348.107 826.286Z" fill="#7BC100" />
      <path d="M355.847 857.864L401.479 841.796L405.214 883.951L370.347 917.024Z" fill="#7BC100" />
      <path d="M387.092 933.81L425.746 906.232L443.115 929.828L414.071 962.943L397.808 944.525Z" fill="#7BC100" />
      <path d="M458.787 951.118L459.318 951.84L484.055 962L454.353 998.169L438.489 990.598L436.943 988.847Z" fill="#7BC100" />
      <path d="M480.668 1010.73L494.864 966.439L495.371 966.647L518.693 984.446L506.275 1030.21L481.621 1011.18Z" fill="#7BC100" />
      <path d="M551.972 992.459L574.281 997.417L562.159 1055L526.713 1045.98L526.042 1045.47Z" fill="#7BC100" />
      <path d="M590.575 1001.98L611.254 1022.66L607.585 1049.41L584.675 1059.3Z" fill="#7BC100" />

      <path d="M345.222 760.677L351.133 757.402L352.948 763.075L352.808 767.17L346.898 768.446L344.105 764.983Z" fill="#341208" />
      <path d="M361.338 756.385L367.356 759.969L367.967 764.021L366.588 766.879L360.569 767.294L358.963 763.146Z" fill="#341208" />
    </svg>
  );
}

export default function MobileMenuOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex md:hidden items-center justify-center"
        style={{ padding: 8 }}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center md:hidden" style={{ padding: 16 }}>
          {/* top row: logo + close */}
          <div className="flex items-center justify-between w-full shrink-0">
            <Link href="/" className="flex items-center" style={{ padding: 8 }} onClick={() => setOpen(false)}>
              <Image src="/apple_logo.svg" alt="Apple Logo" width={40} height={40} />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              style={{ padding: 8 }}
              onClick={() => setOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* middle: hero text + links, split top/bottom */}
          <div className="flex flex-1 flex-col items-center justify-between w-full" style={{ paddingBlock: 64 }}>
            <h2
              className="flex flex-col text-[72px] leading-[80px] text-center w-full"
              style={{ fontFamily: "var(--font-primary)", fontWeight: "var(--weight-black)", color: "var(--color-heading)" }}
            >
              <span>ariana</span>
              <span>cao.</span>
            </h2>

            <div className="flex flex-col items-start w-full gap-16">
              <div className="flex flex-col items-center justify-center w-full gap-8">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
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

              <div className="flex flex-col items-center justify-center w-full">
                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "#000",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    lineHeight: "16px",
                  }}
                >
                  resume
                </a>
              </div>

              <div className="flex items-center justify-end w-full" style={{ paddingBottom: 16 }}>
                <CaterpillarIcon className="h-[96px] w-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
