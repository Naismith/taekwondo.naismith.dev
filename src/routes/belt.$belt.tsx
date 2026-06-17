import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { MiniBelt, colouredBeltLadder } from "~/components/belt";
import { BeltRankDetails } from "~/components/belt-rank-details";
import { getBeltById, rankSyllabus } from "~/data/syllabus";

export const Route = createFileRoute("/belt/$belt")({
  component: BeltDetail,
});

function BeltDetail() {
  const { belt } = Route.useParams();
  const syllabus = getBeltById(belt);

  if (!syllabus) {
    throw notFound();
  }

  const beltIndex = rankSyllabus.findIndex(
    (entry) => entry.gup === syllabus.gup,
  );
  const beltStyle = colouredBeltLadder[beltIndex];

  return (
    <div className="page-shell">
      <div className="content-column-wide relative flex flex-col gap-8 py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <Link
          to="/belts"
          className="relative inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          All belts
        </Link>

        <header className="relative flex flex-wrap items-center gap-4">
          <MiniBelt {...beltStyle} className="h-3 w-16" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {syllabus.rank}
            </h1>
            <p className="mt-1 text-sm text-white/50">{syllabus.shortLabel}</p>
          </div>
        </header>

        <div className="relative rounded-xl bg-white/2 p-4 ring-1 ring-white/10">
          <BeltRankDetails syllabus={syllabus} />
        </div>
      </div>
    </div>
  );
}
