"use client";
import clsx from "clsx";
import Image from "next/image";

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
      <div
        onClick={props.onClick}
        className={clsx(
          "overflow-hidden rounded-[0.5rem] xl:rounded-2xl shadow-s1 border border-black/15 dark:border-soft-gray/15",
          props.className,
          {
            "cursor-pointer": !props.disablePopUp,
          },
        )}
      >
        <Image
          width={1200}
          height={900}
          src={props.image}
          alt={props.alt}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
          className={clsx(
            "object-cover object-top h-full w-full hover:scale-110 theme-transition-all",
          )}
        />
      </div>
    </>
  );
};

export default ProjectImage;
