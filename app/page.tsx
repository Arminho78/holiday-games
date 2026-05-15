import { games, getFeaturedGames } from "@/data/games";
import { GameCard } from "@/components/game-card";
import { Hero } from "@/components/hero";

export default function HomePage() {
  const featured = getFeaturedGames();
  const rest = games.filter((g) => !g.featured);

  return (
    <>
      <Hero />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-100">
            Featured Games
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* All other games */}
      {rest.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-100">
            More Games
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      )}

      {games.length === 0 && (
        <p className="py-24 text-center text-zinc-500">
          No games yet — check back soon!
        </p>
      )}
    </>
  );
}
