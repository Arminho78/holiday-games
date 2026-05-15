"use client";

import { m } from "framer-motion";
import type { Game } from "@/types/game";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn, formatGameType } from "@/lib/utils";
import { GameDetailGallery } from "@/components/game-detail-gallery";
import { resolveGameCarouselImages } from "@/lib/game-assets";

interface GameDetailProps {
  game: Game;
  onPlayNow: () => void;
  canPlay: boolean;
}

export function GameDetail({ game, onPlayNow, canPlay }: GameDetailProps) {
  const galleryImages = resolveGameCarouselImages(game);

  const playLabel =
    game.status === "coming-soon"
      ? "Coming Soon"
      : game.status === "maintenance"
        ? "Under Maintenance"
        : "Play Now";

  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-80 w-[28rem] rounded-full bg-accent/12 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[90px]"
      />

      <m.div
        className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <m.div variants={staggerItem} className="lg:col-span-3">
            <GameDetailGallery images={galleryImages} title={game.title} />
          </m.div>

          <m.aside
            variants={staggerItem}
            className="flex flex-col gap-7 lg:col-span-2"
          >
            {game.status !== "available" && (
              <StatusBadge status={game.status} />
            )}

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {game.title}
            </h1>

            <SpecsCard game={game} />

            <div className="flex justify-center">
              <m.button
                type="button"
                disabled={!canPlay}
                onClick={onPlayNow}
                whileHover={canPlay ? { scale: 1.02 } : undefined}
                whileTap={canPlay ? { scale: 0.98 } : undefined}
                className="inline-flex h-12 w-fit max-w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white btn-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:h-14 sm:gap-3 sm:px-8 sm:text-lg sm:min-w-[220px]"
              >
                <PlayIcon />
                {playLabel}
              </m.button>
            </div>

            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle/80 bg-surface-elevated/60 px-3 py-1 text-xs font-medium text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </m.aside>
        </div>

        <m.section
          variants={staggerItem}
          className="mt-10 rounded-2xl border border-border-subtle/80 bg-surface/50 p-7 backdrop-blur-sm sm:mt-12 sm:p-9 lg:mt-14"
        >
          <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            About this game
          </h2>
          <p className="text-base leading-[1.75] text-zinc-300 sm:text-lg sm:leading-[1.8]">
            {game.longDescription}
          </p>
        </m.section>
      </m.div>
    </div>
  );
}

function SpecsCard({ game }: { game: Game }) {
  const specs = [
    { label: "Genre", value: game.genre },
    { label: "Players", value: game.players },
    { label: "Game type", value: formatGameType(game.gameType) },
  ];

  return (
    <dl className="grid gap-4 rounded-2xl border border-border-subtle/80 bg-surface/80 p-6 ring-1 ring-white/5">
      {specs.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 border-b border-border-subtle/50 pb-4 last:border-0 last:pb-0"
        >
          <dt className="text-sm font-medium text-zinc-500">{label}</dt>
          <dd
            className={cn(
              "text-right text-sm font-semibold text-zinc-100",
              label === "Genre" && "capitalize",
            )}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function StatusBadge({ status }: { status: Game["status"] }) {
  const config =
    status === "coming-soon"
      ? {
          label: "Coming Soon",
          className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
        }
      : {
          label: "Under Maintenance",
          className: "border-red-500/30 bg-red-500/10 text-red-300",
        };

  return (
    <m.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </m.span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
