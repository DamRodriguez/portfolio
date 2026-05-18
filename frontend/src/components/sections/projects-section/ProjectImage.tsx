"use client";
import { ImagePopUp } from "@/components/other/ImagePopUp";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type ProjectImageProps = {
  image: string;
  alt: string;
  className?: string;
  disablePopUp?: boolean;
};

const ProjectImage = (props: ProjectImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <>
      <div
        onClick={() => {
          if (!props.disablePopUp) setSelectedImage(props.image);
        }}
        className={clsx(
          "project-image-gsap overflow-hidden rounded-[0.5rem] xl:rounded-2xl shadow-s1 border border-black/15 dark:border-soft-gray/15",
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
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
          className={clsx(
            "object-cover object-top h-full w-full hover:scale-110 theme-transition-all",
          )}
        />
      </div>
      <ImagePopUp
        image={selectedImage}
        alt={props.alt}
        onClose={() => setSelectedImage("")}
      />
    </>
  );
};

export default ProjectImage;
