import { useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { NavLink } from "~/components/nav-link";
import { SectionLink } from "~/components/section-link";
import { getNavSectionForPath, homeSections, navSections } from "~/data/nav";
import { cn } from "~/utils";

function DesktopNav() {
  return (
    <div className="hidden items-center gap-4 md:flex">
      {navSections.map(({ to, label }) => (
        <NavLink key={to} to={to}>
          {label}
        </NavLink>
      ))}
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const currentSection = getNavSectionForPath(pathname);
  const CurrentIcon = currentSection.icon;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full pt-1 md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group flex w-full items-center gap-4 rounded-sm px-4 py-3",
          "bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/15",
          open && "bg-white/10 ring-white/15"
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 ring-1 ring-primary/20">
          <CurrentIcon
            aria-hidden
            className="size-5 text-primary"
            strokeWidth={1.75}
          />
        </span>
        <span className="min-w-0 flex-1 text-left text-base font-semibold text-white">
          {currentSection.label}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 shrink-0 text-white/50 transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          role="listbox"
          aria-label="Pages"
          className={cn(
            "absolute inset-x-0 top-full z-20 mt-2 flex max-h-[calc(100dvh-5rem)] flex-col gap-3 overflow-y-auto p-2 scrollbar-subtle",
            "rounded-sm bg-black ring-1 ring-white/10 backdrop-blur-sm"
          )}
        >
          {homeSections.map((section) => (
            <li key={section.to} role="option" aria-selected={section.to === currentSection.to}>
              <SectionLink
                {...section}
                active={section.to === currentSection.to}
                onClick={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NavBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 inset-x-0 z-10 flex h-14 items-center bg-black/80 px-4 backdrop-blur-sm">
      <DesktopNav />
      {!isHome && <MobileNav />}
    </nav>
  );
}
