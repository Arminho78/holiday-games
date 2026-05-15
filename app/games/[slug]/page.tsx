import { notFound } from "next/navigation";
import { games, getGameBySlug } from "@/data/games";
import { GamePageShell } from "@/components/game-page-shell";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return { title: game.title, description: game.description };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return <GamePageShell game={game} />;
}
