import Link from "next/link";

const cards = [
  {
    title: "DubHacks Hacker Profile",
    tag: "DUBHACKS · 2025",
    description: "Redesigning the DubCoin experience and DubCoin distribution system.",
    href: "/works/dubcoin-system",
    cta: "Read more →",
    imageAlt: "DubHacks live countdown preview",
  },
  {
    title: "Cura",
    tag: "W INFO HACKATHON · 2025",
    description: "Empowering families to manage caregiving with accessible, user-friendly tools and resources.",
    href: "/works/cura",
    cta: "Read more →",
    imageAlt: "Cura app preview",
  },
  {
    title: "DubHacks 2025 (case study coming soon!)",
    description: "Led website design and prototyping for DubHacks 2025, supporting 1,100+ participants.",
    href: "https://dubhacks.io/2025",
    cta: "DubHacks 2025 Website →",
    imageAlt: "DubHacks 2025 placeholder screenshot",
    external: true,
  },
  {
    title: "Lily's Salvadorean",
    description: "Redesigned local family business's restaurant website.",
    href: "#",
    cta: "Coming soon!",
    imageAlt: "Lily's Salvadorean logo placeholder",
    logoCard: true,
  },
];

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_minmax(280px,1fr)] lg:items-start">
            <div className="max-w-2xl">
              <p className="mb-6 text-sm uppercase tracking-[0.38em] text-slate-400">Selected work</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                I'm Ariana 🧑‍💻, a UX designer with a passion for crafting magical experiences — ones that feel intuitive, inclusive, and quietly delightful.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Based in Seattle, WA. Constantly collecting free magazines, making tea.
              </p>
            </div>

            <div className="relative flex items-start justify-end">
              <div className="hidden h-24 w-24 rounded-full bg-slate-100 sm:block" />
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 rounded-full border border-slate-200 bg-slate-950 px-6 py-8 text-center text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] sm:px-8 sm:py-10">
                <div className="mb-4 flex items-center justify-center text-2xl">👋</div>
                <div className="space-y-1 text-[0.92rem] leading-none tracking-[0.3em] uppercase text-slate-100">
                  <div>曹</div>
                  <div>雨</div>
                  <div>琪</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/9] bg-slate-100 text-slate-500">
                {card.logoCard ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="max-w-[180px] rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
                      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Lily's</p>
                      <p className="mt-3 text-3xl font-bold text-slate-900">Salvadorean</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.25em] text-slate-400">
                    {card.imageAlt}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7">
                {card.tag ? (
                  <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-[0.68rem] uppercase tracking-[0.26em] text-slate-600">
                    {card.tag}
                  </span>
                ) : null}
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-slate-900"
                  >
                    {card.cta}
                  </a>
                ) : (
                  <Link href={card.href} className="mt-5 inline-block text-sm font-medium text-slate-900">
                    {card.cta}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
