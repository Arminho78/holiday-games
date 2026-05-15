"use client";

import { m } from "framer-motion";
import type { Game } from "@/types/game";
import { easeOutExpo } from "@/lib/motion";

interface GamePlaySectionProps {
  game: Game;
  children: React.ReactNode;
}

export function GamePlaySection({ game, children }: GamePlaySectionProps) {
  return (
    <section
      id="play-section"
      className="scroll-mt-24 border-t border-border-subtle/50 bg-surface/30"
    >
      <m.div
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <h2 className="mb-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
          Play {game.title}
        </h2>
        {children}
      </m.div>
    </section>
  );
}
