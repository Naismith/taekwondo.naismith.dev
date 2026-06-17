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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

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
    <div className="page-shell">
      <div className="content-column-wide relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <Link
          to="/patterns"
          className="relative mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          All patterns
        </Link>

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {pattern.name}
          </h1>
          <p className="mt-1 text-sm text-white/50">{pattern.meaning}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="tabular-nums text-primary/80">
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
          <div className="relative flex flex-col gap-8">
            <PatternScene
              steps={pathSteps}
              selectedStep={selectedStep}
            />

            <section>
              <SectionHeading>Movements</SectionHeading>
              <ol className="flex flex-col gap-1.5">
                {steps.map((step, index) => {
                  const isSelected = selectedStep === index;

                  return (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => setSelectedStep(index)}
                        className={cn(
                          "flex w-full cursor-pointer gap-3 rounded-sm px-3 py-2.5 text-left text-sm leading-relaxed transition-colors",
                          isSelected
                            ? "bg-primary/5 ring-1 ring-primary/20"
                            : "bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "w-5 shrink-0 text-right tabular-nums",
                            isSelected ? "text-primary" : "text-primary/50"
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
          </div>
        ) : (
          <p className="relative text-sm text-white/40">
            Step-by-step movements are not yet available for this pattern.
          </p>
        )}
      </div>
    </div>
  );
}
