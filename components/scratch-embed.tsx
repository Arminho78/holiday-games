"use client";

import { useMemo } from "react";
import type { Game } from "@/types/game";
import { resolveGameEmbed } from "@/lib/game-embed";
import { GamePlayer, type GamePlayerProps } from "@/components/game-player";

type ScratchGameSource = Pick<
  Game,
  "slug" | "title" | "gameUrl" | "gameType" | "scratch"
>;

export interface ScratchEmbedProps
  extends Omit<
    GamePlayerProps,
    "src" | "gameType" | "embedProvider" | "embedError" | "title"
  > {
  game: ScratchGameSource;
  title?: string;
}

/**
 * Scratch / TurboWarp iframe player — lazy-loads via `GamePlayer` after Play Now.
 * Pass a numeric project ID, MIT embed URL, or TurboWarp URL in `game.gameUrl`.
 */
export function ScratchEmbed({ game, title, ...playerProps }: ScratchEmbedProps) {
  const embed = useMemo(() => resolveGameEmbed(game), [game]);
  const displayTitle = title ?? game.title;

  return (
    <GamePlayer
      title={displayTitle}
      gameType="scratch"
      src={"error" in embed ? "" : embed.src}
      embedProvider={"error" in embed ? undefined : embed.provider}
      embedError={"error" in embed ? embed.error : undefined}
      {...playerProps}
    />
  );
}
