import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="flex items-center justify-center h-screen bg-black pt-14">
      <p className="text-white text-xl">About Taekwondo</p>
    </div>
  );
}
