"use client";
import { PopUp } from "@/components/pop-up/PopUp";
import ProjectItem, {
  ProjectItemData,
} from "@/components/sections/projects-section/ProjectItem";
import { useState } from "react";
import ProjectCard from "../all-projects/ProjectCard";

type ProjectCardWrapperProps = {
  project: ProjectItemData;
};

export function ProjectCardWrapper({ project }: ProjectCardWrapperProps) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectItemData | null>(null);

  return (
    <>
      <ProjectCard
        project={project}
        onClick={() => setSelectedProject(project)}
        small
      />

      <PopUp
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      >
        <>
          {selectedProject && (
            <ProjectItem
              data={selectedProject}
              lockScroll
              containerClassName="pt-[5rem] xl:pt-0"
            />
          )}
        </>
      </PopUp>
    </>
  );
}
