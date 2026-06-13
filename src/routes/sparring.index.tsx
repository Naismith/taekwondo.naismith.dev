import { Link, createFileRoute } from "@tanstack/react-router";

import { sparringTypes } from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/")({
  component: Sparring,
});

function Sparring() {
  return (
    <div className="page-shell">
      <div className="content-column">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
          Pre-arranged Sparring
        </h1>
        <p className="mb-6 text-sm text-white/50">
          Yaksok Matsogi — fixed attack and defence sequences used to develop
          distance, timing, blocking, and counter-attacking.
        </p>

        <ol className="flex flex-col gap-2">
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
                <span className="text-primary/60 text-sm tabular-nums w-6 shrink-0 text-center">
                  {sparring.sequences.length}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{sparring.name}</p>
                  <p className="text-white/50 text-sm truncate">
                    {sparring.koreanName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white/40 text-xs">{sparring.rank}</p>
                </div>
                <span aria-hidden className="text-white/30 text-xs shrink-0">
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
