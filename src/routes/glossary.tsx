import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  glossaryCategories,
  searchGlossary,
  type GlossaryCategory,
  type GlossaryEntry,
} from "~/data/glossary";
import { cn } from "~/utils";

export const Route = createFileRoute("/glossary")({
  component: Glossary,
});

const highlightCardClass =
  "rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20";

function GlossaryEntryRow({ entry }: { entry: GlossaryEntry }) {
  return (
    <li className="rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed transition-colors hover:bg-white/10">
      <p className="font-medium text-white">
        {entry.english}
        <span className="ml-2 font-normal text-primary/70">{entry.korean}</span>
      </p>
      {entry.aliases && entry.aliases.length > 0 && (
        <p className="mt-0.5 text-xs text-white/40">
          Also: {entry.aliases.join(", ")}
        </p>
      )}
      <p className="mt-1 text-white/70">{entry.definition}</p>
    </li>
  );
}

function Glossary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");

  const results = useMemo(() => {
    const searched = searchGlossary(query);
    if (category === "all") return searched;
    return searched.filter((entry) => entry.category === category);
  }, [query, category]);

  const grouped = useMemo(() => {
    if (category !== "all" || query.trim()) {
      return [{ id: "results" as const, label: "Results", entries: results }];
    }

    return glossaryCategories
      .map((group) => ({
        ...group,
        entries: results.filter((entry) => entry.category === group.id),
      }))
      .filter((group) => group.entries.length > 0);
  }, [category, query, results]);

  return (
    <div className="page-shell">
      <div className="content-column-wide relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Terminology / Glossary
          </h1>
          <p className={cn(highlightCardClass, "mt-3")}>
            Korean names for stances, blocks, strikes, kicks, and common
            commands — the vocabulary tested at every grading.
          </p>
        </header>

        <div className="relative mb-8 flex flex-col gap-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search English or Korean…"
            className="w-full rounded-sm bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 ring-1 ring-white/10 transition-colors focus:outline-none focus:ring-primary/30"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "rounded-full px-3 py-1 text-xs ring-1 transition-colors",
                category === "all"
                  ? "text-primary ring-primary/30"
                  : "text-white/50 ring-white/10 hover:text-primary hover:ring-primary/20"
              )}
            >
              All
            </button>
            {glossaryCategories.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs ring-1 transition-colors",
                  category === id
                    ? "text-primary ring-primary/30"
                    : "text-white/50 ring-white/10 hover:text-primary hover:ring-primary/20"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-6">
          {grouped.map((group) => (
            <div key={group.id}>
              {group.id !== "results" && (
                <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
                  {group.label}
                </h2>
              )}
              <ul className="flex flex-col gap-1.5">
                {group.entries.map((entry) => (
                  <GlossaryEntryRow
                    key={`${entry.korean}-${entry.english}`}
                    entry={entry}
                  />
                ))}
              </ul>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-white/50">No terms match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
