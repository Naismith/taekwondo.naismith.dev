import { createFileRoute } from "@tanstack/react-router";

import { MiniBelt, rankToBeltStyle } from "~/components/belt";
import {
  techniqueCategories,
  techniques,
  type Technique,
} from "~/data/techniques";
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
import { cn } from "~/utils";

export const Route = createFileRoute("/theory")({
  component: Theory,
});

const sectionNav = [
  { id: "meaning", label: "Meaning" },
  { id: "tenets", label: "Tenets" },
  { id: "oath", label: "Oath" },
  { id: "colours", label: "Belts" },
  { id: "composition", label: "Composition" },
  { id: "theory-of-power", label: "Power" },
  { id: "sine-wave", label: "Sine Wave" },
  { id: "techniques", label: "Stances" },
] as const;

const highlightCardClass =
  "rounded-sm bg-primary/5 px-3 py-2.5 text-sm leading-relaxed text-white/70 ring-1 ring-primary/20";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/80">
      {children}
    </h2>
  );
}

function TheoryList({ section }: { section: TheorySection }) {
  return (
    <section id={section.id}>
      <SectionHeading>{section.title}</SectionHeading>
      <ol className="flex flex-col gap-1.5">
        {section.items.map((item, index) => (
          <li
            key={item.label}
            className="flex gap-3 rounded-sm bg-white/5 px-3 py-2.5 text-sm leading-relaxed transition-colors hover:bg-white/10"
          >
            <span className="w-5 shrink-0 text-right tabular-nums text-primary/50">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-white">
                {item.label}
                {item.korean && (
                  <span className="ml-2 font-normal text-primary/70">
                    {item.korean}
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-white/70">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <li className="rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed transition-colors hover:bg-white/10">
      <p className="font-medium text-white">
        {technique.english}
        <span className="ml-2 font-normal text-primary/70">
          {technique.korean}
        </span>
      </p>
      <p className="mt-1 text-white/70">{technique.definition}</p>
      {technique.details && (
        <p className="mt-2 text-xs text-white/50">{technique.details}</p>
      )}
    </li>
  );
}

function TechniquesSection() {
  return (
    <section id="techniques">
      <SectionHeading>Stances &amp; Ready Stances</SectionHeading>
      <p className={cn(highlightCardClass, "mb-4")}>
        The building blocks of every pattern and sparring sequence — foot
        positions, weight distribution, and typical use.
      </p>

      <div className="flex flex-col gap-6">
        {techniqueCategories.map((group) => {
          const items = techniques.filter(
            (technique) => technique.category === group.id
          );
          return (
            <div key={group.id}>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {items.map((technique) => (
                  <TechniqueCard key={technique.korean} technique={technique} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Theory() {
  return (
    <div className="page-shell">
      <div className="content-column relative">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Taekwon-Do Theory
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Core ITF concepts — meaning, tenets, oath, belt symbolism,
            principles of power, and stances.
          </p>
        </header>

        <nav
          aria-label="Theory sections"
          className="relative mb-8 flex flex-wrap gap-2"
        >
          {sectionNav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-1 text-xs text-white/50 ring-1 ring-white/10 transition-colors hover:text-primary hover:ring-primary/20"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="relative flex flex-col gap-8">
          <section id="meaning">
            <SectionHeading>{taekwondoMeaning.title}</SectionHeading>
            <p className={cn(highlightCardClass, "mb-4")}>
              {taekwondoMeaning.description}
            </p>
            <dl className="flex flex-col gap-2">
              {taekwondoMeaning.parts.map((part) => (
                <div
                  key={part.korean}
                  className="flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/10"
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

          <section id="oath">
            <SectionHeading>{studentOath.title}</SectionHeading>
            <ol className="flex flex-col gap-1.5">
              {studentOath.lines.map((line, index) => (
                <li
                  key={index}
                  className={cn("flex gap-3", highlightCardClass)}
                >
                  <span className="w-5 shrink-0 text-right tabular-nums text-primary/50">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="colours">
            <SectionHeading>Belt Colour Meanings</SectionHeading>
            <ol className="flex flex-col gap-2">
              {beltColours.map((belt) => (
                <li
                  key={belt.rank}
                  className="flex items-start gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm leading-relaxed transition-colors hover:bg-white/10"
                >
                  <MiniBelt
                    {...rankToBeltStyle(belt.rank)}
                    className="mt-1 h-2.5 w-14 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{belt.rank}</p>
                    <p className="text-sm text-white/50">{belt.colour}</p>
                    <p className="mt-1 text-white/70">{belt.meaning}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <TheoryList section={compositionOfTaekwondo} />
          <TheoryList section={theoryOfPower} />

          <section id="sine-wave">
            <SectionHeading>{sineWavePrinciple.title}</SectionHeading>
            <p className={highlightCardClass}>
              {sineWavePrinciple.description}
            </p>
          </section>

          <TechniquesSection />
        </div>
      </div>
    </div>
  );
}
