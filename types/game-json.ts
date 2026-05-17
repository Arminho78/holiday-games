import type { GameType, Genre } from "@/types/game";

/**
 * Per-game copy and specs stored at `public/games/[slug]/game.json`.
 * Add a new file when registering a game that uses JSON-driven metadata.
 */
export interface GameJsonFile {
  title: string;
  genre: Genre;
  subgenre: string;
  players: string;
  developer: string;
  description: string;
  longDescription: string;
  gameType: GameType;
  tags: string[];
}
