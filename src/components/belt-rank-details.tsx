import { Link } from "@tanstack/react-router";

import {
  getGradingRequirements,
  getRankBadge,
  type GradingRequirement,
  type RankSyllabus,
} from "~/data/syllabus";
import { cn } from "~/utils";

function RequirementIcon({ kind }: { kind: GradingRequirement["kind"] }) {
  const className = "size-4 shrink-0 text-white/40";

  switch (kind) {
    case "fundamental":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <circle cx="8" cy="5" r="2.5" />
          <path d="M5 8c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5v5H5V8z" />
        </svg>
      );
    case "pattern":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <circle cx="8" cy="3.5" r="2" />
          <path d="M5.5 6.5c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.5v1.5l2 5.5H3.5l2-5.5V6.5z" />
          <path d="M10 8l3-1.5 1 1.5-3 2z" />
        </svg>
      );
    case "sparring":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="11" cy="4" r="1.5" />
          <path d="M3.5 7.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v4H3.5v-4z" />
          <path d="M8.5 7.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v4H8.5v-4z" />
        </svg>
      );
    case "theory":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <path d="M3 2.5h7a1 1 0 0 1 1 1v10.5l-2-1-2 1-2-1-2 1-2-1V3.5a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "counting":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <text x="2" y="12" fontSize="9" fontFamily="Inter, sans-serif">
            123
          </text>
        </svg>
      );
    case "terminology":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <path d="M2 4.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 14 4.5v5a1.5 1.5 0 0 1-1.5 1.5H6l-3 2.5V4.5z" />
        </svg>
      );
    case "stances":
      return (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={className}
          fill="currentColor"
        >
          <circle cx="8" cy="3.5" r="1.75" />
          <path d="M6 6.5h4l-1 7H7l-1-7z" />
          <path d="M5 13.5h6" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
  }
}

function RequirementRow({ requirement }: { requirement: GradingRequirement }) {
  const content = (
    <>
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="size-2.5 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M2.5 6l2.5 2.5 4.5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <RequirementIcon kind={requirement.kind} />
      <span className="text-sm text-white/80">{requirement.label}</span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-lg bg-white/3 px-3 py-2.5 ring-1 ring-white/5 transition-colors";

  if (!requirement.link) {
    return <div className={className}>{content}</div>;
  }

  const link = requirement.link;
  if (link.to === "/pattern/$id") {
    return (
      <Link
        to={link.to}
        params={link.params}
        className={cn(className, "hover:bg-white/6 hover:ring-white/10")}
      >
        {content}
      </Link>
    );
  }

  if (link.to === "/glossary") {
    return (
      <Link
        to={link.to}
        className={cn(className, "hover:bg-white/6 hover:ring-white/10")}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      to={link.to}
      hash={link.hash}
      className={cn(className, "hover:bg-white/6 hover:ring-white/10")}
    >
      {content}
    </Link>
  );
}

export function BeltRankDetails({ syllabus }: { syllabus: RankSyllabus }) {
  const requirements = getGradingRequirements(syllabus);
  const badge = getRankBadge(syllabus.gup);
  const intro = syllabus.intro ?? syllabus.notes;
  const about =
    syllabus.about ??
    "Continue building skill, confidence, and understanding of ITF Taekwon-Do at this grade.";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold text-white">{syllabus.rank}</h2>
          {badge && (
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary ring-1 ring-primary/30">
              {badge}
            </span>
          )}
        </div>
        {intro && (
          <p className="mt-2 text-sm leading-relaxed text-white/50">{intro}</p>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-white/60">
          Grading requirements
        </h3>
        <ul className="flex flex-col gap-2">
          {requirements.map((requirement) => (
            <li key={requirement.id}>
              <RequirementRow requirement={requirement} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-white/80">
          About this grade
        </h3>
        <p className="text-sm leading-relaxed text-white/50">{about}</p>
      </div>
    </div>
  );
}
