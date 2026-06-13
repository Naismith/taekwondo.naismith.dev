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
    <section id={section.id} className="mb-8 last:mb-0">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
        {section.title}
      </h2>
      <ol className="flex flex-col gap-2">
        {section.items.map((item) => (
          <li
            key={item.label}
            className="rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed"
          >
            <p className="font-medium text-white">
              {item.label}
              {item.korean && (
                <span className="ml-2 font-normal text-primary/70">
                  {item.korean}
                </span>
              )}
            </p>
            <p className="mt-1 text-white/70">{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Theory() {
  return (
    <div className="page-shell">
      <div className="content-column">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
          Taekwon-Do Theory
        </h1>
        <p className="mb-8 text-sm text-white/50">
          Core ITF concepts — meaning, tenets, oath, belt symbolism, and
          principles of power.
        </p>

        <section id="meaning" className="mb-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
            {taekwondoMeaning.title}
          </h2>
          <p className="mb-4 rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20">
            {taekwondoMeaning.description}
          </p>
          <dl className="flex flex-col gap-2">
            {taekwondoMeaning.parts.map((part) => (
              <div
                key={part.korean}
                className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm"
              >
                <dt className="w-10 shrink-0 font-medium text-primary">
                  {part.korean}
                </dt>
                <dd className="text-white/70">{part.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <TheoryList section={tenets} />

        <section id="oath" className="mb-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
            {studentOath.title}
          </h2>
          <ol className="flex flex-col gap-1.5">
            {studentOath.lines.map((line, index) => (
              <li
                key={index}
                className="flex gap-3 rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed ring-1 ring-primary/20"
              >
                <span className="w-5 shrink-0 text-right tabular-nums text-primary/50">
                  {index + 1}
                </span>
                <span className="text-white/70">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="colours" className="mb-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
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
                  className="mt-1 h-2.5 w-14 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-white">{belt.rank}</p>
                  <p className="mt-0.5 text-xs text-white/40">{belt.colour}</p>
                  <p className="mt-1 text-white/70">{belt.meaning}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <TheoryList section={compositionOfTaekwondo} />
        <TheoryList section={theoryOfPower} />

        <section id="sine-wave" className="mb-8 last:mb-0">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
            {sineWavePrinciple.title}
          </h2>
          <p className="rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
            {sineWavePrinciple.description}
          </p>
        </section>
      </div>
    </div>
  );
}
