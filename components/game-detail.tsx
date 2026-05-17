"use client";

import { m } from "framer-motion";
import type { Game } from "@/types/game";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn, formatGameType } from "@/lib/utils";
import { GameDetailGallery } from "@/components/game-detail-gallery";
import { GameDetailSectionHeading } from "@/components/game-detail-section-heading";
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
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <m.div variants={staggerItem} className="lg:col-span-3">
            <GameDetailGallery images={galleryImages} title={game.title} />
          </m.div>

          <m.aside
            variants={staggerItem}
            className="flex w-full flex-col gap-6 lg:col-span-2"
          >
            {game.status !== "available" && (
              <StatusBadge status={game.status} />
            )}

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem]">
              {game.title}
            </h1>

            <SpecsCard game={game} />

            <div className="flex w-full justify-center">
              <m.button
                type="button"
                disabled={!canPlay}
                onClick={onPlayNow}
                whileHover={canPlay ? { scale: 1.02 } : undefined}
                whileTap={canPlay ? { scale: 0.98 } : undefined}
                className="mx-auto inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white btn-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:h-14 sm:w-auto sm:max-w-none sm:min-w-[220px] sm:gap-3 sm:px-8 sm:text-lg"
              >
                <PlayIcon />
                {playLabel}
              </m.button>
            </div>
          </m.aside>
        </div>

        <m.section
          variants={staggerItem}
          className="mt-10 rounded-2xl border border-border-subtle/80 bg-surface/50 p-7 backdrop-blur-sm sm:mt-12 sm:p-9 lg:mt-14"
        >
          <GameDetailSectionHeading>About this game</GameDetailSectionHeading>
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
    { label: "Subgenre", value: game.subgenre },
    { label: "Players", value: game.players },
    { label: "Developer", value: game.developer },
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
              (label === "Genre" || label === "Subgenre") && "capitalize",
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
