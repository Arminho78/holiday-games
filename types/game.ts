export type GameType = "unity-webgl" | "html5" | "iframe" | "scratch";

export type GameStatus = "available" | "coming-soon" | "maintenance";

export type Genre =
  | "action"
  | "puzzle"
  | "arcade"
  | "adventure"
  | "strategy"
  | "sports";

export interface GameImages {
  /** Card / listing thumbnail */
  thumbnail: string;
  /** Full-size screenshots for the detail page gallery */
  screenshots: string[];
  /** Optional wide banner used in featured placements */
  banner?: string;
}

export type ScratchProvider = "turbowarp" | "mit";

export interface ScratchConfig {
  /** Embed host when `gameUrl` is a numeric project ID. Defaults to TurboWarp. */
  provider?: ScratchProvider;
}

export interface UnityWebGLConfig {
  /** Path to the Unity loader script relative to public/games/<slug>/ */
  loaderUrl: string;
  /** Path to the .data file */
  dataUrl: string;
  /** Path to the .wasm framework file */
  frameworkUrl: string;
  /** Path to the .wasm code file */
  codeUrl: string;
}

export interface Game {
  slug: string;
  title: string;
  genre: Genre;
  subgenre: string;
  players: string;
  description: string;
  longDescription: string;
  images: GameImages;
  /** Quick-access card thumbnail (mirrors images.thumbnail) */
  thumbnail: string;
  gameType: GameType;
  /**
   * Playable entry point:
   * - html5 / unity-webgl: path relative to public/games/<slug>/
   * - scratch: numeric project ID, TurboWarp URL, or scratch.mit.edu embed URL
   * - iframe: full HTTPS embed URL or site-relative path
   */
  gameUrl: string;
  featured: boolean;
  status: GameStatus;
  tags: string[];
  /** Scratch / TurboWarp options — only when gameType is "scratch" */
  scratch?: ScratchConfig;
  /** Unity-specific build paths — only required when gameType is "unity-webgl" */
  unity?: UnityWebGLConfig;
}
