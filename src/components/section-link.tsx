import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "~/utils";

export type SectionLinkProps = {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export function SectionLink({
  to,
  label,
  description,
  icon: Icon,
  active = false,
  onClick,
}: SectionLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-5 rounded-sm bg-white/5 px-6 py-6",
        "ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/15",
        active && "bg-primary/5 ring-primary/40"
      )}
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-sm bg-primary/10 ring-1 ring-primary/20">
        <Icon aria-hidden className="size-6 text-primary" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-2xl font-semibold text-white transition-colors group-hover:text-primary">
          {label}
        </p>
        <p className="mt-1 text-base text-white/50">{description}</p>
      </div>
      <ChevronRight
        aria-hidden
        className="size-6 shrink-0 text-white/30 transition-colors group-hover:text-primary/70"
        strokeWidth={1.5}
      />
    </Link>
  );
}
