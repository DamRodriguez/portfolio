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

  return (
    <>
      <div
        id={removeHash(projectsRoutes[data.translationKey])}
        className={clsx("flex flex-col-reverse items-center xl:flex-row gap-[2rem] xl:gap-[5rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]",
          {
            "xl:flex-row-reverse": props.odd,
          }
        )}>
        <div className="flex flex-col justify-center gap-[2.5rem] xl:gap-[4rem] xl:w-[45%]">
          <div className="flex flex-col gap-[1.5rem] xl:gap-[2rem] ">
            <MotionSlide direction={(props.odd && !isMobile) ? "right" : "left"} >
              <h6 className="text-soft-white text-xl xl:text-2xl">
                {title}
              </h6>
            </MotionSlide>

            <MotionStagger
              duration={0.3}
              className="flex flex-wrap gap-[0.7rem] xl:gap-[1rem]"
            >
              {technologies.map((tech, index) => (
                <ItemHover key={index} small cursorNormal>
                  {tech}
                </ItemHover>
              ))}
            </MotionStagger>
          </div>

          <MotionFade>
            <p className="text-soft-gray text-sm xl:text-lg whitespace-pre-line">
              <RichText
                t={t}
                translationKey={`projectsData.${data.translationKey}.description`}
              />
            </p>
          </MotionFade>

          <ButtonsSection
            button={data.button}
            demoVideo={data.demoVideo}
          />
        </div>

        <ImagesSection
          imageSource={data.imageSource}
          disablePopUp={data.disablePopUp}
          odd={props.odd}
          title={title}
        />
      </div>
    </>
  );
};

export default ProjectItem;