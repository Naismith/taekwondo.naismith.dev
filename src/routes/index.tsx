import { createFileRoute } from "@tanstack/react-router";

import { cn } from "../utils";

const beltColors = [
  "bg-white",
  "bg-yellow-300",
  "bg-green-400",
  "bg-blue-400",
  "bg-red-400",
  "bg-black",
];

const Belt = ({
  color,
  stripeColor,
}: {
  color: string;
  stripeColor?: string;
}) => {
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
        <div className={`${stripeColor} absolute h-[40%] w-full`} />
      )}
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-8 h-screen w-screen bg-black pt-14">
      <Belt color={beltColors[0]} />
      <Belt color={beltColors[0]} stripeColor={beltColors[1]} />
      <Belt color={beltColors[1]} />
      <Belt color={beltColors[1]} stripeColor={beltColors[2]} />
      <Belt color={beltColors[2]} />
      <Belt color={beltColors[2]} stripeColor={beltColors[3]} />
      <Belt color={beltColors[3]} />
      <Belt color={beltColors[3]} stripeColor={beltColors[4]} />
      <Belt color={beltColors[4]} />
      <Belt color={beltColors[4]} stripeColor={beltColors[5]} />
      <Belt color={beltColors[5]} />
    </div>
  );
}
