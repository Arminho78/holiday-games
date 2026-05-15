import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/60 bg-surface/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="text-xl" aria-hidden>
            🎄
          </span>
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-sm font-bold tracking-tight text-transparent">
            Holiday Games
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Holiday Games
        </p>
      </div>
    </footer>
  );
}
