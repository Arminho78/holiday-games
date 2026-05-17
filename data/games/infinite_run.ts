import type { GameRegistryEntry } from "@/types/game-registry";

/** Routing & embed config — copy/specs in `public/games/infinite_run/game.json`. */
export const infinite_run: GameRegistryEntry = {
  slug: "infinite_run",
  status: "available",
  carouselLayout: "standard",
  scratch: { provider: "mit" },
};
