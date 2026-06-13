import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="page-shell">
      <div className="content-column">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
          About
        </h1>
        <p className="text-sm text-white/50">
          ITF Taekwondo reference — patterns, sparring, and theory for
          serious practitioners.
        </p>
      </div>
    </div>
  );
}
