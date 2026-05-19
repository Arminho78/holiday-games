import fs from "fs";
import path from "path";
import type { Game } from "@/types/game";
import type { GameJsonFeatured, GameJsonFile } from "@/types/game-json";
import type { GameRegistryEntry } from "@/types/game-registry";
import {
  GAME_ASSET_FILES,
  gameImagePaths,
  gamePublicDir,
} from "@/lib/game-assets";

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

/** Appends `?v=mtime` so swapped JPEGs in `public/games/[slug]/` bypass browser / Next image cache. */
export function versionedGameAssetUrl(slug: string, filename: string): string {
  const url = `${gamePublicDir(slug)}/${filename}`;
  const filePath = path.join(process.cwd(), "public", "games", slug, filename);
  if (!fs.existsSync(filePath)) return url;
  return `${url}?v=${Math.floor(fs.statSync(filePath).mtimeMs)}`;
}

/** Standard carousel paths with cache-busting query params (server-only). */
export function buildStandardGameImages(slug: string) {
  const publicDir = path.join(process.cwd(), "public", "games", slug);
  const candidates = [
    GAME_ASSET_FILES.cover,
    ...Array.from(
      { length: 5 },
      (_, i) => `thumbnail${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  ];
  const existing = candidates.filter((name) =>
    fs.existsSync(path.join(publicDir, name)),
  );
  const versioned = existing.map((name) => versionedGameAssetUrl(slug, name));

  const thumbFilename = fs.existsSync(
    path.join(publicDir, GAME_ASSET_FILES.thumbnail),
  )
    ? GAME_ASSET_FILES.thumbnail
    : GAME_ASSET_FILES.cover;

  const banner = versioned[0] ?? versionedGameAssetUrl(slug, thumbFilename);

  return {
    thumbnail: versionedGameAssetUrl(slug, thumbFilename),
    screenshots: versioned.slice(1),
    banner,
  };
}

/** Maps `game.json` featured flag (`y` / `n`) to homepage section placement. */
export function parseGameJsonFeatured(value: GameJsonFeatured | string): boolean {
  const normalized = value.trim().toLowerCase();
  if (normalized === "y") return true;
  if (normalized === "n") return false;
  throw new Error(
    `Invalid featured value "${value}" in game.json — use "y" (Featured) or "n" (More Games).`,
  );
}

/** Merges registry config with JSON metadata and resolved asset paths. */
export function mergeGameFromJson(
  entry: GameRegistryEntry,
  json: GameJsonFile,
): Game {
  const assets = gameImagePaths(entry.slug);

  const images =
    entry.carouselLayout === "standard"
      ? buildStandardGameImages(entry.slug)
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
    gameUrl: json.gameUrl,
    featured: parseGameJsonFeatured(json.featured),
    tags: json.tags,
    status: entry.status,
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
