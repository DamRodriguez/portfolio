"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import { useTranslations } from "next-intl";
import ProjectItem, { ProjectItemData } from "./ProjectItem";
import config from "@/config/config";
import { removeHash } from "@/utils/removeHash";
import { routes } from "@/constants/routes";
import SectionSeparator from "@/components/other/SectionSeparator";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const ProjectsSection = () => {
  const t = useTranslations("projectsSection");
  const spotifyDemoVideo = "/videos/projects/spotify-mobile/spotify-mobile.mp4";

  const projectsData: ProjectItemData[] = [
    {
      translationKey: "spotifyMobile",
      button: {
        type: "repository",
        link: config.repositories.spotifyMobile
      },
      imageSource: {
        type: "mobile",
        images: [
          "/images/projects/spotify-mobile/image1.webp",
          "/images/projects/spotify-mobile/image2.webp",
          "/images/projects/spotify-mobile/image3.webp",
          "/images/projects/spotify-mobile/image4.webp"
        ]
      },
      demoVideo: spotifyDemoVideo
    },
    {
      translationKey: "lopezPropiedades",
      button: {
        type: "site",
        link: config.projects.lopezPropiedades
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/lopez-propiedades/rectangular.webp",
          vertical: "/images/projects/lopez-propiedades/vertical.webp",
          square: "/images/projects/lopez-propiedades/square.webp",
          horizontal: "/images/projects/lopez-propiedades/horizontal.webp",
        },
      }
    },
    {
      translationKey: "vanicracia",
      button: {
        type: "site",
        link: config.projects.vanicracia
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/vanicracia/rectangular.webp",
          vertical: "/images/projects/vanicracia/vertical.webp",
          square: "/images/projects/vanicracia/square.webp",
          horizontal: "/images/projects/vanicracia/horizontal.webp",
        },
      }
    },
    {
      translationKey: "alfombrasTauro",
      button: {
        type: "site",
        link: config.projects.alfombrasTauro
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: "/images/projects/alfombras-tauro/rectangular.webp",
          vertical: "/images/projects/alfombras-tauro/vertical.webp",
          square: "/images/projects/alfombras-tauro/square.webp",
          horizontal: "/images/projects/alfombras-tauro/horizontal.webp",
        },
      }
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
      }
    },
  ]

  useScrollAnimations({
    animations: {
      ".project-title-gsap": {
        x: 100,
        y: -100,
      },
    },
  })

  return (
    <SpaceX
      id={removeHash(routes.projects)}
      className="w-full flex flex-col gap-[3rem] xl:gap-[4rem]"
    >
      <MotionSlide className="xl:flex xl:gap-[5rem]">
        <div className="xl:w-[45%]" />
        <h2 className="project-title-gsap text-black dark:text-soft-white text-2xl xl:text-3xl font-fira-code xl:w-full">
          {t("title")}
        </h2>
      </MotionSlide>

      <div className="flex flex-col gap-[4rem] xl:gap-[6rem]">
        {projectsData.map((project, index) => (
          <div key={index} className="contents">
            <ProjectItem
              data={project}
              odd={index % 2 !== 0}
            />
            {index !== projectsData.length - 1 && (
              <SectionSeparator />
            )}
          </div>
        ))}
      </div>
    </SpaceX>
  );
};

export default ProjectsSection;