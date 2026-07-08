import { routes } from "@/constants/routes";

export const deskRoutes = [
  { href: routes.aboutMe, label: "aboutme" },
  { href: routes.services, label: "services" },
  { href: routes.work, label: "work" },
  { href: routes.projects, label: "projects" },
  { href: routes.contact, label: "contact" },
] as const;

export type RouteLabel = (typeof deskRoutes)[number]["label"];
