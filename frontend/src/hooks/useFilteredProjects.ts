import { ProjectCategory } from "@/components/sections/projects-section/ProjectItem";
import { projectsData } from "@/data/projectsData";
import { useTranslations } from "next-intl";

export type AllProjectFilters = ProjectCategory | "all";

export function useFilteredProjects(activeFilter: AllProjectFilters) {
  const t = useTranslations("projectsSection");

  return projectsData.filter((project) => {
    if (activeFilter === "all") return true;

    const categories = t(`data.${project.translationKey}.category`);

    return categories.includes(activeFilter);
  });
}
