import { Outlet, createRootRoute } from "@tanstack/react-router";

import { AppToaster } from "~/components/app-toaster";
import { NavBar } from "~/components/nav-bar";
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
      <NavBar />
      <Outlet />
    </>
  );
}
