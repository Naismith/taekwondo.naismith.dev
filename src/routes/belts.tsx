import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { MiniBelt, colouredBeltLadder } from "~/components/belt";
import {
  getGradingRequirements,
  getRankBadge,
  getSyllabusForBeltIndex,
  type GradingRequirement,
  type RankSyllabus,
} from "~/data/syllabus";
import { cn } from "~/utils";

export const Route = createFileRoute("/belts")({
  component: Belts,
});

const SELECTED_BELT_STORAGE_KEY = "belts.selectedIndex";

function getStoredBeltIndex(): number {
  if (typeof window === "undefined") return 0;

  try {
    const raw = localStorage.getItem(SELECTED_BELT_STORAGE_KEY);
    if (raw === null) return 0;

    const index = Number.parseInt(raw, 10);
    if (
      Number.isNaN(index) ||
      index < 0 ||
      index >= colouredBeltLadder.length
    ) {
      return 0;
    }

    return index;
  } catch {
    return 0;
  }
}

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

function CheckIcon() {
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
      <Check aria-hidden className="size-3.5 text-primary" strokeWidth={2} />
    </span>
  );
}

const rankOptionClassName = cn(
  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
  "bg-white/3 ring-1 ring-white/10 hover:bg-white/6"
);

function RankOptionButton({
  style,
  label,
  isSelected,
  onSelect,
  className,
}: {
  style: (typeof colouredBeltLadder)[number];
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        rankOptionClassName,
        isSelected && "bg-primary/5 ring-primary/40",
        className
      )}
    >
      <MiniBelt {...style} className="h-2.5 w-12" />
      <span className="min-w-0 flex-1 text-sm text-white/80">{label}</span>
      {isSelected ? (
        <CheckIcon />
      ) : (
        <ChevronRight
          aria-hidden
          className="size-4 text-white/30"
          strokeWidth={1.5}
        />
      )}
    </button>
  );
}

function RankGrid({
  selectedIndex,
  onSelect,
}: {
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-3 hidden grid-cols-2 gap-2 lg:grid">
      {colouredBeltLadder.map((style, index) => {
        const syllabus = getSyllabusForBeltIndex(index);
        const isBlackBelt = index === colouredBeltLadder.length - 1;

        if (!syllabus) return null;

        return (
          <RankOptionButton
            key={index}
            style={style}
            label={syllabus.rank}
            isSelected={selectedIndex === index}
            onSelect={() => onSelect(index)}
            className={isBlackBelt ? "col-span-2" : undefined}
          />
        );
      })}
    </div>
  );
}

function RankDropdown({
  selectedIndex,
  onSelect,
}: {
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedStyle = colouredBeltLadder[selectedIndex];
  const selectedSyllabus = getSyllabusForBeltIndex(selectedIndex);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!selectedSyllabus) return null;

  return (
    <div ref={containerRef} className="relative mt-3 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          rankOptionClassName,
          "bg-white/5 hover:ring-white/15",
          open && "bg-white/10 ring-white/15"
        )}
      >
        <MiniBelt {...selectedStyle} className="h-2.5 w-12" />
        <span className="min-w-0 flex-1 text-sm font-medium text-white">
          {selectedSyllabus.rank}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 shrink-0 text-white/50 transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          role="listbox"
          aria-label="Belt ranks"
          className={cn(
            "absolute inset-x-0 top-full z-20 mt-2 flex max-h-[min(24rem,calc(100dvh-12rem))] flex-col gap-2 overflow-y-auto p-2 scrollbar-subtle",
            "rounded-sm bg-black ring-1 ring-white/10 backdrop-blur-sm"
          )}
        >
          {colouredBeltLadder.map((style, index) => {
            const syllabus = getSyllabusForBeltIndex(index);

            if (!syllabus) return null;

            return (
              <li
                key={index}
                role="option"
                aria-selected={selectedIndex === index}
              >
                <RankOptionButton
                  style={style}
                  label={syllabus.rank}
                  isSelected={selectedIndex === index}
                  onSelect={() => {
                    onSelect(index);
                    setOpen(false);
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function RequirementIcon({ kind }: { kind: GradingRequirement["kind"] }) {
  const className = "size-4 shrink-0 text-white/40";

  switch (kind) {
    case "fundamental":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <circle cx="8" cy="5" r="2.5" />
          <path d="M5 8c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5v5H5V8z" />
        </svg>
      );
    case "pattern":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <circle cx="8" cy="3.5" r="2" />
          <path d="M5.5 6.5c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.5v1.5l2 5.5H3.5l2-5.5V6.5z" />
          <path d="M10 8l3-1.5 1 1.5-3 2z" />
        </svg>
      );
    case "sparring":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="11" cy="4" r="1.5" />
          <path d="M3.5 7.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v4H3.5v-4z" />
          <path d="M8.5 7.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v4H8.5v-4z" />
        </svg>
      );
    case "theory":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <path d="M3 2.5h7a1 1 0 0 1 1 1v10.5l-2-1-2 1-2-1-2 1-2-1V3.5a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "counting":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <text x="2" y="12" fontSize="9" fontFamily="Inter, sans-serif">
            123
          </text>
        </svg>
      );
    case "terminology":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
          <path d="M2 4.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 14 4.5v5a1.5 1.5 0 0 1-1.5 1.5H6l-3 2.5V4.5z" />
        </svg>
      );
    case "stances":
      return (
        <svg aria-hidden viewBox="0 0 16 16" className={className} fill="currentColor">
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
          <path d="M2.5 6l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
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

function RankDetails({ syllabus }: { syllabus: RankSyllabus }) {
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
        {intro && <p className="mt-2 text-sm leading-relaxed text-white/50">{intro}</p>}
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
        <h3 className="mb-2 text-sm font-medium text-white/80">About this grade</h3>
        <p className="text-sm leading-relaxed text-white/50">{about}</p>
      </div>
    </div>
  );
}

function Belts() {
  const [selectedIndex, setSelectedIndex] = useState(getStoredBeltIndex);
  const selectedSyllabus = getSyllabusForBeltIndex(selectedIndex);

  useEffect(() => {
    try {
      localStorage.setItem(SELECTED_BELT_STORAGE_KEY, String(selectedIndex));
    } catch {
      // Ignore quota or private-mode errors.
    }
  }, [selectedIndex]);

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
              ITF coloured belt ranks from 10th to 1st Gup, through to Black Belt.
              Select a rank to see grading requirements.
            </p>
          </div>
          <KickSilhouette />
        </header>

        <div className="relative rounded-xl bg-white/2 p-5 ring-1 ring-white/10 sm:p-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Select a rank
              </p>
              <RankDropdown
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
              <RankGrid selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
            </div>

            {selectedSyllabus && <RankDetails syllabus={selectedSyllabus} />}
          </div>
        </div>
      </div>
    </div>
  );
}
