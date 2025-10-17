import { routes } from "@/constants/routes";

export const routeItems = [
  { href: routes.aboutMe, label: "aboutme" },
  { href: routes.work, label: "work" },
  { href: routes.projects, label: "projects" },
  { href: routes.contact, label: "contact" },
] as const;
