import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getSparringSequence } from "~/data/sparring";
import { cn } from "~/utils";

export const Route = createFileRoute("/sparring/$type/$number")({
  component: SparringSequenceDetail,
});

function StepList({
  label,
  steps,
}: {
  label: string;
  steps: string[];
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-white/80">
        {label}
      </h3>
      <ol className="flex flex-col gap-1.5">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-sm bg-white/5 px-3 py-2.5 text-sm leading-relaxed"
          >
            <span className="w-5 shrink-0 text-right tabular-nums text-primary/50">
              {index + 1}
            </span>
            <span className="text-white/70">{step}</span>
          </li>
        ))}
      </ol>
    </div>
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
      <div className="content-column">
        <Link
          to="/sparring/$type"
          params={{ type: sparring.id }}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          {sparring.name}
        </Link>

        <header className="mb-8">
          <p className="mb-1 text-sm text-primary/80">{sparring.koreanName}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-white tabular-nums">
            Sequence {sequence.number}
          </h1>
        </header>

        <div className="grid gap-4">
          {attacks.length > 0 && <StepList label="Attack" steps={attacks} />}
          <StepList label="Defence" steps={sequence.defences} />
          <div>
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-white/80">
              Counter
            </h3>
            <p
              className={cn(
                "rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20"
              )}
            >
              {sequence.counter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
