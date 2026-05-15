import type { CarouselLayout, Game } from "@/types/game";

/**
 * Standard asset paths under `public/games/[slug]/`.
 *
 * Carousel order: cover.jpg → thumbnail01.jpg … thumbnail05.jpg → (loop)
 * Listing card: thumbnail.jpg (static meta / fallback)
 */
export const GAME_ASSET_FILES = {
  thumbnail: "thumbnail.jpg",
  cover: "cover.jpg",
} as const;

export const MAX_ROTATING_THUMBNAILS = 5;

export function gamePublicDir(slug: string): string {
  return `/games/${slug}`;
}

export function gameImagePaths(slug: string) {
  const base = gamePublicDir(slug);
  return {
    thumbnail: `${base}/${GAME_ASSET_FILES.thumbnail}`,
    cover: `${base}/${GAME_ASSET_FILES.cover}`,
    screenshot: (index: number) => `${base}/screenshot-${index}.jpg`,
    playFile: (filename: string) =>
      `${base}/${filename.replace(/^\//, "")}`,
  };
}

/** Rotating gallery paths: cover.jpg, then thumbnail01–thumbnail05.jpg */
export function gameCarouselImagePaths(slug: string): string[] {
  const base = gamePublicDir(slug);
  const paths = [`${base}/${GAME_ASSET_FILES.cover}`];

  for (let i = 1; i <= MAX_ROTATING_THUMBNAILS; i++) {
    paths.push(`${base}/thumbnail${String(i).padStart(2, "0")}.jpg`);
  }

  return paths;
}

export function carouselImageLabel(index: number): string {
  if (index === 0) return "cover";
  return `thumbnail${String(index).padStart(2, "0")}`;
}

/** Resolves carousel slide URLs for detail page and game cards. */
export function resolveGameCarouselImages(
  game: Pick<Game, "slug" | "images" | "carouselLayout">,
): string[] {
  if (game.carouselLayout === "standard") {
    return gameCarouselImagePaths(game.slug);
  }

  const slides: string[] = [];
  const cover = game.images.banner ?? game.images.thumbnail;
  if (cover) slides.push(cover);

  for (const src of game.images.screenshots) {
    if (!slides.includes(src)) slides.push(src);
  }

  return slides.length > 0 ? slides : [game.images.thumbnail];
}
