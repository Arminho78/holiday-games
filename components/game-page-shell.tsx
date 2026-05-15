"use client";

import { useState } from "react";
import type { Game } from "@/types/game";
import { isScratchGameType, resolveGameEmbed } from "@/lib/game-embed";
import { GameDetail } from "@/components/game-detail";
import { GamePlaySection } from "@/components/game-play-section";
import { GamePlayer } from "@/components/game-player";
import { ScratchEmbed } from "@/components/scratch-embed";

interface GamePageShellProps {
  game: Game;
}

export function GamePageShell({ game }: GamePageShellProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const canPlay = game.status === "available";
  const isScratch = isScratchGameType(game.gameType);
  const embed = resolveGameEmbed(game);

  const unavailableMessage =
    game.status === "coming-soon"
      ? "This game is coming soon!"
      : "This game is under maintenance.";

  function handlePlayNow() {
    if (!canPlay) return;
    setIsPlaying(true);
    requestAnimationFrame(() => {
      document.getElementById("play-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const playerProps = {
    active: isPlaying,
    onActiveChange: setIsPlaying,
    disabled: !canPlay,
    disabledMessage: unavailableMessage,
  };

  return (
    <>
      <GameDetail game={game} onPlayNow={handlePlayNow} canPlay={canPlay} />
      <GamePlaySection game={game}>
        {isScratch ? (
          <ScratchEmbed game={game} {...playerProps} />
        ) : (
          <GamePlayer
            title={game.title}
            src={"error" in embed ? "" : embed.src}
            gameType={game.gameType}
            embedProvider={"error" in embed ? undefined : embed.provider}
            embedError={"error" in embed ? embed.error : undefined}
            {...playerProps}
          />
        )}
      </GamePlaySection>
    </>
  );
}
