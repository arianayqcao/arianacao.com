import Link from "next/link";

export default function DubcoinSystemPage() {
  return (
    <div className="bg-white text-slate-950">
      <section className="bg-[#FF3CA0] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <div className="mb-10 flex flex-col gap-6 rounded-[2rem] bg-white/10 p-5 text-sm text-white backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <div className="font-semibold uppercase tracking-[0.33em] text-white/90">DH DUBHACKS '25 LIVE</div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[0.95rem] uppercase tracking-[0.24em] text-white/80">
              <span>Home</span>
              <span className="text-white/50">/</span>
              <span>Guide</span>
              <span className="text-white/50">/</span>
              <span>DubCoins</span>
            </div>
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">51 DubCoins</div>
          </div>

          <div className="rounded-[2rem] bg-[#FF3CA0] p-6 sm:p-8">
            <div className="mb-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.36em] text-white/70">DubHacks live countdown</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Countdown to submission
                </h1>
              </div>
              <div className="rounded-3xl border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-white/90">
                Live now
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div className="rounded-[1.5rem] bg-white/12 p-6 text-center text-5xl font-semibold tracking-[0.18em] text-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] sm:text-6xl">
                12
              </div>
              <div className="flex items-center justify-center gap-4 text-xl uppercase tracking-[0.4em] text-white/80 sm:text-2xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">:</span>
              </div>
              <div className="rounded-[1.5rem] bg-white/12 p-6 text-center text-5xl font-semibold tracking-[0.18em] text-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] sm:text-6xl">
                45
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-3xl font-semibold tracking-[0.12em] text-white sm:text-4xl">
              <div className="rounded-[1.5rem] bg-white/15 px-5 py-4">36</div>
              <div className="self-center text-base uppercase tracking-[0.32em] text-white/70">seconds</div>
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-6 text-white/80">A polished hacker profile experience built to help participants manage DubCoin rewards, stay on track, and move quickly through the event.</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <section className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Project overview</p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Automating the DubCoin distribution system</h2>
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Lead UX Designer</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Timeline</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">8 weeks</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Team</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Design, product, engineering</p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Context</p>
          <h3 className="text-2xl font-semibold text-slate-950">A live hacker profile that kept the event moving</h3>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            DubHacks needed a more seamless journey for participants to earn, track, and redeem DubCoins. The existing experience required manual coordination, creating friction and confusion at every turn.
          </p>
        </section>

        <section className="mt-16 space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Problem</p>
          <h3 className="text-2xl font-semibold text-slate-950">What we needed to simplify</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Manual", description: "Attendance and rewards were tracked by hand, slowing down event support." },
              { title: "OpenJet", description: "Existing tools were fragmented and difficult for students to follow in the flow." },
              { title: "Disconnected", description: "Participants lacked a single source of truth for their DubCoin balance and progress." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
                <p className="mt-4 text-base leading-7 text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Hacker profile</p>
          <h3 className="text-3xl font-semibold text-slate-950">The Hacker Profile, in full.</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-slate-100 p-6 text-slate-500">
              <div className="h-72 rounded-[1.5rem] bg-slate-200" />
            </div>
            <div className="rounded-[2rem] bg-slate-100 p-6 text-slate-500">
              <div className="h-72 rounded-[1.5rem] bg-slate-200" />
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-12">
          {[
            {
              title: "Reward visibility",
              copy: "Participants can see their DubCoin balance and next milestones in one central place.",
            },
            {
              title: "Streamlined actions",
              copy: "A simplified flow helps users claim rewards quickly without leaving the event experience.",
            },
            {
              title: "Accessible design",
              copy: "Bold typography, strong contrast, and friendly microcopy keep the interface approachable.",
            },
          ].map((feature, index) => (
            <div key={feature.title} className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Feature</p>
                <h4 className="mt-3 text-2xl font-semibold text-slate-950">{feature.title}</h4>
                <p className="mt-4 text-base leading-8 text-slate-600">{feature.copy}</p>
              </div>
              <div className="rounded-[1.75rem] bg-slate-100 p-6">
                <div className="h-56 rounded-[1.5rem] bg-slate-200" />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "300%", label: "faster onboarding" },
              { value: "Zero", label: "manual reward tallying" },
              { value: "Fewer questions", label: "from participants" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-4xl font-semibold text-[#FF3CA0]">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Constraints</p>
          <h3 className="text-2xl font-semibold text-slate-950">Our constraints shaped the design.</h3>
          <div className="rounded-[2rem] bg-slate-100 p-6">
            <div className="h-72 rounded-[1.5rem] bg-slate-200" />
          </div>
        </section>

        <section className="mt-16 space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#FF3CA0]">Future direction</p>
          <h3 className="text-3xl font-semibold text-slate-950">Where the DubCoin system goes from here.</h3>
          <ol className="mt-6 space-y-4 list-decimal pl-5 text-slate-700">
            <li className="leading-8">Expand reward categories to support more partner experiences and prizes.</li>
            <li className="leading-8">Add user onboarding moments to make DubCoins feel more playful and motivating.</li>
            <li className="leading-8">Connect the system to event analytics for smarter operations and faster support.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
