import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { MiniBelt, colouredBeltLadder } from "~/components/belt";
import { beltToId, getSyllabusForBeltIndex } from "~/data/syllabus";
import { cn } from "~/utils";

export const Route = createFileRoute("/belts")({
  component: Belts,
});

function KickSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 160"
      className="hidden h-36 w-28 shrink-0 text-primary/20 sm:block"
      fill="currentColor"
    >
      <circle cx="60" cy="24" r="14" />
      <path d="M48 38 L42 72 L36 120 L48 118 L54 80 L66 80 L72 118 L84 120 L78 72 L72 38 Z" />
      <path d="M42 48 L20 36 L16 44 L38 58 Z" />
      <path d="M78 48 L100 20 L108 26 L86 58 Z" />
      <path d="M48 118 L40 150 L52 152 L58 130 L70 152 L82 150 L74 118 Z" />
    </svg>
  );
}

const rankLinkClassName = cn(
  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
  "bg-white/3 ring-1 ring-white/10 hover:bg-white/6",
);

function RankLink({
  style,
  label,
  beltId,
  className,
}: {
  style: (typeof colouredBeltLadder)[number];
  label: string;
  beltId: string;
  className?: string;
}) {
  return (
    <Link
      to="/belt/$belt"
      params={{ belt: beltId }}
      className={cn(rankLinkClassName, className)}
    >
      <MiniBelt {...style} className="h-2.5 w-12" />
      <span className="min-w-0 flex-1 text-sm text-white/80">{label}</span>
      <ChevronRight
        aria-hidden
        className="size-4 text-white/30"
        strokeWidth={1.5}
      />
    </Link>
  );
}

function RankGrid() {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {colouredBeltLadder.map((style, index) => {
        const syllabus = getSyllabusForBeltIndex(index);
        const isBlackBelt = index === colouredBeltLadder.length - 1;

        if (!syllabus) return null;

        return (
          <RankLink
            key={beltToId(syllabus.gup)}
            style={style}
            label={syllabus.rank}
            beltId={beltToId(syllabus.gup)}
            className={isBlackBelt ? "sm:col-span-2" : undefined}
          />
        );
      })}
    </div>
  );
}

function Belts() {
  return (
    <div className="page-shell">
      <div className="content-column-wide relative flex flex-col gap-8 py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Belt Progression
            </h1>
            <p className="mt-1 max-w-xl text-sm text-white/50">
              ITF coloured belt ranks from 10th to 1st Gup, through to Black
              Belt. Select a rank to see grading requirements.
            </p>
          </div>
          <KickSilhouette />
        </header>

        <div className="relative rounded-xl bg-white/2 p-4 ring-1 ring-white/10">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            Select a rank
          </p>
          <RankGrid />
        </div>
      </div>
    </div>
  );
}
