import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import ItemHover from "@/components/other/ItemHover";
import { RichText } from "@/components/other/RichText";
import { Messages } from "next-intl";
import { removeHash } from "@/utils/removeHash";
import { projectsRoutes } from "@/constants/projectsRoutes";
import ButtonsSection, { ProjectButton } from "./ButtonsSection";
import ImagesSection, { ImageSource } from "./ImagesSection";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useRef } from "react";

export type ProjectKey = keyof Messages["projectsSection"]["projectsData"];
export type DescriptionKey = `projectsData.${ProjectKey}.description`;

export type ProjectItemData = {
  button: ProjectButton;
  demoVideo?: string;
  imageSource: ImageSource;
  disablePopUp?: boolean;
  translationKey: ProjectKey;
}

type ProjectItemProps = {
  data: ProjectItemData;
  odd?: boolean;
  containerClassName?: string;
}

const ProjectItem = (props: ProjectItemProps) => {
  const data = props.data;
  const t = useTranslations("projectsSection");
  const title = t(`projectsData.${data.translationKey}.title`);
  const isMobile = useIsMobile();
  const technologiesString = t(
    `projectsData.${data.translationKey}.technologies`
  );
  const technologies = technologiesString
    .split(",")
    .map((tech) => tech.trim());

  const itemRef = useRef<HTMLDivElement>(null);

  useScrollAnimations({
    animations: {
      ".project-item-title-gsap": {
        y: -25,
        rotate: 5
      },
      ".project-technologies-gsap": {
        scale: 0.9,
        rotate: -2
      },
      ".project-image-gsap": {
        y: -25,
        scale: 0.9,
        rotateZ: props.odd ? 4 : -4,
        x: props.odd ? -15 : 15,
        borderRadius: isMobile ? 30 : 60,
      },
      ".project-text-gsap": {
        color: "var(--color-black)",
        scale: 0.95,
        x: 15
      },
      ".project-buttons-gsap": {
        rotateY: -50,
        rotate: -3,
        x: -25
      }
    },
    scope: itemRef
  })

  return (
    <div
      ref={itemRef}
      id={removeHash(projectsRoutes[data.translationKey])}
      className={clsx("flex flex-col-reverse items-center xl:flex-row gap-[1.5rem] xl:gap-[5rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]",
        {
          "xl:flex-row-reverse": props.odd,
        }, props.containerClassName
      )}
    >
      <div className="flex flex-col justify-center gap-[2rem] xl:gap-[3rem] xl:w-[45%]">
        <div className="flex flex-col gap-[1.5rem] xl:gap-[2rem] ">
          <MotionSlide direction={(props.odd && !isMobile) ? "right" : "left"}>
            <h6 className="project-item-title-gsap text-soft-white text-xl xl:text-2xl">
              {title}
            </h6>
          </MotionSlide>

          <div className="project-technologies-gsap">
            <MotionStagger
              duration={0.3}
              className="flex flex-wrap gap-[0.7rem] xl:gap-[1rem]"
            >
              {technologies.map((tech, index) => (
                <ItemHover key={index} small cursorNormal className="!border-soft-gray/30">
                  {tech}
                </ItemHover>
              ))}
            </MotionStagger>
          </div>
        </div>

        <MotionFade>
          <p className="project-text-gsap text-soft-gray text-sm xl:text-lg whitespace-pre-line">
            <RichText
              t={t}
              translationKey={`projectsData.${data.translationKey}.description`}
            />
          </p>
        </MotionFade>

        <ButtonsSection
          button={data.button}
          demoVideo={data.demoVideo}
          containerClassName="project-buttons-gsap"
        />
      </div>

      <ImagesSection
        imageSource={data.imageSource}
        disablePopUp={data.disablePopUp}
        odd={props.odd}
        title={title}
      />
    </div>
  );
};

export default ProjectItem;