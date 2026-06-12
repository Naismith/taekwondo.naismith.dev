import { createFileRoute } from "@tanstack/react-router";

import { Belt, colouredBeltLadder } from "../components/belt";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-8 h-screen w-screen bg-black pt-14">
      {colouredBeltLadder.map((style, index) => (
        <Belt key={index} {...style} />
      ))}
    </div>
  );
}
