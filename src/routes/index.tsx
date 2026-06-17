import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="page-shell">
      <div className="content-column relative py-8">
        <div aria-hidden className="ambient-glow" />
        <div aria-hidden className="accent-glow" />

        <header className="relative mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            ITF Taekwon-Do
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Reference for patterns, sparring, theory, and belt progression.
          </p>
        </header>

        <p className="relative text-sm text-white/40">
          Home page coming soon.
        </p>
      </div>
    </div>
  );
}
