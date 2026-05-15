import Link from "next/link";
import { HeaderNav } from "@/components/header-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo — static, no client JS needed */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl" aria-hidden>
            🎄
          </span>
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Holiday Games
          </span>
        </Link>

        {/* Client-rendered nav (uses usePathname for active state) */}
        <HeaderNav />
      </div>
    </header>
  );
}
