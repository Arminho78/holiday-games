import fs from "fs";
import path from "path";
import type { Game } from "@/types/game";
import type { GameJsonFile } from "@/types/game-json";
import type { GameRegistryEntry } from "@/types/game-registry";
import { gameCarouselImagePaths, gameImagePaths } from "@/lib/game-assets";

const GAME_JSON_FILENAME = "game.json";

export function gameJsonPublicPath(slug: string): string {
  return `/games/${slug}/${GAME_JSON_FILENAME}`;
}

export function gameJsonFilePath(slug: string): string {
  return path.join(process.cwd(), "public", "games", slug, GAME_JSON_FILENAME);
}

/** Reads `public/games/[slug]/game.json` at build / request time (server-only). */
export function loadGameJson(slug: string): GameJsonFile | null {
  const filePath = gameJsonFilePath(slug);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as GameJsonFile;
}

export function hasGameJson(slug: string): boolean {
  return fs.existsSync(gameJsonFilePath(slug));
}

/** Merges registry config with JSON metadata and resolved asset paths. */
export function mergeGameFromJson(
  entry: GameRegistryEntry,
  json: GameJsonFile,
): Game {
  const assets = gameImagePaths(entry.slug);

  const images =
    entry.carouselLayout === "standard"
      ? (() => {
          const carousel = gameCarouselImagePaths(entry.slug);
          return {
            thumbnail: assets.thumbnail,
            screenshots: carousel.slice(1),
            banner: carousel[0],
          };
        })()
      : (entry.images ?? {
          thumbnail: assets.thumbnail,
          screenshots: [] as string[],
        });

  return {
    slug: entry.slug,
    title: json.title,
    genre: json.genre,
    subgenre: json.subgenre,
    players: json.players,
    developer: json.developer,
    description: json.description,
    longDescription: json.longDescription,
    gameType: json.gameType,
    tags: json.tags,
    featured: entry.featured,
    status: entry.status,
    gameUrl: entry.gameUrl,
    carouselLayout: entry.carouselLayout,
    scratch: entry.scratch,
    unity: entry.unity,
    images,
    thumbnail: entry.thumbnail ?? assets.thumbnail,
  };
}

/** Resolves a registry entry or legacy inline `Game` into a full `Game`. */
export function resolveGame(entry: GameRegistryEntry | Game): Game {
  if ("longDescription" in entry && "title" in entry) {
    return entry as Game;
  }

  const registry = entry as GameRegistryEntry;
  const json = loadGameJson(registry.slug);
  if (!json) {
    throw new Error(
      `Missing ${gameJsonPublicPath(registry.slug)} — add game.json or provide inline Game data.`,
    );
  }

  return mergeGameFromJson(registry, json);
}
