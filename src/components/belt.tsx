import { cn } from "~/utils";

export const beltColors = {
  white: "bg-belt-white",
  yellow: "bg-belt-yellow",
  green: "bg-belt-green",
  blue: "bg-belt-blue",
  red: "bg-belt-red",
  black: "bg-belt-black",
} as const;

type BeltStyle = {
  color: string;
  stripeColor?: string;
  dan?: number;
};

const gupBeltByNumber: Record<number, BeltStyle> = {
  10: { color: beltColors.white },
  9: { color: beltColors.white, stripeColor: beltColors.yellow },
  8: { color: beltColors.yellow },
  7: { color: beltColors.yellow, stripeColor: beltColors.green },
  6: { color: beltColors.green },
  5: { color: beltColors.green, stripeColor: beltColors.blue },
  4: { color: beltColors.blue },
  3: { color: beltColors.blue, stripeColor: beltColors.red },
  2: { color: beltColors.red },
  1: { color: beltColors.red, stripeColor: beltColors.black },
};

export const colouredBeltLadder: BeltStyle[] = [
  ...([10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const).map((gup) => gupBeltByNumber[gup]),
  { color: beltColors.black },
];

export function rankToBeltStyle(rank: string): BeltStyle {
  const danMatch = rank.match(/(\d+)(?:st|nd|rd|th) Degree Black Belt/);
  if (danMatch) {
    return { color: beltColors.black, dan: Number.parseInt(danMatch[1], 10) };
  }

  const gupMatch = rank.match(/(\d+)(?:st|nd|rd|th) Gup/);
  if (gupMatch) {
    return gupBeltByNumber[Number.parseInt(gupMatch[1], 10)] ?? {
      color: beltColors.white,
    };
  }

  return { color: beltColors.white };
}

type BeltProps = BeltStyle & {
  className?: string;
};

function BeltStripe({ color }: { color: string }) {
  return (
    <div
      className={cn(color, "absolute inset-x-0 top-1/2 h-[35%] -translate-y-1/2")}
    />
  );
}

export function MiniBelt({ color, stripeColor, dan, className }: BeltProps) {
  return (
    <div
      className={cn(
        color,
        "relative h-2 w-10 shrink-0 rounded-xs inset-shadow-sm inset-shadow-white/30 ring-1 ring-white/10",
        className
      )}
      aria-hidden
    >
      {stripeColor && <BeltStripe color={stripeColor} />}
      {dan !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center gap-px px-0.5">
          {Array.from({ length: dan }, (_, index) => (
            <div
              key={index}
              className="h-[55%] min-w-0 flex-1 rounded-px bg-white/90"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Belt({ color, stripeColor }: BeltProps) {
  return (
    <div
      className={cn(
        color,
        "even:self-end even:rounded-s-sm even:translate-x-[2%]",
        "odd:self-start odd:rounded-r-sm odd:translate-x-[-2%]",
        "hover:scale-105 transition-all duration-300",
        "inset-shadow-sm inset-shadow-white/50 h-1/16 w-[90%] inline-flex items-center justify-center relative"
      )}
    >
      {stripeColor && (
        <div className={cn(stripeColor, "absolute h-[40%] w-full")} />
      )}
    </div>
  );
}
