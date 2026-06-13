import { createFileRoute } from "@tanstack/react-router";

import { MiniBelt, rankToBeltStyle } from "~/components/belt";
import {
  beltColours,
  compositionOfTaekwondo,
  sineWavePrinciple,
  studentOath,
  taekwondoMeaning,
  tenets,
  theoryOfPower,
  type TheorySection,
} from "~/data/theory";

export const Route = createFileRoute("/theory")({
  component: Theory,
});

function TheoryList({ section }: { section: TheorySection }) {
  return (
    <section id={section.id} className="mb-10 last:mb-0">
      <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
        {section.title}
      </h2>
      <ol className="flex flex-col gap-2">
        {section.items.map((item) => (
          <li
            key={item.label}
            className="rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed"
          >
            <p className="text-white font-medium">
              {item.label}
              {item.korean && (
                <span className="text-yellow-300/70 font-normal ml-2">
                  {item.korean}
                </span>
              )}
            </p>
            <p className="text-white/60 mt-1">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Theory() {
  return (
    <div className="min-h-screen bg-black pt-14 px-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-1">
          Taekwon-Do Theory
        </h1>
        <p className="text-white/60 text-sm mb-8">
          Core ITF concepts — meaning, tenets, oath, belt symbolism, and
          principles of power.
        </p>

        <section id="meaning" className="mb-10">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            {taekwondoMeaning.title}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {taekwondoMeaning.description}
          </p>
          <dl className="flex flex-col gap-2">
            {taekwondoMeaning.parts.map((part) => (
              <div
                key={part.korean}
                className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm"
              >
                <dt className="text-yellow-300 font-medium w-10 shrink-0">
                  {part.korean}
                </dt>
                <dd className="text-white/70">{part.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <TheoryList section={tenets} />

        <section id="oath" className="mb-10">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            {studentOath.title}
          </h2>
          <ol className="flex flex-col gap-2">
            {studentOath.lines.map((line, index) => (
              <li
                key={index}
                className="flex gap-3 rounded-sm bg-yellow-300/5 ring-1 ring-yellow-300/20 px-4 py-3 text-sm leading-relaxed"
              >
                <span className="text-yellow-300/50 tabular-nums w-5 shrink-0 text-right">
                  {index + 1}
                </span>
                <span className="text-white/80">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="colours" className="mb-10">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            Belt Colour Meanings
          </h2>
          <ol className="flex flex-col gap-2">
            {beltColours.map((belt) => (
              <li
                key={belt.rank}
                className="flex items-start gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed"
              >
                <MiniBelt
                  {...rankToBeltStyle(belt.rank)}
                  className="h-2.5 w-14 mt-1 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-white font-medium">{belt.rank}</p>
                  <p className="text-white/40 text-xs mt-0.5">{belt.colour}</p>
                  <p className="text-white/60 mt-1">{belt.meaning}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <TheoryList section={compositionOfTaekwondo} />
        <TheoryList section={theoryOfPower} />

        <section id="sine-wave" className="mb-10 last:mb-0">
          <h2 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-3">
            {sineWavePrinciple.title}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed rounded-sm bg-white/5 px-4 py-3">
            {sineWavePrinciple.description}
          </p>
        </section>
      </div>
    </div>
  );
}
