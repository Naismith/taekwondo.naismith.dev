import { createFileRoute } from "@tanstack/react-router";

import { Belt, colouredBeltLadder } from "~/components/belt";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="page-shell">
      <div className="content-column relative flex flex-col gap-6 py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />
        <header className="relative mb-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Belt Progression
          </h1>
          <p className="mt-1 text-sm text-white/50">
            ITF coloured belt ranks from 10th to 1st Gup, through to Black Belt.
          </p>
        </header>
        <div className="relative flex flex-col gap-4">
          {colouredBeltLadder.map((style, index) => (
            <Belt key={index} {...style} />
          ))}
        </div>
      </div>
    </div>
  );
}
