export type TheorySection = {
  id: string;
  title: string;
  description?: string;
  items: { label: string; detail: string; korean?: string }[];
};

export const taekwondoMeaning = {
  title: "Meaning of Taekwon-Do",
  description:
    "Literally translated, Taekwon-Do means foot-hand-way — the art of hand and foot fighting. The name reflects the union of mental discipline and physical technique.",
  parts: [
    {
      korean: "Tae",
      meaning: "Foot, leg, or to jump or smash with the foot",
    },
    {
      korean: "Kwon",
      meaning: "Fist, or to block, punch, or destroy with the hand or fist",
    },
    {
      korean: "Do",
      meaning: "Art, way, method, or path",
    },
  ],
};

export const tenets: TheorySection = {
  id: "tenets",
  title: "Tenets of Taekwon-Do",
  items: [
    {
      label: "Courtesy",
      korean: "Ye Ui",
      detail: "Polite manners and respect toward others.",
    },
    {
      label: "Integrity",
      korean: "Yom Chi",
      detail: "Honesty, sincerity, and knowing right from wrong.",
    },
    {
      label: "Perseverance",
      korean: "In Nae",
      detail: "Persistence and patience in the pursuit of goals.",
    },
    {
      label: "Self-Control",
      korean: "Guk Gi",
      detail: "Discipline over thoughts, emotions, and actions.",
    },
    {
      label: "Indomitable Spirit",
      korean: "Baekjul Boolgool",
      detail:
        "Courage and determination that cannot be broken, even in defeat.",
    },
  ],
};

export const studentOath = {
  title: "Student Oath",
  lines: [
    "I shall observe the tenets of Taekwon-Do.",
    "I shall respect the instructor and seniors.",
    "I shall never misuse Taekwon-Do.",
    "I shall be a champion of freedom and justice.",
    "I shall build a more peaceful world.",
  ],
};

export const koreanCounting: TheorySection = {
  id: "counting",
  title: "Counting in Korean",
  description:
    "Count aloud during patterns, fundamental exercises, and step-sparring — examiners test this from white belt onward.",
  items: [
    { label: "Hana", detail: "One" },
    { label: "Dool", detail: "Two" },
    { label: "Set", detail: "Three" },
    { label: "Net", detail: "Four" },
    { label: "Dasot", detail: "Five" },
    { label: "Yasot", detail: "Six" },
    { label: "Ilgop", detail: "Seven" },
    { label: "Yodol", detail: "Eight" },
    { label: "Ahop", detail: "Nine" },
    { label: "Yeol", detail: "Ten" },
  ],
};

export const beltColours = [
  {
    rank: "10th Gup (White Belt)",
    colour: "White",
    meaning:
      "Innocence — the seed from which all knowledge of Taekwon-Do grows.",
  },
  {
    rank: "9th Gup (Yellow Stripe)",
    colour: "White with yellow stripe",
    meaning:
      "The seed begins to take root as the foundation of training is laid.",
  },
  {
    rank: "8th Gup (Yellow Belt)",
    colour: "Yellow",
    meaning:
      "Earth — from which a plant sprouts as the student’s skills begin to develop.",
  },
  {
    rank: "7th Gup (Green Stripe)",
    colour: "Yellow with green stripe",
    meaning: "Growth continues as basic techniques become more established.",
  },
  {
    rank: "6th Gup (Green Belt)",
    colour: "Green",
    meaning:
      "The plant’s growth — skills and knowledge develop and strengthen.",
  },
  {
    rank: "5th Gup (Blue Stripe)",
    colour: "Green with blue stripe",
    meaning:
      "The student advances toward greater maturity in technique and understanding.",
  },
  {
    rank: "4th Gup (Blue Belt)",
    colour: "Blue",
    meaning:
      "Heaven — the plant matures toward the sky as training reaches a higher level.",
  },
  {
    rank: "3rd Gup (Red Stripe)",
    colour: "Blue with red stripe",
    meaning:
      "The student approaches the stage where power and responsibility must be balanced.",
  },
  {
    rank: "2nd Gup (Red Belt)",
    colour: "Red",
    meaning:
      "Danger — the student must exercise caution and control, and opponents are warned of their ability.",
  },
  {
    rank: "1st Gup (Black Stripe)",
    colour: "Red with black stripe",
    meaning:
      "The final stage before black belt — preparation for maturity and proficiency.",
  },
  {
    rank: "1st–9th Degree Black Belt",
    colour: "Black",
    meaning:
      "The opposite of white — maturity and proficiency in Taekwon-Do. Black also signifies imperviousness to darkness and fear.",
  },
];

export const compositionOfTaekwondo: TheorySection = {
  id: "composition",
  title: "Composition of Taekwon-Do",
  items: [
    {
      label: "Taekwon-Do",
      detail: "The art itself — hand and foot techniques applied with discipline.",
    },
    {
      label: "Spirit",
      detail: "The indomitable spirit that drives correct attitude and conduct.",
    },
    {
      label: "Mind",
      detail: "Mental focus, perseverance, and self-control in training and life.",
    },
    {
      label: "Body",
      detail: "Physical conditioning and the correct application of technique.",
    },
  ],
};

export const theoryOfPower: TheorySection = {
  id: "theory-of-power",
  title: "Theory of Power",
  items: [
    {
      label: "Reaction Force",
      detail: "For every action there is an equal and opposite reaction.",
    },
    {
      label: "Concentration",
      detail: "Force is concentrated at the point of impact at the correct moment.",
    },
    {
      label: "Equilibrium",
      detail: "Balance is maintained to generate maximum power and stability.",
    },
    {
      label: "Breath Control",
      detail: "Controlled breathing supports timing, focus, and power.",
    },
    {
      label: "Mass",
      detail: "Power increases with the effective mass involved in the technique.",
    },
    {
      label: "Speed",
      detail: "Power varies with the square of the speed of the movement.",
    },
  ],
};

export const sineWavePrinciple = {
  title: "Sine Wave",
  description:
    "A fundamental ITF movement principle: the body rises and falls in a natural curve during techniques, using gravity and body weight to generate power while maintaining balance and flow.",
};
