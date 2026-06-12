import { Link, createFileRoute } from "@tanstack/react-router";

import { MiniBelt, rankToBeltStyle } from "~/components/belt";
import {
  itfBlackBeltPatterns,
  itfColouredBeltPatterns,
  itfFundamentals,
  patternToId,
  type ItfPattern,
} from "~/data/itf-patterns";
import { cn } from "~/utils";

export const Route = createFileRoute("/patterns")({
  component: Patterns,
});

const patternSections = [
  { title: "Fundamental Exercises", items: itfFundamentals, numbered: false },
  { title: "Coloured Belts", items: itfColouredBeltPatterns, numbered: true },
  { title: "Black Belts", items: itfBlackBeltPatterns, numbered: true },
] as const;

function PatternList({
  items,
  numbered = false,
}: {
  items: ItfPattern[];
  numbered?: boolean;
}) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((pattern, index) => (
        <li key={pattern.name}>
          <Link
            to="/pattern/$id"
            params={{ id: patternToId(pattern.name) }}
            className={cn(
              "flex w-full items-center gap-3 rounded-sm bg-white/5 px-4 py-3",
              "transition-colors hover:bg-white/10"
            )}
          >
            <span className="text-yellow-300/60 text-sm tabular-nums w-6 shrink-0 text-center">
              {numbered ? index + 1 : "·"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium">{pattern.name}</p>
              <p className="text-white/50 text-sm truncate">{pattern.meaning}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/70 text-sm tabular-nums">
                {pattern.movements} moves
              </p>
              <div className="mt-1.5 grid grid-cols-[1fr_3.5rem] items-center gap-x-2">
                <p className="text-white/40 text-xs text-right">
                  {pattern.rank}
                </p>
                <MiniBelt
                  {...rankToBeltStyle(pattern.rank)}
                  className="h-2.5 w-14 justify-self-end"
                />
              </div>
            </div>
            <span aria-hidden className="text-white/30 text-xs shrink-0">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function Patterns() {
  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-1">ITF Patterns</h1>
        <p className="text-white/60 text-sm mb-6">
          Fundamental exercises and the 24 International Taekwon-Do Federation
          tul. Select a pattern to view its step-by-step movements.
        </p>
        {patternSections.map(({ title, items, numbered }) => (
          <section key={title} className="mb-8 last:mb-0">
            <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
              {title}
            </h2>
            <PatternList items={items} numbered={numbered} />
          </section>
        ))}
      </div>
    </div>
  );
}
