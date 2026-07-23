import type { ProjectItemData } from "@/components/sections/projects-section/ProjectItem";
import { projectsData } from "@/data/projectsData";

export type CustomComponentMatch =
  | {
      type: "ProjectCard";
      projectKey: string;
      project: ProjectItemData | undefined;
    }
  | {
      type: "ContactCard";
    }
  | {
      type: "RedirectAllProjectsCard";
    };

export function extractCustomComponents(text: string): CustomComponentMatch[] {
  if (!text.includes("__CUSTOM_COMPONENT__")) return [];

  const regex = /__CUSTOM_COMPONENT__\s*:\s*([A-Za-z0-9]+)(?::([A-Za-z0-9]+))?/g;
  const components: CustomComponentMatch[] = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const componentType = match[1];
    const componentKey = match[2];

    if (componentType === "ProjectCard") {
      const project = componentKey
        ? projectsData.find((item) => item.translationKey === componentKey)
        : undefined;

      if (project) {
        components.push({
          type: "ProjectCard",
          projectKey: componentKey || "",
          project,
        });
      }
    } else if (componentType === "ContactCard") {
      components.push({
        type: "ContactCard",
      });
    } else if (componentType === "RedirectAllProjectsCard") {
      components.push({
        type: "RedirectAllProjectsCard",
      });
    }
  }

  return components;
}

// Mantener compatibilidad hacia atrás
export function extractCustomComponent(text: string): CustomComponentMatch | null {
  const components = extractCustomComponents(text);
  return components[0] ?? null;
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
