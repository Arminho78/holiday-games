"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/#featured" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <m.footer
      className="mt-auto border-t border-border-subtle/50 bg-surface/40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:flex-row sm:justify-between sm:px-6 sm:py-14">
        <span className="font-display bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-sm font-bold tracking-tight text-transparent">
          Holiday Games
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-500 transition-colors duration-200 hover:text-zinc-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Holiday Games
        </p>
      </div>
    </m.footer>
  );
}
