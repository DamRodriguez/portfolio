import InfiniteCarousel from "@/components/carousel/InfiniteCarousel";
import ItemHover from "@/components/other/ItemHover";
import { RichText } from "@/components/other/RichText";
import { projectsRoutes } from "@/constants/projectsRoutes";
import useBreakpoint from "@/hooks/useBreakpoint";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { Messages, useTranslations } from "next-intl";
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
};

type ProjectItemProps = {
  data: ProjectItemData;
  odd?: boolean;
  containerClassName?: string;
};

const ProjectItem = (props: ProjectItemProps) => {
  const data = props.data;
  const t = useTranslations("projectsSection");
  const title = t(`projectsData.${data.translationKey}.title`);
  const isMobile = useBreakpoint();
  const technologiesString = t(
    `projectsData.${data.translationKey}.technologies`,
  );
  const technologies = technologiesString.split(",").map((tech) => tech.trim());

  return (
    <div
      id={removeHash(projectsRoutes[data.translationKey])}
      className={clsx(
        "w-full h-svh xl:min-h-[calc(100dvh-var(--height-header-desktop))] flex justify-end flex-col-reverse items-start xl:items-center xl:flex-row gap-[1.5rem] xl:gap-[5rem] scroll-mt-[5rem] xl:scroll-mt-[3rem]",
        {
          "xl:flex-row-reverse": props.odd,
        },
        props.containerClassName,
      )}
    >
      <div className="flex flex-col justify-start xl:justify-center gap-[1rem] xl:gap-[3rem] xl:w-[45%] w-full h-[70%] xl:h-full">
        <div className="flex flex-col gap-[1rem] xl:gap-[2rem]">
          <h3 className="text-black dark:text-soft-white text-xl xl:text-2xl font-semibold">
            {title}
          </h3>

          <div>
            <div className="hidden xl:flex xl:flex-wrap gap-[0.7rem] xl:gap-[1rem]">
              {technologies.map((tech, index) => (
                <ItemHover
                  key={index}
                  small
                  cursorNormal
                  className="dark:!border-soft-gray/30 !border-soft-white/50 shadow-s2 dark:shadow-s1 bg-black/80"
                >
                  {tech}
                </ItemHover>
              ))}
            </div>

            <div className="flex xl:hidden">
              <InfiniteCarousel items={technologies} />
            </div>
          </div>
        </div>

        <p className="text-dark-gray/85 dark:text-soft-gray text-sm xl:text-lg whitespace-pre-line">
          <RichText
            t={t}
            translationKey={`projectsData.${data.translationKey}.description`}
          />
        </p>

        <ButtonsSection
          button={data.button}
          demoVideo={data.demoVideo}
          containerClassName="mt-[1rem] "
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
