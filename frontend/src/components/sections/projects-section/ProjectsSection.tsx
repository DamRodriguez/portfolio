"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import { useTranslations } from "next-intl";
import ProjectItem, { ProjectItemData } from "./ProjectItem";
import config from "@/config/config";
import { removeHash } from "@/utils/removeHash";
import { routes } from "@/constants/routes";
import vanicraciaImgRectangular from "@/assets/images/projects/vanicracia/rectangular.png"
import vanicraciaImgVertical from "@/assets/images/projects/vanicracia/vertical.png"
import vanicraciaImgSquare from "@/assets/images/projects/vanicracia/square.png"
import vanicraciaImgHorizontal from "@/assets/images/projects/vanicracia/horizontal.png"
import bgTest from "@/assets/images/bg-test.png"
import SectionSeparator from "@/components/other/SectionSeparator";
import { projectsRoutes } from "@/constants/projectsRoutes";

const ProjectsSection = () => {
  const t = useTranslations("projectsSection")
  const projectsData: ProjectItemData[] = [
    {
      title: t("projectsData.vanicracia.title"),
      technologies: t("projectsData.vanicracia.technologies")
        .split(",")
        .map((tech) => tech.trim()),
      description: t.rich("projectsData.vanicracia.description", {
        strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
      }),
      siteLink: config.projects.vanicracia,
      images: {
        rectangular: vanicraciaImgRectangular,
        vertical: vanicraciaImgVertical,
        square: vanicraciaImgSquare,
        horizontal: vanicraciaImgHorizontal,
      },
      id: removeHash(projectsRoutes.vanicracia),
    },
    {
      title: t("projectsData.alfombrasTauro.title"),
      technologies: t("projectsData.alfombrasTauro.technologies")
        .split(",")
        .map((tech) => tech.trim()),
      description: t.rich("projectsData.alfombrasTauro.description", {
        strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
      }),
      siteLink: config.projects.alfombrasTauro,
      images: {
        rectangular: bgTest,
        vertical: bgTest,
        square: bgTest,
        horizontal: bgTest,
      },
      id: removeHash(projectsRoutes.alfombrasTauro),
    }
  ]

  return (
    <SpaceX
      id={removeHash(routes.projects)}
      className="w-full flex flex-col gap-[3rem] xl:gap-[4rem]"
    >
      <MotionSlide className="xl:flex xl:gap-[5rem]">
        <div className="xl:w-[45%]" />
        <h3 className="text-soft-white text-xl xl:text-2xl font-fira-code xl:w-full">
          {t("title")}
        </h3>
      </MotionSlide>

      <div className="flex flex-col gap-[4rem] xl:gap-[6rem]">
        {projectsData.map((project, index) => (
          <div key={index} className="contents">
            <ProjectItem
              data={project}
              odd={index % 2 !== 0}
            />
            {index !== projectsData.length - 1 && (<SectionSeparator />)}
          </div>
        ))}
      </div>
    </SpaceX>
  );
};

export default ProjectsSection;