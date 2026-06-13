import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sparring")({
  component: SparringLayout,
});

function SparringLayout() {
  return <Outlet />;
}
