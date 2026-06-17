import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

import { AppToaster } from "~/components/app-toaster";
import { useAppUpdateCheck } from "~/hooks/use-app-update-check";

export const Route = createRootRoute({
  component: RootLayout,
});

function AppUpdateNotifier() {
  useAppUpdateCheck();
  return null;
}

function RootLayout() {
  return (
    <>
      <AppToaster />
      <AppUpdateNotifier />
      <nav className="fixed top-0 inset-x-0 z-10 flex h-14 items-center gap-4 px-4 bg-black/80 backdrop-blur-sm">
        <Link
          to="/"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Home
        </Link>
        <Link
          to="/belts"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Belts
        </Link>
        <Link
          to="/patterns"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Patterns
        </Link>
        <Link
          to="/sparring"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Sparring
        </Link>
        <Link
          to="/theory"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Theory
        </Link>
        <Link
          to="/glossary"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Glossary
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
