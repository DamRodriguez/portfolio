import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import CustomButton from "@/components/ui/buttons/CustomButton";
import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { StaticImageData } from "next/image";
import ProjectImage from "./ProjectImage";

export type ProjectItemData = {
  title: string;
  technologies: string[];
  description: React.ReactNode;
  siteLink?: string;
  id: string;
  inDevelopment?: boolean;
  images?: {
    rectangular: StaticImageData;
    vertical: StaticImageData;
    square: StaticImageData;
    horizontal: StaticImageData;
  }
  image?: StaticImageData;
}

type ProjectItemProps = {
  data: ProjectItemData;
  odd?: boolean;
}

const ProjectItem = (props: ProjectItemProps) => {
  const data = props.data;
  const t = useTranslations("projectsSection.buttons");
  const isMobile = useIsMobile({});

  return (
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

          <MotionStagger className="flex flex-wrap gap-[0.7rem] xl:gap-[1rem]">
            {data.technologies.map((tech, index) => (
              <Button key={index} small cursorNormal className="!h-2">
                {tech}
              </Button>
            ))}
          </MotionStagger>
        </div>

        <MotionFade>
          <p className="text-soft-gray text-sm xl:text-lg whitespace-pre-line">
            {data.description}
          </p>
        </MotionFade>

        {data.siteLink && (
          <MotionSlide direction="down">
            <CustomButton
              text={t("visitSite")}
              href={data.siteLink}
            />
          </MotionSlide>
        )}
        {data.inDevelopment && (
          <MotionSlide
            direction="down"
            className="w-fit"
          >
            <div className="flex items-center text-soft-gray text-base xl:text-lg border border-soft-gray/80 h-[2.5rem] xl:h-[3rem] px-[1rem] xl:px-[1.5rem] hover:bg-soft-white hover:text-black transition-all duration-400 ease-in-out rounded-full group-hover:rounded-r-full">
              {t("inDevelopment")}
            </div>
          </MotionSlide>
        )}
      </div>

      {data.images && (
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
              src={data.images.rectangular}
              alt={`${data.title} rectangular image`}
              className="w-full"
            />
            <ProjectImage
              src={data.images.vertical}
              alt={`${data.title} vertical image`}
              className="w-[70%]"
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
              src={data.images.square}
              alt={`${data.title} square image`}
              className="w-[60%]"
            />
            <ProjectImage
              src={data.images.horizontal}
              alt={`${data.title} horizontal image`}
              className="w-full"
            />
          </MotionSlide>
        </div>
      )}

      {data.image && (
        <MotionSlide
          direction="down"
          className={clsx("flex w-full h-[15rem] md:h-[20rem] xl:h-[25rem]",
          )}
        >
          <ProjectImage
            src={data.image}
            alt={`${data.title} image`}
            className="w-full"
          />
        </MotionSlide>
      )}
    </div>
  );
};

export default ProjectItem;