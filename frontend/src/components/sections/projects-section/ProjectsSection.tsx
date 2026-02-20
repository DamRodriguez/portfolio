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
import tauroImgHorizontal from "@/assets/images/projects/alfombras-tauro/horizontal.png"
import tauroImgRectangular from "@/assets/images/projects/alfombras-tauro/rectangular.png"
import tauroImgSquare from "@/assets/images/projects/alfombras-tauro/square.png"
import tauroImgVertical from "@/assets/images/projects/alfombras-tauro/vertical.png"
import dondeSalgoImgHorizontal from "@/assets/images/projects/donde-salgo/horizontal.png"
import dondeSalgoImgVertical from "@/assets/images/projects/donde-salgo/vertical.png"
import dondeSalgoImgRectangular from "@/assets/images/projects/donde-salgo/rectangular.png"
import dondeSalgoImgSquare from "@/assets/images/projects/donde-salgo/square.png"
import spotifyImg1 from "@/assets/images/projects/spotify-mobile/image1.jpeg"
import spotifyImg2 from "@/assets/images/projects/spotify-mobile/image2.jpeg"
import spotifyImg3 from "@/assets/images/projects/spotify-mobile/image3.jpeg"
import spotifyImg4 from "@/assets/images/projects/spotify-mobile/image4.jpeg"

const spotifyMobileVideo = "/portfolio/videos/projects/spotify-mobile/spotify-mobile.mp4";

const ProjectsSection = () => {
  const t = useTranslations("projectsSection");
  const projectsData: ProjectItemData[] = [
    {
      id: removeHash(projectsRoutes.spotifyMobile),
      title: t("projectsData.spotifyMobile.title"),
      technologies: splitText(t("projectsData.spotifyMobile.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.spotifyMobile.description"
        />
      ,
      button: {
        type: "repository",
        link: config.repositories.spotifyMobile
      },
      imageSource: {
        type: "mobile",
        images: [spotifyImg1, spotifyImg2, spotifyImg3, spotifyImg4]
      },
      demoVideo: spotifyMobileVideo
    },
    {
      id: removeHash(projectsRoutes.vanicracia),
      title: t("projectsData.vanicracia.title"),
      technologies: splitText(t("projectsData.vanicracia.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.vanicracia.description"
        />
      ,
      button: {
        type: "site",
        link: config.projects.vanicracia
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: vanicraciaImgRectangular,
          vertical: vanicraciaImgVertical,
          square: vanicraciaImgSquare,
          horizontal: vanicraciaImgHorizontal,
        },
      }
    },
    {
      id: removeHash(projectsRoutes.alfombrasTauro),
      title: t("projectsData.alfombrasTauro.title"),
      technologies: splitText(t("projectsData.alfombrasTauro.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.alfombrasTauro.description"
        />
      ,
      button: {
        type: "site",
        link: config.projects.alfombrasTauro
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: tauroImgRectangular,
          vertical: tauroImgVertical,
          square: tauroImgSquare,
          horizontal: tauroImgHorizontal,
        },
      }
    },
    {
      id: removeHash(projectsRoutes.dondeSalgo),
      title: t("projectsData.dondeSalgo.title"),
      technologies: splitText(t("projectsData.dondeSalgo.technologies")),
      description:
        <RichText
          t={t}
          translationKey="projectsData.dondeSalgo.description"
        />
      ,
      button: {
        type: "inDevelopment",
      },
      imageSource: {
        type: "default",
        images: {
          rectangular: dondeSalgoImgRectangular,
          vertical: dondeSalgoImgVertical,
          square: dondeSalgoImgSquare,
          horizontal: dondeSalgoImgHorizontal,
        },
      }
    },
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