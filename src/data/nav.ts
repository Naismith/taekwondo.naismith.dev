import {
  BookOpen,
  BookText,
  Home,
  Medal,
  Shapes,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavSection = {
  to: "/" | "/belts" | "/patterns" | "/sparring" | "/theory" | "/glossary";
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navSections: NavSection[] = [
  {
    to: "/",
    label: "Home",
    description: "Overview and quick links to all sections.",
    icon: Home,
  },
  {
    to: "/belts",
    label: "Belts",
    description: "Coloured belt ranks, grading requirements, and progression.",
    icon: Medal,
  },
  {
    to: "/patterns",
    label: "Patterns",
    description: "ITF tul with step-by-step movement and 3D path views.",
    icon: Shapes,
  },
  {
    to: "/sparring",
    label: "Sparring",
    description: "Two-step and three-step sparring sequences.",
    icon: Swords,
  },
  {
    to: "/theory",
    label: "Theory",
    description: "Tenets, oath, theory of power, stances, and more.",
    icon: BookOpen,
  },
  {
    to: "/glossary",
    label: "Glossary",
    description: "Korean terminology and definitions.",
    icon: BookText,
  },
];

export const homeSections = navSections.filter((section) => section.to !== "/");

export function getNavSectionForPath(pathname: string): NavSection {
  const exact = navSections.find((section) => section.to === pathname);
  if (exact) return exact;

  if (pathname.startsWith("/pattern")) {
    return navSections.find((section) => section.to === "/patterns") ?? navSections[0];
  }

  if (pathname.startsWith("/sparring")) {
    return navSections.find((section) => section.to === "/sparring") ?? navSections[0];
  }

  return navSections[0];
}
