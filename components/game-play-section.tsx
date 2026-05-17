"use client";

import { m } from "framer-motion";
import type { Game } from "@/types/game";
import { GameDetailSectionHeading } from "@/components/game-detail-section-heading";
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
        <GameDetailSectionHeading>Play {game.title}</GameDetailSectionHeading>
        {children}
      </m.div>
    </section>
  );
}
