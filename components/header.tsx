"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { HeaderNav } from "@/components/header-nav";

export function Header() {
  return (
    <m.header
      className="sticky top-0 z-50 border-b border-border-subtle/50 bg-background/75 backdrop-blur-xl backdrop-saturate-150"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href="/" className="group flex items-center">
          <span className="font-display bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-lg font-bold tracking-tight text-transparent transition-opacity group-hover:opacity-90">
            Holiday Games
          </span>
        </Link>
        <HeaderNav />
      </div>
    </m.header>
  );
}
