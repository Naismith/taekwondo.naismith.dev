export type TrainingPoint = "A" | "B" | "C" | "D" | "E" | "F";

export type PatternPathStep = {
  index: number;
  position: [number, number, number];
  facing: number;
  text: string;
};

// ITF training area: start at A facing D.
// A bottom-left, B bottom-right, C top-left, D top-right.
// E and F are midpoints on the left and right edges.
export const TRAINING_POINTS: Record<TrainingPoint, [number, number, number]> =
  {
    A: [-1, 0, -1],
    B: [1, 0, -1],
    C: [-1, 0, 1],
    D: [1, 0, 1],
    E: [-1, 0, 0],
    F: [1, 0, 0],
  };

function parseTrainingPoint(value: string): TrainingPoint {
  return value.toUpperCase() as TrainingPoint;
}

function facingAngle(
  position: [number, number, number],
  toward: TrainingPoint
): number {
  const target = TRAINING_POINTS[toward];
  return Math.atan2(target[0] - position[0], target[2] - position[2]);
}

export function buildPatternPath(steps: string[]): PatternPathStep[] {
  let currentPoint: TrainingPoint = "A";
  let currentFacing: TrainingPoint = "D";

  return steps.map((text, index) => {
    const toMatch = text.match(/\bto ([A-F])\b/i);
    const towardMatch = text.match(/\btoward ([A-F])\b/i);

    if (toMatch) {
      currentPoint = parseTrainingPoint(toMatch[1]);
    }
    if (towardMatch) {
      currentFacing = parseTrainingPoint(towardMatch[1]);
    }

    const position = TRAINING_POINTS[currentPoint];
    const facing = facingAngle(position, currentFacing);

    return { index, position, facing, text };
  });
}

export function pathPositions(steps: PatternPathStep[]): [number, number, number][] {
  const start: [number, number, number] = TRAINING_POINTS.A;
  return [start, ...steps.map((step) => step.position)];
}
