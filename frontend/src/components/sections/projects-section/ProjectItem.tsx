import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import CustomButton from "@/components/ui/buttons/CustomButton";
import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { StaticImageData } from "next/image";
import ProjectImage from "./ProjectImage";
import { ArrowIcon, PlayIcon } from "@/components/icons/buttons";
import { VideoPopUp } from "@/components/other/VideoPopUp";
import { useState } from "react";
import ItemHover from "@/components/other/ItemHover";

type ImageSource =
  {
    type: "single";
    image: StaticImageData;
  }
  |
  {
    type: "mobile";
    images: StaticImageData[];
  }
  |
  {
    type: "default";
    images: {
      rectangular: StaticImageData;
      vertical: StaticImageData;
      square: StaticImageData;
      horizontal: StaticImageData;
    };
  };

type projectButton =
  {
    type: "site";
    link: string;
  }
  |
  {
    type: "repository";
    link: string;
  }
  |
  {
    type: "inDevelopment"
  }

export type ProjectItemData = {
  id: string;
  title: string;
  technologies: string[];
  button: projectButton;
  demoVideo?: string;
  description: React.ReactNode;
  imageSource: ImageSource;
  disablePopUp?: boolean;
}

type ProjectItemProps = {
  data: ProjectItemData;
  odd?: boolean;
}

const ProjectItem = (props: ProjectItemProps) => {
  const data = props.data;
  const t = useTranslations("projectsSection.buttons");
  const isMobile = useIsMobile();
  const [demoVideo, setDemoVideo] = useState<string>("");

  return (
    <>
      <div
        id={data.id}
        className={clsx("flex flex-col-reverse items-center xl:flex-row gap-[2rem] xl:gap-[5rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]",
          {
            "xl:flex-row-reverse": props.odd,
          }
        )}>
        <div className="flex flex-col justify-center gap-[2.5rem] xl:gap-[4rem] xl:w-[45%]">
          <div className="flex flex-col gap-[1.5rem] xl:gap-[2rem] ">
            <MotionSlide direction={(props.odd && !isMobile) ? "right" : "left"} >
              <h6 className="text-soft-white text-xl xl:text-2xl">
                {data.title}
              </h6>
            </MotionSlide>

            <MotionStagger
              duration={0.3}
              className="flex flex-wrap gap-[0.7rem] xl:gap-[1rem]"
            >
              {data.technologies.map((tech, index) => (
                <ItemHover key={index} small cursorNormal>
                  {tech}
                </ItemHover>
              ))}
            </MotionStagger>
          </div>

          <MotionFade>
            <p className="text-soft-gray text-sm xl:text-lg whitespace-pre-line">
              {data.description}
            </p>
          </MotionFade>

          <div className="flex flex-col gap-[1rem] xl:gap-[1.5rem] ">
            {data.button.type === "site" && (
              <MotionFade>
                <CustomButton
                  text={t("visitSite")}
                  icon={ArrowIcon}
                  variant={{
                    type: "link",
                    href: data.button.link
                  }}
                />
              </MotionFade>
            )}
            {data.button.type === "repository" && (
              <MotionFade>
                <CustomButton
                  text={t("seeCode")}
                  icon={ArrowIcon}
                  variant={{
                    type: "link",
                    href: data.button.link
                  }}
                />
              </MotionFade>
            )}
            {data.button.type === "inDevelopment" && (
              <MotionFade className="w-fit">
                <div className="flex items-center text-soft-gray text-base xl:text-lg border border-soft-gray/80 h-[2.5rem] xl:h-[3rem] px-[1rem] xl:px-[1.5rem] hover:bg-soft-white hover:text-black transition-all duration-400 ease-in-out rounded-full group-hover:rounded-r-full">
                  {t("inDevelopment")}
                </div>
              </MotionFade>
            )}
            {data.demoVideo && (
              <MotionFade>
                <CustomButton
                  text={t("seeDemo")}
                  icon={PlayIcon}
                  variant={{
                    type: "button",
                    onClick: () => { setDemoVideo(data.demoVideo || "") }
                  }}
                />
              </MotionFade>
            )}
          </div>
        </div>

        {data.imageSource.type === "default" && (
          <div className="grid gap-[1rem] xl:gap-[1.5rem] h-full xl:w-full">
            <MotionSlide
              direction="down"
              className={clsx("flex gap-[1rem] xl:gap-[1.5rem] h-[15rem] md:h-[20rem] xl:h-[25rem]",
                {
                  "flex-row-reverse": props.odd
                }
              )}
            >
              <ProjectImage
                image={data.imageSource.images.rectangular}
                alt={`${data.title} rectangular image`}
                disablePopUp={data.disablePopUp}
                className="w-full object-center"
              />
              <ProjectImage
                image={data.imageSource.images.vertical}
                alt={`${data.title} vertical image`}
                disablePopUp={data.disablePopUp}
                className="w-[65%] 2xl:w-[30%]"
              />
            </MotionSlide>

            <MotionSlide
              direction="down"
              className={clsx("flex h-[10rem] md:h-[16rem] xl:h-[20rem] gap-[1rem] xl:gap-[1.5rem]",
                {
                  "flex-row-reverse": props.odd
                }
              )}
            >
              <ProjectImage
                image={data.imageSource.images.square}
                alt={`${data.title} square image`}
                disablePopUp={data.disablePopUp}
                className="w-[60%]"
              />
              <ProjectImage
                image={data.imageSource.images.horizontal}
                alt={`${data.title} horizontal image`}
                disablePopUp={data.disablePopUp}
                className="w-full"
              />
            </MotionSlide>
          </div>
        )}

        {data.imageSource.type === "mobile" && (
          <div className="flex gap-[1rem] xl:grid xl:grid-cols-2 xl:w-[50%] 2xl:flex 2xl:gap-[1.5rem] h-full 2xl:w-full">
            {data.imageSource.images.map((image, index) => (
              <MotionSlide
                direction="down"
                key={index}
              >
                <ProjectImage
                  image={image}
                  alt={`${data.title} mobile image ${index + 1}`}
                  disablePopUp={data.disablePopUp}
                  className="w-full h-full"
                />
              </MotionSlide>
            ))}
          </div>
        )}

        {data.imageSource.type === "single" && (
          <MotionSlide
            direction="down"
            className={clsx("flex w-full h-[15rem] md:h-[20rem] xl:h-[25rem]",
            )}
          >
            <ProjectImage
              image={data.imageSource.image}
              alt={`${data.title} image`}
              disablePopUp={data.disablePopUp}
              className="w-full"
            />
          </MotionSlide>
        )}
      </div>
      <VideoPopUp
        video={demoVideo}
        onClose={() => { setDemoVideo("") }}
      />
    </>
  );
};

export default ProjectItem;