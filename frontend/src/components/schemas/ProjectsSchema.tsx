import { useTranslations } from "next-intl";
import { AllProjectFilters, useFilteredProjects } from "@/hooks/useFilteredProjects";
import { ProjectItemData } from "@/components/sections/projects-section/ProjectItem";
import { siteConfig } from "@/config/site";

export type ProjectsSchemaProps = {
  locale: string; // e.g., 'es' or 'en'
  activeFilter?: AllProjectFilters;
};

export default function ProjectsSchema({ locale, activeFilter }: ProjectsSchemaProps) {
  const t = useTranslations("projectsSection");
  const filter = activeFilter ?? "all";
  const filteredProjects = useFilteredProjects(filter);

  const getProjectUrl = (project: ProjectItemData): string => {
    return `${siteConfig.url}/${locale}/proyectos#${project.translationKey}`;
  };

  const getImageUrl = (project: ProjectItemData): string => {
    if (project.imageSource.type === "mobile") {
      return project.imageSource.images[0] ?? "";
    }
    if (project.imageSource.type === "default") {
      const images = project.imageSource.images;
      return images.rectangular ?? images.vertical ?? images.square ?? images.horizontal ?? "";
    }
    if (project.imageSource.type === "single") {
      return project.imageSource.image;
    }
    return "";
  };

  const items = filteredProjects
    .map((project) => {
      const title = t(`data.${project.translationKey}.title`, { locale });
      const url = getProjectUrl(project);
      const imageUrl = getImageUrl(project);

      if (!imageUrl) {
        return null;
      }

      return {
        "@type": "SoftwareApplication",
        name: title,
        url,
        image: [
          {
            "@type": "ImageObject",
            contentUrl: imageUrl
          }
        ],
        author: {
          "@type": "Person",
          name: "Damian Rodriguez", // TODO: use siteConfig.creator.name
          url: siteConfig.url
        },
        operatingSystem: "Web",
        applicationCategory: "WebApplication"
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}