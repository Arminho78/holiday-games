"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Game } from "@/types/game";
import { getGamePath } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const href = getGamePath(game.slug);
  const slides = [game.images.thumbnail, ...game.images.screenshots];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent-glow">
      {/* Image carousel */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-elevated">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          loop={slides.length > 1}
          className="game-card-swiper h-full w-full"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={src + i}>
              <Image
                src={src}
                alt={i === 0 ? game.title : `${game.title} screenshot ${i}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Status badge */}
        {game.status === "coming-soon" && (
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
            Coming Soon
          </span>
        )}
        {game.status === "maintenance" && (
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
            Maintenance
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-medium capitalize text-violet-300">
            {game.genre}
          </span>
          <span className="text-zinc-500">{game.players}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white">
          {game.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {game.description}
        </p>

        {/* CTA */}
        <Link
          href={href}
          className="mt-auto inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-accent px-5 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent/30 active:scale-[0.97]"
        >
          Show Me
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
        </Link>
      </div>
    </article>
  );
}
