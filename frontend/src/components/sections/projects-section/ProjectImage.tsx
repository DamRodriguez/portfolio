"use client";
import CustomImage from "@/components/image/CustomImage";
import TiltCard from "@/components/motion/TiltCard";
import clsx from "clsx";
import { Expand } from "lucide-react";

type ProjectImageProps = {
  image: string;
  alt: string;
  className?: string;
  disablePopUp?: boolean;
  onClick: () => void;
  onLoad?: () => void;
};

const ProjectImage = (props: ProjectImageProps) => {
  return (
    <>
      <TiltCard
        onClick={props.onClick}
        className={clsx(
          "overflow-hidden group rounded-[0.5rem] xl:rounded-2xl",
          props.className,
          {
            "cursor-pointer": !props.disablePopUp,
          },
        )}
      >
        <div className="h-full w-full shadow-s1 border border-black/15 dark:border-soft-gray/15 hover:border-black dark:hover:border-soft-gray theme-transition-all rounded-[0.5rem] xl:rounded-2xl overflow-hidden relative">
          <CustomImage
            width={1200}
            height={900}
            src={props.image}
            alt={props.alt}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
            className={clsx(
              "object-cover object-top h-full w-full hover:scale-110 theme-transition-all",
            )}
          />
          <div className="opacity-0 xl:group-hover:opacity-100 bg-soft-white/50 dark:bg-black/50 w-full h-full absolute bottom-0 flex justify-center items-center theme-transition-all backdrop-blur-[0.1rem] rounded-[0.5rem] xl:rounded-2xl">
            <div className="flex items-center gap-2">
              <Expand className="stroke-black dark:stroke-soft-white w-8 h-8" />
            </div>
          </div>
        </div>
      </TiltCard>
    </>
  );
};

export default ProjectImage;
