"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import SecondTitle from "@/components/text/SecondTitle";
import { routes } from "@/constants/routes";
import { projectsData } from "@/data/projectsData";
import { useProjectsScrollAnimation } from "@/hooks/useProjectsScrollAnimation";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import ProjectItem from "./ProjectItem";

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useProjectsScrollAnimation(containerRef);
  const t = useTranslations("projectsSection");

  return (
    <SpaceX
      id={removeHash(routes.projects)}
      className="w-full flex flex-col gap-[1rem] xl:gap-0"
    >
      <MotionSlide className="xl:flex xl:gap-[5rem]">
        <div className="xl:w-[60%]" />
        <SecondTitle
          text={t("title")}
          className="project-title-gsap xl:w-full"
        />
      </MotionSlide>

      <div ref={containerRef} className="projects-stack">
        {projectsData.map((project, index) => {
          const isLastProject = index === projectsData.length - 1;
          const isFirstProject = index === 0;

          return (
            <div
              key={index}
              className={clsx(
                "project-card relative flex items-center bg-white-bone dark:bg-black h-full pt-[1rem] xl:pt-0 ",
              )}
              style={{
                zIndex: index + 1,
              }}
            >
              <div
                className={clsx(
                  "pointer-events-none absolute left-0 top-[-3.5rem] h-[4rem] xl:top-[-1.5rem] xl:h-[2rem] z-20 w-full bg-gradient-to-t from-white-bone via-white-bone dark:from-black dark:via-black to-transparent",
                  {
                    hidden: isFirstProject,
                  },
                )}
              />
              <ProjectItem
                data={project}
                odd={index % 2 !== 0}
                containerClassName={clsx(
                  "overflow-clip project-card-content will-change-transform",
                  {
                    "pt-[2rem] pb-[2rem]": !isLastProject,
                    "pt-[2rem] pb-[0rem]": isLastProject,
                  },
                )}
              />
            </div>
          );
        })}
      </div>
    </SpaceX>
  );
};

export default ProjectsSection;
