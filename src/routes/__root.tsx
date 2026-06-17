import { Outlet, createRootRoute } from "@tanstack/react-router";

import { AppToaster } from "~/components/app-toaster";
import { NavLink } from "~/components/nav-link";
import { useAppUpdateCheck } from "~/hooks/use-app-update-check";

export const Route = createRootRoute({
  component: RootLayout,
});

const navItems = [
  { to: "/", label: "Home" },
  { to: "/belts", label: "Belts" },
  { to: "/patterns", label: "Patterns" },
  { to: "/sparring", label: "Sparring" },
  { to: "/theory", label: "Theory" },
  { to: "/glossary", label: "Glossary" },
] as const;

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
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
