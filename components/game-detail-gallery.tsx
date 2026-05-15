"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GameDetailGalleryProps {
  images: string[];
  title: string;
}

export function GameDetailGallery({ images, title }: GameDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [broken, setBroken] = useState<Set<number>>(() => new Set());

  const slides = images.length > 0 ? images : [""];
  const activeSrc = slides[activeIndex];
  const showFallback = !activeSrc || broken.has(activeIndex);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-2xl shadow-black/40 ring-1 ring-white/5">
        {showFallback ? (
          <GalleryFallback title={title} />
        ) : (
          <Image
            key={activeSrc}
            src={activeSrc}
            alt={
              activeIndex === 0
                ? `${title} cover`
                : `${title} screenshot ${activeIndex}`
            }
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            onError={() =>
              setBroken((prev) => new Set(prev).add(activeIndex))
            }
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        />
      </div>

      {slides.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label={`${title} screenshots`}
        >
          {slides.map((src, index) => {
            const isActive = index === activeIndex;
            const thumbBroken = !src || broken.has(index);

            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={
                  index === 0
                    ? "View cover image"
                    : `View screenshot ${index}`
                }
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-20 sm:w-36",
                  isActive
                    ? "border-accent shadow-lg shadow-accent/25 ring-2 ring-accent/30"
                    : "border-border-subtle opacity-70 hover:border-accent/50 hover:opacity-100",
                )}
              >
                {thumbBroken ? (
                  <span className="flex h-full w-full items-center justify-center bg-surface-elevated text-xs text-zinc-600">
                    {index + 1}
                  </span>
                ) : (
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                    onError={() =>
                      setBroken((prev) => new Set(prev).add(index))
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GalleryFallback({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-elevated via-surface to-violet-950/40">
      <span className="text-5xl font-black text-accent/30">
        {title.charAt(0)}
      </span>
      <span className="text-sm font-medium text-zinc-500">
        Preview coming soon
      </span>
    </div>
  );
}
