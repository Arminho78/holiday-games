import Link from "next/link";

export default function GameNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6">
      <span className="text-6xl font-black text-accent/20">404</span>
      <h1 className="text-2xl font-bold text-zinc-100">Game not found</h1>
      <p className="text-zinc-500">
        This game doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-md shadow-accent/20 transition hover:shadow-lg hover:shadow-accent/30"
      >
        Back to all games
      </Link>
    </div>
  );
}
