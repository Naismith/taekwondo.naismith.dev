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
  koreanName: string;
  description: string;
  rank: string;
  attackerStart: string;
  defenderStart: string;
  /** Shared attack for every sequence in 3-step sparring. */
  fixedAttack?: string[];
  sequences: SparringSequence[];
};

export const sparringTypes: SparringDefinition[] = [
  {
    id: "3-step",
    name: "Three Step Sparring",
    koreanName: "Sambo Matsogi",
    description:
      "Pre-arranged sparring for beginners. The attacker advances three times with the same technique while the defender steps back, blocks, and counters on the third movement.",
    rank: "9th Gup (Yellow Stripe) and above",
    attackerStart:
      "Left walking stance, obverse low section outer forearm block",
    defenderStart: "Parallel ready stance",
    fixedAttack: [
      "Middle section obverse punch in walking stance",
      "Middle section obverse punch in walking stance",
      "Middle section obverse punch in walking stance",
    ],
    sequences: [
      {
        number: 1,
        attacks: [],
        defences: [
          "Step back with the right leg into walking stance, middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
        ],
        counter: "Middle reverse punch",
      },
      {
        number: 2,
        attacks: [],
        defences: [
          "Step back with the left leg into L-stance, middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
        ],
        counter:
          "Move the rear foot out to the left, bring the right foot across into L-stance, knifehand strike to the neck",
      },
      {
        number: 3,
        attacks: [],
        defences: [
          "Step back with the left leg into L-stance, middle outer forearm inward block",
          "Middle outer forearm inward block",
          "Middle outer forearm inward block",
        ],
        counter:
          "High backfist front strike to the bridge of the nose",
      },
      {
        number: 4,
        attacks: [],
        defences: [
          "Step back with the left leg into L-stance, middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
          "Middle inner forearm block to the outside",
        ],
        counter:
          "Move into sitting stance and execute a double punch to the kidney area",
      },
      {
        number: 5,
        attacks: [],
        defences: [
          "Step back with the right leg into L-stance, middle outer forearm block to the inside",
          "Middle outer forearm block to the inside",
          "Slip the front foot to the outside into sitting stance while blocking",
        ],
        counter:
          "Left outer forearm block and high section punch to the jaw",
      },
      {
        number: 6,
        attacks: [],
        defences: [
          "Step back with the right leg into L-stance, middle knifehand block to the inside",
          "Middle knifehand block to the inside",
          "Slip the front foot out into sitting stance while blocking",
        ],
        counter: "Double punch to the kidney area",
      },
      {
        number: 7,
        attacks: [],
        defences: [
          "Step back with the right leg into L-stance, middle outer forearm block to the inside",
          "Middle outer forearm block to the inside",
          "Slide back at a 45° angle to the right into right L-stance, middle forearm-guarding block",
        ],
        counter:
          "Step forward into middle front snap kick followed by middle double punch",
      },
      {
        number: 8,
        attacks: [],
        defences: [
          "Step back with the left leg into L-stance, palm heel block to the inside",
          "Palm heel block to the inside",
          "Slide back at a 45° angle to the right into left L-stance, middle forearm-guarding block",
        ],
        counter:
          "Middle forearm-guarding block followed by counter attack as directed by instructor",
      },
      {
        number: 9,
        attacks: [],
        defences: [
          "Step back with the right leg into L-stance, inward palm pushing block to the outside",
          "Inward palm pushing block to the outside",
          "Slide out to the side while blocking",
        ],
        counter:
          "Slide back at a 45° angle to the left, rear leg middle turning kick, step behind opponent into left L-stance, high knifehand strike to the back of the neck",
      },
      {
        number: 10,
        attacks: [],
        defences: [
          "Step back with the right leg into L-stance, inside knifehand guarding block",
          "Inside knifehand guarding block",
          "Inside knifehand guarding block",
        ],
        counter:
          "Move the right foot to the left foot, slide back at a 45° angle to the right into right L-stance, spinning back kick followed by reverse knifehand strike to the philtrum",
      },
    ],
  },
  {
    id: "2-step",
    name: "Two Step Sparring",
    koreanName: "Ibo Matsogi",
    description:
      "Pre-arranged sparring for intermediate students. The attacker performs two consecutive hand and foot techniques; the defender blocks both and counters.",
    rank: "6th Gup (Green Belt) and above",
    attackerStart: "Right leg back L-stance, forearm guarding block",
    defenderStart: "Parallel ready stance",
    sequences: [
      {
        number: 1,
        attacks: [
          "Step forward into right walking stance, high section obverse punch",
          "Step forward into left leg low front snap kick",
        ],
        defences: [
          "Step back into left walking stance, forearm rising block",
          "Step back into right walking stance, X-fist pressing block",
        ],
        counter: "Twin vertical punch",
      },
      {
        number: 2,
        attacks: [
          "Step forward into fixed stance, side punch",
          "Step forward into left leg middle section turning kick",
        ],
        defences: [
          "Step back into right L-stance, palm upward block",
          "Step back into left L-stance, waist block",
        ],
        counter:
          "Slide forward into right L-stance, side elbow strike",
      },
      {
        number: 3,
        attacks: [
          "Step forward into right leg middle front snap kick",
          "Step forward into left walking stance, twin vertical punch",
        ],
        defences: [
          "Step back into right walking stance, X-fist pressing block",
          "Step back into left walking stance, outer forearm wedging block",
        ],
        counter:
          "Grab the opponent's shoulders and pull down while executing a right knee kick",
      },
      {
        number: 4,
        attacks: [
          "Step forward into right walking stance, flat fingertip thrust",
          "Step forward into left leg side piercing kick",
        ],
        defences: [
          "Step back into right walking stance, knifehand rising block",
          "Step back into left L-stance, inward palm block",
        ],
        counter:
          "Front kick to the coccyx followed by twin upset punch to the kidneys",
      },
      {
        number: 5,
        attacks: [
          "Step forward into right leg middle front snap kick",
          "Step forward into left walking stance, twin upset punch",
        ],
        defences: [
          "Step back into right walking stance, X-fist pressing block",
          "Step back into left L-stance, outer forearm waist block",
        ],
        counter: "Right leg middle side piercing kick",
      },
      {
        number: 6,
        attacks: [
          "Step forward into right leg back piercing kick",
          "Step forward into left walking stance, high obverse palm strike",
        ],
        defences: [
          "Step back into right L-stance, forearm waist block",
          "Step back into left L-stance, outer forearm waist block",
        ],
        counter:
          "Right leg middle turning kick and left L-stance backfist strike",
      },
      {
        number: 7,
        attacks: [
          "Step forward into right leg high turning kick",
          "Step forward into left walking stance, arc-hand strike to the throat",
        ],
        defences: [
          "Step back into right L-stance, palm inward block",
          "Step back into left L-stance, outer forearm block",
        ],
        counter: "Jumping right knifehand strike",
      },
      {
        number: 8,
        attacks: [
          "Move into right fixed stance, side fist strike",
          "Step forward into left leg middle reverse turning kick",
        ],
        defences: [
          "Step back into right L-stance, knifehand middle block",
          "Slide back into left L-stance, outer forearm block",
        ],
        counter: "Jumping left knifehand strike",
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
