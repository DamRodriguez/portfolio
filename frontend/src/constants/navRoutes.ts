import { routes } from "@/constants/routes";
import {
  Blocks,
  BriefcaseBusiness,
  ContactRound,
  FolderCode,
  Star,
  UserSearch,
} from "lucide-react";

export const navRoutes = [
  { href: routes.aboutMe, label: "aboutme", icon: UserSearch },
  { href: routes.services, label: "services", icon: Blocks },
  { href: routes.work, label: "work", icon: BriefcaseBusiness },
  { href: routes.featuredProjects, label: "featuredProjects", icon: Star },
  { href: routes.allProjects, label: "allProjects", icon: FolderCode },
  { href: routes.contact, label: "contact", icon: ContactRound },
] as const;
