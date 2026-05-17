import type { GameType, Genre } from "@/types/game";

/** `y` = Featured Games section; `n` = More Games section */
export type GameJsonFeatured = "y" | "n";

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
  /** Scratch project ID, embed URL, or path to the playable entry point */
  gameUrl: string;
  /** `y` shows under Featured Games; `n` shows under More Games */
  featured: GameJsonFeatured;
  tags: string[];
}
