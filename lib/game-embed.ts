import type { Game, GameType } from "@/types/game";

/** HTTPS origins permitted for Scratch / TurboWarp iframes. */
const SCRATCH_EMBED_ORIGINS = [
  "https://scratch.mit.edu",
  "https://turbowarp.org",
  "https://www.turbowarp.org",
] as const;

export type ScratchProvider = "turbowarp" | "mit";

export type EmbedProvider = ScratchProvider | "local" | "generic";

export class EmbedValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbedValidationError";
  }
}

export interface ResolvedEmbed {
  src: string;
  provider: EmbedProvider;
}

export function isScratchGameType(gameType: GameType): boolean {
  return gameType === "scratch";
}

/** Resolves and validates the iframe `src` for any supported game type. */
export function resolveGameEmbed(
  game: Pick<Game, "slug" | "gameUrl" | "gameType" | "scratch">,
): ResolvedEmbed | { error: string } {
  try {
    if (isScratchGameType(game.gameType)) {
      const src = resolveScratchEmbedUrl(
        game.gameUrl,
        game.scratch?.provider ?? "turbowarp",
      );
      const provider: ScratchProvider = src.includes("turbowarp.org")
        ? "turbowarp"
        : "mit";
      return { src, provider };
    }

    return {
      src: getLocalOrGenericEmbedSrc(game),
      provider: game.gameType === "iframe" ? "generic" : "local",
    };
  } catch (err) {
    const message =
      err instanceof EmbedValidationError
        ? err.message
        : "Invalid game embed URL.";
    return { error: message };
  }
}

/** @deprecated Prefer `resolveGameEmbed` for validation. */
export function getGameEmbedSrc(
  game: Pick<Game, "slug" | "gameUrl" | "gameType" | "scratch">,
): string {
  const result = resolveGameEmbed(game);
  return "error" in result ? "" : result.src;
}

/**
 * Normalizes Scratch / TurboWarp `gameUrl` values into a safe HTTPS embed URL.
 *
 * Accepts:
 * - Numeric project ID → TurboWarp (default) or MIT Scratch embed
 * - `https://turbowarp.org/{id}` or `.../{id}/embed`
 * - `https://turbowarp.org/embed?project_id={id}`
 * - `https://scratch.mit.edu/projects/{id}` or `.../embed`
 */
export function resolveScratchEmbedUrl(
  gameUrl: string,
  provider: ScratchProvider = "turbowarp",
): string {
  const input = gameUrl.trim();

  if (/^\d{3,20}$/.test(input)) {
    return buildScratchProviderEmbed(input, provider);
  }

  if (!/^https:\/\//i.test(input)) {
    throw new EmbedValidationError(
      "Scratch games require a numeric project ID or an HTTPS embed URL.",
    );
  }

  const normalized = normalizeScratchHttpsUrl(input);

  if (!isAllowedScratchEmbedUrl(normalized)) {
    throw new EmbedValidationError(
      "Embed origin is not allowed. Use scratch.mit.edu or turbowarp.org.",
    );
  }

  return normalized;
}

export function isAllowedScratchEmbedUrl(url: string): boolean {
  const parsed = parseHttpsUrl(url);
  if (!parsed) return false;
  return SCRATCH_EMBED_ORIGINS.some((origin) => parsed.origin === origin);
}

function buildScratchProviderEmbed(
  projectId: string,
  provider: ScratchProvider,
): string {
  if (provider === "mit") {
    return `https://scratch.mit.edu/projects/${projectId}/embed`;
  }
  return `https://turbowarp.org/${projectId}/embed`;
}

function normalizeScratchHttpsUrl(input: string): string {
  const url = parseHttpsUrl(input);
  if (!url) {
    throw new EmbedValidationError("Scratch embeds must use HTTPS URLs.");
  }

  const host = url.hostname.replace(/^www\./, "");

  // https://turbowarp.org/123456789 → .../embed
  const turboBare = input.match(
    /^https:\/\/(?:www\.)?turbowarp\.org\/(\d+)\/?$/i,
  );
  if (turboBare) {
    return `https://turbowarp.org/${turboBare[1]}/embed`;
  }

  // https://scratch.mit.edu/projects/123 → .../embed
  const mitBare = input.match(
    /^https:\/\/scratch\.mit\.edu\/projects\/(\d+)\/?$/i,
  );
  if (mitBare) {
    return `https://scratch.mit.edu/projects/${mitBare[1]}/embed`;
  }

  // https://turbowarp.org/embed?project_id=123 (normalize host, keep query)
  if (host === "turbowarp.org" && url.pathname === "/embed") {
    const projectId = url.searchParams.get("project_id");
    if (projectId && /^\d+$/.test(projectId)) {
      return `https://turbowarp.org/${projectId}/embed`;
    }
    return url.href;
  }

  // Already a valid /embed path on allowlisted host
  if (
    host === "turbowarp.org" &&
    /^\/\d+\/embed\/?$/.test(url.pathname)
  ) {
    return `https://turbowarp.org${url.pathname.replace(/\/$/, "")}`;
  }

  if (
    host === "scratch.mit.edu" &&
    /^\/projects\/\d+\/embed\/?$/.test(url.pathname)
  ) {
    return `https://scratch.mit.edu${url.pathname.replace(/\/$/, "")}`;
  }

  if (isAllowedScratchEmbedUrl(url.href)) {
    return url.href;
  }

  throw new EmbedValidationError(
    "Unrecognized Scratch or TurboWarp URL format.",
  );
}

function getLocalOrGenericEmbedSrc(
  game: Pick<Game, "slug" | "gameUrl" | "gameType">,
): string {
  const { slug, gameUrl, gameType } = game;

  switch (gameType) {
    case "html5":
    case "unity-webgl":
      return `/games/${slug}/${gameUrl.replace(/^\//, "")}`;
    case "iframe": {
      if (/^https:\/\//i.test(gameUrl)) {
        assertGenericHttpsEmbed(gameUrl);
        return gameUrl;
      }
      return gameUrl.startsWith("/") ? gameUrl : `/${gameUrl}`;
    }
    default:
      return gameUrl;
  }
}

/** Generic iframe embeds must be HTTPS and not javascript/data URIs. */
function assertGenericHttpsEmbed(url: string): void {
  const parsed = parseHttpsUrl(url);
  if (!parsed) {
    throw new EmbedValidationError("External embeds must use HTTPS.");
  }
}

function parseHttpsUrl(url: string): URL | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    return parsed;
  } catch {
    return null;
  }
}

export interface GameIframeProps {
  allow: string;
  referrerPolicy: "strict-origin-when-cross-origin";
  /** Intentionally omitted for Scratch — sandbox breaks player APIs. */
  sandbox?: string;
  loading: "lazy";
}

/** Security-conscious iframe attributes per game type. */
export function getGameIframeProps(gameType: GameType): GameIframeProps {
  const base = {
    referrerPolicy: "strict-origin-when-cross-origin" as const,
    loading: "lazy" as const,
  };

  if (isScratchGameType(gameType)) {
    return {
      ...base,
      // TurboWarp / Scratch need fullscreen; avoid overly broad permissions.
      allow: "fullscreen",
    };
  }

  if (gameType === "unity-webgl") {
    return {
      ...base,
      allow: "fullscreen; gamepad *",
    };
  }

  return {
    ...base,
    allow: "fullscreen",
  };
}

/** @deprecated Use `getGameIframeProps`. */
export function getGameIframeAllow(gameType: GameType): string {
  return getGameIframeProps(gameType).allow;
}
