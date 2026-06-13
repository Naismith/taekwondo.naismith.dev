import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Belt, colouredBeltLadder } from "~/components/belt";
import {
  getCumulativePatterns,
  getPatternLinks,
  getSparringLabel,
  getSyllabusForBeltIndex,
  getTheoryLabel,
  getTheoryRoute,
  type RankSyllabus,
} from "~/data/syllabus";
import { cn } from "~/utils";

export const Route = createFileRoute("/")({
  component: Home,
});

function SyllabusDetails({ syllabus }: { syllabus: RankSyllabus }) {
  const cumulativePatterns = getCumulativePatterns(syllabus.gup);
  const patternLinks = getPatternLinks(cumulativePatterns);
  const newPatternSet = new Set(syllabus.newPatterns);

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-sm bg-black/40 px-4 py-4 ring-1 ring-white/10">
      {syllabus.notes && (
        <p className="text-sm text-white/50">{syllabus.notes}</p>
      )}

      <div>
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
          {syllabus.newPatterns.length === 1 &&
          cumulativePatterns.length === 1
            ? "Pattern"
            : "Patterns"}
        </h3>
        <ul className="flex flex-col gap-1">
          {patternLinks.map(({ name, id }) => (
            <li key={name}>
              <Link
                to="/pattern/$id"
                params={{ id }}
                className={cn(
                  "inline-flex items-center gap-2 text-sm transition-colors hover:text-primary",
                  newPatternSet.has(name)
                    ? "font-medium text-white"
                    : "text-white/50"
                )}
              >
                {name}
                {newPatternSet.has(name) && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary/80 ring-1 ring-primary/20">
                    New
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {syllabus.sparring.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Sparring
          </h3>
          <ul className="flex flex-wrap gap-2">
            {syllabus.sparring.map((type) => (
              <li key={type}>
                <Link
                  to="/sparring"
                  hash={type}
                  className="rounded-full px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 transition-colors hover:text-primary hover:ring-primary/20"
                >
                  {getSparringLabel(type)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
          Theory
        </h3>
        <ul className="flex flex-wrap gap-2">
          {syllabus.theory.map((sectionId) => {
            const route = getTheoryRoute(sectionId);
            return (
              <li key={sectionId}>
                <Link
                  to={route.to}
                  hash={route.hash}
                  className="rounded-full px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 transition-colors hover:text-primary hover:ring-primary/20"
                >
                  {getTheoryLabel(sectionId)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Home() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="page-shell">
      <div className="content-column relative flex flex-col gap-6 py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />
        <header className="relative mb-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Belt Progression
          </h1>
          <p className="mt-1 text-sm text-white/50">
            ITF coloured belt ranks from 10th to 1st Gup, through to Black Belt.
            Select a rank to see grading requirements.
          </p>
        </header>
        <div className="relative flex flex-col gap-6">
          {colouredBeltLadder.map((style, index) => {
            const syllabus = getSyllabusForBeltIndex(index);
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col",
                  index % 2 === 0 ? "items-start" : "items-end"
                )}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                  className={cn(
                    "group w-[90%] text-left transition-opacity",
                    isExpanded ? "opacity-100" : "opacity-90 hover:opacity-100"
                  )}
                >
                  {syllabus && (
                    <p
                      className={cn(
                        "mb-2 text-sm font-medium text-white/80 transition-colors group-hover:text-white",
                        index % 2 === 0 ? "text-left" : "text-right"
                      )}
                    >
                      {syllabus.rank}
                      <span
                        aria-hidden
                        className="ml-2 text-xs text-white/30"
                      >
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </p>
                  )}
                  <Belt {...style} />
                </button>
                {isExpanded && syllabus && (
                  <div className="w-[90%]">
                    <SyllabusDetails syllabus={syllabus} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
