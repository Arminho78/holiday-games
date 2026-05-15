"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function GameNotFound() {
  return (
    <m.div
      className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-7 px-4 py-28 text-center sm:px-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <m.span
        variants={staggerItem}
        className="font-display text-8xl font-black text-accent/20"
      >
        404
      </m.span>
      <m.h1
        variants={staggerItem}
        className="font-display text-2xl font-bold text-zinc-100 sm:text-3xl"
      >
        Game not found
      </m.h1>
      <m.p variants={staggerItem} className="text-base leading-relaxed text-zinc-500">
        This game doesn&apos;t exist or may have been removed.
      </m.p>
      <m.div variants={staggerItem} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-8 text-sm font-semibold text-white btn-glow"
        >
          Back to all games
        </Link>
      </m.div>
    </m.div>
  );
}
