import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      {/* Ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-[320px] w-[480px] rounded-full bg-fuchsia-600/15 blur-[100px]"
      />

      {/* Grid overlay for that techy gaming feel */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
          </span>
          New games dropping soon
        </span>

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            Play Amazing
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            Holiday Games
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Play our home-made games for fun.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/games"
            className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-accent px-8 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              Explore Games
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4.773 4.773a.75.75 0 0 1 0 1.06l-4.773 4.774a.75.75 0 0 1-1.06-1.06l3.469-3.47H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border-subtle px-8 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-surface-elevated hover:text-white active:scale-[0.98]"
          >
            Learn More
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎮</span>
            <span>
              <strong className="text-zinc-200">10+</strong> Games
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🌍</span>
            <span>
              <strong className="text-zinc-200">100%</strong> Browser-based
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎉</span>
            <span>
              <strong className="text-zinc-200">Free</strong> to play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
