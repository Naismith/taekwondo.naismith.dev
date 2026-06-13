export type GlossaryCategory =
  | "stance"
  | "block"
  | "strike"
  | "kick"
  | "general";

export type GlossaryEntry = {
  english: string;
  korean: string;
  category: GlossaryCategory;
  definition: string;
  aliases?: string[];
};

export const glossaryCategories: {
  id: GlossaryCategory;
  label: string;
}[] = [
  { id: "stance", label: "Stances" },
  { id: "block", label: "Blocks" },
  { id: "strike", label: "Strikes" },
  { id: "kick", label: "Kicks" },
  { id: "general", label: "General" },
];

export const glossary: GlossaryEntry[] = [
  // Stances
  {
    english: "Walking stance",
    korean: "Gunnun Sogi",
    category: "stance",
    definition:
      "Long forward stance with one foot length between heel and toe of the other foot; 50% weight on each foot.",
    aliases: ["Gunnun", "Long stance"],
  },
  {
    english: "L-stance",
    korean: "Niunja Sogi",
    category: "stance",
    definition:
      "Defensive stance with 70% weight on the rear foot; front foot one-and-a-half foot lengths forward, rear foot turned 15° outward.",
    aliases: ["Niunja", "Back stance"],
  },
  {
    english: "Fixed stance",
    korean: "Gojung Sogi",
    category: "stance",
    definition:
      "Strong forward stance with 50% weight on each foot; one-and-a-half foot lengths between feet, both feet turned 15° inward.",
    aliases: ["Gojung"],
  },
  {
    english: "Sitting stance",
    korean: "Annun Sogi",
    category: "stance",
    definition:
      "Wide low stance with feet one-and-a-half shoulder widths apart; knees bent, 50% weight on each foot.",
    aliases: ["Annun"],
  },
  {
    english: "Parallel stance",
    korean: "Narani Sogi",
    category: "stance",
    definition:
      "Feet one shoulder width apart, parallel; 50% weight on each foot. Used for ready posture and bowing.",
    aliases: ["Narani"],
  },
  {
    english: "Parallel ready stance",
    korean: "Narani Junbi Sogi",
    category: "stance",
    definition:
      "Parallel stance with closed fists at belt level, ready to begin a pattern or sparring.",
  },
  {
    english: "Closed stance",
    korean: "Moa Sogi",
    category: "stance",
    definition:
      "Feet together with 100% weight on both feet equally; used for attention and some techniques.",
    aliases: ["Moa"],
  },
  {
    english: "X-stance",
    korean: "Kyocha Sogi",
    category: "stance",
    definition:
      "Crossed-foot stance with 90% weight on the rear foot; front foot placed across the instep of the rear foot.",
    aliases: ["Kyocha"],
  },
  {
    english: "Bending ready stance",
    korean: "Goburyo Junbi Sogi",
    category: "stance",
    definition:
      "Low preparatory stance with one foot forward, body lowered and weight distributed for a quick follow-up technique.",
  },
  {
    english: "Attention stance",
    korean: "Charyot Sogi",
    category: "stance",
    definition:
      "Formal standing posture — feet together, arms at sides — used when bowing or receiving instructions.",
    aliases: ["Charyot"],
  },

  // Blocks
  {
    english: "Low block",
    korean: "Najunde Makgi",
    category: "block",
    definition: "Block directed to the lower section (abdomen and below).",
  },
  {
    english: "Middle block",
    korean: "Kupande Makgi",
    category: "block",
    definition: "Block directed to the middle section (solar plexus to shoulder).",
  },
  {
    english: "High block",
    korean: "Nopunde Makgi",
    category: "block",
    definition: "Block directed to the upper section (above the shoulder).",
  },
  {
    english: "Inner forearm block",
    korean: "An Palmok Makgi",
    category: "block",
    definition:
      "Block using the inner forearm; the blocking surface faces inward toward the body centre.",
  },
  {
    english: "Outer forearm block",
    korean: "Bakat Palmok Makgi",
    category: "block",
    definition:
      "Block using the outer forearm; the blocking surface faces outward from the body centre.",
  },
  {
    english: "Knifehand block",
    korean: "Sonkal Makgi",
    category: "block",
    definition: "Block executed with the knifehand (open hand, fingers together).",
    aliases: ["Sonkal"],
  },
  {
    english: "Palm block",
    korean: "Sonbadak Makgi",
    category: "block",
    definition: "Block using the palm heel or flat palm surface.",
  },
  {
    english: "Rising block",
    korean: "Chookyo Makgi",
    category: "block",
    definition:
      "Upward block that deflects an attack overhead; forearm rises above the head.",
    aliases: ["Chookyo"],
  },
  {
    english: "Guarding block",
    korean: "Daebi Makgi",
    category: "block",
    definition:
      "Protective block covering the body; forearm held across the target area.",
    aliases: ["Daebi"],
  },
  {
    english: "Pressing block",
    korean: "Nullo Makgi",
    category: "block",
    definition:
      "Downward pressing block using both fists (X-fist) to force an attack down.",
    aliases: ["Nullo", "X-fist pressing block"],
  },
  {
    english: "Wedging block",
    korean: "Hechyo Makgi",
    category: "block",
    definition:
      "Block that wedges or splits an attack apart using the forearms in a V shape.",
    aliases: ["Hechyo"],
  },

  // Strikes
  {
    english: "Punch",
    korean: "Jirugi",
    category: "strike",
    definition:
      "Straight strike with a clenched fist; obverse (same arm as front foot) or reverse (opposite arm).",
  },
  {
    english: "Obverse punch",
    korean: "Baro Jirugi",
    category: "strike",
    definition: "Punch with the arm on the same side as the front foot.",
    aliases: ["Baro"],
  },
  {
    english: "Reverse punch",
    korean: "Bandae Jirugi",
    category: "strike",
    definition: "Punch with the arm on the opposite side to the front foot.",
    aliases: ["Bandae"],
  },
  {
    english: "Knifehand strike",
    korean: "Sonkal Taerigi",
    category: "strike",
    definition: "Strike delivered with the knifehand edge of the open hand.",
  },
  {
    english: "Backfist strike",
    korean: "Dung Joomuk Taerigi",
    category: "strike",
    definition: "Strike using the back of the clenched fist.",
  },
  {
    english: "Side fist strike",
    korean: "Yop Joomuk Taerigi",
    category: "strike",
    definition: "Strike using the side of the clenched fist.",
  },
  {
    english: "Palm heel strike",
    korean: "Sonbadak Taerigi",
    category: "strike",
    definition: "Strike with the base of the open palm.",
  },
  {
    english: "Elbow strike",
    korean: "Palkup Taerigi",
    category: "strike",
    definition: "Close-range strike using the elbow joint.",
    aliases: ["Palkup"],
  },
  {
    english: "Fingertip thrust",
    korean: "Son Sonkut Tulgi",
    category: "strike",
    definition:
      "Thrusting attack with extended fingertips to a vital spot.",
  },
  {
    english: "Upset punch",
    korean: "Dwijibo Jirugi",
    category: "strike",
    definition:
      "Punch delivered with the fist rotated palm-up, typically to the solar plexus or ribs.",
  },

  // Kicks
  {
    english: "Front snap kick",
    korean: "Ap Cha Busigi",
    category: "kick",
    definition:
      "Snap kick to the front using the ball of the foot; knee chambered high before extension.",
    aliases: ["Ap Cha Busigi", "Apcha"],
  },
  {
    english: "Side piercing kick",
    korean: "Yop Cha Jirugi",
    category: "kick",
    definition:
      "Kick delivered sideways with the heel or blade of the foot, piercing through the target.",
    aliases: ["Yopcha"],
  },
  {
    english: "Turning kick",
    korean: "Dollyo Chagi",
    category: "kick",
    definition:
      "Roundhouse kick using the ball of the foot; hip turns fully into the target.",
    aliases: ["Dollyo", "Roundhouse kick"],
  },
  {
    english: "Reverse turning kick",
    korean: "Bandae Dollyo Chagi",
    category: "kick",
    definition:
      "Turning kick executed with the rear leg while the body rotates away from the target.",
  },
  {
    english: "Back piercing kick",
    korean: "Dwit Cha Jirugi",
    category: "kick",
    definition:
      "Kick delivered backward using the heel, body facing away from the target.",
    aliases: ["Back kick"],
  },
  {
    english: "Hooking kick",
    korean: "Goro Chagi",
    category: "kick",
    definition:
      "Kick that hooks inward after extension, striking with the heel or sole.",
  },
  {
    english: "Pick-shape kick",
    korean: "Goro Chagi",
    category: "kick",
    definition:
      "Axe-like downward kick using the ball or heel of the foot.",
    aliases: ["Axe kick"],
  },
  {
    english: "Knee kick",
    korean: "Moorup Chagi",
    category: "kick",
    definition: "Close-range kick using the knee as the attacking tool.",
    aliases: ["Moorup"],
  },

  // General
  {
    english: "Pattern",
    korean: "Tul",
    category: "general",
    definition:
      "A choreographed sequence of movements against imaginary opponents; also called form or hyung.",
    aliases: ["Form", "Hyung"],
  },
  {
    english: "Sparring",
    korean: "Matsogi",
    category: "general",
    definition: "Practice fighting against an opponent — pre-arranged or free.",
  },
  {
    english: "Three step sparring",
    korean: "Sambo Matsogi",
    category: "general",
    definition: "Pre-arranged sparring with three consecutive attacking steps.",
  },
  {
    english: "Two step sparring",
    korean: "Ibo Matsogi",
    category: "general",
    definition:
      "Pre-arranged sparring with two consecutive hand or foot techniques.",
  },
  {
    english: "One step sparring",
    korean: "Ilbo Matsogi",
    category: "general",
    definition:
      "Pre-arranged sparring with a single attack — the most spontaneous step-sparring form.",
  },
  {
    english: "Training area",
    korean: "Dojang",
    category: "general",
    definition: "The place where Taekwon-Do is practised.",
  },
  {
    english: "Uniform",
    korean: "Dobok",
    category: "general",
    definition: "The traditional white training uniform.",
  },
  {
    english: "Grade / rank",
    korean: "Geup",
    category: "general",
    definition:
      "Coloured-belt rank (gup/kup) from 10th (white) to 1st (red with black stripe).",
    aliases: ["Gup", "Kup"],
  },
  {
    english: "Black belt degree",
    korean: "Dan",
    category: "general",
    definition: "Black belt rank from 1st to 9th degree.",
  },
  {
    english: "Attention",
    korean: "Charyot",
    category: "general",
    definition: "Command to stand at attention in moa sogi.",
  },
  {
    english: "Bow",
    korean: "Kyong Ye",
    category: "general",
    definition: "Formal bow showing respect — typically 15° from attention stance.",
  },
  {
    english: "Ready",
    korean: "Junbi",
    category: "general",
    definition: "Command to adopt a ready posture before beginning.",
  },
  {
    english: "Begin",
    korean: "Sijak",
    category: "general",
    definition: "Command to start a pattern or exercise.",
  },
  {
    english: "Return",
    korean: "Baro",
    category: "general",
    definition: "Command to return to ready posture or starting position.",
  },
  {
    english: "Stop",
    korean: "Goman",
    category: "general",
    definition: "Command to halt the current exercise.",
  },
  {
    english: "Shout / spirit cry",
    korean: "Kihap",
    category: "general",
    definition:
      "Explosive shout focusing energy at the moment of technique execution.",
  },
  {
    english: "Middle section",
    korean: "Kup",
    category: "general",
    definition: "Target area from the solar plexus to the shoulder line.",
  },
  {
    english: "High section",
    korean: "Nopunde",
    category: "general",
    definition: "Target area above the shoulder — face and head.",
  },
  {
    english: "Low section",
    korean: "Najunde",
    category: "general",
    definition: "Target area from the abdomen downward.",
  },
];

export function searchGlossary(query: string): GlossaryEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return glossary;

  return glossary.filter(
    (entry) =>
      entry.english.toLowerCase().includes(normalized) ||
      entry.korean.toLowerCase().includes(normalized) ||
      entry.definition.toLowerCase().includes(normalized) ||
      entry.aliases?.some((alias) => alias.toLowerCase().includes(normalized))
  );
}

export function getGlossaryByCategory(
  category: GlossaryCategory
): GlossaryEntry[] {
  return glossary.filter((entry) => entry.category === category);
}
