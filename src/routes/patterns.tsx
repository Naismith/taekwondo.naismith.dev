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
  {
    id: "fundamentals",
    title: "Fundamental Exercises",
    items: itfFundamentals,
    numbered: false,
  },
  {
    id: "coloured",
    title: "Coloured Belts",
    items: itfColouredBeltPatterns,
    numbered: true,
  },
  {
    id: "black",
    title: "Black Belts",
    items: itfBlackBeltPatterns,
    numbered: true,
  },
] as const;

const sectionNav = patternSections.map(({ id, title }) => ({
  id,
  label: title.replace(" Exercises", "").replace(" Belts", ""),
}));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

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
            <span className="w-6 shrink-0 text-center text-sm tabular-nums text-primary/60">
              {numbered ? index + 1 : "·"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">{pattern.name}</p>
              <p className="truncate text-sm text-white/50">{pattern.meaning}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm tabular-nums text-white/70">
                {pattern.movements} moves
              </p>
              <div className="mt-1.5 grid grid-cols-[1fr_3.5rem] items-center gap-x-2">
                <p className="text-right text-xs text-white/40">
                  {pattern.rank}
                </p>
                <MiniBelt
                  {...rankToBeltStyle(pattern.rank)}
                  className="h-2.5 w-14 justify-self-end"
                />
              </div>
            </div>
            <span aria-hidden className="shrink-0 text-xs text-white/30">
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
    <div className="page-shell">
      <div className="content-column relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Patterns
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Fundamental exercises and the 24 International Taekwon-Do Federation
            tul. Select a pattern to view its step-by-step movements.
          </p>
        </header>

        <nav
          aria-label="Pattern sections"
          className="relative mb-8 flex flex-wrap gap-2"
        >
          {sectionNav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-1 text-xs text-white/50 ring-1 ring-white/10 transition-colors hover:text-primary hover:ring-primary/20"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="relative flex flex-col gap-8">
          {patternSections.map(({ id, title, items, numbered }) => (
            <section key={id} id={id}>
              <SectionHeading>{title}</SectionHeading>
              <PatternList items={items} numbered={numbered} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
