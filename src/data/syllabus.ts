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
    sparring: ["3-step", "2-step", "1-step"],
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
    notes: "One-step sparring introduced.",
  },
  {
    gup: 3,
    rank: "3rd Gup (Red Stripe)",
    shortLabel: "3rd Gup",
    newPatterns: ["Toi-Gye"],
    sparring: ["3-step", "2-step", "1-step"],
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
    sparring: ["3-step", "2-step", "1-step"],
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
    sparring: ["3-step", "2-step", "1-step"],
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
    sparring: ["3-step", "2-step", "1-step"],
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
  "1-step": "One-step sparring",
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
