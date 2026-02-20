import MotionSlide from "@/components/motion/MotionSlide";
import clsx from "clsx";
import ProjectImage from "@/components/sections/projects-section/ProjectImage";
import { StaticImageData } from "next/image";

export type ImageSource =
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

type ImagesSectionProps = {
  imageSource: ImageSource;
  disablePopUp?: boolean;
  odd?: boolean;
  title: string;
}

const ImagesSection = ({ imageSource, disablePopUp, odd, title }: ImagesSectionProps) => {
  return (
    <>
      {imageSource.type === "default" && (
        <div className="grid gap-[1rem] xl:gap-[1.5rem] h-full xl:w-full">
          <MotionSlide
            direction="down"
            className={clsx("flex gap-[1rem] xl:gap-[1.5rem] h-[15rem] md:h-[20rem] xl:h-[25rem]",
              {
                "flex-row-reverse": odd
              }
            )}
          >
            <ProjectImage
              image={imageSource.images.rectangular}
              alt={`${title} rectangular image`}
              disablePopUp={disablePopUp}
              className="w-full object-center"
            />
            <ProjectImage
              image={imageSource.images.vertical}
              alt={`${title} vertical image`}
              disablePopUp={disablePopUp}
              className="w-[65%] 2xl:w-[30%]"
            />
          </MotionSlide>

          <MotionSlide
            direction="down"
            className={clsx("flex h-[10rem] md:h-[16rem] xl:h-[20rem] gap-[1rem] xl:gap-[1.5rem]",
              {
                "flex-row-reverse": odd
              }
            )}
          >
            <ProjectImage
              image={imageSource.images.square}
              alt={`${title} square image`}
              disablePopUp={disablePopUp}
              className="w-[60%]"
            />
            <ProjectImage
              image={imageSource.images.horizontal}
              alt={`${title} horizontal image`}
              disablePopUp={disablePopUp}
              className="w-full"
            />
          </MotionSlide>
        </div>
      )}

      {imageSource.type === "mobile" && (
        <div className="flex gap-[1rem] xl:grid xl:grid-cols-2 xl:w-[50%] 2xl:flex 2xl:gap-[1.5rem] h-full 2xl:w-full">
          {imageSource.images.map((image, index) => (
            <MotionSlide
              direction="down"
              key={index}
            >
              <ProjectImage
                image={image}
                alt={`${title} mobile image ${index + 1}`}
                disablePopUp={disablePopUp}
                className="w-full h-full"
              />
            </MotionSlide>
          ))}
        </div>
      )}

      {imageSource.type === "single" && (
        <MotionSlide
          direction="down"
          className={clsx("flex w-full h-[15rem] md:h-[20rem] xl:h-[25rem]",
          )}
        >
          <ProjectImage
            image={imageSource.image}
            alt={`${title} image`}
            disablePopUp={disablePopUp}
            className="w-full"
          />
        </MotionSlide>
      )}
    </>
  );
};

export default ImagesSection;