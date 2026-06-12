import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { MiniBelt, rankToBeltStyle } from "../components/belt";
import { getPatternById } from "../data/itf-patterns";
import { patternSteps } from "../data/pattern-steps";

export const Route = createFileRoute("/pattern/$id")({
  component: PatternDetail,
});

function PatternDetail() {
  const { id } = Route.useParams();
  const pattern = getPatternById(id);

  if (!pattern) {
    throw notFound();
  }

  const steps = patternSteps[pattern.name] ?? [];

  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/patterns"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-yellow-300 text-sm mb-6 transition-colors"
        >
          <span aria-hidden>←</span>
          All patterns
        </Link>

        <header className="mb-8">
          <h1 className="text-white text-2xl font-semibold mb-1">
            {pattern.name}
          </h1>
          <p className="text-white/60">{pattern.meaning}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-white/70 tabular-nums">
              {pattern.movements} movements
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white/40">{pattern.rank}</span>
              <MiniBelt
                {...rankToBeltStyle(pattern.rank)}
                className="h-2.5 w-14"
              />
            </div>
          </div>
        </header>

        {steps.length > 0 ? (
          <section>
            <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
              Movements
            </h2>
            <ol className="flex flex-col gap-2.5">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed"
                >
                  <span className="text-yellow-300/50 tabular-nums w-5 shrink-0 text-right">
                    {index + 1}
                  </span>
                  <span className="text-white/70">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : (
          <p className="text-white/40 text-sm">
            Step-by-step movements are not yet available for this pattern.
          </p>
        )}
      </div>
    </div>
  );
}
