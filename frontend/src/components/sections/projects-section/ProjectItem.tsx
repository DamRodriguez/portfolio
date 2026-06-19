import InfiniteCarousel from "@/components/carousel/InfiniteCarousel";
import ItemHover from "@/components/other/ItemHover";
import { RichText } from "@/components/other/RichText";
import ImageCarouselModal from "@/components/sections/projects-section/carousel-modal/ImageCarouselModal";
import { projectsRoutes } from "@/constants/projectsRoutes";
import { useScrollLock } from "@/hooks/useScrollLock";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { Messages, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import ButtonsSection, { ProjectButton } from "./ButtonsSection";
import ImagesSection, { ImageSource } from "./ImagesSection";

export type ProjectKey = keyof Messages["projectsSection"]["projectsData"];
export type DescriptionKey = `projectsData.${ProjectKey}.description`;
export type ProjectCategory = "E-commerce" | "";

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
  const technologiesString = t(
    `projectsData.${data.translationKey}.technologies`,
  );
  const technologies = technologiesString.split(",").map((tech) => tech.trim());

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useScrollLock(isOpen);

  const allImages = useMemo(() => {
    switch (data.imageSource.type) {
      case "single":
        return [data.imageSource.image];

      case "mobile":
        return [...data.imageSource.images];

      case "default":
        return props.odd
          ? [
              data.imageSource.images.vertical,
              data.imageSource.images.rectangular,
              data.imageSource.images.horizontal,
              data.imageSource.images.square,
              ...(data.imageSource.images.extra ?? []),
            ]
          : [
              data.imageSource.images.rectangular,
              data.imageSource.images.vertical,
              data.imageSource.images.square,
              data.imageSource.images.horizontal,
              ...(data.imageSource.images.extra ?? []),
            ];

      default:
        return [];
    }
  }, [data.imageSource, props.odd]);

  const openCarousel = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div
      id={removeHash(projectsRoutes[data.translationKey])}
      className={clsx(
        "w-full h-svh xl:h-[calc(100svh-var(--height-header-desktop))] flex justify-end flex-col-reverse items-start xl:items-center xl:flex-row gap-[1.5rem] xl:gap-[5rem] scroll-mt-[5rem] xl:scroll-mt-[3rem]",
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

          <div className="relative">
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
              <div className="absolute z-2 top-0 -right-1 bg-gradient-to-r from-transparent to-white-bone dark:to-black w-6 h-full" />
            </div>
          </div>
        </div>

        <p className="text-dark-gray dark:text-soft-gray text-sm xl:text-lg whitespace-pre-line">
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
        onImageClick={openCarousel}
      />

      <AnimatePresence>
        {isOpen && (
          <ImageCarouselModal
            images={allImages}
            initialIndex={currentIndex}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectItem;
