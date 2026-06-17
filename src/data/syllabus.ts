import { allItfPatterns, patternToId } from "~/data/itf-patterns";
import type { SparringType } from "~/data/sparring";

export type RankSyllabus = {
  gup: number | "black";
  rank: string;
  shortLabel: string;
  /** Patterns introduced at this grade (not cumulative). */
  newPatterns: string[];
  /** Sparring types tested from this grade upward. */
  sparring: SparringType[];
  /** Theory section IDs students should know for grading. */
  theory: string[];
  /** Additional notes for the examiner focus at this grade. */
  notes?: string;
  /** Short intro shown in the rank detail panel. */
  intro?: string;
  /** Longer copy for the "About this grade" section. */
  about?: string;
};

export type GradingRequirement = {
  id: string;
  label: string;
  kind:
    | "pattern"
    | "fundamental"
    | "sparring"
    | "theory"
    | "counting"
    | "terminology"
    | "stances";
  link?:
    | { to: "/pattern/$id"; params: { id: string } }
    | { to: "/theory"; hash?: string }
    | { to: "/glossary" }
    | { to: "/sparring"; hash?: string };
};

export const rankSyllabus: RankSyllabus[] = [
  {
    gup: 10,
    rank: "10th Gup (White Belt)",
    shortLabel: "10th Gup",
    newPatterns: ["Saju Jirugi", "Saju Makgi"],
    sparring: [],
    theory: ["meaning", "tenets", "oath", "counting", "colours"],
    notes: "Fundamental exercises — four-directional punch and block.",
    intro:
      "The starting point of your Taekwon-Do journey. Focus on fundamentals, discipline and basics.",
    about:
      "Build a strong foundation by learning correct techniques, movement and terminology. Consistency and respect are key at this stage.",
  },
  {
    gup: 9,
    rank: "9th Gup (Yellow Stripe)",
    shortLabel: "9th Gup",
    newPatterns: ["Chon-Ji"],
    sparring: ["3-step"],
    theory: ["meaning", "tenets", "oath", "counting", "colours", "composition", "glossary"],
    notes: "First pattern and introduction to three-step sparring.",
  },
  {
    gup: 8,
    rank: "8th Gup (Yellow Belt)",
    shortLabel: "8th Gup",
    newPatterns: ["Dan-Gun"],
    sparring: ["3-step"],
    theory: ["meaning", "tenets", "oath", "counting", "colours", "composition", "glossary"],
  },
  {
    gup: 7,
    rank: "7th Gup (Green Stripe)",
    shortLabel: "7th Gup",
    newPatterns: ["Do-San"],
    sparring: ["3-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "glossary",
    ],
  },
  {
    gup: 6,
    rank: "6th Gup (Green Belt)",
    shortLabel: "6th Gup",
    newPatterns: ["Won-Hyo"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "glossary",
    ],
    notes: "Two-step sparring introduced.",
  },
  {
    gup: 5,
    rank: "5th Gup (Blue Stripe)",
    shortLabel: "5th Gup",
    newPatterns: ["Yul-Gok"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
  },
  {
    gup: 4,
    rank: "4th Gup (Blue Belt)",
    shortLabel: "4th Gup",
    newPatterns: ["Joong-Gun"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
  },
  {
    gup: 3,
    rank: "3rd Gup (Red Stripe)",
    shortLabel: "3rd Gup",
    newPatterns: ["Toi-Gye"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
  },
  {
    gup: 2,
    rank: "2nd Gup (Red Belt)",
    shortLabel: "2nd Gup",
    newPatterns: ["Hwa-Rang"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
  },
  {
    gup: 1,
    rank: "1st Gup (Black Stripe)",
    shortLabel: "1st Gup",
    newPatterns: ["Choong-Moo"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
    notes: "Final coloured belt — all patterns, sparring, and theory to date.",
  },
  {
    gup: "black",
    rank: "1st Degree Black Belt",
    shortLabel: "1st Dan",
    newPatterns: ["Kwang-Gae", "Po-Eun", "Ge-Baek"],
    sparring: ["3-step", "2-step"],
    theory: [
      "meaning",
      "tenets",
      "oath",
      "counting",
      "colours",
      "composition",
      "theory-of-power",
      "sine-wave",
      "glossary",
      "techniques",
    ],
  },
];

const theoryLabels: Record<string, string> = {
  meaning: "Meaning of Taekwon-Do",
  tenets: "Tenets",
  oath: "Student Oath",
  counting: "Counting in Korean",
  colours: "Belt colour meanings",
  composition: "Composition of Taekwon-Do",
  "theory-of-power": "Theory of Power",
  "sine-wave": "Sine Wave",
  glossary: "Terminology / glossary",
  techniques: "Stances reference",
};

const sparringLabels: Record<SparringType, string> = {
  "3-step": "Three-step sparring",
  "2-step": "Two-step sparring",
};

export function getRankSyllabus(gup: number | "black"): RankSyllabus | undefined {
  return rankSyllabus.find((entry) => entry.gup === gup);
}

export function getCumulativePatterns(gup: number | "black"): string[] {
  const index = rankSyllabus.findIndex((entry) => entry.gup === gup);
  if (index === -1) return [];

  return rankSyllabus
    .slice(0, index + 1)
    .flatMap((entry) => entry.newPatterns);
}

export function getPatternLinks(patternNames: string[]) {
  return patternNames.map((name) => {
    const pattern = allItfPatterns.find((p) => p.name === name);
    return {
      name,
      id: patternToId(name),
      rank: pattern?.rank,
    };
  });
}

export function getTheoryLabel(id: string): string {
  return theoryLabels[id] ?? id;
}

export function getTheoryRoute(id: string): {
  to: "/theory" | "/glossary";
  hash?: string;
} {
  if (id === "glossary") return { to: "/glossary" };
  return { to: "/theory", hash: id };
}

export function getSparringLabel(type: SparringType): string {
  return sparringLabels[type];
}

export function getSyllabusForBeltIndex(index: number): RankSyllabus | undefined {
  return rankSyllabus[index];
}

const fundamentalPatterns = new Set(["Saju Jirugi", "Saju Makgi"]);

const theoryRequirementMap: Record<
  string,
  Pick<GradingRequirement, "label" | "kind" | "link">
> = {
  counting: {
    label: "Korean counting",
    kind: "counting",
    link: { to: "/theory", hash: "counting" },
  },
  glossary: {
    label: "Terminology",
    kind: "terminology",
    link: { to: "/glossary" },
  },
  techniques: {
    label: "Basic stances",
    kind: "stances",
    link: { to: "/theory", hash: "techniques" },
  },
};

const generalTheoryIds = new Set([
  "meaning",
  "tenets",
  "oath",
  "colours",
  "composition",
  "theory-of-power",
  "sine-wave",
]);

export function getRankBadge(gup: number | "black"): string | null {
  if (gup === 10) return "BEGINNER";
  if (gup === 9 || gup === 8) return "FOUNDATION";
  if (gup === 7 || gup === 6) return "DEVELOPING";
  if (gup === 5 || gup === 4) return "INTERMEDIATE";
  if (gup === 3 || gup === 2 || gup === 1) return "ADVANCED";
  if (gup === "black") return "BLACK BELT";
  return null;
}

export function getGradingRequirements(
  syllabus: RankSyllabus
): GradingRequirement[] {
  const requirements: GradingRequirement[] = [];

  for (const name of syllabus.newPatterns) {
    const pattern = allItfPatterns.find((entry) => entry.name === name);
    requirements.push({
      id: `pattern-${name}`,
      label: name,
      kind: fundamentalPatterns.has(name) ? "fundamental" : "pattern",
      link: pattern
        ? { to: "/pattern/$id", params: { id: patternToId(name) } }
        : undefined,
    });
  }

  for (const type of syllabus.sparring) {
    requirements.push({
      id: `sparring-${type}`,
      label: getSparringLabel(type),
      kind: "sparring",
      link: { to: "/sparring", hash: type },
    });
  }

  let hasGeneralTheory = false;
  for (const sectionId of syllabus.theory) {
    const mapped = theoryRequirementMap[sectionId];
    if (mapped) {
      requirements.push({
        id: `theory-${sectionId}`,
        ...mapped,
      });
      continue;
    }

    if (generalTheoryIds.has(sectionId)) {
      hasGeneralTheory = true;
    }
  }

  if (hasGeneralTheory) {
    requirements.push({
      id: "theory-general",
      label: "Theory",
      kind: "theory",
      link: { to: "/theory" },
    });
  }

  return requirements;
}
