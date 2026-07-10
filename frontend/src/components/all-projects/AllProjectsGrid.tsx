"use client";
import ProjectCard from "@/components/all-projects/ProjectCard";
import MotionSlide from "@/components/motion/MotionSlide";
import { PopUp } from "@/components/pop-up/PopUp";
import ProjectItem, {
  ProjectItemData,
} from "@/components/sections/projects-section/ProjectItem";
import {
  AllProjectFilters,
  useFilteredProjects,
} from "@/hooks/useFilteredProjects";
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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[1.5rem] xl:gap-[2rem]">
        {projects.map((project) => (
          <MotionSlide direction="down" key={project.translationKey}>
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </MotionSlide>
        ))}
      </div>
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
