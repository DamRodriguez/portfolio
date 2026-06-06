"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import useBreakpoint from "@/hooks/useBreakpoint";
import { removeHash } from "@/utils/removeHash";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import ProjectItem, { ProjectItemData } from "./ProjectItem";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const t = useTranslations("projectsSection");
  const spotifyDemoVideo = "/videos/projects/spotify-mobile/spotify-mobile.mp4";

  // Primero se cargan los textos del proyecto en messages (es - en) y luego con la clave del nombre se completa el objeto.

  const projectsData: ProjectItemData[] = [
    {
      translationKey: "spotifyMobile",
      button: {
        type: "repository",
        link: config.repositories.spotifyMobile,
      },
      imageSource: {
        type: "mobile",
        images: [
          "/images/projects/spotify-mobile/image1.webp",
          "/images/projects/spotify-mobile/image2.webp",
          "/images/projects/spotify-mobile/image3.webp",
          "/images/projects/spotify-mobile/image4.webp",
        ],
      },
      demoVideo: spotifyDemoVideo,
    },
    {
      translationKey: "lopezPropiedades",
      button: {
        type: "site",
        link: config.projects.lopezPropiedades,
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/lopez-propiedades/rectangular.webp",
          vertical: "/images/projects/lopez-propiedades/vertical.webp",
          square: "/images/projects/lopez-propiedades/square.webp",
          horizontal: "/images/projects/lopez-propiedades/horizontal.webp",
        },
      },
    },
    {
      translationKey: "vanicracia",
      button: {
        type: "site",
        link: config.projects.vanicracia,
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/vanicracia/rectangular.webp",
          vertical: "/images/projects/vanicracia/vertical.webp",
          square: "/images/projects/vanicracia/square.webp",
          horizontal: "/images/projects/vanicracia/horizontal.webp",
        },
      },
    },
    {
      translationKey: "alfombrasTauro",
      button: {
        type: "site",
        link: config.projects.alfombrasTauro,
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/alfombras-tauro/rectangular.webp",
          vertical: "/images/projects/alfombras-tauro/vertical.webp",
          square: "/images/projects/alfombras-tauro/square.webp",
          horizontal: "/images/projects/alfombras-tauro/horizontal.webp",
        },
      },
    },
    {
      translationKey: "dondeSalgo",
      button: {
        type: "inDevelopment",
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/donde-salgo/rectangular.webp",
          vertical: "/images/projects/donde-salgo/vertical.webp",
          square: "/images/projects/donde-salgo/square.webp",
          horizontal: "/images/projects/donde-salgo/horizontal.webp",
        },
      },
    },
  ];

  const isMobile = useBreakpoint(config.breakpoints.xl);
  const topPosition = isMobile ? "top top+=90" : "top top+=70";

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const contents = gsap.utils.toArray<HTMLElement>(".project-card-content");

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        ScrollTrigger.create({
          trigger: card,
          start: topPosition,
          end: isLast ? "+=70" : undefined,
          pin: true,
          pinSpacing: false,
        });

        if (index > 0) {
          gsap.from(card, {
            scale: 1.15,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center center",
              scrub: 2.5,
            },
          });
          gsap.to(contents[index - 1], {
            opacity: 0.3,
            scale: 0.85,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center center",
              scrub: 2.5,
            },
          });
        }
      });
    },
    { scope: containerRef, dependencies: [isMobile], revertOnUpdate: true },
  );

  return (
    <SpaceX
      id={removeHash(routes.projects)}
      className="w-full flex flex-col gap-[1rem] xl:gap-0"
    >
      <MotionSlide className="xl:flex xl:gap-[5rem]">
        <div className="xl:w-[45%]" />
        <h2 className="project-title-gsap text-black dark:text-soft-white text-2xl xl:text-3xl font-fira-code xl:w-full">
          {t("title")}
        </h2>
      </MotionSlide>

      <div ref={containerRef} className="projects-stack">
        {projectsData.map((project, index) => {
          const isLastProject = index === projectsData.length - 1;
          const isFirstProject = index === 0;

          return (
            <div
              key={index}
              className={clsx(
                "project-card relative flex items-center bg-white-bone dark:bg-black",
                {
                  "pt-[2rem] pb-[2rem]": !isLastProject,
                  "pt-[2rem]": isLastProject,
                },
              )}
              style={{
                zIndex: index + 1,
              }}
            >
              <div
                className={clsx(
                  "pointer-events-none absolute left-0 top-[-3.5rem] h-[4rem] xl:top-[-2.5rem] xl:h-[3rem] z-20 w-full bg-gradient-to-t from-white-bone via-white-bone dark:from-black dark:via-black to-transparent",
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
                  {},
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
