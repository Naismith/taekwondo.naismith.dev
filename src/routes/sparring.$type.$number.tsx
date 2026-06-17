import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getSparringSequence } from "~/data/sparring";

export const Route = createFileRoute("/sparring/$type/$number")({
  component: SparringSequenceDetail,
});

const highlightCardClass =
  "rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

function StepList({
  label,
  steps,
}: {
  label: string;
  steps: string[];
}) {
  return (
    <section>
      <SectionHeading>{label}</SectionHeading>
      <ol className="flex flex-col gap-1.5">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-sm bg-white/5 px-3 py-2.5 text-sm leading-relaxed transition-colors hover:bg-white/10"
          >
            <span className="w-5 shrink-0 text-right tabular-nums text-primary/50">
              {index + 1}
            </span>
            <span className="text-white/70">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SparringSequenceDetail() {
  const { type, number: numberParam } = Route.useParams();
  const number = Number(numberParam);
  const result =
    Number.isInteger(number) && number > 0
      ? getSparringSequence(type, number)
      : undefined;

  if (!result) {
    throw notFound();
  }

  const { sparring, sequence } = result;
  const attacks =
    sequence.attacks.length > 0 ? sequence.attacks : (sparring.fixedAttack ?? []);

  return (
    <div className="page-shell">
      <div className="content-column-wide relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <Link
          to="/sparring"
          hash={sparring.id}
          className="relative mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          {sparring.name}
        </Link>

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white tabular-nums">
            Sequence {sequence.number}
          </h1>
        </header>

        <div className="relative flex flex-col gap-8">
          {attacks.length > 0 && <StepList label="Attack" steps={attacks} />}
          <StepList label="Defence" steps={sequence.defences} />
          <section>
            <SectionHeading>Counter</SectionHeading>
            <p className={highlightCardClass}>{sequence.counter}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
