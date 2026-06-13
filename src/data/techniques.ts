export type TechniqueCategory = "stance" | "ready-stance";

export type Technique = {
  english: string;
  korean: string;
  category: TechniqueCategory;
  definition: string;
  details?: string;
};

export const techniqueCategories: {
  id: TechniqueCategory;
  label: string;
}[] = [
  { id: "stance", label: "Stances" },
  { id: "ready-stance", label: "Ready stances" },
];

export const techniques: Technique[] = [
  {
    english: "Walking stance",
    korean: "Gunnun Sogi",
    category: "stance",
    definition:
      "The most fundamental ITF stance — long and stable, used for advancing attacks and basic blocks.",
    details:
      "One foot length between the rear foot heel and front foot toes. Both feet point forward. Weight distributed 50/50. One shoulder width wide.",
  },
  {
    english: "L-stance",
    korean: "Niunja Sogi",
    category: "stance",
    definition:
      "Primary defensive stance — the rear leg carries most of the weight, allowing quick evasion and counter-attack.",
    details:
      "Front foot one-and-a-half foot lengths forward. Rear foot turned 15° outward. 70% weight on rear foot, 30% on front. Named for the L-shape formed by the legs.",
  },
  {
    english: "Fixed stance",
    korean: "Gojung Sogi",
    category: "stance",
    definition:
      "Powerful forward stance used for side punches and strong blocking; both feet anchor firmly into the floor.",
    details:
      "One-and-a-half foot lengths between feet. Both feet turned 15° inward. Weight 50/50. One shoulder width wide.",
  },
  {
    english: "Sitting stance",
    korean: "Annun Sogi",
    category: "stance",
    definition:
      "Low wide stance for lateral stability — used for side kicks, double punches, and strong body-shifting techniques.",
    details:
      "Feet one-and-a-half shoulder widths apart, parallel. Knees bent over the toes. Weight 50/50.",
  },
  {
    english: "Parallel stance",
    korean: "Narani Sogi",
    category: "stance",
    definition:
      "Neutral upright stance — the base for bowing, ready posture, and returning after a pattern.",
    details: "Feet one shoulder width apart, parallel. Weight 50/50.",
  },
  {
    english: "Closed stance",
    korean: "Moa Sogi",
    category: "stance",
    definition:
      "Feet together — used at attention, for some jumping techniques, and formal bowing.",
    details: "Feet touching or nearly touching. Weight 50/50 on both feet.",
  },
  {
    english: "X-stance",
    korean: "Kyocha Sogi",
    category: "stance",
    definition:
      "Crossed-foot transitional stance — enables rapid direction changes and jumping techniques.",
    details:
      "Front foot placed across the instep of the rear foot. 90% weight on the rear foot. Used momentarily during movement.",
  },
  {
    english: "Bending ready stance",
    korean: "Goburyo Junbi Sogi",
    category: "stance",
    definition:
      "Low crouched preparatory stance — body lowered to spring into a follow-up kick or strike.",
    details:
      "One foot forward, knees bent, body lowered. Weight varies depending on the technique to follow.",
  },
  {
    english: "Parallel ready stance",
    korean: "Narani Junbi Sogi",
    category: "ready-stance",
    definition:
      "Standard ready posture at the start and end of patterns and sparring sequences.",
    details:
      "Parallel stance with closed fists at belt level, about one fist distance from the body.",
  },
  {
    english: "Attention stance",
    korean: "Charyot Sogi",
    category: "ready-stance",
    definition:
      "Formal standing posture for bowing to instructors, seniors, and the dojang.",
    details:
      "Closed stance with arms straight at the sides, fists clenched. Body upright and still.",
  },
  {
    english: "Sitting ready stance",
    korean: "Annun Junbi Sogi",
    category: "ready-stance",
    definition:
      "Ready posture in sitting stance — fists at hip level, used before techniques in annun sogi.",
    details:
      "Sitting stance with closed fists at the hips, palms upward.",
  },
  {
    english: "Fixed ready stance",
    korean: "Gojung Junbi Sogi",
    category: "ready-stance",
    definition:
      "Ready posture in fixed stance — used before side punches and techniques requiring gojung sogi.",
    details:
      "Fixed stance with the lead fist extended to shoulder height, rear fist at the belt.",
  },
];

export function getTechniquesByCategory(
  category: TechniqueCategory
): Technique[] {
  return techniques.filter((technique) => technique.category === category);
}
