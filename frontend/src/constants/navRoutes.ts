import { routes } from "@/constants/routes";

export const navRoutes = [
  { href: routes.aboutMe, label: "aboutme" },
  { href: routes.services, label: "services" },
  { href: routes.work, label: "work" },
  { href: routes.featuredProjects, label: "featuredProjects" },
  { href: routes.allProjects, label: "allProjects" },
  { href: routes.contact, label: "contact" },
] as const;
