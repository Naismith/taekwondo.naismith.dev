export type SparringType = "3-step" | "2-step";

export type SparringSequence = {
  number: number;
  attacks: string[];
  defences: string[];
  counter: string;
};

export type SparringDefinition = {
  id: SparringType;
  name: string;
  description: string;
  rank: string;
  attackerStart: string;
  defenderStart: string;
  /** Shared attack for every sequence in 3-step sparring. */
  fixedAttack?: string[];
  sequences: SparringSequence[];
};

export const sparringTypeLabels: Record<SparringType, string> = {
  "3-step": "3-Step",
  "2-step": "2-Step",
};

export const sparringTypes: SparringDefinition[] = [
  {
    id: "3-step",
    name: "Three Step Sparring",
    description:
      "Pre-arranged sparring for beginners. The attacker advances three times while the defender steps back, blocks, and counters on the third movement. The attacker must place each stepping foot beside the defender's foot in this order: 1st outside, 2nd inside, 3rd inside.",
    rank: "9th Gup (Yellow Stripe) and above",
    attackerStart: "Parallel ready stance",
    defenderStart: "Parallel ready stance",
    sequences: [
      {
        number: 1,
        attacks: [
          "Step forward into right walking stance, middle section obverse punch",
          "Step forward into walking stance, middle section obverse punch",
          "Step forward into walking stance, middle section obverse punch",
        ],
        defences: [
          "Step back into left walking stance, middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
        ],
        counter: "Middle reverse punch — stationary",
      },
      {
        number: 2,
        attacks: [
          "Step forward, low section front snap kick with the right leg, land in walking stance",
          "Step forward, low section front snap kick with the right leg, land in walking stance",
          "Step forward, low section front snap kick with the right leg, land in walking stance",
        ],
        defences: [
          "Step back into left walking stance, outer forearm low block",
          "Outer forearm low block",
          "Outer forearm low block",
        ],
        counter: "Low section front snap kick with the left leg",
      },
      {
        number: 3,
        attacks: [
          "Step forward into left L-stance, middle section obverse punch",
          "Step forward into left L-stance, middle section obverse punch",
          "Step forward into left L-stance, middle section obverse punch",
        ],
        defences: [
          "Step back into right L-stance, middle inner forearm block",
          "Middle inner forearm block",
          "Middle inner forearm block",
        ],
        counter:
          "Slide the left foot in while withdrawing the left arm to the belt, then slide the left foot forward into L-stance and execute a flat fingertip thrust to the armpit",
      },
      {
        number: 4,
        attacks: [
          "Step forward into right walking stance, high section obverse punch",
          "Step forward into walking stance, high section obverse punch",
          "Step forward into walking stance, high section obverse punch",
        ],
        defences: [
          "Step back into left walking stance, forearm rising block",
          "Forearm rising block",
          "Forearm rising block",
        ],
        counter: "High section obverse punch — stationary",
      },
      {
        number: 5,
        attacks: [
          "Step forward into left L-stance, knifehand strike",
          "Step forward into left L-stance, knifehand strike",
          "Step forward into left L-stance, knifehand strike",
        ],
        defences: [
          "Step back into left L-stance, knifehand guarding block",
          "Knifehand guarding block",
          "Knifehand guarding block",
        ],
        counter: "Middle section side piercing kick with the right leg",
      },
      {
        number: 6,
        attacks: [
          "Step forward, high section side piercing kick with the right leg",
          "Step forward, high section side piercing kick with the right leg",
          "Step forward, high section side piercing kick with the right leg, then step down into sitting stance with twin straight forearm block",
        ],
        defences: [
          "Step back into left L-stance, forearm-guarding block",
          "Forearm-guarding block",
          "Forearm-guarding block",
        ],
        counter: "Reverse turning kick with the left leg",
      },
      {
        number: 7,
        attacks: [
          "Step forward into left L-stance, middle section obverse punch",
          "Step forward into left L-stance, middle section obverse punch",
          "Step forward into left L-stance, middle section obverse punch",
        ],
        defences: [
          "Step back into right L-stance, middle outer forearm inward block",
          "Middle outer forearm inward block",
          "Middle outer forearm inward block",
        ],
        counter:
          "Middle section side piercing kick with the left leg, then move the left foot to the right at 45° and execute a high section turning kick with the right leg to the temple (Kihap on turning kick only)",
      },
      {
        number: 8,
        attacks: [
          "Step forward, high section side piercing kick with the right leg",
          "Step forward, high section side piercing kick with the right leg",
          "Step forward, high section side piercing kick with the right leg",
        ],
        defences: [
          "Step back into right walking stance, middle outer forearm inward block",
          "Middle outer forearm inward block",
          "Middle outer forearm inward block",
        ],
        counter: "Jumping side piercing kick with the right leg",
      },
      {
        number: 9,
        attacks: [
          "Step forward, high section turning kick with the right leg",
          "Step forward, high section turning kick with the right leg",
          "Step forward, high section turning kick with the right leg",
        ],
        defences: [
          "Step back into right L-stance, knifehand guarding block",
          "Knifehand guarding block",
          "Knifehand guarding block",
        ],
        counter: "Jumping double turning kick (Kihap on second kick only)",
      },
      {
        number: 10,
        attacks: [
          "Step forward, low section front snap kick with the right leg",
          "Step forward, low section front snap kick with the right leg",
          "Step forward, low section front snap kick with the right leg",
        ],
        defences: [
          "Step back into left walking stance, X-fist low pressing block",
          "X-fist low pressing block",
          "X-fist low pressing block",
        ],
        counter:
          "Jumping double front snap kick with the right leg (Kihap on second kick only)",
      },
    ],
  },
  {
    id: "2-step",
    name: "Two Step Sparring",
    description:
      "Pre-arranged sparring for intermediate students. The attacker performs two consecutive hand and foot techniques; the defender blocks both and counters. The attacker must place each stepping foot beside the defender's foot in this order: 1st outside, 2nd inside, 3rd inside.",
    rank: "6th Gup (Green Belt) and above",
    attackerStart: "Parallel ready stance",
    defenderStart: "Parallel ready stance",
    sequences: [
      {
        number: 1,
        attacks: [
          "Step forward into right walking stance, middle section obverse punch",
          "Front snap kick with the left leg",
        ],
        defences: [
          "Step back into left walking stance, middle inner forearm block",
          "Change to right walking stance, outer forearm low block",
        ],
        counter: "Front snap kick with the left leg",
      },
      {
        number: 2,
        attacks: [
          "Front snap kick with the right leg",
          "Middle section turning kick with the left leg",
        ],
        defences: [
          "Step back into left walking stance, X-fist low pressing block",
          "Move the left foot to the side at 45° into sitting stance, knifehand high block with the right arm",
        ],
        counter:
          "Middle section obverse punch with the left arm (Kihap — this is the counterattack)",
      },
      {
        number: 3,
        attacks: [
          "Middle section side piercing kick with the right leg, step down beside the left foot",
          "Back piercing kick with the left leg",
        ],
        defences: [
          "Step back into left L-stance, outer forearm low block with the right arm",
          "Move the left foot to the side at 90° into sitting stance, outer forearm outward block",
        ],
        counter: "Sitting stance, knifehand strike to the neck with the right arm",
      },
      {
        number: 4,
        attacks: [
          "Step forward into right walking stance, middle section obverse punch",
          "Side piercing kick with the left leg",
        ],
        defences: [
          "Slide back into right rear foot stance, forearm-guarding block",
          "Move the left foot to the side at 45° into left leg bending ready stance A, forearm-guarding block",
        ],
        counter: "Side piercing kick with the right leg",
      },
      {
        number: 5,
        attacks: [
          "Middle section turning kick with the right leg",
          "Step down into left L-stance, knifehand strike with the right arm",
        ],
        defences: [
          "Left L-stance, outer forearm inward block with the right arm",
          "Slide the left foot backward into left L-stance, knifehand guarding block",
        ],
        counter: "Turning kick with the right leg to the temple",
      },
      {
        number: 6,
        attacks: [
          "Step forward into left L-stance, knifehand strike with the right arm",
          "Middle section turning kick with the left leg",
        ],
        defences: [
          "Left L-stance, knifehand guarding block",
          "Move the right foot directly behind the left foot (about shoulder width), then cresting kick with the left leg to block the turning kick",
        ],
        counter: "Jumping back piercing kick with the right leg",
      },
      {
        number: 7,
        attacks: [
          "Step forward into right walking stance, flat fingertip thrust",
          "Twisting kick with the left leg",
        ],
        defences: [
          "Right walking stance, reverse knifehand block",
          "Slide back into right rear foot stance, forearm-guarding block",
        ],
        counter:
          "Jump into right X-stance, backfist strike to the philtrum",
      },
      {
        number: 8,
        attacks: [
          "Step forward into left L-stance, middle section obverse punch",
          "Side piercing kick with the left leg",
        ],
        defences: [
          "Left L-stance, upward palm block",
          "Move the right foot back into right L-stance, outer forearm low block",
        ],
        counter:
          "Reverse hooking kick with the right leg, then jumping front snap kick with the left leg (Kihap on jumping front snap kick)",
      },
      {
        number: 9,
        attacks: [
          "Step forward into right walking stance, twin vertical punch",
          "Front snap kick with the left leg",
        ],
        defences: [
          "Step back into left walking stance, high wedging block",
          "Move the left foot back into left L-stance, double forearm low pushing block",
        ],
        counter: "High section side piercing kick with the right leg",
      },
      {
        number: 10,
        attacks: [
          "Turning kick with the right leg",
          "Jumping side piercing kick with the same (right) foot",
        ],
        defences: [
          "Left L-stance, outer forearm inward block",
          "Slide back into right rear foot stance, forearm-guarding block",
        ],
        counter: "Jumping turning kick with the right leg",
      },
    ],
  },
];

export function getSparringByType(type: string): SparringDefinition | undefined {
  return sparringTypes.find((s) => s.id === type);
}

export function getSparringSequence(
  type: string,
  number: number
): { sparring: SparringDefinition; sequence: SparringSequence } | undefined {
  const sparring = getSparringByType(type);
  if (!sparring) return undefined;

  const sequence = sparring.sequences.find((s) => s.number === number);
  if (!sequence) return undefined;

  return { sparring, sequence };
}

export function getSequenceSummary(
  sparring: SparringDefinition,
  sequence: SparringSequence
): string {
  if (sparring.fixedAttack) {
    return sequence.defences[0] ?? sequence.counter;
  }

  return sequence.attacks.join(" · ");
}
