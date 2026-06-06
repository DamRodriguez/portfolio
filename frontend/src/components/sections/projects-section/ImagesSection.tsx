import MotionSlide from "@/components/motion/MotionSlide";
import ProjectImage from "@/components/sections/projects-section/ProjectImage";
import clsx from "clsx";

export type ImageSource =
  | {
      type: "single";
      image: string;
    }
  | {
      type: "mobile";
      images: string[];
    }
  | {
      type: "default";
      images: {
        rectangular: string;
        vertical: string;
        square: string;
        horizontal: string;
      };
    };

type ImagesSectionProps = {
  imageSource: ImageSource;
  disablePopUp?: boolean;
  odd?: boolean;
  title: string;
};

const ImagesSection = ({
  imageSource,
  disablePopUp,
  odd,
  title,
}: ImagesSectionProps) => {
  return (
    <>
      {imageSource.type === "default" && (
        <div className="w-full h-[35%] xl:h-[70%] grid xl:flex-1 xl:w-full xl:grid-rows-[0.5fr_0.5fr] gap-[1rem] xl:gap-[1.5rem]">
          <MotionSlide
            direction="down"
            className={clsx(
              "flex h-full min-h-0 xl:h-full gap-[1rem] xl:gap-[1.5rem]",
              {
                "flex-row-reverse": odd,
              },
            )}
          >
            <ProjectImage
              image={imageSource.images.rectangular}
              alt={`${title} rectangular image`}
              disablePopUp={disablePopUp}
              className="h-full w-full object-center"
            />

            <ProjectImage
              image={imageSource.images.vertical}
              alt={`${title} vertical image`}
              disablePopUp={disablePopUp}
              className="h-full w-[65%] 2xl:w-[30%]"
            />
          </MotionSlide>

          <MotionSlide
            direction="down"
            className={clsx(
              "flex h-full min-h-0 xl:h-full gap-[1rem] xl:gap-[1.5rem]",
              {
                "flex-row-reverse": odd,
              },
            )}
          >
            <ProjectImage
              image={imageSource.images.square}
              alt={`${title} square image`}
              disablePopUp={disablePopUp}
              className="h-full w-[60%]"
            />

            <ProjectImage
              image={imageSource.images.horizontal}
              alt={`${title} horizontal image`}
              disablePopUp={disablePopUp}
              className="h-full w-full"
            />
          </MotionSlide>
        </div>
      )}

      {imageSource.type === "mobile" && (
        <div className="flex h-fit xl:w-[75%] justify-center gap-[1rem] 2xl:gap-[1.5rem] w-full">
          {imageSource.images.map((image, index) => (
            <MotionSlide direction="down" key={index}>
              <ProjectImage
                image={image}
                alt={`${title} mobile image ${index + 1}`}
                disablePopUp={disablePopUp}
                className="h-full w-full"
              />
            </MotionSlide>
          ))}
        </div>
      )}

      {imageSource.type === "single" && (
        <MotionSlide direction="down" className="flex h-full w-full">
          <ProjectImage
            image={imageSource.image}
            alt={`${title} image`}
            disablePopUp={disablePopUp}
            className="h-full w-full"
          />
        </MotionSlide>
      )}
    </>
  );
};

export default ImagesSection;
