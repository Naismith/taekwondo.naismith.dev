import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-10 flex h-14 items-center gap-4 px-4 bg-black/80 backdrop-blur-sm">
        <Link
          to="/"
          className="text-sm text-white transition-colors hover:text-primary [&.active]:text-primary"
        >
          Home
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
      </nav>
      <Outlet />
    </>
  );
}
