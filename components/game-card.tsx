"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { m } from "framer-motion";
import type { Game } from "@/types/game";
import { viewFadeInUp } from "@/lib/motion";
import { resolveGameCarouselImages } from "@/lib/game-assets";
import { getGamePath } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

interface GameCardProps {
  game: Game;
  index?: number;
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const href = getGamePath(game.slug);
  const slides = resolveGameCarouselImages(game);

  return (
    <m.article
      {...viewFadeInUp}
      transition={{
        ...viewFadeInUp.transition,
        delay: Math.min(index * 0.06, 0.3),
      }}
      whileHover={{ y: -6 }}
      className="group card-shine relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle/80 bg-surface shadow-lg shadow-black/20 transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-xl hover:shadow-accent-glow"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface-elevated">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={
            slides.length > 1
              ? { delay: 4500, disableOnInteraction: true }
              : false
          }
          loop={slides.length > 1}
          initialSlide={0}
          className="game-card-swiper h-full w-full"
        >
          {slides.map((src, i) => {
            const isLcpCandidate = index === 0 && i === 0;
            return (
            <SwiperSlide key={src}>
              <Image
                src={src}
                alt={
                  i === 0
                    ? `${game.title} cover`
                    : `${game.title} ${i.toString().padStart(2, "0")}`
                }
                fill
                priority={isLcpCandidate}
                loading={isLcpCandidate ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        {game.status === "coming-soon" && (
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-amber-400/30 bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            Coming Soon
          </span>
        )}
        {game.status === "maintenance" && (
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-red-400/30 bg-red-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            Maintenance
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-semibold capitalize text-violet-300">
            {game.genre}
          </span>
          <span className="rounded-full border border-border-subtle/80 bg-surface-elevated/60 px-2.5 py-0.5 font-medium capitalize text-zinc-400">
            {game.subgenre}
          </span>
          <span className="rounded-full border border-border-subtle/80 bg-surface-elevated/60 px-2.5 py-0.5 font-medium text-zinc-400">
            {game.players}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-zinc-100 transition-colors duration-200 group-hover:text-white sm:text-xl">
          {game.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {game.description}
        </p>

        <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={href}
            className="mt-auto inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-accent px-6 text-sm font-semibold text-white btn-glow"
          >
            Play
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4.773 4.773a.75.75 0 0 1 0 1.06l-4.773 4.774a.75.75 0 0 1-1.06-1.06l3.469-3.47H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </m.div>
      </div>
    </m.article>
  );
}
