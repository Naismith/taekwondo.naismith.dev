import { Link, useRouterState } from "@tanstack/react-router";

import { NavLink } from "~/components/nav-link";
import { getNavSectionForPath, navSections } from "~/data/nav";
import { cn } from "~/utils";

function DesktopNav() {
  return (
    <div className="flex items-center gap-4">
      {navSections.map(({ to, label }) => (
        <NavLink key={to} to={to}>
          {label}
        </NavLink>
      ))}
    </div>
  );
}

function MobileBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const currentSection = getNavSectionForPath(pathname);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 md:hidden"
    >
      <div className="mx-auto max-w-md px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <ul className="grid grid-cols-6 rounded-sm bg-black/90 p-1 ring-1 ring-white/10 backdrop-blur-sm">
          {navSections.map((section) => {
            const Icon = section.icon;
            const active = section.to === currentSection.to;

            return (
              <li key={section.to} className="min-w-0">
                <Link
                  to={section.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-w-0 flex-col items-center gap-1 rounded-sm px-1 py-2 text-[10px] font-medium leading-none text-white/45 transition-colors hover:text-white/80",
                    active && "bg-primary/10 text-primary ring-1 ring-primary/20"
                  )}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  <span className="max-w-full truncate">{section.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export function NavBar() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-10 hidden h-14 items-center bg-black/80 px-4 backdrop-blur-sm md:flex">
        <DesktopNav />
      </nav>
      <MobileBottomNav />
    </>
  );
}
