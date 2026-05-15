import type { Game } from "@/types/game";

interface GamePlaySectionProps {
  game: Game;
  children: React.ReactNode;
}

export function GamePlaySection({ game, children }: GamePlaySectionProps) {
  return (
    <section
      id="play-section"
      className="scroll-mt-24 border-t border-border-subtle bg-surface/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-violet-400">
          Play {game.title}
        </h2>
        {children}
      </div>
    </section>
  );
}
