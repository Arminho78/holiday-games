"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const stats = [
  { icon: "🎮", label: "Games", value: "10+" },
  { icon: "🌍", label: "Platform", value: "Browser" },
  { icon: "🎉", label: "Price", value: "Free" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border-subtle/40 bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-accent/15 blur-[128px]" />
        <div className="absolute -bottom-32 right-[-10%] h-[360px] w-[520px] rounded-full bg-fuchsia-600/12 blur-[110px]" />
        <div className="absolute bottom-0 left-[-5%] h-[280px] w-[400px] rounded-full bg-amber-500/8 blur-[90px]" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_20%,transparent_100%)]"
      />

      <m.div
        className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36 lg:py-44"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <m.span
          variants={staggerItem}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-semibold tracking-wide text-violet-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
          </span>
          New games dropping soon
        </m.span>

        <m.h1
          variants={staggerItem}
          className="font-display max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Play Amazing
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            Holiday Games
          </span>
        </m.h1>

        <m.p
          variants={staggerItem}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed"
        >
          Hand-crafted browser games built for cozy nights, holiday vibes, and
          one-more-run fun.
        </m.p>

        <m.div
          variants={staggerItem}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#featured"
              className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-accent px-9 text-sm font-semibold text-white btn-glow"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Explore Games
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4.773 4.773a.75.75 0 0 1 0 1.06l-4.773 4.774a.75.75 0 0 1-1.06-1.06l3.469-3.47H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </m.div>

          <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated/50 px-9 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-500 hover:bg-surface-elevated hover:text-white"
            >
              Learn More
            </Link>
          </m.div>
        </m.div>

        <m.div
          variants={staggerItem}
          className="mt-20 grid w-full max-w-lg grid-cols-1 gap-8 border-t border-border-subtle/50 pt-10 sm:grid-cols-3 sm:gap-4"
        >
          {stats.map((stat) => (
            <m.div
              key={stat.label}
              className="flex flex-col items-center gap-1.5"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-xl" aria-hidden>
                {stat.icon}
              </span>
              <span className="font-display text-lg font-bold text-zinc-100">
                {stat.value}
              </span>
              <span className="text-sm text-zinc-500">{stat.label}</span>
            </m.div>
          ))}
        </m.div>
      </m.div>
    </section>
  );
}

