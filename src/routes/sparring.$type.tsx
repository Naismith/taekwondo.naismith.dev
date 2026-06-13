import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sparring/$type")({
  component: SparringTypeLayout,
});

function SparringTypeLayout() {
  return <Outlet />;
}
