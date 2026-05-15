"use client";

import { m } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <m.header
      className={cn("mb-10 sm:mb-12", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <m.div
        className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-accent to-fuchsia-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
        style={{ originX: 0 }}
      />
      {subtitle && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500">
          {subtitle}
        </p>
      )}
    </m.header>
  );
}
