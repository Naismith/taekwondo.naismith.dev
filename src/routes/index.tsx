import { createFileRoute } from "@tanstack/react-router";

import { SectionLink } from "~/components/section-link";
import { homeSections } from "~/data/nav";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="page-shell">
      <div className="content-column-wide relative py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Naismith Taekwon-Do Learning
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Reference for patterns, sparring, theory, and belt progression.
          </p>
        </header>

        <nav aria-label="Sections" className="relative">
          <ul className="flex flex-col gap-4">
            {homeSections.map((section) => (
              <li key={section.to}>
                <SectionLink {...section} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
