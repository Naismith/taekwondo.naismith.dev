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
      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2">
        {label}
      </h3>
      <ol className="flex flex-col gap-1.5">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-sm bg-white/5 px-3 py-2.5 text-sm leading-relaxed"
          >
            <span className="tabular-nums w-5 shrink-0 text-right text-yellow-300/50">
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
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/sparring/$type"
          params={{ type: sparring.id }}
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-yellow-300 text-sm mb-6 transition-colors"
        >
          <span aria-hidden>←</span>
          {sparring.name}
        </Link>

        <header className="mb-8">
          <p className="text-yellow-300/80 text-sm mb-1">
            {sparring.koreanName}
          </p>
          <h1 className="text-white text-2xl font-semibold tabular-nums">
            Sequence {sequence.number}
          </h1>
        </header>

        <div className="grid gap-4">
          {attacks.length > 0 && <StepList label="Attack" steps={attacks} />}
          <StepList label="Defence" steps={sequence.defences} />
          <div>
            <h3 className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2">
              Counter
            </h3>
            <p
              className={cn(
                "text-sm text-white/70 leading-relaxed rounded-sm",
                "bg-yellow-300/5 ring-1 ring-yellow-300/20 px-3 py-2.5"
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
