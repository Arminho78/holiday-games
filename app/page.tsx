import { games, getFeaturedGames } from "@/data/games";
import { GameCard } from "@/components/game-card";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  const featured = getFeaturedGames();
  const rest = games.filter((g) => !g.featured);

  return (
    <>
      <Hero />

      {featured.length > 0 && (
        <section
          id="featured"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
        >
          <SectionHeading
            title="Featured Games"
            subtitle="Our top picks — polished, festive, and ready when you are."
          />
          <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {featured.map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
          <SectionHeading
            title="More Games"
            subtitle="Explore the full collection."
          />
          <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {rest.map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        </section>
      )}

      {games.length === 0 && (
        <p className="py-32 text-center text-lg text-zinc-500">
          No games yet — check back soon!
        </p>
      )}
    </>
  );
}

