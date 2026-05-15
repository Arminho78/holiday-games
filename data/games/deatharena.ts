import type { GameRegistryEntry } from "@/types/game-registry";

/** MIT Scratch project — embed via scratch.mit.edu (not Outlook safelinks). */
const SCRATCH_PROJECT_ID = "1316435844";

/** Routing & embed config — copy/specs in `public/games/deatharena/game.json`. */
export const deatharena: GameRegistryEntry = {
  slug: "deatharena",
  featured: true,
  status: "available",
  carouselLayout: "standard",
  gameUrl: SCRATCH_PROJECT_ID,
  scratch: { provider: "mit" },
};
