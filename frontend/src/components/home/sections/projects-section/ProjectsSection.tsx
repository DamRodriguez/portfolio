"use client";
import SpaceX from "@/components/layout/SpaceX";
import SecondTitle from "@/components/text/SecondTitle";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import { routes } from "@/constants/routes";
import { projectsData } from "@/data/projectsData";
import { useProjectsScrollAnimation } from "@/hooks/gsap/useProjectsScrollAnimation";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import ProjectItem from "./ProjectItem";

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useProjectsScrollAnimation(containerRef);
  const t = useTranslations("projectsSection");

  useScrollAnimations({
    animations: {
      ".projects-section-title": {
        direction: "bottom",
        from: {
          opacity: 0,
          x: -25,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
      ".projects-section-item": {
        scrollTrigger: {
          start: "top center+=200",
          end: "top center",
          scrub: 2,
        },
        individual: true,
        from: {
          y: 25,
          opacity: 0,
        },
        to: {
          y: 0,
          opacity: 1,
        },
      },
      ".projects-section-button": {
        direction: "bottom",
        from: {
          scale: 0.9,
          opacity: 0,
        },
        to: {
          scale: 1,
          opacity: 1,
        },
      },
    },
  });

  return (
    <SpaceX
      id={removeHash(routes.projects)}
      className="w-full flex flex-col gap-[1rem] xl:gap-0"
    >
      <div className="xl:flex xl:gap-[5rem]">
        <div className="xl:w-[60%]" />
        <SecondTitle
          text={t("title")}
          className="projects-section-title xl:w-full"
        />
      </div>

      <div className="flex flex-col gap-[2.5rem] xl:gap-[6rem]">
        <div ref={containerRef} className="projects-stack">
          {projectsData.slice(0, 5).map((project, index) => {
            const isLastProject = index === projectsData.length - 1;
            const isFirstProject = index === 0;

            return (
              <div
                key={index}
                className={clsx(
                  "project-card relative flex items-center bg-white-bone dark:bg-black h-full pt-[1rem] xl:pt-0",
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
                    "overflow-y-clip project-card-content will-change-transform transform-gpu",
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
        <div className="z-10 w-fit mx-auto projects-section-button">
          <ButtonWithArrow
            text={t("buttons.allProjects")}
            routerPath={routes.allProjects}
          />
        </div>
      </div>
    </SpaceX>
  );
};

export default ProjectsSection;
