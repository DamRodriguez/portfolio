import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import CustomButton from "@/components/ui/buttons/CustomButton";
import useIsMobile from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";

export type ProjectItemData = {
  title: string;
  technologies: string[];
  description: React.ReactNode;
  siteLink: string;
  images: {
    rectangular: StaticImageData;
    vertical: StaticImageData;
    square: StaticImageData;
    horizontal: StaticImageData;
  }
  id: string;
}

type ProjectItemProps = {
  data: ProjectItemData;
  odd?: boolean;
}

const ProjectItem = (props: ProjectItemProps) => {
  const data = props.data;
  const t = useTranslations("projectsSection.buttons");
  const imageItemClassName = "rounded-3xl object-cover object-top w-full h-full shadow-s6 border border-soft-gray/10 overflow-hidden"
  const isMobile = useIsMobile({});

  return (
    <div
      id={data.id}
      className={clsx("flex flex-col-reverse xl:flex-row gap-[2rem] xl:gap-[5rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]",
        {
          "xl:flex-row-reverse": props.odd,
        }
      )}>
      <div className="flex flex-col justify-center gap-[2.5rem] xl:gap-[4rem] xl:w-[45%] ">
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

        <MotionSlide direction="down">
          <CustomButton
            text={t("visitSite")}
            href={data.siteLink}
          />
        </MotionSlide>
      </div>

      <div className="grid gap-[1rem] xl:gap-[1.5rem] h-full xl:w-full ">
        <MotionSlide direction="down" className="grid grid-cols-[1fr_0.7fr] xl:grid-cols-[1fr_0.3fr] gap-[1rem] xl:gap-[1.5rem] h-[15rem] md:h-[20rem] xl:h-[25rem]">
          <Image
            src={data.images.rectangular}
            alt={`${data.title} rectangular image`}
            className={clsx("", imageItemClassName)}
          />
          <Image
            src={data.images.vertical}
            alt={`${data.title} vertical image`}
            className={clsx("", imageItemClassName)}
          />
        </MotionSlide>

        <MotionSlide direction="down" className="flex h-[8rem] md:h-[16rem] xl:h-[20rem] gap-[1rem] xl:gap-[1.5rem]">
          <Image
            src={data.images.square}
            alt={`${data.title} square image`}
            className={clsx("aspect-square", imageItemClassName)}
          />
          <Image
            src={data.images.horizontal}
            alt={`${data.title} horizontal image`}
            className={clsx("", imageItemClassName)}
          />
        </MotionSlide>
      </div>
    </div>
  );
};

export default ProjectItem;