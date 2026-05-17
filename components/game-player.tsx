"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import type { GameType } from "@/types/game";
import {
  getGameIframeProps,
  isScratchGameType,
  type EmbedProvider,
} from "@/lib/game-embed";
import { cn } from "@/lib/utils";

const LOAD_TIMEOUT_MS = 25_000;

export type GamePlayerState = "idle" | "loading" | "ready" | "error";

export interface GamePlayerProps {
  title: string;
  src: string;
  gameType: GameType;
  /** Resolved embed host (e.g. turbowarp, mit) for Scratch-specific UI. */
  embedProvider?: EmbedProvider;
  /** Set when embed URL failed validation before load. */
  embedError?: string;
  /** When true, the iframe loads (set by Play Now). */
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  disabled?: boolean;
  disabledMessage?: string;
  className?: string;
}

const SCRATCH_LOAD_TIMEOUT_MS = 35_000;

export function GamePlayer({
  title,
  src,
  gameType,
  embedProvider,
  embedError,
  active: activeProp,
  onActiveChange,
  disabled = false,
  disabledMessage = "This game is not available yet.",
  className,
}: GamePlayerProps) {
  const isScratch = isScratchGameType(gameType);
  const iframeProps = getGameIframeProps(gameType);
  const loadTimeoutMs = isScratch ? SCRATCH_LOAD_TIMEOUT_MS : LOAD_TIMEOUT_MS;
  const containerRef = useRef<HTMLDivElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [internalActive, setInternalActive] = useState(false);
  const [playerState, setPlayerState] = useState<GamePlayerState>("idle");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isControlled = activeProp !== undefined;
  const active = isControlled ? activeProp : internalActive;
  const hasEmbedError =
    Boolean(embedError) || (isScratch && active && !src);

  const setActive = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalActive(value);
      onActiveChange?.(value);
    },
    [isControlled, onActiveChange],
  );

  const clearLoadTimeout = useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  }, []);

  const startLoad = useCallback(() => {
    if (disabled) return;
    setActive(true);
    setPlayerState("loading");
  }, [disabled, setActive]);

  const handleLoad = useCallback(() => {
    clearLoadTimeout();
    setPlayerState("ready");
  }, [clearLoadTimeout]);

  const handleError = useCallback(() => {
    clearLoadTimeout();
    setPlayerState("error");
  }, [clearLoadTimeout]);

  const retry = useCallback(() => {
    setLoadAttempt((n) => n + 1);
    setPlayerState("loading");
  }, []);

  // Invalid embed URL — surface error immediately
  useEffect(() => {
    if (hasEmbedError && active) {
      setPlayerState("error");
    }
  }, [hasEmbedError, active]);

  // External Play Now sets active — begin loading
  useEffect(() => {
    if (active && playerState === "idle" && !disabled && !hasEmbedError) {
      setPlayerState("loading");
    }
  }, [active, playerState, disabled, hasEmbedError]);

  // Load timeout while iframe is mounting
  useEffect(() => {
    if (playerState !== "loading" || !active || hasEmbedError) {
      clearLoadTimeout();
      return;
    }

    loadTimeoutRef.current = setTimeout(() => {
      setPlayerState("error");
    }, loadTimeoutMs);

    return clearLoadTimeout;
  }, [playerState, active, hasEmbedError, loadTimeoutMs, clearLoadTimeout]);

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      /* Fullscreen API may be blocked without user gesture */
    }
  };

  const showIframe =
    active &&
    !hasEmbedError &&
    src &&
    (playerState === "loading" || playerState === "ready");

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/player relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-black shadow-2xl shadow-black/50 ring-1 ring-white/5",
        isFullscreen && "rounded-none border-0",
        className,
      )}
    >
      {/* Idle — game not started */}
      {!active && (
        <IdleOverlay
          title={title}
          disabled={disabled}
          disabledMessage={disabledMessage}
          onPlay={startLoad}
        />
      )}

      {/* Loading */}
      {active && playerState === "loading" && (
        <LoadingOverlay
          title={title}
          isScratch={isScratch}
          embedProvider={embedProvider}
        />
      )}

      {/* Error */}
      {active && playerState === "error" && (
        <ErrorOverlay
          title={title}
          message={embedError}
          onRetry={hasEmbedError ? undefined : retry}
        />
      )}

      {/* Iframe — src only set once play is requested */}
      {showIframe && (
        <iframe
          key={`${src}-${loadAttempt}`}
          title={title}
          src={src}
          className={cn(
            "h-full w-full border-0",
            playerState === "loading" && "opacity-0",
            playerState === "ready" && "opacity-100 transition-opacity duration-300",
          )}
          allow={iframeProps.allow}
          referrerPolicy={iframeProps.referrerPolicy}
          loading={iframeProps.loading}
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Controls — visible when game is active */}
      {active && playerState === "ready" && (
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover/player:opacity-100 focus-within:opacity-100">
          <PlayerControlButton
            label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </PlayerControlButton>
        </div>
      )}
    </div>
  );
}

function IdleOverlay({
  title,
  disabled,
  disabledMessage,
  onPlay,
}: {
  title: string;
  disabled: boolean;
  disabledMessage: string;
  onPlay: () => void;
}) {
  return (
    <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-surface via-surface-elevated to-violet-950/30 p-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      {disabled ? (
        <>
          <span className="text-4xl opacity-40">🎮</span>
          <p className="relative max-w-sm text-lg font-medium text-zinc-400">
            {disabledMessage}
          </p>
        </>
      ) : (
        <>
          <p className="relative text-sm font-medium leading-snug text-zinc-500">
            Ready to play
          </p>
          <p className="relative text-xl font-bold leading-tight text-zinc-100">
            {title}
          </p>
          <m.button
            type="button"
            onClick={onPlay}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative mx-auto inline-flex h-14 w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-accent px-10 text-lg font-bold text-white btn-glow sm:w-auto sm:max-w-none"
          >
            <PlayIcon />
            Play Now
          </m.button>
          <p className="relative text-xs text-zinc-600">
            Game loads when you press play — no data used until then.
          </p>
        </>
      )}
    </div>
  );
}

function LoadingOverlay({
  title,
  isScratch,
  embedProvider,
}: {
  title: string;
  isScratch: boolean;
  embedProvider?: EmbedProvider;
}) {
  const label =
    isScratch && embedProvider === "turbowarp"
      ? "Loading TurboWarp project…"
      : isScratch
        ? "Loading Scratch project…"
        : "Loading game…";

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${title}`}
    >
      <Spinner />
      <p className="text-sm font-medium text-zinc-400">{label}</p>
    </div>
  );
}

function ErrorOverlay({
  title,
  message,
  onRetry,
}: {
  title: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/90 p-6 text-center">
      <span className="text-3xl opacity-60">⚠️</span>
      <p className="text-lg font-semibold text-zinc-200">
        Couldn&apos;t load {title}
      </p>
      <p className="max-w-sm text-sm text-zinc-500">
        {message ??
          "The game may be unavailable or your connection was interrupted."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated px-6 text-sm font-semibold text-zinc-200 transition hover:border-accent/50 hover:text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function PlayerControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <m.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-zinc-300 backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-black/80 hover:text-white"
    >
      {children}
    </m.button>
  );
}

function Spinner() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-accent"
      aria-hidden
    />
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
    </svg>
  );
}

function ExitFullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
  );
}
