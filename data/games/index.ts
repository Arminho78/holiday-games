import type { Game } from "@/types/game";
import type { GameRegistryEntry } from "@/types/game-registry";
import { deatharena } from "@/data/games/deatharena";
import { resolveGame } from "@/lib/game-json";

/** Registry entries — JSON-backed games need `public/games/[slug]/game.json`. */
const gameEntries: (GameRegistryEntry | Game)[] = [
  deatharena,
  {
    slug: "snowball-dash",
    title: "Snowball Dash",
    genre: "action",
    subgenre: "endless-runner",
    players: "1 player",
    developer: "Holiday Games",
    description:
      "Race through a winter wonderland dodging obstacles and collecting presents.",
    longDescription:
      "Snowball Dash drops you into a procedurally-generated winter landscape where every run is different. Dodge frozen trees, leap over ice crevasses, and collect wrapped presents to rack up your score. Built with Unity WebGL, the game features dynamic weather, festive music, and global leaderboards so you can compete with friends.",
    images: {
      thumbnail: "/games/snowball-dash/thumbnail.png",
      screenshots: [
        "/games/snowball-dash/screenshot-1.png",
        "/games/snowball-dash/screenshot-2.png",
      ],
      banner: "/games/snowball-dash/banner.png",
    },
    thumbnail: "/games/snowball-dash/thumbnail.png",
    gameType: "unity-webgl",
    gameUrl: "index.html",
    featured: true,
    status: "coming-soon",
    tags: ["winter", "christmas", "runner", "singleplayer"],
    unity: {
      loaderUrl: "Build/snowball-dash.loader.js",
      dataUrl: "Build/snowball-dash.data",
      frameworkUrl: "Build/snowball-dash.framework.js",
      codeUrl: "Build/snowball-dash.wasm",
    },
  },
  {
    slug: "pumpkin-smash",
    title: "Pumpkin Smash",
    genre: "arcade",
    subgenre: "clicker",
    players: "1 player",
    developer: "Holiday Games",
    description:
      "Smash as many spooky pumpkins as you can before time runs out!",
    longDescription:
      "Pumpkin Smash is a fast-paced Halloween clicker built in pure HTML5 Canvas. Pumpkins pop up across the screen in increasingly tricky patterns — some are decoys that cost you points, while golden pumpkins multiply your score. Survive three rounds of escalating difficulty to unlock the bonus Graveyard stage.",
    images: {
      thumbnail: "/games/pumpkin-smash/thumbnail.png",
      screenshots: [
        "/games/pumpkin-smash/screenshot-1.png",
        "/games/pumpkin-smash/screenshot-2.png",
      ],
    },
    thumbnail: "/games/pumpkin-smash/thumbnail.png",
    gameType: "html5",
    gameUrl: "index.html",
    featured: true,
    status: "coming-soon",
    tags: ["halloween", "arcade", "clicker", "singleplayer"],
  },
  {
    slug: "elf-defense",
    title: "Elf Defense",
    genre: "strategy",
    subgenre: "tower-defense",
    players: "1-2 players",
    developer: "Holiday Games",
    description:
      "Command an army of elves to defend Santa's workshop from waves of mischievous goblins.",
    longDescription:
      "Elf Defense is a holiday tower-defense game where you place elf towers along winding paths to stop goblins from stealing Christmas presents. Earn candy-cane currency to upgrade towers, unlock special abilities like the Snowstorm Freeze, and team up with a friend in local co-op mode. Built with Unity WebGL for smooth 60 fps gameplay.",
    images: {
      thumbnail: "/games/elf-defense/thumbnail.png",
      screenshots: [
        "/games/elf-defense/screenshot-1.png",
        "/games/elf-defense/screenshot-2.png",
        "/games/elf-defense/screenshot-3.png",
      ],
      banner: "/games/elf-defense/banner.png",
    },
    thumbnail: "/games/elf-defense/thumbnail.png",
    gameType: "unity-webgl",
    gameUrl: "index.html",
    featured: false,
    status: "coming-soon",
    tags: ["christmas", "tower-defense", "co-op", "strategy"],
    unity: {
      loaderUrl: "Build/elf-defense.loader.js",
      dataUrl: "Build/elf-defense.data",
      frameworkUrl: "Build/elf-defense.framework.js",
      codeUrl: "Build/elf-defense.wasm",
    },
  },
];

/** Resolved games (registry + `game.json` merged at load time). */
export const games: Game[] = gameEntries.map((entry) => resolveGame(entry));

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getAvailableGames(): Game[] {
  return games.filter((g) => g.status === "available");
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}
