import { Link, createFileRoute } from "@tanstack/react-router";

import { sparringTypes } from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/")({
  component: Sparring,
});

function Sparring() {
  return (
    <div className="page-shell">
      <div className="content-column relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Pre-arranged Sparring
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Yaksok Matsogi — fixed attack and defence sequences used to develop
            distance, timing, blocking, and counter-attacking.
          </p>
        </header>

        <ol className="relative flex flex-col gap-2">
          {sparringTypes.map((sparring) => (
            <li key={sparring.id}>
              <Link
                to="/sparring/$type"
                params={{ type: sparring.id }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-sm bg-white/5 px-4 py-3",
                  "transition-colors hover:bg-white/10"
                )}
              >
                <span className="w-6 shrink-0 text-center text-sm tabular-nums text-primary/60">
                  {sparring.sequences.length}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{sparring.name}</p>
                  <p className="truncate text-sm text-white/50">
                    {sparring.koreanName}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-white/40">{sparring.rank}</p>
                </div>
                <span aria-hidden className="shrink-0 text-xs text-white/30">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
