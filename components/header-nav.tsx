"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/#featured" },
  { label: "About", href: "/about" },
];

export function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex">
        {navItems.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                active ? "text-white" : "text-zinc-400 hover:text-zinc-100",
              )}
            >
              {label}
              {active && (
                <m.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-[calc(0.5rem+1px)] h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <m.button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-xl border border-transparent text-zinc-400 transition-colors hover:border-border-subtle hover:bg-surface-elevated hover:text-zinc-100 sm:hidden"
        whileTap={{ scale: 0.92 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-5"
        >
          {mobileOpen ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </m.button>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-x-0 top-16 z-40 border-b border-border-subtle/60 bg-surface/95 shadow-2xl shadow-black/40 backdrop-blur-xl sm:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {navItems.map(({ label, href }, i) => {
                const active = isActive(href);
                return (
                  <m.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: easeOutExpo }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent/15 text-white"
                          : "text-zinc-400 hover:bg-surface-elevated hover:text-zinc-100",
                      )}
                    >
                      {label}
                    </Link>
                  </m.div>
                );
              })}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
