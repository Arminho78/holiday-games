import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getGamePath(slug: string): string {
  return `/games/${slug}`;
}

const GAME_TYPE_LABELS: Record<string, string> = {
  "unity-webgl": "Unity WebGL",
  html5: "HTML5",
  iframe: "Embedded",
  scratch: "Scratch",
};

export function formatGameType(gameType: string): string {
  return GAME_TYPE_LABELS[gameType] ?? gameType;
}
