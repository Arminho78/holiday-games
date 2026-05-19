import type { GameRegistryEntry } from "@/types/game-registry";

/** Routing & embed config — copy/specs in `public/games/pong/game.json`. */
export const pong: GameRegistryEntry = {
  slug: "pong",
  status: "available",
  carouselLayout: "standard",
  scratch: { provider: "mit" },
};
