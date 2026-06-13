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
    <div className="page-shell">
      <div className="content-column">
        <Link
          to="/sparring"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          All sparring
        </Link>

        <header className="mb-6">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
            {sparring.name}
          </h1>
          <p className="mb-2 text-sm text-primary/80">{sparring.koreanName}</p>
          <p className="text-sm text-white/50">{sparring.description}</p>
          <p className="mt-3 text-xs text-white/40">{sparring.rank}</p>
        </header>

        <section className="mb-8 rounded-sm bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
            Starting positions
          </h2>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="mb-0.5 text-xs uppercase tracking-wide text-white/40">
                Attacker
              </dt>
              <dd className="text-white/70">{sparring.attackerStart}</dd>
            </div>
            <div>
              <dt className="mb-0.5 text-xs uppercase tracking-wide text-white/40">
                Defender
              </dt>
              <dd className="text-white/70">{sparring.defenderStart}</dd>
            </div>
          </dl>
          {sparring.fixedAttack && (
            <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/50">
              Attack: three middle section obverse punches in walking stance
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
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
                  <span className="w-6 shrink-0 text-center text-sm tabular-nums text-primary/60">
                    {sequence.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">
                      Sequence {sequence.number}
                    </p>
                    <p className="truncate text-sm text-white/50">
                      {getSequenceSummary(sparring, sequence)}
                    </p>
                  </div>
                  <span aria-hidden className="shrink-0 text-xs text-white/30">
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
