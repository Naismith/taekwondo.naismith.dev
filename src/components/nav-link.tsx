import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import { cn } from "~/utils";

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "text-sm text-white transition-colors hover:text-primary [&.active]:text-primary",
        className
      )}
    />
  );
}
