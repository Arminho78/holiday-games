import { cn } from "@/lib/utils";

interface GameDetailSectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

/** Eyebrow heading shared by detail + play sections (spacing matches on all breakpoints). */
export function GameDetailSectionHeading({
  children,
  className,
}: GameDetailSectionHeadingProps) {
  return (
    <h2
      className={cn(
        "mb-5 font-display text-sm font-semibold uppercase leading-snug tracking-[0.2em] text-violet-400",
        className,
      )}
    >
      {children}
    </h2>
  );
}
