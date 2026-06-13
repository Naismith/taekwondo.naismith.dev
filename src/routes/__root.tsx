import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-10 flex gap-4 p-4 bg-black/80 backdrop-blur-sm">
        <Link
          to="/"
          className="text-white hover:text-primary transition-colors [&.active]:text-primary"
        >
          Home
        </Link>
        <Link
          to="/patterns"
          className="text-white hover:text-primary transition-colors [&.active]:text-primary"
        >
          Patterns
        </Link>
        <Link
          to="/sparring"
          className="text-white hover:text-primary transition-colors [&.active]:text-primary"
        >
          Sparring
        </Link>
        <Link
          to="/theory"
          className="text-white hover:text-primary transition-colors [&.active]:text-primary"
        >
          Theory
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-primary transition-colors [&.active]:text-primary"
        >
          About
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
