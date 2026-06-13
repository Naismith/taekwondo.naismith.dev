import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getSparringByType, getSequenceSummary } from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/$type/")({
  component: SparringType,
});

function SparringType() {
  const { type } = Route.useParams();
  const sparring = getSparringByType(type);

  if (!sparring) {
    throw notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/sparring"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-primary text-sm mb-6 transition-colors"
        >
          <span aria-hidden>←</span>
          All sparring
        </Link>

        <header className="mb-6">
          <h1 className="text-white text-2xl font-semibold mb-1">
            {sparring.name}
          </h1>
          <p className="text-primary/80 text-sm mb-2">
            {sparring.koreanName}
          </p>
          <p className="text-white/60 text-sm">{sparring.description}</p>
          <p className="mt-3 text-white/40 text-xs">{sparring.rank}</p>
        </header>

        <section className="mb-8 rounded-sm bg-white/[0.03] ring-1 ring-white/10 px-4 py-4">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            Starting positions
          </h2>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-white/40 text-xs uppercase tracking-wide mb-0.5">
                Attacker
              </dt>
              <dd className="text-white/70">{sparring.attackerStart}</dd>
            </div>
            <div>
              <dt className="text-white/40 text-xs uppercase tracking-wide mb-0.5">
                Defender
              </dt>
              <dd className="text-white/70">{sparring.defenderStart}</dd>
            </div>
          </dl>
          {sparring.fixedAttack && (
            <p className="mt-4 pt-4 border-t border-white/10 text-sm text-white/50">
              Attack: three middle section obverse punches in walking stance
            </p>
          )}
        </section>

        <section>
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            Sequences
          </h2>
          <ol className="flex flex-col gap-2">
            {sparring.sequences.map((sequence) => (
              <li key={sequence.number}>
                <Link
                  to="/sparring/$type/$number"
                  params={{
                    type: sparring.id,
                    number: String(sequence.number),
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-sm bg-white/5 px-4 py-3",
                    "transition-colors hover:bg-white/10"
                  )}
                >
                  <span className="text-primary/60 text-sm tabular-nums w-6 shrink-0 text-center">
                    {sequence.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">
                      Sequence {sequence.number}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                      {getSequenceSummary(sparring, sequence)}
                    </p>
                  </div>
                  <span aria-hidden className="text-white/30 text-xs shrink-0">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
