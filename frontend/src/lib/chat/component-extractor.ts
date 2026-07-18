import type { ProjectItemData } from "@/components/sections/projects-section/ProjectItem";
import { projectsData } from "@/data/projectsData";

export type CustomComponentMatch = {
  type: "ProjectCard";
  projectKey: string;
  project: ProjectItemData | undefined;
} | null;

export function extractCustomComponent(text: string): CustomComponentMatch {
  if (!text.includes("__CUSTOM_COMPONENT__")) return null;

  const match = text.match(
    /__CUSTOM_COMPONENT__\s*:\s*([A-Za-z0-9]+)(?::([A-Za-z0-9]+))?/,
  );

  if (match?.[1] === "ProjectCard") {
    const projectKey = match?.[2];
    const project = projectKey
      ? projectsData.find((item) => item.translationKey === projectKey)
      : undefined;

    if (project) {
      return {
        type: "ProjectCard",
        projectKey: projectKey || "",
        project,
      };
    }
  }

  return null;
}

export function cleanCustomComponentText(text: string): string {
  return text
    .replace(
      /\n?__CUSTOM_COMPONENT__\s*:\s*[A-Za-z0-9]+(?::[A-Za-z0-9]+)?\s*/g,
      "",
    )
    // Limpiar reglas horizontales de markdown (---, ***, ****, etc.) que el LLM pueda agregar
    .replace(/^[\s]*[-*]{3,}[\s]*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
