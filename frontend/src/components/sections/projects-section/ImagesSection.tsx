"use client";
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
  onImageClick: (index: number) => void;
};

const ImagesSection = ({
  imageSource,
  disablePopUp,
  odd,
  title,
  onImageClick,
}: ImagesSectionProps) => {
  return (
    <>
      {imageSource.type === "default" && (
        <div className="w-full h-[25%] md:h-[35%] xl:h-[70%] grid xl:flex-1 xl:w-full xl:grid-rows-[0.5fr_0.5fr] gap-[1rem] xl:gap-[1.5rem]">
          <div
            className={clsx(
              "flex h-full min-h-0 xl:h-full gap-[1rem] xl:gap-[1.5rem]",
              {
                "flex-row-reverse": odd,
              },
            )}
          >
            <ProjectImage
              onClick={() => onImageClick(odd ? 1 : 0)}
              image={imageSource.images.rectangular}
              alt={`${title} rectangular image`}
              disablePopUp={disablePopUp}
              className="h-full w-full object-center"
            />

            <ProjectImage
              onClick={() => onImageClick(odd ? 0 : 1)}
              image={imageSource.images.vertical}
              alt={`${title} vertical image`}
              disablePopUp={disablePopUp}
              className="h-full w-[65%] 2xl:w-[30%]"
            />
          </div>

          <div
            className={clsx(
              "flex h-full min-h-0 xl:h-full gap-[1rem] xl:gap-[1.5rem]",
              {
                "flex-row-reverse": odd,
              },
            )}
          >
            <ProjectImage
              onClick={() => onImageClick(odd ? 3 : 2)}
              image={imageSource.images.square}
              alt={`${title} square image`}
              disablePopUp={disablePopUp}
              className="h-full w-[60%]"
            />

            <ProjectImage
              onClick={() => onImageClick(odd ? 2 : 3)}
              image={imageSource.images.horizontal}
              alt={`${title} horizontal image`}
              disablePopUp={disablePopUp}
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      {imageSource.type === "mobile" && (
        <div className="flex h-fit md:h-[35%] xl:h-fit min-h-0 xl:w-[75%] justify-center gap-[1rem] 2xl:gap-[1.5rem] w-full">
          {imageSource.images.map((image, index) => (
            <div key={index}>
              <ProjectImage
                onClick={() => onImageClick(index)}
                image={image}
                alt={`${title} mobile image ${index + 1}`}
                disablePopUp={disablePopUp}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      )}

      {imageSource.type === "single" && (
        <div className="flex h-[25%] xl:h-[70%] w-full">
          <ProjectImage
            onClick={() => onImageClick(0)}
            image={imageSource.image}
            alt={`${title} image`}
            disablePopUp={disablePopUp}
            className="h-full w-full"
          />
        </div>
      )}
    </>
  );
};

export default ImagesSection;
