import type { Game } from "@/types/game";
import type { GameRegistryEntry } from "@/types/game-registry";
import { deatharena } from "@/data/games/deatharena";
import { infinite_run } from "@/data/games/infinite_run";
import { pong } from "@/data/games/pong";
import { resolveGame } from "@/lib/game-json";

/** Registry entries — JSON-backed games need `public/games/[slug]/game.json`. */
const gameEntries: GameRegistryEntry[] = [
  deatharena,
  infinite_run,
  pong,
];

/** Resolved games (registry + `game.json` merged at load time). */
export const games: Game[] = gameEntries.map((entry) => resolveGame(entry));

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getAvailableGames(): Game[] {
  return games.filter((g) => g.status === "available");
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getMoreGames(): Game[] {
  return games.filter((g) => !g.featured);
}
