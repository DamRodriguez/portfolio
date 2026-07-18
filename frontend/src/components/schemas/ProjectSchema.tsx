import { useTranslations } from "next-intl";
import { ProjectItemData } from "@/components/sections/projects-section/ProjectItem";
import { siteConfig } from "@/config/site";

export type ProjectSchemaProps = {
  project: ProjectItemData;
  locale: string;
};

export default function ProjectSchema({ project, locale }: ProjectSchemaProps) {
  const t = useTranslations("projectsSection");

  // Get translated title and description
  const title = t(`data.${project.translationKey}.title`, { locale });
  const description = t(`data.${project.translationKey}.description`, {
    locale,
  });

  // Determine application category based on project type or tech
  const applicationCategory = "WebApplication";

  // Get main URL (prefer live site, fallback to repo)
  const getProjectUrl = (): string => {
    if (project.button.type === "site" && project.button.link) {
      return project.button.link;
    }
    if (project.button.type === "repository" && project.button.link) {
      return project.button.link;
    }
    // For inDevelopment or fallback, use anchor link to projects page
    return `${siteConfig.url}/${locale}/proyectos#${project.translationKey}`;
  };
  const url = getProjectUrl();

  // Get screenshots from imageSource
  const getScreenshots = (): string[] => {
    if (project.imageSource.type === "mobile") {
      return [...project.imageSource.images];
    }
    if (project.imageSource.type === "default") {
      const images = project.imageSource.images;
      const result = [
        images.rectangular,
        images.vertical,
        images.square,
        images.horizontal,
      ];
      if (images.extra) {
        return [...result, ...images.extra];
      }
      return result;
    }
    if (project.imageSource.type === "single") {
      return [project.imageSource.image];
    }
    return [];
  };
  const screenshots = getScreenshots();

  // Get video if available
  const video = project.demoVideo
    ? [
        {
          "@type": "VideoObject",
          name: `${title} Demo`,
          description: description,
          contentUrl: project.demoVideo,
          embedUrl: project.demoVideo,
          uploadDate: new Date().toISOString().split("T")[0],
        },
      ]
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    applicationCategory,
    url: url,
    screenshot: screenshots.map((src) => ({
      "@type": "ImageObject",
      contentUrl: src,
    })),
    ...(video && { video }),
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
    operatingSystem: "Web",
    dateCreated: new Date().toISOString().split("T")[0],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
