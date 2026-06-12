import { createFileRoute } from "@tanstack/react-router";

import { itfFundamentals, itfPatterns } from "../data/itf-patterns";

export const Route = createFileRoute("/patterns")({
  component: Patterns,
});

function PatternList({
  items,
  numbered = false,
}: {
  items: typeof itfPatterns;
  numbered?: boolean;
}) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((pattern, index) => (
        <li
          key={pattern.name}
          className="flex items-baseline gap-3 rounded-sm bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
        >
          <span className="text-yellow-300/60 text-sm tabular-nums w-6 shrink-0">
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
            <p className="text-white/40 text-xs">{pattern.rank}</p>
          </div>
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
          tul
        </p>
        <section className="mb-8">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            Fundamental Exercises
          </h2>
          <PatternList items={itfFundamentals} />
        </section>
        <section>
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            Patterns
          </h2>
          <PatternList items={itfPatterns} numbered />
        </section>
      </div>
    </div>
  );
}
