"use client";
import ProjectCard from "@/components/all-projects/ProjectCard";
import ProjectItem, {
  ProjectItemData,
} from "@/components/home/sections/projects-section/ProjectItem";
import ResponsiveMotionGrid from "@/components/motion/ResponsiveMotionGrid";
import { PopUp } from "@/components/pop-up/PopUp";
import {
  AllProjectFilters,
  useFilteredProjects,
} from "@/hooks/filter/useFilteredProjects";
import { useState } from "react";

type AllProjectsGridProps = {
  activeFilter: AllProjectFilters;
};

export default function AllProjectsGrid({
  activeFilter,
}: AllProjectsGridProps) {
  const projects = useFilteredProjects(activeFilter);
  const [selectedProject, setSelectedProject] =
    useState<ProjectItemData | null>(null);

  return (
    <>
      <ResponsiveMotionGrid
        items={projects}
        containerKey={activeFilter}
        getItemKey={(project) => `${project.translationKey}-${activeFilter}`}
        renderItem={(project) => (
          <ProjectCard
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        )}
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
