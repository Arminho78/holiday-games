import type {
  CarouselLayout,
  GameImages,
  GameStatus,
  ScratchConfig,
  UnityWebGLConfig,
} from "@/types/game";

/** Build-time / routing config — copy and specs live in `public/games/[slug]/game.json`. */
export interface GameRegistryEntry {
  slug: string;
  status: GameStatus;
  carouselLayout?: CarouselLayout;
  scratch?: ScratchConfig;
  unity?: UnityWebGLConfig;
  /** Used for legacy games without `game.json` or non-standard asset folders */
  images?: GameImages;
  thumbnail?: string;
}
