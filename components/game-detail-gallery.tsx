"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { carouselImageLabel } from "@/lib/game-assets";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;

interface GameDetailGalleryProps {
  images: string[];
  title: string;
}

export function GameDetailGallery({ images, title }: GameDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [broken, setBroken] = useState<Set<number>>(() => new Set());
  const [isPaused, setIsPaused] = useState(false);

  const slides = images.length > 0 ? images : [""];
  const validIndices = slides
    .map((_, i) => i)
    .filter((i) => slides[i] && !broken.has(i));
  const activeSrc = slides[activeIndex];
  const showFallback = !activeSrc || broken.has(activeIndex);

  const markBroken = useCallback((index: number) => {
    setBroken((prev) => new Set(prev).add(index));
  }, []);

  const goToNext = useCallback(() => {
    if (validIndices.length <= 1) return;
    setActiveIndex((current) => {
      const pos = validIndices.indexOf(current);
      const nextPos = pos === -1 ? 0 : (pos + 1) % validIndices.length;
      return validIndices[nextPos] ?? 0;
    });
  }, [validIndices]);

  useEffect(() => {
    if (isPaused || validIndices.length <= 1) return;
    const id = window.setInterval(goToNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, validIndices.length, goToNext]);

  useEffect(() => {
    if (broken.has(activeIndex) && validIndices.length > 0) {
      setActiveIndex(validIndices[0]);
    }
  }, [broken, activeIndex, validIndices]);

  return (
    <div
      className="flex flex-col gap-3 sm:gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border-subtle/80 bg-surface-elevated shadow-2xl shadow-black/50 ring-1 ring-white/5 sm:rounded-2xl">
        <AnimatePresence mode="wait">
          <m.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
            className="absolute inset-0"
          >
            {showFallback ? (
              <GalleryFallback title={title} />
            ) : (
              <Image
                src={activeSrc}
                alt={`${title} ${carouselImageLabel(activeIndex)}`}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 60vw"
                className="object-cover"
                onError={() => markBroken(activeIndex)}
              />
            )}
          </m.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        />
        {validIndices.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
            {validIndices.indexOf(activeIndex) + 1} / {validIndices.length}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div
          className={cn(
            "flex gap-2 overflow-x-auto pb-1 sm:gap-2.5",
            "snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]",
            "sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none",
            "md:grid-cols-4 lg:grid-cols-6",
          )}
          role="tablist"
          aria-label={`${title} gallery`}
        >
          {slides.map((src, index) => {
            if (!src || broken.has(index)) return null;
            const isActive = index === activeIndex;

            return (
              <m.button
                key={src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View ${carouselImageLabel(index)}`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative shrink-0 snap-start overflow-hidden rounded-lg border-2 transition-colors duration-200",
                  "h-16 w-20 sm:h-[4.25rem] sm:w-full sm:min-w-0",
                  isActive
                    ? "border-accent shadow-md shadow-accent/25 ring-2 ring-accent/20"
                    : "border-border-subtle/80 opacity-75 hover:border-accent/40 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80px, 120px"
                  className="object-cover"
                  onError={() => markBroken(index)}
                />
              </m.button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GalleryFallback({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-elevated via-surface to-violet-950/50">
      <span className="font-display text-5xl font-black text-accent/35">
        {title.charAt(0)}
      </span>
      <span className="text-sm font-medium text-zinc-500">
        Preview coming soon
      </span>
    </div>
  );
}
