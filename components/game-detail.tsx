"use client";

import type { Game } from "@/types/game";
import { cn, formatGameType } from "@/lib/utils";
import { GameDetailGallery } from "@/components/game-detail-gallery";

interface GameDetailProps {
  game: Game;
  onPlayNow: () => void;
  canPlay: boolean;
}

export function GameDetail({ game, onPlayNow, canPlay }: GameDetailProps) {
  const galleryImages = [
    game.images.thumbnail,
    ...game.images.screenshots,
    ...(game.images.banner ? [game.images.banner] : []),
  ].filter(
    (src, index, arr) => arr.indexOf(src) === index,
  );

  const playLabel =
    game.status === "coming-soon"
      ? "Coming Soon"
      : game.status === "maintenance"
        ? "Under Maintenance"
        : "Play Now";

  return (
    <div className="relative isolate">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-96 rounded-full bg-accent/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-[80px]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:gap-12 lg:py-14">
        {/* Gallery + sidebar */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <GameDetailGallery images={galleryImages} title={game.title} />
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-2">
            {game.status !== "available" && (
              <StatusBadge status={game.status} />
            )}

            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl">
              {game.title}
            </h1>

            <SpecsCard game={game} />

            <button
              type="button"
              disabled={!canPlay}
              onClick={onPlayNow}
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-accent px-8 text-lg font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 sm:w-auto sm:min-w-[220px]"
            >
              <PlayIcon />
              {playLabel}
            </button>

            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle bg-surface-elevated/80 px-3 py-1 text-xs font-medium text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Long description */}
        <section className="rounded-2xl border border-border-subtle bg-surface/60 p-6 backdrop-blur-sm sm:p-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-400">
            About this game
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            {game.longDescription}
          </p>
        </section>
      </div>
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
    <dl className="grid gap-3 rounded-2xl border border-border-subtle bg-surface p-5 ring-1 ring-white/5">
      {specs.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 border-b border-border-subtle/60 pb-3 last:border-0 last:pb-0"
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
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
