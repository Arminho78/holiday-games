import type { GameRegistryEntry } from "@/types/game-registry";

/** Routing & embed config — copy/specs in `public/games/deatharena/game.json`. */
export const deatharena: GameRegistryEntry = {
  slug: "deatharena",
  status: "available",
  carouselLayout: "standard",
  scratch: { provider: "mit" },
};
