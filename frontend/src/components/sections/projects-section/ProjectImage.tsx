"use client";
import { ImagePopUp } from "@/components/other/ImagePopUp";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type ProjectImageProps = {
  image: StaticImageData;
  alt: string;
  className?: string;
  disablePopUp?: boolean;
}

const ProjectImage = (props: ProjectImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <>
      <div
        onClick={() => { if (!props.disablePopUp) setSelectedImage(props.image.src) }}
        className={clsx("overflow-hidden rounded-[0.5rem] xl:rounded-2xl shadow-s6 border border-soft-gray/15",
          props.className,
          {
            "cursor-pointer": !props.disablePopUp,
          }
        )}
      >
        <Image
          src={props.image}
          alt={props.alt}
          className={clsx("object-cover object-top h-full w-full hover:scale-110 transition-all duration-400 ease-in-out")}
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