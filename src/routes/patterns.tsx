import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MiniBelt, rankToBeltStyle } from "../components/belt";
import { patternSteps } from "../data/pattern-steps";
import {
  itfBlackBeltPatterns,
  itfColouredBeltPatterns,
  itfFundamentals,
  type ItfPattern,
} from "../data/itf-patterns";
import { cn } from "../utils";

export const Route = createFileRoute("/patterns")({
  component: Patterns,
});

const patternSections = [
  { title: "Fundamental Exercises", items: itfFundamentals, numbered: false },
  { title: "Coloured Belts", items: itfColouredBeltPatterns, numbered: true },
  { title: "Black Belts", items: itfBlackBeltPatterns, numbered: true },
] as const;

function PatternList({
  items,
  numbered = false,
  expandedPattern,
  onToggle,
}: {
  items: ItfPattern[];
  numbered?: boolean;
  expandedPattern: string | null;
  onToggle: (name: string) => void;
}) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((pattern, index) => {
        const isExpanded = expandedPattern === pattern.name;

        return (
          <li
            key={pattern.name}
            className={cn(
              "rounded-sm bg-white/5 overflow-hidden transition-colors",
              isExpanded ? "bg-white/[0.07]" : "hover:bg-white/10"
            )}
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`pattern-steps-${pattern.name}`}
              onClick={() => onToggle(pattern.name)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left cursor-pointer"
            >
              <span className="text-yellow-300/60 text-sm tabular-nums w-6 shrink-0 text-center">
                {numbered ? index + 1 : "·"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{pattern.name}</p>
                <p
                  className={cn(
                    "text-white/50 text-sm",
                    isExpanded ? "whitespace-normal" : "truncate"
                  )}
                >
                  {pattern.meaning}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/70 text-sm tabular-nums">
                  {pattern.movements} moves
                </p>
                <div className="mt-1.5 grid grid-cols-[1fr_3.5rem] items-center gap-x-2">
                  <p className="text-white/40 text-xs text-right">
                    {pattern.rank}
                  </p>
                  <MiniBelt
                    {...rankToBeltStyle(pattern.rank)}
                    className="h-2.5 w-14 justify-self-end"
                  />
                </div>
              </div>
              <span
                aria-hidden
                className={cn(
                  "text-white/30 text-xs shrink-0 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              >
                ▾
              </span>
            </button>
            {isExpanded && (
              <div
                id={`pattern-steps-${pattern.name}`}
                className="border-t border-white/10 px-4 py-3 pl-13"
              >
                <ol className="flex flex-col gap-2.5">
                  {(patternSteps[pattern.name] ?? []).map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="flex gap-3 text-sm leading-relaxed"
                    >
                      <span className="text-yellow-300/50 tabular-nums w-5 shrink-0 text-right">
                        {stepIndex + 1}
                      </span>
                      <span className="text-white/70">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Patterns() {
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-1">ITF Patterns</h1>
        <p className="text-white/60 text-sm mb-6">
          Fundamental exercises and the 24 International Taekwon-Do Federation
          tul. Tap a pattern to view its step-by-step movements.
        </p>
        {patternSections.map(({ title, items, numbered }) => (
          <section key={title} className="mb-8 last:mb-0">
            <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
              {title}
            </h2>
            <PatternList
              items={items}
              numbered={numbered}
              expandedPattern={expandedPattern}
              onToggle={(name) =>
                setExpandedPattern((current) => (current === name ? null : name))
              }
            />
          </section>
        ))}
      </div>
    </div>
  );
}
