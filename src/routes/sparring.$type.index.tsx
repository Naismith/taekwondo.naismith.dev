import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getSparringByType, getSequenceSummary } from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/$type/")({
  component: SparringType,
});

const sectionNav = [
  { id: "starting-positions", label: "Positions" },
  { id: "sequences", label: "Sequences" },
] as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

function SparringType() {
  const { type } = Route.useParams();
  const sparring = getSparringByType(type);

  if (!sparring) {
    throw notFound();
  }

  return (
    <div className="page-shell">
      <div className="content-column relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <Link
          to="/sparring"
          className="relative mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          All sparring
        </Link>

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {sparring.name}
          </h1>
          <p className="mt-1 text-sm text-primary/80">{sparring.koreanName}</p>
          <p className="mt-2 text-sm text-white/50">{sparring.description}</p>
          <p className="mt-3 text-xs text-white/40">{sparring.rank}</p>
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

        <div className="relative flex flex-col gap-8">
          <section id="starting-positions">
            <SectionHeading>Starting positions</SectionHeading>
            <dl className="flex flex-col gap-2">
              <div className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10">
                <dt className="w-20 shrink-0 font-medium text-primary">
                  Attacker
                </dt>
                <dd className="text-white/70">{sparring.attackerStart}</dd>
              </div>
              <div className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10">
                <dt className="w-20 shrink-0 font-medium text-primary">
                  Defender
                </dt>
                <dd className="text-white/70">{sparring.defenderStart}</dd>
              </div>
            </dl>
            {sparring.fixedAttack && (
              <p className="mt-4 rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20">
                Attack: three middle section obverse punches in walking stance
              </p>
            )}
          </section>

          <section id="sequences">
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
          </section>
        </div>
      </div>
    </div>
  );
}
