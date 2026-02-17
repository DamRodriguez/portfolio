"use client";
import Image from "next/image";
import { SourcePopUp } from "@/components/other/SourcePopUp";

type ImagePopUpProps = {
  image: string;
  alt?: string;
  onClose: () => void;
};

export const ImagePopUp = ({ image, alt = "Imagen ampliada", onClose }: ImagePopUpProps) => {
  return (
    <SourcePopUp
      source={image}
      onClose={onClose}
    >
      <Image
        src={image}
        alt={alt}
        width={1200}
        height={800}
      />
    </SourcePopUp>
  );
};
