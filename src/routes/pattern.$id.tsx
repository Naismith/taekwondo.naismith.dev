import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { MiniBelt, rankToBeltStyle } from "~/components/belt";
import { PatternScene } from "~/components/pattern-scene";
import { getPatternById } from "~/data/itf-patterns";
import { patternSteps } from "~/data/pattern-steps";
import { cn } from "~/utils";
import { buildPatternPath } from "~/utils/pattern-path";

export const Route = createFileRoute("/pattern/$id")({
  component: PatternDetail,
});

function PatternDetail() {
  const { id } = Route.useParams();
  const pattern = getPatternById(id);
  const [selectedStep, setSelectedStep] = useState<number | null>(0);

  if (!pattern) {
    throw notFound();
  }

  const steps = patternSteps[pattern.name] ?? [];
  const pathSteps = useMemo(() => buildPatternPath(steps), [steps]);

  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/patterns"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-primary text-sm mb-6 transition-colors"
        >
          <span aria-hidden>←</span>
          All patterns
        </Link>

        <header className="mb-6">
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
          <>
            <PatternScene
              steps={pathSteps}
              selectedStep={selectedStep}
              className="mb-8"
            />

            <section>
              <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
                Movements
              </h2>
              <ol className="flex flex-col gap-2.5">
                {steps.map((step, index) => {
                  const isSelected = selectedStep === index;

                  return (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => setSelectedStep(index)}
                        className={cn(
                          "flex w-full gap-3 rounded-sm px-4 py-3 text-left text-sm leading-relaxed transition-colors cursor-pointer",
                          isSelected
                            ? "bg-primary/10 ring-1 ring-primary/30"
                            : "bg-white/5 hover:bg-white/[0.07]"
                        )}
                      >
                        <span
                          className={cn(
                            "tabular-nums w-5 shrink-0 text-right",
                            isSelected
                              ? "text-primary"
                              : "text-primary/50"
                          )}
                        >
                          {index + 1}
                        </span>
                        <span
                          className={cn(
                            isSelected ? "text-white/90" : "text-white/70"
                          )}
                        >
                          {step}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          </>
        ) : (
          <p className="text-white/40 text-sm">
            Step-by-step movements are not yet available for this pattern.
          </p>
        )}
      </div>
    </div>
  );
}
