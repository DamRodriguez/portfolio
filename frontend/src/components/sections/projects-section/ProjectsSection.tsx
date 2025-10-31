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
import SectionSeparator from "@/components/other/SectionSeparator";
import { projectsRoutes } from "@/constants/projectsRoutes";
import splitText from "@/utils/splitText";
import { RichText } from "@/components/other/RichText";
import appInDevImage from "@/assets/images/projects/appInDevelopment.png"
import webAppInDevImage from "@/assets/images/projects/appWebInDevelopment.png"
import tauroImgHorizontal from "@/assets/images/projects/alfombras-tauro/horizontal.png"
import tauroImgRectangular from "@/assets/images/projects/alfombras-tauro/rectangular.png"
import tauroImgSquare from "@/assets/images/projects/alfombras-tauro/square.png"
import tauroImgVertical from "@/assets/images/projects/alfombras-tauro/vertical.png"

const ProjectsSection = () => {
  const t = useTranslations("projectsSection");
  const projectsData: ProjectItemData[] = [
    {
      title: t("projectsData.vanicracia.title"),
      technologies: splitText(t("projectsData.vanicracia.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.vanicracia.description"
        />
      ,
      siteLink: config.projects.vanicracia,
      id: removeHash(projectsRoutes.vanicracia),
      images: {
        rectangular: vanicraciaImgRectangular,
        vertical: vanicraciaImgVertical,
        square: vanicraciaImgSquare,
        horizontal: vanicraciaImgHorizontal,
      },
    },
    {
      title: t("projectsData.alfombrasTauro.title"),
      technologies: splitText(t("projectsData.alfombrasTauro.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.alfombrasTauro.description"
        />
      ,
      siteLink: config.projects.alfombrasTauro,
      id: removeHash(projectsRoutes.alfombrasTauro),
      images: {
        rectangular: tauroImgRectangular,
        vertical: tauroImgVertical,
        square: tauroImgSquare,
        horizontal: tauroImgHorizontal,
      },
    },
    {
      title: t("projectsData.dondeSalgo.title"),
      technologies: splitText(t("projectsData.dondeSalgo.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.dondeSalgo.description"
        />
      ,
      id: removeHash(projectsRoutes.dondeSalgo),
      inDevelopment: true,
      image: appInDevImage
    },
    {
      title: t("projectsData.medicalSpace.title"),
      technologies: splitText(t("projectsData.medicalSpace.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.medicalSpace.description"
        />
      ,
      id: removeHash(projectsRoutes.medicalSpace),
      inDevelopment: true,
      image: webAppInDevImage
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