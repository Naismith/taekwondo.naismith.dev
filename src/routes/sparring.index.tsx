import { Link, createFileRoute } from "@tanstack/react-router";

import {
  getSequenceSummary,
  sparringTypeLabels,
  sparringTypes,
  type SparringDefinition,
} from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/")({
  component: Sparring,
});

const sectionNav = sparringTypes.map((sparring) => ({
  id: sparring.id,
  label: sparringTypeLabels[sparring.id],
}));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

function SparringSection({ sparring }: { sparring: SparringDefinition }) {
  return (
    <section id={sparring.id} className="flex flex-col gap-6">
      <header>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {sparring.name}
        </h2>
        <p className="mt-2 text-sm text-white/50">{sparring.description}</p>
        <p className="mt-3 text-xs text-white/40">{sparring.rank}</p>
      </header>

      <div>
        <SectionHeading>Starting positions</SectionHeading>
        <dl className="flex flex-col gap-2">
          <div className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10">
            <dt className="w-20 shrink-0 font-medium text-primary">Attacker</dt>
            <dd className="text-white/70">{sparring.attackerStart}</dd>
          </div>
          <div className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10">
            <dt className="w-20 shrink-0 font-medium text-primary">Defender</dt>
            <dd className="text-white/70">{sparring.defenderStart}</dd>
          </div>
        </dl>
      </div>

      <div>
        <SectionHeading>Sequences</SectionHeading>
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
      </div>
    </section>
  );
}

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

        <nav
          aria-label="Sparring sections"
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

        <div className="relative flex flex-col gap-12">
          {sparringTypes.map((sparring) => (
            <SparringSection key={sparring.id} sparring={sparring} />
          ))}
        </div>
      </div>
    </div>
  );
}
